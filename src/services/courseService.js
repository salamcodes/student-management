import { db } from "../config/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function fetchCourseData() {

    const snapshot = await getDocs(collection(db, "courses"));

    const courses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return courses
}

