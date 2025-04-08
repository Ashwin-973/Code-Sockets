import express from "express"
import { createUser } from "../controllers/userController.js"
// Import Firebase modules
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../firebase.js'; // Your existing firebase config
const router=express.Router()

router.get("/",createUser)


router.get("/fs-init",async function addNewDocument() {
    try {
      // This creates the collection if it doesn't exist
      const docRef = await addDoc(collection(firestore, "request_notifications"), {
        request_id: "1",
        user_id: "auth0|thecoinflip",
        event_type:"new_request",
        solution_id:"5",
        timestamp: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (err) {
      console.error("Error adding document: ", err);
      throw err;
    }
  }
  )



export default router