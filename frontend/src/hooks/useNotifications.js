//set's up a real time listener for unread notification by the current user
//keeps uI upadted without manual refresh

import { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"), 
      where("recipientId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) =>
        data.push({ id: doc.id, ...doc.data() })
      );
      setNotifications(data);
    });

    return () => unsubscribe();
  }, [userId]);

  return notifications;
};
