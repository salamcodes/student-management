// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA0-aMcy6b8yLr6Ik86x1pWpQLKUYW_hO4",
    authDomain: "student-management-syste-ba5d2.firebaseapp.com",
    projectId: "student-management-syste-ba5d2",
    storageBucket: "student-management-syste-ba5d2.firebasestorage.app",
    messagingSenderId: "1081798957636",
    appId: "1:1081798957636:web:c664e8c7d1da295cc27a11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)