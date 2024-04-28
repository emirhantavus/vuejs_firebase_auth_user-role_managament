import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { LocalStorage } from "quasar";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Kullanıcı Firestore dokümanını kontrol et
    const userRef = doc(firestore, "users", user.uid);

    try {
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Kullanıcı daha önce Firestore'a eklenmemişse, dokümanı oluştur
        await setDoc(userRef, {
          email: user.email,
          // Diğer kullanıcı özel bilgileri buraya eklenir
        });
      }
    } catch (error) {
      console.error("Error checking/updating user document:", error);
    }

    LocalStorage.set("user", user);
  } else {
    LocalStorage.remove("user");
  }
});
