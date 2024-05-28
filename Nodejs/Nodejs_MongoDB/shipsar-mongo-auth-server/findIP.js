var http = require("http");

http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
  resp.on("data", function (ip) {
    console.log("My public IP address is: " + ip);
  });
});
