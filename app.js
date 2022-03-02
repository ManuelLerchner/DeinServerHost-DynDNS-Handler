const http = require("http");
const https = require("https");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const authData = Buffer.from(
    process.env.username + ":" + process.env.password
).toString("base64");

var updateDNS = (publicIP) => {
    const options = {
        hostname: "deinserverhost.de",
        port: 443,
        path: `/store/dyndns/?ipaddr=${publicIP},&domain=manuellerchner.de&wildcard=0`,
        method: "GET",

        headers: {
            Authorization: "Basic " + authData,
        },
    };

    const req = https.request(options, (res) => {
        console.log(options);

        res.on("data", (d) => {
            process.stdout.write(d);
            console.log("New ip: " + publicIP);
        });
    });

    req.end();
};

http.get({ host: "api.ipify.org", port: 80, path: "/" }, function (resp) {
    resp.on("data", function (ip) {
        updateDNS(ip);
    });
});
