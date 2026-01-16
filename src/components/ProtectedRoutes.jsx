import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoutes = ({ Component, role }) => {
    const { currentUser, userRole, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !currentUser) {
            navigate('/login');
        }
    }, [loading, currentUser, navigate]);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#666'
            }}>
                <div>Loading... please wait</div>
            </div>
        );
    }

    if (!currentUser) {
        return null; // Will redirect in useEffect
    }

    if (userRole !== role) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#666'
            }}>
                <h1>Not Authorized</h1>
            </div>
        );
    }

    return Component;
};

export default ProtectedRoutes;