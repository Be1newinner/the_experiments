var admin = require("firebase-admin");

var serviceAccount = require("./../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shipsar-main-default-rtdb.firebaseio.com/",
});

async function signInWithPhoneNumber({ phoneNumber }) {
  if (!phoneNumber) {
    throw new Error("Phone number Error;");
  }

  try {
    const additionalClaims = {
      premiumAccount: false,
    };
    const user = await admin.auth().getUserByPhoneNumber(phoneNumber);
    const token = await admin
      .auth()
      .createCustomToken(user?.uid, additionalClaims);
    return { status: 200, user: { ...user, token }, error: null };
  } catch (error) {
    return { status: 401, user: null, error };
  }
}

async function VerifySignInOTP({ session, otp, phone }) {
  try {
    const response = await fetch(
      "http://msg.mtalkz.com/V2/http-verifysms-api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          apikey: "MJh1tfIJn9vDBREk",
          sessionid: session,
          otp: otp,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (data?.Status === "Success") {
      const user = await signInWithPhoneNumber({ phoneNumber: `+91${phone}` });
      return user;
    } else {
      return {
        error: data?.Details || "Validation Failed!",
        status: 401,
        user: null,
      };
    }
  } catch (error) {
    return { error: "Request failed", status: 402, data: null };
  }
}

exports.VerifySignInOTP = VerifySignInOTP;
