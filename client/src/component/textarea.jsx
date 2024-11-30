import React from 'react';

export const Textarea = ({ placeholder = '', ...props }) => (
  <textarea
    placeholder={placeholder}
    className="border rounded px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary"
    {...props}
  />
);
