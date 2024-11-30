import React from 'react';

export const Input = ({ type = 'text', placeholder = '', ...props }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    {...props}
  />
);
