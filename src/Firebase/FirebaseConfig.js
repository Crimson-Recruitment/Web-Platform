// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdjdELUU4lZxJDtLR8Bjrt5DMRoXJzPCk",
  authDomain: "jade-recruitment.firebaseapp.com",
  projectId: "jade-recruitment",
  storageBucket: "jade-recruitment.appspot.com",
  messagingSenderId: "667361905513",
  appId: "1:667361905513:web:8965d938c3349347498bf8",
  measurementId: "G-D2KVB5DSC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getStorage(app);
