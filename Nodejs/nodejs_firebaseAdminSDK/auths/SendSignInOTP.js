async function SendSignInOTP({ phone }) {
  try {
    const response = await fetch(
      "https://msg.mtalkz.com//V2/http-api-sms.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          apikey: "MJh1tfIJn9vDBREk",
          senderid: "CKLICK",
          number: phone,
          message:
            "Dear Customer, Your OTP for sign in on CreditKlick is {OTP}. \n-CreditKlick",
          format: "json",
          digit: "6",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log("Res Mta S1", JSON.stringify(data));
    return {
      error: null,
      status: data?.Status === "Success" ? 200 : 401,
      data: data?.Details || null,
    };
  } catch (error) {
    console.error("Request Error:", error);
    return { error: "Request failed", status: 401, data: null };
  }
}

exports.SendSignInOTP = SendSignInOTP;
