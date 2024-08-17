// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-mate-app.firebaseapp.com",
  projectId: "pet-mate-app",
  storageBucket: "pet-mate-app.appspot.com",
  messagingSenderId: "484312950633",
  appId: "1:484312950633:web:eae6b5faa6cc05ed37fff8",
  measurementId: "G-RK6T1M73VH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);