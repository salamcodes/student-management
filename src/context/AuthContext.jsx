import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, collection, where, query } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setCurrentUser(null);
                setUserRole(null);
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, "users"),
                    where('uid', '==', user.uid)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const userData = snapshot.docs[0].data();
                    setCurrentUser(user);
                    setUserRole(userData.role);
                } else {
                    setCurrentUser(null);
                    setUserRole(null);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setCurrentUser(null);
                setUserRole(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsub();
    }, []);

    const value = {
        currentUser,
        userRole,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};