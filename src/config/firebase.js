// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC17xOCHDmN1xX5f3AUFJQS_ek5JDuisIo",
  authDomain: "vite-contact-7de6f.firebaseapp.com",
  projectId: "vite-contact-7de6f",
  storageBucket: "vite-contact-7de6f.appspot.com",
  messagingSenderId: "779456791597",
  appId: "1:779456791597:web:947467a5f5cb57c46764a4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 