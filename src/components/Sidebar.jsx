import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden flex items-center justify-between bg-[#1F5FC4] text-white p-4">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">LearnSync</span>
                </div>
                <button onClick={() => setOpen(!open)} className="text-white">
                    ☰
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`${open ? "block" : "hidden"} md:block w-64 bg-[#1F5FC4] text-white h-screen p-4 fixed md:static z-20`}
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

                <button className="mt-8 bg-[#00A86B] hover:bg-[#007F50] p-2 rounded text-sm font-medium transition-colors">
                    Logout
                </button>
            </div>

        </>
    );
};

export default Sidebar;
