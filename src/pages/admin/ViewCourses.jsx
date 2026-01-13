import React from "react";

import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const ViewCourses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Web Development",
      desc: "Learn HTML, CSS, JavaScript, and React.",
      duration: "3 Months",
      enrolled: 24,
      img: "https://via.placeholder.com/200x120",
    },
    {
      id: 2,
      title: "Computer Science Basics",
      desc: "Introduction to CS concepts and logic building.",
      duration: "2 Months",
      enrolled: 18,
      img: "https://via.placeholder.com/200x120",
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      desc: "Understand neural networks, ML and AI fundamentals.",
      duration: "4 Months",
      enrolled: 10,
      img: "https://via.placeholder.com/200x120",
    },
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => (
            <div
              key={c.id}
              className="bg-linear-to-r from-[#1F5FC4] to-[#00A86B] rounded-md shadow p-4 hover:shadow-lg transition flex flex-col"
            >
              {/* Image */}
              <img
                src={c.img}
                alt={c.title}
                className="rounded-md w-full h-40 sm:h-32 object-cover mb-3 border border-white"
              />

              {/* Title */}
              <h2 className="font-semibold text-lg text-white">{c.title}</h2>

              {/* Description */}
              <p className="text-sm text-white/90 mt-1">{c.desc}</p>

              {/* Duration & Enrolled */}
              <div className="mt-3 flex flex-col sm:flex-row justify-between text-sm text-white/90 font-medium gap-1 sm:gap-0">
                <span>Duration: {c.duration}</span>
                <span>Enrolled: {c.enrolled}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};

export default ViewCourses;
