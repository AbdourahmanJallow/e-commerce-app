// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAllwt_2ww3M9QCCPhvVZOKUwXXPXZ2P0E",
    authDomain: "e-commerce-a353d.firebaseapp.com",
    projectId: "e-commerce-a353d",
    storageBucket: "e-commerce-a353d.appspot.com",
    messagingSenderId: "175876333909",
    appId: "1:175876333909:web:8ac26ac11fa5b4096e8fdc"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();

