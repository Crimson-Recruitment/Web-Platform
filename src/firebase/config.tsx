// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBdf0wCaK-kEpkFO1XaNWi8fAlDjHB5Hw",
  authDomain: "jade-recruitment-44414.firebaseapp.com",
  projectId: "jade-recruitment-44414",
  storageBucket: "jade-recruitment-44414.appspot.com",
  messagingSenderId: "388064794014",
  appId: "1:388064794014:web:59559959e12188f84df28f",
  measurementId: "G-58PDW2E88D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getStorage(app);