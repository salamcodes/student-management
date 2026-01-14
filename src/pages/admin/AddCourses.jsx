import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { db } from "../../config/firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";



const AddCourses = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');

  const [duration, setDuration] = useState('');

  const courseData = {
    courseName,
    Description: description.trim(),

    Duration: duration
  }
  const courseAdd = async (e) => {
    e.preventDefault()

    try {
      const docRef = await addDoc(collection(db, "courses"), courseData
      );
      console.log("Document written with ID: ", docRef.id);
      alert('Course added successfully')

    } catch (e) {
      console.error("Error adding document: ", e);
    }

    setCourseName('');
    setDescription('');
    setDuration('')
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto">

        <h2 className="text-2xl font-semibold mb-6 text-[#1F5FC4]">
          Add Course
        </h2>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 max-w-lg w-full mx-auto">

          {/* Course Name */}
          <div className="mb-4">
            <label className="font-medium block mb-1 text-gray-800">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter Course Name"
              className="border p-2 rounded w-full focus:ring-2 focus:ring-[#1F5FC4]/50 outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="font-medium block mb-1 text-gray-800">Description</label>
            <textarea
              placeholder="Enter Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full resize-none focus:ring-2 focus:ring-[#1F5FC4]/50 outline-none"
              rows={3}
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="font-medium block mb-1 text-gray-800">Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 3 Months, 12 Weeks"
              className="border p-2 rounded w-full focus:ring-2 focus:ring-[#1F5FC4]/50 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={courseAdd}
            className="w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-[#1F5FC4] to-[#00A86B] hover:opacity-90 transition cursor-pointer"
          >
            Add Course
          </button>
        </div>
      </div>
    </div>

  );
};

export default AddCourses;
