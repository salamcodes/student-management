import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";


const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState('');
  const [duration, setDuration] = useState('');
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Add Course</h2>

        <div className="bg-white rounded-xl shadow-sm p-6 max-w-lg w-full">

          {/* Course Name */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter Course Name"
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Description</label>
            <textarea
              placeholder="Enter Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full resize-none focus:outline-none focus:ring focus:ring-gray-300"
              rows={3}
            />
          </div>

          {/* Enrolled Students */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Enrolled Students</label>
            <input
              type="number"
              value={enrolledStudents}
              onChange={(e) => setEnrolledStudents(e.target.value)}
              placeholder="Total Enrolled Students"
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Duration</label>
            <input
              type="text"
              placeholder="e.g. 3 Months, 12 Weeks"
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Submit Button */}
          <button
            className="bg-gray-900 text-white py-2 rounded w-full font-medium hover:bg-gray-800">
            Add Course
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddCourses;
