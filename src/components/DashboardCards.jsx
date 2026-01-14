import { useSelector } from 'react-redux'


const DashboardCards = () => {
    const students = useSelector(state => state.student.students)
    const courses = useSelector(state => state.course.course)


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            
            <div className="p-5 rounded-lg shadow bg-linear-to-r from-[#1F5FC4] to-[#00A86B] text-white border border-transparent">
                <p className="text-white text-sm">Total Students</p>
                <h2 className="text-3xl font-semibold mt-1">{students.length}</h2>
            </div>

           
            <div className="p-5 rounded-lg shadow bg-linear-to-r from-[#1F5FC4] to-[#00A86B] text-white border border-transparent">
                <p className="text-white text-sm">Total Courses</p>
                <h2 className="text-3xl font-semibold mt-1">{courses.length}</h2>
            </div>

            
            <div className="p-5 rounded-lg shadow bg-linear-to-r from-[#1F5FC4] to-[#00A86B] text-white border border-transparent">
                <p className="text-white text-sm">Admin</p>
                <h2 className="text-2xl font-semibold mt-1">Abdul Salam</h2>
            </div>
        </div>

    );
};

export default DashboardCards;
