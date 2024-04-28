// firebase-register.js
import { auth } from "./index.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loading, Notify } from "quasar";
import { registerUser } from "./firestore";

const register = async (data, role) => {
  try {
    Loading.show();

    // Firebase Authentication üzerinden kullanıcı kaydı
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Firestore'da kullanıcıyı kaydet ve rol ekleyin
    await registerUser(userCredential.user, data, role);

    // Kullanıcı profiline ismi ekleyin
    await updateProfile(userCredential.user, {
      displayName: data.first_name + " " + data.last_name,
    });

    Loading.hide();
    return userCredential.user;
  } catch (error) {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: error.message,
    });
    throw error;
  }
};

export default register;
