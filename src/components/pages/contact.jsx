import React, { useState } from 'react';
import Navbar from './navbar';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email.js service configuration
    const serviceID = 'service_4lclscy';
    const templateID = 'template_tjhtb9d';
    const userID = '3yRx4zz8x1BLXe4-J';  // You can get this from the EmailJS dashboard

    // Send email using emailjs
    emailjs
      .send(
        serviceID,
        templateID,
        formData,
        userID
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Thank you for reaching out! We will get back to you soon.');
          setFormData({ name: '', email: '', message: '' }); // Clear form after submission
        },
        (err) => {
          console.log('FAILED...', err);
          alert('Sorry, there was an issue sending your message. Please try again later.');
        }
      );
  };

  return (
    <div className="bg-CA h-full min-h-screen text-gray-900">
      <div className="flex px-5 h-full">
        <Navbar />
        <div className="flex-1 w-64 m-5 px-0 lg:px-5 mt-16 lg:mt-5">
          <h1 className="text-4xl font-bold mb-5 text-black">Contact Us</h1>

          {/* Intro Section */}
          <p className="text-lg text-gray-800 mb-8">
            Have questions, feedback, or just want to say hello? We'd love to hear from you! 
            Fill out the form below, and we'll get back to you as soon as possible.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-900 hover:bg-white hover:text-blue-900 text-white py-2 px-6 rounded-lg shadow-md text-lg font-semibold"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
