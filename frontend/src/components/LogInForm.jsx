import React, { useState, useEffect } from 'react';
import { MdOutlineEmail } from "react-icons/md";
import { FaLock, FaUser } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import themeChangerDescriptionString from "../components/utils/themeChangerDescriptionString";
import Navbar from "./Navbar";
import { useLocation, useParams } from "react-router-dom";

function LoginSignupForm() {

  const loginType = useParams();
  console.log(loginType);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [isLogin, setIsLogin] = useState(queryParams.get('login') !== null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  // Update `isLogin` when the query parameters change
  useEffect(() => {
    setIsLogin(queryParams.get('login') !== null);
  }, [location.search]); // Re-run when the query parameters change

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const endpoint = isLogin ? '/login' : '/register';
    const payload = { username, password };

    try {
      const response = await fetch(`http://localhost:6969/api/auth${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const token = await response.text();

      if (!response.ok) {
        throw new Error(token.message || 'An error occurred');
      }

      localStorage.setItem('token', token);
      console.log("This is in local storage: " + localStorage.getItem('token'));

      window.location.href = '/';
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Navbar />
        <div className="min-h-screen py-10 flex items-center justify-center">
          <div className={themeChangerDescriptionString(theme, 'bg-white', 'bg-mvcontainergrey', 'shadow-sm rounded-lg overflow-hidden mx-auto max-w-[500px] w-full relative')}>
            <div className="min-h-[100px] h-[100px] w-full bg-mwlightgreen"></div>

            <div className="relative p-8">
              <h2 className={themeChangerDescriptionString(theme, 'text-black', 'text-white', 'text-3xl font-bold mb-6 text-center')}>
                {isLogin ? 'Login' : 'Sign Up'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <div className="flex items-center">
                    <FaUser className={themeChangerDescriptionString(theme, 'text-gray-600', 'text-gray-400')} size={20} />
                    <input
                        type="text"
                        placeholder="Username"
                        className={`${themeChangerDescriptionString(theme, 'bg-white text-black', 'bg-mvcontainergrey text-white', 'ml-2 w-full p-2 border-b border-gray-300 focus:outline-none focus:border-mwlightgreen')}`}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <FaLock className={themeChangerDescriptionString(theme, 'text-gray-600', 'text-gray-400')} size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        className={`${themeChangerDescriptionString(theme, 'bg-white text-black', 'bg-mvcontainergrey text-white', 'ml-2 w-full p-2 border-b border-gray-300 focus:outline-none focus:border-mwlightgreen')}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </div>
                </div>

                {!isLogin && (
                    <div className="mb-4">
                      <div className="flex items-center">
                        <FaLock className={themeChangerDescriptionString(theme, 'text-gray-600', 'text-gray-400')} size={20} />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={`${themeChangerDescriptionString(theme, 'bg-white text-black', 'bg-mvcontainergrey text-white', 'ml-2 w-full p-2 border-b border-gray-300 focus:outline-none focus:border-mwlightgreen')}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                      </div>
                    </div>
                )}

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className={`w-full bg-mwdarkgreen text-white p-2 rounded-lg hover:bg-mwlightgreen transition-colors ${loading && 'opacity-50 cursor-not-allowed'}`}
                    disabled={loading}
                >
                  {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
                </button>
              </form>

              <p className={`${themeChangerDescriptionString(theme, 'text-gray-600', 'text-gray-400')} text-center mt-4`}>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button onClick={toggleForm} className="text-mwlightgreen hover:underline">
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </>
  );
}

export default LoginSignupForm;
