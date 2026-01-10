
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Login from './pages/Login.jsx'
import ViewStudents from './pages/admin/ViewStudents.jsx'
import StudentDashboard from './pages/admin/StudentDashboard.jsx'
import AddStudent from './pages/admin/AddStudent.jsx'
import ViewCourses from './pages/admin/ViewCourses.jsx'
import AddCourses from './pages/admin/AddCourses.jsx'
import AssignCourses from './pages/admin/AssignCourses.jsx'
import MyCourses from './pages/admin/MyCourses.jsx'
import Profile from './pages/admin/Profile.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path='login' element={<Login />} />
      <Route path='students'>
        <Route index element={<ViewStudents />} />
        <Route path='StudentDashboard' element={<StudentDashboard />} />
        <Route path='Addstudent' element={<AddStudent />} />

      </Route>

      <Route path='courses'>

        <Route index element={<ViewCourses />} />
        <Route path='AddCourses' element={<AddCourses />} />

      </Route>
      <Route path='assign-course' element={<AssignCourses />} />
      <Route path='my-course' element={<MyCourses />} />
      <Route path='profile' element={<Profile />} />
    </Routes>

  </BrowserRouter>
)
