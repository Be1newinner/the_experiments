var admin = require("firebase-admin");

var serviceAccount = require("./shipsarServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shipsar-main-default-rtdb.firebaseio.com/",
});

const phoneNumber = "+918130506283";
const otp = 123456;

async function isPhoneNumberTaken(phoneNumber) {
  try {
    const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
    return userRecord !== null;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return false;
    } else {
      throw error;
    }
  }
}

async function signUpWithPhoneNumber({ phoneNumber, otp }) {
  if (!phoneNumber) return;
  try {
    const isTaken = await isPhoneNumberTaken(phoneNumber);

    if (!isTaken) {
      // Create or update user in Firebase Authentication
      const user = await admin
        .auth()
        .createUser({ phoneNumber, displayName: "Vijay" });
      console.log("User created:", user.uid);

      // Additional logic if needed

      return user;
    } else {
      throw new Error("Phone number is already taken");
    }
  } catch (error) {
    throw error;
  }
}

// signUpWithPhoneNumber({ phoneNumber })
//   .then((user) => {
//     console.log("User signed up:", user);
//   })
//   .catch((error) => {
//     console.error("Error signing up:", error.message);
//   });
