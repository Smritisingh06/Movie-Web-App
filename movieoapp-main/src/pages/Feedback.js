import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const emojiRatings = [
  { label: 'Bad', emoji: '😞', value: 'bad' },
  { label: 'Good', emoji: '🙂', value: 'good' },
  { label: 'Very Good', emoji: '😃', value: 'very_good' },
  { label: 'Excellent', emoji: '🤩', value: 'excellent' },
];

const Feedback = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '',
  });

  const [status, setStatus] = useState(null); // success or error
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const newErrors = {};

    if (!formData.rating) newErrors.rating = 'Please select a rating.';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: formData.rating, message: formData.message }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', rating: '' });
        setErrors({});
        navigate('/');
      } else {
        setStatus('error');
      }
    } catch (err) {
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
        <h2 className="text-3xl font-bold mb-6">Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <p className="mb-2 font-semibold">Rate your experience:</p>
            <div className="flex justify-between max-w-xs mx-auto">
              {emojiRatings.map(({ label, emoji, value }) => (
                <label
                  key={value}
                  className={`cursor-pointer flex flex-col items-center text-center select-none transition-transform ${
                    formData.rating === value ? 'scale-110' : 'scale-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={formData.rating === value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-3xl">{emoji}</span>
                  <span className="mt-1 text-sm">{label}</span>
                </label>
              ))}
            </div>
            {errors.rating && (
              <p className="text-red-500 text-sm mt-1 text-center">{errors.rating}</p>
            )}
          </div>

          <div>
            <p className="mb-2 font-semibold">Tell us what can be improved?</p>
            <textarea
              name="message"
              placeholder="Tell us what can be improved?"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-500 text-center">
            Thank you for your feedback!
          </p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-500 text-center">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-sm text-neutral-400 mt-6 text-center">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot.
          <a href="#" className="text-blue-500 ml-1 hover:underline">Learn more.</a>
        </p>
      </div>
    </div>
  );
};

export default Feedback;
