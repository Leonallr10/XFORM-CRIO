import React, { useState, useEffect } from 'react';

interface FormData {
  username: string;
  email: string;
  phone: string;
  dob: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form data when modal closes
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    // First check for specific field validations if the field has content
    
    // Validate email if it has content
    if (formData.email.trim() && !formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return false;
    }

    // Validate phone number if it has content
    if (formData.phone.trim()) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert('Invalid phone number. Please enter a 10-digit phone number.');
        return false;
      }
    }

    // Validate date of birth if it has content
    if (formData.dob.trim()) {
      const selectedDate = new Date(formData.dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to compare only dates
      
      if (selectedDate > today) {
        alert('Invalid date of birth. Date of birth cannot be in the future.');
        return false;
      }
    }

    // Then check for empty fields
    if (!formData.username.trim()) {
      alert('Please fill out the Username field.');
      return false;
    }
    if (!formData.email.trim()) {
      alert('Please fill out the Email field.');
      return false;
    }
    if (!formData.phone.trim()) {
      alert('Please fill out the Phone Number field.');
      return false;
    }
    if (!formData.dob.trim()) {
      alert('Please fill out the Date of Birth field.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Form is valid, close modal and reset
      closeModal();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-12">
          User Details Modal
        </h1>
        
        <button
          onClick={openModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Open Form
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="modal fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
          onClick={handleBackdropClick}
        >
          <div className="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 animate-slideIn">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 text-center mb-8">
                Fill Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-2">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address:
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 mb-2">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="submit-button w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-8"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;