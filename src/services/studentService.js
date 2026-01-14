import { db } from "../config/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";



export async function fetchStudentData() {

    const q = query(
        collection(db, "users"),
        where('role', '==', 'student'),

    );
    const snapshot = await getDocs(q);

    const studentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return studentData
}