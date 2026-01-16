import { useEffect, useState } from 'react'
import { profileData } from '../services/singleDoc'
import { auth } from '../config/firebase/firebaseConfig'
import { fetchCourseData } from '../services/courseService'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'



const StudentProfile = () => {
    const [data, setData] = useState()
    const [studentCourses, setStudentCourses] = useState('')
    const navigate = useNavigate()

    const logOut = () => {

        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            alert(error)
        });
    }
    useEffect(() => {
        const getData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const response = await profileData(user.uid);
            setData(response)

            const courses = await fetchCourseData()
            const course = courses.filter((item, i) => {
                return item.students[i] === user.uid
            })
            setStudentCourses(course)
        };


        getData();
    }, []);

    return (
        <>

            <div className="flex w-full min-h-screen bg-[#F4F7FE]">

                {/* Main */}
                <div className="flex-1 p-6 overflow-auto">

                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-[#1F5FC4]">Student Dashboard</h1>
                        <button
                            onClick={logOut}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm cursor-pointer"
                        >
                            Log Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {!data && <h1>Loading...</h1>}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-[#E5ECFB]">

                            <h2 className="text-xl font-semibold text-[#1F5FC4]">Student Profile</h2>
                            <p className="text-sm text-gray-500 mb-3">Personal Information</p>
                            {
                                data &&

                                <div className="space-y-2 text-gray-700">
                                    <p><span className="font-medium">Name: </span>{data.name} </p>
                                    <p><span className="font-medium">Email: </span> {data.email} </p>
                                    <p><span className="font-medium">User ID: </span> {data.uid} </p>
                                    <p><span className="font-medium">Role: </span> {data.role} </p>
                                </div>
                            }

                        </div>


                        {/* Courses */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-[#E5ECFB]">

                            <h2 className="text-xl font-semibold text-[#1F5FC4]">Enrolled Courses</h2>
                            <p className="text-sm text-gray-500 mb-3">Courses Assigned</p>

                            <div className="space-y-3">
                                {
                                    studentCourses && studentCourses.map((item) => {
                                        return <div key={item.id} className="p-3 border rounded-lg bg-[#F8FAFF] flex justify-between items-center border-[#DCE6FD]">
                                            <span className="font-medium text-gray-800">{item.courseName} </span>
                                            <span className="text-sm text-[#1F5FC4] font-medium">{item.Duration}</span>
                                        </div>

                                    })
                                }


                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default StudentProfile