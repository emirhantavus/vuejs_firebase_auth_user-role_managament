// firestore.js
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const registerUser = async (user, userData, role) => {
  try {
    const db = getFirestore();
    const usersCollection = collection(db, "users");

    // Belge kimliği olarak kullanıcı UID'sini kullan
    const docRef = doc(usersCollection, user.uid);

    // Belgeyi oluştur veya güncelle
    await setDoc(
      docRef,
      {
        uid: user.uid,
        email: user.email,
        roles: "member",
      },
      { merge: true }
    ); // merge: true, belge varsa sadece güncelleme yapar

    // Oluşturulan veya güncellenen belgeyi oku
    const userDocSnapshot = await getDoc(docRef);
    return userDocSnapshot; // Eklenen veya güncellenen belgenin snapshot'ını döndür
  } catch (error) {
    throw error;
  }
};
