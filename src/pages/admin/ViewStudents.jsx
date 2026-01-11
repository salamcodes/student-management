import React from "react";
import Sidebar from "../../components/Sidebar";


const ViewStudents = () => {
  const students = [
    {
      id: 1,
      name: "Ali Raza",
      email: "ali@example.com",
      courses: ["Math", "Physics", "English"],
      img: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima@example.com",
      courses: ["Biology", "Chemistry"],
      img: "https://via.placeholder.com/80",
    },
    {
      id: 3,
      name: "Abdul Salam",
      email: "abdul@example.com",
      courses: ["Math", "Computer", "Programming", "English"],
      img: "https://via.placeholder.com/80",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row">
     <Sidebar />

      <div className="flex-1 p-6 md:ml-64 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Students</h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
            + Add Student
          </button>
        </div>

        {/* Students Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-6">
          {students.map((student) => (
            <div
              key={student.id}
              className="bg-white border rounded-lg shadow p-4 flex gap-4 items-start"
            >
              <img
                src={student.img}
                alt="student"
                className="w-16 h-16 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <h2 className="font-semibold text-lg">{student.name}</h2>
                <p className="text-gray-600 text-sm">{student.email}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {student.courses.map((course, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ViewStudents;
