import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { currentUser, userRole } = useAuth()


  useEffect(() => {
    if (currentUser && userRole) {
      userRole === 'admin' ? navigate('/') : navigate('/profile')
    }
  }, [currentUser, userRole, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
      console.error('Login error:', error)

      setError(errorMessage)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold">
            <span className="text-[#1F5FC4]">Learn</span>
            <span className="text-[#00A86B]">Sync</span>
          </h1>
          <p className="text-gray-600 text-sm mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1F5FC4] focus:outline-none focus:ring-2 focus:ring-[#1F5FC4] focus:ring-opacity-20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#1F5FC4] focus:outline-none focus:ring-2 focus:ring-[#1F5FC4] focus:ring-opacity-20 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(90deg, #1F5FC4, #00A86B)"
            }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login