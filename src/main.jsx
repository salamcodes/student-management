import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './config/store/store.js'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'

// Pages
import Login from './pages/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ViewStudents from './pages/admin/ViewStudents.jsx'
import AddStudent from './pages/admin/AddStudent.jsx'
import ViewCourses from './pages/admin/ViewCourses.jsx'
import AddCourses from './pages/admin/AddCourses.jsx'
import Profile from './pages/students/Profile.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route path='/login' element={<Login />} />

          {/* Admin Routes */}
          <Route
            index
            element={<ProtectedRoutes Component={<Dashboard />} role='admin' />}
          />

          <Route path='students'>
            <Route
              index
              element={<ProtectedRoutes Component={<ViewStudents />} role='admin' />}
            />
            <Route
              path='addStudent'
              element={<ProtectedRoutes Component={<AddStudent />} role='admin' />}
            />
          </Route>

          <Route path='courses'>
            <Route
              index
              element={<ProtectedRoutes Component={<ViewCourses />} role='admin' />}
            />
            <Route
              path='addCourses'
              element={<ProtectedRoutes Component={<AddCourses />} role='admin' />}
            />
          </Route>

          {/* Student Route */}
          <Route
            path='profile'
            element={<ProtectedRoutes Component={<Profile />} role='student' />}
          />

          {/* 404 Not Found */}
          <Route
            path='*'
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
                  <p className="text-gray-600">Page Not Found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
)