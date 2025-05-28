// FeedbackModal.jsx
import React from 'react';

const FeedbackModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Feedback</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Submitted!');
            onClose();
          }}
          className="space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 placeholder-gray-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 placeholder-gray-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows="3"
              required
              className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2 placeholder-gray-500"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-800 to-cyan-500 text-white font-semibold py-2 px-8 rounded-lg hover:opacity-90 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
