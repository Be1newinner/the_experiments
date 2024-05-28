export const getURLFromHash = async ({
  key,
  txnid,
  amount,
  productinfo,
  firstname,
  phone,
  email,
  surl,
  furl,
  hashed,
}) => {
  try {
    const formData = new URLSearchParams();
    formData.append("key", key);
    formData.append("txnid", txnid);
    formData.append("amount", amount);
    formData.append("productinfo", productinfo);
    formData.append("firstname", firstname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("surl", surl);
    formData.append("furl", furl);
    formData.append("hash", hashed);

    const response = await fetch(
      "https://pay.easebuzz.in/payment/initiateLink",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
    return;
  }
};
