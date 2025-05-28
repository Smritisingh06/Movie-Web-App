import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import FeedbackModal from './FeedbackModal';
import ContactUs from '../pages/ContactUs';
import feedback from '../pages/Feedback';
import TermsPrivacy from '../pages/TermsPrivacy'; // Import the TermsPrivacy component


const Footer = () => {
 

  return (
    <footer className="bg-[#1e1e1e] text-neutral-300 py-8 px-4">
        {/* <footer
      className="bg-[#222222] text-neutral-300 py-6 px-4 text-center border-t border-neutral-700"
    ></footer> */}
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Movieo Logo" className="h-8 w-auto" />
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
   {/* <Link to="/TermsPrivacy" className="hover:text-white hover:underline transition">Terms & Privacy</Link> */}
   <a 
  href="/terms-privacy.pdf" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="hover:text-white hover:underline transition"
>
  Terms & Privacy
</a>

        <Link to="/feedback"  className="hover:text-white hover:underline transition">Send Feedback</Link>
        <Link  to="/contact" className="hover:text-white hover:underline transition">Help</Link>
             
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 w-4/5 mx-auto mb-4"></div>

      {/* Copyright */}
      <p className="text-sm text-center text-gray-400">© 2025 Movieo. All rights reserved.</p>
      <p className="text-sm text-center text-gray-500 mt-1">Made with <span className="text-pink-500">❤️</span> by <span className="font-semibold text-gray-500">Smriti Singh</span></p>
    </footer>
  );
};

export default Footer;
