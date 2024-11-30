import React from 'react';

export const Card = ({ children }) => (
  <div className={`border rounded-lg shadow p-3`}>
    {children}
  </div>
); 

export const CardContent = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);
