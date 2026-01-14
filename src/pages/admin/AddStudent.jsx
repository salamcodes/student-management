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
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

  
  <Sidebar />

  {/* Main Content */}
  <div className="flex-1 p-4 md:p-6">

    
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-3">
      <h1 className="text-2xl font-semibold text-gray-900">Add Student</h1>
    </div>

    {/* Form */}
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">

      
      <input
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
      />

      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Student Email"
        required
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
      />

      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Student Password"
        required
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:border-indigo-600"
      />

      
      <div className="mb-4">
        <label className="font-medium block mb-2 text-gray-800">Assign Courses</label>
        <input
          type="text"
          value={course}
          required
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter course(s)"
          className="border p-2 rounded w-full"
        />
      </div>

      
      <div className="mb-4">
        <label className="font-medium block mb-2 text-gray-800">Role</label>
        <input
          type="text"
          value="student"
          readOnly
          className="border p-2 rounded w-full bg-gray-200 text-gray-600"
        />
      </div>

      
      <button
        type="submit"
        onClick={add}
        className="w-full py-2 rounded-lg text-white font-semibold transition-all cursor-pointer bg-linear-to-r from-[#1F5FC4] to-[#00A86B] hover:opacity-90"
      >
        Add Student
      </button>
    </div>
  </div>
</div>


  );
};

export default AddStudent;
