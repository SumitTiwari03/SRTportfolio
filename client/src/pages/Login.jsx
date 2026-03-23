import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'

function Login() {
    const history = useNavigate()
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showForgotModal, setShowForgotModal] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')
    const [forgotLoading, setForgotLoading] = useState(false)
    const [forgotMessage, setForgotMessage] = useState('')
    const { register, handleSubmit } = useForm()

    const handelUsername = (e) => {
        const value = e.target.value
        console.log("username :- ",value);
        setUsername(value)
        setError('') // Clear error on input change
    }
    const handelPassword = (e) => {
        const value = e.target.value
        console.log("password :- ",value);
        setPassword(value)
        setError('') // Clear error on input change
    }
    const handleLogin = async (e) => {
        setError('') // Clear previous errors

        if (!username || !password) {
            setError('Please enter both username and password')
            return
        }

        try {
            setLoading(true)
            const sendForm = await axios.post(`https://sumit-dev-api.onrender.com/api/dashboard_login`, {
                username,
                password,
            }, {
                withCredentials: true // Enable cookies for authentication
            })
            console.log("sendForm ", sendForm);

            // Store token in localStorage for easy access
            if (sendForm.data.Token) {
                localStorage.setItem('authToken', sendForm.data.Token)
                localStorage.setItem('isAuthenticated', 'true')
            }

            setLoading(false)
            history('/dashboard')
        }
        catch (err) {
            setLoading(false)
            console.log("Error:- ", err);

            // Display user-friendly error message
            if (err.response) {
                setError(err.response.data || 'Invalid credentials')
            } else if (err.request) {
                setError('Unable to connect to server. Please try again.')
            } else {
                setError('An error occurred. Please try again.')
            }
        }
    }

    const handleForgotCredentials = async () => {
        if (!forgotEmail) {
            setForgotMessage({ type: 'error', text: 'Please enter your email' })
            return
        }

        try {
            setForgotLoading(true)
            setForgotMessage('')
            
            const response = await axios.post(`https://sumit-dev-api.onrender.com/api/forgot-credentials`, {
                email: forgotEmail
            })
            
            setForgotMessage({ type: 'success', text: 'Credentials sent to your email! Check your inbox and spam folder.' })
            setTimeout(() => {
                setShowForgotModal(false)
                setForgotEmail('')
                setForgotMessage('')
            }, 3000)
        } catch (err) {
            console.log("Error:- ", err);
            setForgotMessage({ type: 'error', text: 'Failed to send credentials. Please try again.' })
        } finally {
            setForgotLoading(false)
        }
    }
    return (
        <div className="relative flex items-top border justify-center min-h-[550px] bg-white sm:items-center sm:pt-0">
            <form className="p-6 flex flex-col items-center justify-center min-w-[400px]" onSubmit={handleSubmit(handleLogin)}>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Dashboard Login</h2>
                {error && (
                    <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <div className="flex flex-col mt-2 w-full">
                    <label htmlFor="email" className="hidden">
                        Username
                    </label>
                    <input
                        type="text"
                        {...register('email')}
                        id="email"
                        placeholder="Email"
                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                        onChange={handelUsername}
                        value={username}
                    />
                </div>

                <div className="flex flex-col mt-2 w-full">
                    <label htmlFor="pass" className="hidden">
                        Password
                    </label>
                    <input
                        type="password"
                        {...register('password')}
                        id="password"
                        placeholder="Password"
                        className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                        onChange={handelPassword}
                        value={password}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-orange-700  hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <div className="flex mt-4 gap-2 justify-center w-full">
                    <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-blue-600 hover:text-blue-800 font-semibold underline transition-colors"
                    >
                        Forgot Credentials?
                    </button>
                </div>
            </form>

            {/* Forgot Credentials Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
                            <h2 className="text-2xl font-bold text-white">Recover Credentials</h2>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-4">
                            {forgotMessage.text && (
                                <div className={`p-4 rounded-lg border-2 ${
                                    forgotMessage.type === 'success' 
                                        ? 'bg-green-50 border-green-300 text-green-700' 
                                        : 'bg-red-50 border-red-300 text-red-700'
                                }`}>
                                    {forgotMessage.text}
                                </div>
                            )}

                            <p className="text-gray-600 text-sm">
                                Enter the email address associated with your dashboard account, and we'll send your credentials.
                            </p>

                            <label className="block">
                                <span className="text-sm font-bold text-gray-700 mb-2 block">Email Address:</span>
                                <input
                                    type="email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    disabled={forgotLoading}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all font-medium disabled:opacity-50"
                                    placeholder="your.email@example.com"
                                />
                            </label>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
                            <button
                                className="px-6 py-2 rounded-lg bg-white border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                                onClick={() => {
                                    setShowForgotModal(false)
                                    setForgotEmail('')
                                    setForgotMessage('')
                                }}
                                disabled={forgotLoading}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold hover:from-orange-700 hover:to-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                onClick={handleForgotCredentials}
                                disabled={forgotLoading}
                            >
                                {forgotLoading ? (
                                    <>
                                        <span className="inline-block animate-spin">⏳</span>
                                        Sending...
                                    </>
                                ) : (
                                    'Send Credentials'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Login