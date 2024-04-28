<template>
  <div>
    <h3>User Email: {{ userEmail }}</h3>
    <h3>User Role: {{ userRole }}</h3>

    <h4>Your Permissions:</h4>
    <ul>
      <li v-for="permission in userPermissions" :key="permission">
        {{ permission }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      userEmail: null,
      userRole: null,
      userPermissions: [],
    };
  },
  created() {
    const auth = getAuth(this.$fireApp);

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userEmail = user.email;

        // Firestore'dan sadece roles bilgisini al
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();

            // Kullanıcının rollerini kontrol et
            if (userData.roles) {
              if (userData.roles.length > 0) {
                this.userRole = userData.roles;
                this.setUserPermissions(this.userRole);
                console.log("User Role:", this.userRole);
              } else {
                console.error("User has an empty roles array in Firestore");
              }
            } else {
              console.error("User roles information not found in Firestore");
            }
          } else {
            console.error("User document not found in Firestore");
          }
        } catch (error) {
          console.error("Error getting user document:", error.message);
        }
      }
    });
  },
  methods: {
    setUserPermissions(role) {
      // Yetkileri belirleme, role göre uygun yetkileri ata
      switch (role) {
        case "admin":
          this.userPermissions = [
            "Create User",
            "Edit User",
            "Delete User",
            "Manage Roles",
          ];
          break;
        case "moderator":
          this.userPermissions = ["Edit Comments", "Delete Comments"];
          break;
        case "author":
          this.userPermissions = ["Write Posts", "Edit Posts", "Delete Posts"];
          break;
        case "member":
          this.userPermissions = ["View Content", "Comment on Posts"];
          break;
        default:
          this.userPermissions = [];
      }
    },
  },
};
</script>
