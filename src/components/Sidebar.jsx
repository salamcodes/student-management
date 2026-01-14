import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase/firebaseConfig";
import { signOut } from "firebase/auth";


const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const logOut = () => {

        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
            alert(error)
        });
    }

    return (
        <>
            <div className="md:hidden flex items-center justify-between bg-[#1F5FC4] text-white p-4">
                <span className="text-lg font-semibold">LearnSync</span>
                <button onClick={() => setOpen(!open)}>☰</button>
            </div>


            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-10 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <div
                className={`fixed md:static top-0 left-0 w-64 bg-[#1F5FC4] text-white h-screen p-4 z-20
       transform transition-transform duration-300
       ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-xl font-semibold">LearnSync</span>
                </div>

                <nav className="flex flex-col gap-3">
                    <Link to="/" className="hover:bg-[#00A86B] p-2 rounded transition-colors">
                        Dashboard
                    </Link>
                    <Link to="/students" className="hover:bg-[#00A86B] p-2 rounded transition-colors">
                        Students
                    </Link>
                    <Link to="/courses" className="hover:bg-[#00A86B] p-2 rounded transition-colors">
                        Courses
                    </Link>
                </nav>

                <button
                    onClick={logOut}
                    className="mt-8 bg-[#00A86B] hover:bg-[#007F50] p-2 rounded text-sm font-medium transition-colors cursor-pointer">
                    Logout
                </button>
            </div>
        </>

    );
};

export default Sidebar;
