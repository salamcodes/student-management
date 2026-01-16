import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentData } from "../../services/studentService";
import { addStudent } from "../../config/reducers/addStudentSlice";
import { db } from "../../config/firebase/firebaseConfig";
import { fetchCourseData } from "../../services/courseService";
import { addCourse } from '../../config/reducers/courseSlice'
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { arrayUnion } from "firebase/firestore";

const ViewStudents = () => {
  const navigate = useNavigate()

  const students = useSelector(state => state.student.students)
  // console.log("Redux" , students)
  const dispatch = useDispatch();

  const [assignId, setAssignId] = useState(null);


  const courses = useSelector(state => state.course.course)

  const availableCourses = (studentCourses) => {
    return courses.filter(course => !studentCourses.includes(course.id));
  };


  const assignCourse = async (studentId, courseId, studentCourses) => {
    if (!courseId) return;

    setAssignId(studentId);

    try {

      const studentRef = doc(db, 'users', studentId);

      const courseRef = doc(db, 'courses', courseId);

      await updateDoc(studentRef, {
        courses: arrayUnion(courseId)
      });

      await updateDoc(courseRef, {
        students: arrayUnion(studentId)
      });


      const updatedStudents = await fetchStudentData();
      dispatch(addStudent(updatedStudents));


      const updatedCourses = await fetchCourseData();
      dispatch(addCourse(updatedCourses));

      // alert('Course assigned successfully!');

    } catch (error) {
      alert('Failed to assign course. Please try again.');
    } finally {
      setAssignId(null);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const studentData = await fetchStudentData();
      dispatch(addStudent(studentData));

      const coursesData = await fetchCourseData();
      dispatch(addCourse(coursesData));
    }
    getData();
  }, [])


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />

      {/* Main Content  */}
      <div className="flex-1 flex flex-col md:h-screen">

        {/* Header */}

        <div className="bg-gray-100 p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-[#1F5FC4]">Students</h1>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate("/students/AddStudent")}
                className="bg-[#1F5FC4] text-white px-4 py-2 rounded font-medium hover:opacity-90 transition cursor-pointer"
              >
                + Add Student
              </button>
            </div>
          </div>
        </div>

        {/* Student Cards  */}

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {students?.length > 0 ? (
              students.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="bg-white border rounded-lg shadow p-4 flex flex-col gap-4"
                  >

                    <div className="flex gap-4 items-start">
                      <img
                        src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                        alt="student"
                        className="w-16 h-16 rounded-full object-cover"
                      />

                      <div>
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                        <p className="text-gray-600 text-sm">{item.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.courses?.length > 0 ? (
                        item.courses.map((courseId, i) => {
                          const course = courses.find(c => c.id === courseId);
                          return (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {course?.courseName || courseId}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-xs text-gray-500 italic">
                          No courses assigned
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <select
                        onChange={(e) => assignCourse(item.id, e.target.value, item.courses)}
                        disabled={assignId === item.id || availableCourses(item.courses).length === 0}
                        value=""
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded cursor-pointer disabled:bg-gray-400"
                      >
                        <option value="" disabled>
                          {availableCourses(item.courses).length === 0
                            ? 'No available courses'
                            : assignId === item.id
                              ? 'Assigning...'
                              : 'Assign Course'}
                        </option>
                        {availableCourses(item.courses).map((course) => (
                          <option key={course.id} value={course.id}>
                            {course.courseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Loading ...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudents;



