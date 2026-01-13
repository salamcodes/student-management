import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { secondaryAuth } from "../../config/firebase/secondaryFirebaseConfing";
import { db } from "../../config/firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addStudent } from "../../config/reducers/addStudentSlice";
import { doc, setDoc } from "firebase/firestore";


const AddStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState([])
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const dispatch = useDispatch()

  const add = async (e) => {
    e.preventDefault();

    try {

      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const newUser = userCredential.user;

      console.log("New student UID:", newUser.uid);


      const studentData = {
        uid: newUser.uid,
        name: name.trim(),
        email: email.trim(),
        role: "student",
        courses: [course],

      };


      await setDoc(doc(db, "users", newUser.uid), studentData);


      dispatch(addStudent(studentData));

      console.log("Student successfully created and saved");

      alert("Student registered successfully!");


    } catch (error) {
      console.error("Error creating student:", error);
      alert(error.message || "Failed to register student. Please try again.");
    }

    setName('')
    setEmail('')
    setPassword('')
    setCourse('')

  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Student</h1>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name"
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Student Email"
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
          />

          {/* Password */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Student Password"
            className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
          />

          {/* Assign Courses */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Assign Courses</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)} // <- correct handler
              placeholder="Enter course(s)"
              className="border p-2 rounded w-full"
            />
          </div>


          {/* Role */}
          <div className="mb-4">
            <label className="font-medium block mb-2 text-gray-800">Role</label>
            <input
              type="text"
              value='student'
              onChange={(e) => setRole(e.target.value)}
              readOnly
              className="border p-2 rounded w-full bg-gray-200 text-gray-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={add}
            className="w-full py-2 rounded-lg text-white font-semibold transition-all cursor-pointer"
            style={{
              background: "linear-gradient(90deg, #1F5FC4, #00A86B)"
            }}
          >
            Add Student
          </button>
        </div>
      </div>
    </div>

  );
};

export default AddStudent;
