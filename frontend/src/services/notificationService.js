import { db } from "../configs/firebase";
import { doc,collection, addDoc,updateDoc, serverTimestamp } from "firebase/firestore";

export const sendNotification = async ({ recipientId, type, meta }) => {
  await addDoc(collection(db, "notifications"), {
    recipientId,
    type,
    meta, // custom info like OP name, request ID
    createdAt: serverTimestamp(),
    read: false
  });
};

export const updateNotification = async (documentId) => {
  try {
    const docRef = doc(db,"notifications",documentId);  //why this syntax differs from the prev one?
    await updateDoc(docRef, {
      // [fieldName]: newValue
      read:true
    });
    console.log("Notification updated successfully!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}



//where's the logic for fetch notification?