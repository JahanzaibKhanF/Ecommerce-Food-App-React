// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvSPqK9FAD1MiRiSUG_eAwcJXlhxWi7So",
  authDomain: "reactecommerce-c37c0.firebaseapp.com",
  projectId: "reactecommerce-c37c0",
  storageBucket: "reactecommerce-c37c0.appspot.com",
  messagingSenderId: "656554506819",
  appId: "1:656554506819:web:028a3da7503be83192b2f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const authentication = getAuth(app);
export const firestore = getFirestore(app);