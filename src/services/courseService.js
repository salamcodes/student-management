import { db } from "../config/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function fetchCourseData() {

    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });

console.log(querySnapshot)
}

fetchCourseData()