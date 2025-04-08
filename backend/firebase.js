// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQT-S_cl06NJpIwOEir5baU0ceocn1e0c",
  authDomain: "code-sockets.firebaseapp.com",
  projectId: "code-sockets",
  storageBucket: "code-sockets.firebasestorage.app",
  messagingSenderId: "697200006201",
  appId: "1:697200006201:web:af695c0ce9720b653fe9e8",
  measurementId: "G-63T9FC3CQF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore=getFirestore(app);



