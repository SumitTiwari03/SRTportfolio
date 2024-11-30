import React from 'react';

export const Badge = ({ children, color = 'primary' }) => {
  const colorClasses = color === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800';
  
  return (
    <span className={`text-sm font-semibold px-2 py-1 rounded ${colorClasses}`}>
      {children}
    </span>
  );
};
