const https = require("https");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const authData = Buffer.from(
    process.env.username + ":" + process.env.password
).toString("base64");

console.log(process.env.user + "-----" + process.env.password);

const options = {
    hostname: "deinserverhost.de",
    port: 443,
    method: "GET",

    headers: {
        Authorization: "Basic " + authData,
    },
};

function updateDNS(newIP) {
    options.path = `/store/dyndns/?ipaddr=${newIP},&domain=manuellerchner.de&wildcard=0`;
    https
        .request(options, (res) => {
            console.log(options);

            res.on("data", (d) => {
                process.stdout.write(d);
                console.log("New ip: " + newIP);
            });
        })
        .end();
}

module.exports = { updateDNS };
