import ccav from "./ccavutil.js";
import qs from "qs";
export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "https://www.creditklick.com");
  res.setHeader("Access-Control-Allow-Methods", "POST");

  if (req.method === "POST") {
    try {
      const body = req.body;
      const workingKey = "";
      const accessCode = "";

      const encRequest = ccav.encrypt(qs.stringify(body), workingKey);

      const formBody =
        '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' +
        encRequest +
        '"><input type="hidden" name="access_code" id="access_code" value="' +
        accessCode +
        '"><script language="javascript">document.redirect.submit();</script></form>';

      res.status(200).send(formBody);
    } catch (error) {
      console.error("Error processing request:", error);
      res.status(500).end();
    }
  } else {
    console.log("Method Not Allowed");
    res.status(405).end();
  }
}
