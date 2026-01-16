import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase/firebaseConfig";

export async function profileData(uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
}