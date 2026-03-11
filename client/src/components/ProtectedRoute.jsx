import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const authToken = localStorage.getItem('authToken');

    // Check if user is authenticated
    if (!isAuthenticated || !authToken) {
        // Redirect to login page if not authenticated
        return <Navigate to="/dashboard_login" replace />;
    }

    return children;
};

export default ProtectedRoute;
