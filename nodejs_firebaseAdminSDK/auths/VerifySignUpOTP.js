var admin = require("firebase-admin");

async function isPhoneNumberTaken(phoneNumber) {
  try {
    const userRecord = await admin.auth().getUserByPhoneNumber(phoneNumber);
    return userRecord !== null;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return false;
    }
  }
}

async function signUpWithPhone({ phoneNumber, displayName = "" }) {
  if (!phoneNumber) return;
  try {
    const isTaken = await isPhoneNumberTaken(phoneNumber);

    if (!isTaken) {
      const additionalClaims = {
        premiumAccount: false,
      };
      const user = await admin.auth().createUser({ phoneNumber, displayName });
      const token = await admin
        .auth()
        .createCustomToken(user?.uid, additionalClaims);
      return { status: 200, user: { ...user, token }, error: null };
    } else return { status: 402, user: null, error: "User Already Exists!" };
  } catch (error) {
    return { status: 401, user: null, error };
  }
}

async function VerifySignUpOTP({ session, otp, phone, name = "" }) {
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
      const user = await signUpWithPhone({
        phoneNumber: `+91${phone}`,
        displayName: name,
      });
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

exports.VerifySignUpOTP = VerifySignUpOTP;
