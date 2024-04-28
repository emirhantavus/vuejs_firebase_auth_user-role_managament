// src/services/UserService.js

import { firestore } from "src/firebase";

const setUserRole = async (uid, role) => {
  try {
    await firestore.collection("users").doc(uid).set({ role }, { merge: true });
    console.log("User role set successfully.");
  } catch (error) {
    console.error("Error setting user role:", error);
  }
};

const getUserRole = async (uid) => {
  try {
    const userDoc = await firestore.collection("users").doc(uid).get();
    if (userDoc.exists) {
      return userDoc.data().role;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
};

export { setUserRole, getUserRole };
