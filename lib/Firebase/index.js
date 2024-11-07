// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDSOtgVZlLI0QIqvL-cATHTla_q8fRFPA",
  authDomain: "expense-tracker-6beb4.firebaseapp.com",
  projectId: "expense-tracker-6beb4",
  storageBucket: "expense-tracker-6beb4.firebasestorage.app",
  messagingSenderId: "25663749376",
  appId: "1:25663749376:web:344b0e37ce4c9cd8c147e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}