const ccav = require("./ccavutil.js");
const qs = require("querystring");

export default async function handler(request, response) {
  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = "",
    ccavPOST = "";

  request.on("data", function (data) {
    ccavEncResponse += data;
    ccavPOST = qs.parse(ccavEncResponse);
    var encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
  });

  request.on("end", function () {
    const resultObject = convertQueryStringToObject(ccavResponse.toString());
    try {
      console.log("CC => ", resultObject);
    } catch (error) {
      console.log(error);
    }

    switch (resultObject?.order_status) {
      case "Shipped": response.writeHeader(302, { "Content-Type": "text/html", "Location": "/transaction-success" });
        break;
      case "Successful": response.writeHeader(302, { "Content-Type": "text/html", "Location": "/transaction-success" });
        break;
      default: response.writeHeader(302, { "Content-Type": "text/html", "Location": "/transaction-failed" });
    }

    response.write(resultObject?.order_status);
    response.end();
  });
}


function convertQueryStringToObject(queryString) {
  const keyValuePairs = queryString.split("&");
  const result = {};

  keyValuePairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    if (key && value !== undefined) {
      result[key] = decodeURIComponent(value.replace(/\+/g, " "));
    }
  });

  return result;
}


// Aborted(transaction is cancelled by the User
// Auto - Cancelled(transaction has not confirmed within 12 days hence auto cancelled by system)
// Auto - Reversed(two identical transactions for same order number, both were successful at bank's end but we got response for only one of them, then next day during reconciliation we mark one of the transaction as auto reversed )

// Awaited(transaction is processed from billing shipping page but no response is received)
// Cancelled(transaction is cancelled by merchant)
// Chargeback()
// Invalid(Transaction sent to CCAvenue with Invalid parameters, hence could not be processed further)
// Fraud(we update this during recon, the amount is different at bank’s end and at CCAvenue due to tampering)

// Initiated(transaction just arrived on billing shipping page and not processed further)
// Refunded(Transaction is refunded.)
// Shipped(transaction is confirmed)
// Successful
// System refund(Refunded by CCAvenue for various findings of reversals by CCAvenue)
// Unsuccessful(transaction is not successful due to)
