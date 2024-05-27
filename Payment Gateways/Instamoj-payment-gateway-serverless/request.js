export default async function query(req, res) {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set("purpose", "REFINE_149");
    encodedParams.set("amount", "149");
    encodedParams.set("buyer_name", req?.body?.name);
    encodedParams.set("email", req?.body?.email);
    encodedParams.set("phone", req?.body?.mobile);
    encodedParams.set("allow_repeated_payments", false);
    encodedParams.set("redirect_url", "https://creditklick.com/transaction");

    const token = req?.body?.token;

    const response = await fetch(
      "https://api.instamojo.com/v2/payment_requests/",
      {
        method: "POST",
        body: encodedParams,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "https://www.creditklick.com", // Set the allowed origin
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      res.status(response.status).json({ error: errorMessage });
    } else {
      const responseData = await response.json();
      res.status(200).json(responseData);
    }
  } catch (error) {
    res
      .status(error.status || 8000)
      .json({ msg: "Request failed with: " + error.message });
  }
}
