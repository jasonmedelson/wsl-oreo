// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from  'firebase/app';
import { getFirestore} from  'firebase/firestore';
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBESB9k_QcnlbJijkPrKyxSpLXwRgsWiC8",
  authDomain: "oreo-e75f9.firebaseapp.com",
  projectId: "oreo-e75f9",
  storageBucket: "oreo-e75f9.appspot.com",
  messagingSenderId: "14793746646",
  appId: "1:14793746646:web:1b134a4ab47beba022c177",
  measurementId: "G-0WD32BXHFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Storage
export const storage = getStorage(app);