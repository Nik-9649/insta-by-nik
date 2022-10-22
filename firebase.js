// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY7iGzWyKniyQEYJJyLk9_u1C3-lwr4DQ",
  authDomain: "insta-by-nik.firebaseapp.com",
  projectId: "insta-by-nik",
  storageBucket: "insta-by-nik.appspot.com",
  messagingSenderId: "168668067856",
  appId: "1:168668067856:web:8a997521109958b4847295",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
