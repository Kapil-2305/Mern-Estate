// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-5a618.firebaseapp.com",
  projectId: "mern-estate-5a618",
  storageBucket: "mern-estate-5a618.appspot.com",
  messagingSenderId: "891503499456",
  appId: "1:891503499456:web:7f440ca6aa140669c47525"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);