// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "studio-8254732135-a1350",
  appId: "1:724642420764:web:9681239aa28104742367d9",
  apiKey: "AIzaSyBaECQ1EmM-dpuQRQfkt7e9-AUaXXqpMlA",
  authDomain: "studio-8254732135-a1350.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "724642420764"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
