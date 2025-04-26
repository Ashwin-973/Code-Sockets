import express from "express"
import { createUser, getUser } from "../controllers/userController.js"
// Import Firebase modules
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../configs/firebase.js'; // Your existing firebase config
const router=express.Router()

router.get("/",getUser)
router.post("/",createUser)



export default router