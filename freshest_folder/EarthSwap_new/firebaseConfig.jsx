// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC47Sp1OlYWmGEK5tuAfLZfOS8tY_4rOHk",
  authDomain: "earthswapublic.firebaseapp.com",
  projectId: "earthswapublic",
  storageBucket: "earthswapublic.appspot.com",
  messagingSenderId: "605306622666",
  appId: "1:605306622666:web:0d441a99088dd26ad11a33",
  measurementId: "G-DLGLBEGCWR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
