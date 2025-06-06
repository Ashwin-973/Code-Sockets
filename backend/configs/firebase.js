// import { getAnalytics } from "firebase/analytics";
import dotenv from 'dotenv'
import path from 'path'
import { __dirname } from '../envPath.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

dotenv.config({path:path.join(__dirname,".env"),debug:false});
const{FIREBASE_KEY}=process.env

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
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
const firestore=getFirestore(app);

export {firestore,__dirname}


