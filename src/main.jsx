
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './config/store/store.js'
import Dashboard from './pages/admin/Dashboard.jsx'
import Login from './pages/Login.jsx'
import ViewStudents from './pages/admin/ViewStudents.jsx'
import StudentDashboard from './pages/admin/StudentDashboard.jsx'
import AddStudent from './pages/admin/AddStudent.jsx'
import ViewCourses from './pages/admin/ViewCourses.jsx'
import AddCourses from './pages/admin/AddCourses.jsx'
import AssignCourses from './pages/admin/AssignCourses.jsx'
import MyCourses from './pages/students/MyCourses.jsx'
import Profile from './pages/students/Profile.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />


        <Route index element={<ProtectedRoutes Component={<Dashboard />} role='admin' />} />

        <Route path='students'>
          <Route index element={<ProtectedRoutes Component={<ViewStudents />} role='admin' />} />
  
          <Route path='AddStudent' element={<ProtectedRoutes Component={<AddStudent />} role='admin' />} />

        </Route>

        <Route path='courses'>

          <Route index element={<ProtectedRoutes Component={<ViewCourses />} role='admin' />} />
          <Route path='AddCourses' element={<ProtectedRoutes Component={<AddCourses />} role='admin' />} />

        </Route>
        <Route path='my-course' element={<ProtectedRoutes Component={<MyCourses />} role='student' />} />
        <Route path='profile' element={<ProtectedRoutes Component={<Profile />} role='student' />} />
      </Routes>


    </BrowserRouter>
  </Provider>

)
