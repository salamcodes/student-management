import React, { useEffect, useState } from 'react'
import { profileData } from '../services/singleDoc'
import { auth } from '../config/firebase/firebaseConfig'


const StudentProfile = () => {
    const [data, setData] = useState()

    useEffect(() => {
        const getData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const response = await profileData(user.uid);
            console.log(response)
            setData(response)

        };

        getData();
    }, []);
    if (!data) <h1>Loading...</h1>
    return (
        <>


            {data &&

            <div className="w-full max-w-md bg-white shadow-md rounded-lg p-5 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">Student Profile</h2>

                <div className="text-gray-700">
                    <p><span className="font-medium">Name:</span>{data.name} </p>
                    <p><span className="font-medium">Email:</span>{data.email} </p>
                    <p><span className="font-medium">User ID:</span>{data.uid} </p>
                    <p><span className="font-medium">Role:</span>{data.role} </p>
                </div>
            </div> 

            }
        </>
    )
}

export default StudentProfile
