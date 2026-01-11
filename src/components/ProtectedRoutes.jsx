import React, { Component, useEffect, useState } from 'react'
import { auth } from '../config/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase/firebaseConfig';
import { getDocs, collection, where, query } from 'firebase/firestore';

const ProtectedRoutes = ({ Component, role }) => {
    const [loading, setLoading] = useState(true);
    const [isAllowed, setIsAllowed] = useState(false)
    // const alloweRoles = ['admin', 'student']
    const navigate = useNavigate()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setLoading(false)
                setIsAllowed(false)
                navigate('login')

            }

            try {
                const q = query(
                    collection(db, "user"),
                    where('uid', '==', user.uid),

                );
                const snapshot = await getDocs(q)
                if (snapshot.empty) {
                    setLoading(false)
                    setIsAllowed(false)
                    return
                }

                let userData = snapshot.docs[0].data()

                if (role.includes(userData.role)) {
                    console.log(userData.role)
                    setIsAllowed(true)
                } else {
                    setIsAllowed(false)
                }


            } catch (error) {
                console.log(error)
                setLoading(false)
                setIsAllowed(false)
            }
        })

        return () => unsub()

    }, [role])
    if (loading) return <h1>Loading..</h1>

    return isAllowed ? Component : <h1>Not Authorized</h1>
}

export default ProtectedRoutes
