import React, { Component, useEffect, useState } from 'react'
import { auth } from '../config/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase/firebaseConfig';
import { getDocs, collection, where, query } from 'firebase/firestore';

const ProtectedRoutes = ({ Component, role }) => {
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false)
    const alloweRoles = ['admin', 'student']
    const navigate = useNavigate()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false)
                setIsAllowed(false)
                navigate('login')
                return
            }

            try {
                const q = query(
                    collection(db, "users"),
                    where('uid', '==', user.uid),

                );
                const snapshot = await getDocs(q)
                if (snapshot.empty) {
                    setLoading(false)
                    setIsAllowed(false)
                    return
                }

                let userData = snapshot.docs[0].data()

                if (alloweRoles.includes(userData.role)) {

                    setIsAllowed(true)
                    setLoading(false)
                } else {
                    setIsAllowed(false)
                }

                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setIsAllowed(false)
            }
        })

        return () => unsub()

    }, [])
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
        )
    }

    return isAllowed ? Component : <h1>Not Authorized</h1>
}

export default ProtectedRoutes
