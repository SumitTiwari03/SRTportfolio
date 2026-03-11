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
                <div className="flex mt-4 gap-2 justify-start w-full">
                    <p>Don't have account ?</p>
                    <Link to='/register'>
                        <span className='text-blue-700 font-semibold'>Register</span>
                    </Link>
                </div>
            </form>
        </div>

    )
}

export default Login