import React, { useState } from 'react'
import { collection, query, getDocs, where } from 'firebase/firestore'
import { db } from '../config/firebase/firebaseConfig'
import { auth } from '../config/firebase/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'





const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      // console.log(user);

      const q = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("User data not found in Firestore");
        return;
      }
      const userData = querySnapshot.docs[0].data();
      // console.log(userData);


      userData.role === 'admin' ? navigate('/') : navigate('/profile')

    } catch (error) {
      alert(error)
    }

    setEmail('')
    setPassword('')
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">

          {/* Logo */}
          <div className="flex flex-col items-center mb-6">

            <h1 className="text-3xl font-bold">
              <span className="text-[#1F5FC4]">Learn</span>
              <span className="text-[#00A86B]">Sync</span>
            </h1>
          </div>

          {/* Email */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1F5FC4] focus:outline-none mb-4"
          />

          {/* Password */}
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1F5FC4] focus:outline-none mb-6"
          />

          {/* Login Button */}
          <button
            type='submit'
            onClick={handleSubmit}
            className="w-full py-2 rounded-lg text-white font-semibold transition-all cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #1F5FC4, #00A86B)"
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
