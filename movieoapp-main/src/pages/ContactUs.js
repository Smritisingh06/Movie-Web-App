import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
      const navigate = useNavigate();
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/contact/submitContactForm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // reset form
        navigate('/');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: "url('/bg1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(7deg, rgba(0, 0, 0, 0.85) 10%, rgba(0, 0, 0, 0.84) 17%, rgba(0, 0, 0, 0.83) 25%, rgba(0, 0, 0, 0.8) 32%, rgba(0, 0, 0, 0.76) 40%, rgba(0, 0, 0, 0.72) 47%, rgba(0, 0, 0, 0.68) 54%, rgba(0, 0, 0, 0.63) 61%, rgba(0, 0, 0, 0.6) 100%)`,
        }}
      />

      <div className="relative z-10 bg-black bg-opacity-75 text-white rounded-md px-10 py-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-500">Thank you! Your message has been sent.</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500">Oops! Something went wrong. Please try again.</p>
        )}

        <p className="text-sm text-neutral-400 mt-6">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot.
          <a href="#" className="text-blue-500 ml-1 hover:underline">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
