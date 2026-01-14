import React, { useEffect } from "react";
import { fetchCourseData } from "../../services/courseService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../config/reducers/courseSlice";

const ViewCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const selector = useSelector(state => state.course.course)
  console.log(selector)


  useEffect(() => {

    const getData = async () => {
      const course = await fetchCourseData()
      dispatch(addCourse(course))
    }

    getData()
  }, [])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
          <h1 className="text-xl font-semibold text-[#1F5FC4]">Courses</h1>

          <button
            onClick={() => navigate("/courses/AddCourses")}
            className="bg-linear-to-r from-[#1F5FC4] to-[#00A86B] text-white px-4 py-2 rounded font-medium cursor-pointer hover:opacity-90 transition"
          >
            + Add Course
          </button>
        </div>

        {/* Course Cards Grid */}

        {
          selector?.length > 0 ? (
            selector.map((item) => {
              return <div
                key={item.id}
                className="bg-linear-to-r from-[#1F5FC4] to-[#00A86B] rounded-md shadow p-4 hover:shadow-lg transition flex flex-col m-2"
              >

                {/* Title */}
                <h2 className="font-semibold text-lg text-white">{item.courseName}</h2>

                {/* Description */}
                <p className="text-sm text-white/90 mt-1">{item.Description}</p>

                {/* Duration & Enrolled */}
                <div className="mt-3 flex flex-col sm:flex-row justify-between text-sm text-white/90 font-medium gap-1 sm:gap-0">
                  <span>Duration: {item.Duration}</span>
                  <span>Enrolled: 20</span>
                </div>
              </div>
            })
          ) : (<h1>Loading ...</h1>)
        }

      </div>
    </div>


  );
};

export default ViewCourses;
