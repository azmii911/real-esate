// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "auth-app-6d45e.firebaseapp.com",
  projectId: "auth-app-6d45e",
  storageBucket: "auth-app-6d45e.appspot.com",
  messagingSenderId: "78542802913",
  appId: "1:78542802913:web:4176e315a3905a6c48cca0",
};

// Initialize Firebase
export const {app} = initializeApp(firebaseConfig);
