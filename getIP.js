const http = require("http");

function getIP(ipCallback) {
    http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
        resp.on("data", ipCallback);
    });
}

module.exports = { getIP };
