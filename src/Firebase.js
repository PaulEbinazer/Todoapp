// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzfA2RFJtrz0GySiBudlpFNqcjmB-n7nA",
  authDomain: "todo-205d7.firebaseapp.com",
  projectId: "todo-205d7",
  storageBucket: "todo-205d7.firebasestorage.app",
  messagingSenderId: "806551142178",
  appId: "1:806551142178:web:02f5f366b72777c8c9af7b",
  measurementId: "G-R6N2GKLMQM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app) 