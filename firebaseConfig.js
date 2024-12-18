// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyk43iwwKq7trBaNAmWQ0GZwG5-eOj_MM",
  authDomain: "myosteoapp.firebaseapp.com",
  projectId: "myosteoapp",
  storageBucket: "myosteoapp.firebasestorage.app",
  messagingSenderId: "1032560309469",
  appId: "1:1032560309469:web:e0dfdb804ebba4ce565734",
  measurementId: "G-VXPQDCB8CG",
};

// Initialize Firebase only if no apps are initialized
const firebase_app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firestore database object
const db = getFirestore(firebase_app);

export const firebase_auth = getAuth(firebase_app);

export { firebase_app, db };