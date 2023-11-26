// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb1PRprp28EVNMBKPlAae_lPWQQzRY19k",
  authDomain: "crimson-recruitment.firebaseapp.com",
  projectId: "crimson-recruitment",
  storageBucket: "crimson-recruitment.appspot.com",
  messagingSenderId: "269478682183",
  appId: "1:269478682183:web:177644d7037edd8f8b9b62",
  measurementId: "G-FNYW63C6H9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getStorage(app);
