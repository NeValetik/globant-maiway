import { useState } from 'react';

function LoginSignupForm() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? 'Login' : 'Sign Up'}
                </h2>

                <form>
                    {/* Username/Email */}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="username"
                            id="username"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Repeat Password (for Sign Up) */}
                    {!isLogin && (
                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="block text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                {/* Toggle between Login/Sign Up */}
                <p className="text-center mt-4">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                        onClick={toggleForm}
                        className="text-blue-500 hover:underline"
                    >
                        {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginSignupForm;
