// Button.js

import React from 'react'

const Button = ({ type = 'button', variant = 'primary', onClick, children }) => {
  const baseStyles = 'text-white flex justify-center aling-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2'

  const variants = {
    primary: 'bg-blue-600 flex text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 flex text-gray-800 hover:bg-gray-300',
  }

  return (
  <button
    type={type}
    onClick={onClick}
    className={`${baseStyles} ${variants[variant] || variants.primary}`}
  >
    {children}

  </button>
)
}

export default Button
