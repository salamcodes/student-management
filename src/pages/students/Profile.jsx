import React from 'react'
import StudentProfile from '../../components/StudentProfile'

const Profile = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-5">
        <StudentProfile />
      </div>
    </>
  )
}

export default Profile
