import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import userIcon from '../assets/user.png'
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from '../contants/navigation';
import { useAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';





// Sign In Modal Component
const SignInModal = ({ show, onClose, onSignUp,onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);

const navigate = useNavigate(); 
const { rememberMe, setRememberMe } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // setSuccess('Login successful!');
        setSuccess('Login successful!');
setTimeout(() => setSuccess(''), 1500); // Remove message after 1.5 seconds
        setEmail('');
        setPassword('');
        // Optionally: save token, redirect, etc.
        onClose(); // close modal
         onLoginSuccess();
           localStorage.setItem('isLoggedIn', 'true'); // <--- add this

        // navigate('/'); // Redirect to home page after successful login
      } else {
        setError(data.msg || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative z-10 bg-black bg-opacity-75 text-white rounded-md px-10 py-8 w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {/* <h2 className="text-3xl text-white mb-6">Sign In</h2> */}
         <h2 className="text-3xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            // className="block w-full mb-4 p-2 rounded bg-[#333] text-white"
  className="w-full bg-[#333] mb-4 p-2 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"

            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="relative" >
  <input
    // className="block w-full mb-4 p-2 rounded bg-[#333] text-white"
      className="w-full bg-[#333] mb-4 p-2 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"

    placeholder="Password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
  />
  <span
 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400"s
    onClick={() => setShowPassword((prev) => !prev)}
    tabIndex={0}
    role="button"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>
          <button
            className="w-full bg-red-600 text-white py-2 rounded mb-4"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          {/* <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-white text-sm">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <span className="text-white text-sm cursor-pointer hover:underline">Need Help?</span>
          </div> */}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
        </form>
        <p className="text-neutral-400 mt-2">
          New to Netflix?{' '}
          <span
            className="font-semibold cursor-pointer hover:underline text-white"
            onClick={onSignUp}
          >
            Sign Up Now
          </span>
        </p>

          <p className="text-sm text-neutral-400 mt-6">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot.
          <a href="#" className="text-blue-500 ml-1 hover:underline">Learn more.</a>
        </p>
       
      </div>
    </div>
  );
};

// Sign Up Modal Component
// ...existing imports...

const SignUpModal = ({ show, onClose, onSignIn }) => {
    const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!show) return null;

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Sign up successful! You can now sign in.');
        setTimeout(() => {
          setSuccess('');
          onClose();      // Close the signup modal
          onSignIn();     // Open the login modal
        }, 1500);         // Wait 1.5 seconds before switching modals
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(data.msg || 'Sign up failed');
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60  flex items-center justify-center z-50">
        <div className="relative z-10 bg-black bg-opacity-75 text-white rounded-md px-10 py-8 w-full max-w-md">
        
        {/* <div className="bg-[rgb(0_0_0/_0.7)] p-8 rounded-lg w-full max-w-md relative"> */}
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {/* <h2 className="text-3xl text-white mb-6">Sign Up</h2> */}
          <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

           <form
         onSubmit={handleSubmit}
          className="space-y-5"
        >

          
          <input
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
              placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        

                <div className="relative">
  <input
               className="w-full bg-[#333] text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"

    placeholder="Password"
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-400"
    onClick={() => setShowPassword((prev) => !prev)}
    tabIndex={0}
    role="button"
    aria-label={showPassword ? "Hide password" : "Show password"}
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </span>
</div>

          <button 
          type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

        </form>
      
        <p className="text-white mt-2">
          Already have account?{' '}
          <span
            className="font-semibold cursor-pointer hover:underline"
            onClick={onSignIn}
          >
            Sign In Now
          </span>

           <p className="text-sm text-neutral-400 mt-6">
          This page is protected by Google reCAPTCHA to ensure you’re not a bot.
          <a href="#" className="text-blue-500 ml-1 hover:underline">Learn more.</a>
        </p>
        </p>
      </div>
    </div>
  );
};

// ...rest of your Header.js code remains unchanged...

const Header = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(() => {
//   return localStorage.getItem('isLoggedIn') === 'true';
// });
const { isLoggedIn, setIsLoggedIn, showSignIn, setShowSignIn, showSignUp, setShowSignUp } = useAuth();
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [searchInput, setSearchInput] = useState(removeSpace)
  const navigate = useNavigate()
//   const [showSignUp, setShowSignUp] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);


  
  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`)
    }
  }, [searchInput])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleLogout = () => {
  setIsLoggedIn(false);
  localStorage.removeItem('isLoggedIn');
  setShowDropdown(false);
};

  return (
    <header className='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
      <div className='container mx-auto px-3 flex items-center h-full'>
        <Link to={"/"}>
          <img
            src={logo}
            alt='logo'
            width={120}
          />
        </Link>

        <nav className='hidden lg:flex items-center gap-1 ml-5'>
          {
            navigation.map((nav, index) => {
              return (
                <div key={nav.label + "header" + index}>
                  <NavLink to={nav.href} className={({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`}>
                    {nav.label}
                  </NavLink>
                </div>
              )
            })
          }
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Search here...'
              className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className='text-2xl text-white'>
              <IoSearchOutline />
            </button>
          </form>
          
        
<div className='w-8 h-8 cursor-pointer  transition-all flex items-center relative'>
  {isLoggedIn ? (
    <>
      <img
        src={userIcon}
        alt="User"
        className="w-8 h-8"
        onClick={() => setShowDropdown((prev) => !prev)}
        style={{ cursor: 'pointer',borderRadius: '50%' }}
      />
      {showDropdown && (
        <div className="absolute right-0 mt-10 bg-[#222] text-white rounded shadow-lg py-2 px-4 z-50">
          <button
          
            onClick={handleLogout}
            // className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </>
  ) : (
    <>
      <button  onClick={() => setShowSignIn(true)} className="mr-5">Login</button>
        {/* <button  className=' bg-white px-4 py-2 text-black font-bold rounded mt-4  hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                                Play Now
                                            </button> */}
      {/* <button onClick={() => setShowSignUp(true)} className="ml-2">Sign Up</button> */}
    </>
  )}
</div>
      </div>
    
      <SignInModal
  show={showSignIn}
  onClose={() => setShowSignIn(false)}
  onSignUp={() => {
    setShowSignIn(false);
    setShowSignUp(true);
  }}
  onLoginSuccess={() => setIsLoggedIn(true)} // <-- Add this line
/>
      <SignUpModal
        show={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSignIn={() => {
          setShowSignUp(false);
          setShowSignIn(true);
        }}
      />
        </div>
    </header>
  )
}

export default Header