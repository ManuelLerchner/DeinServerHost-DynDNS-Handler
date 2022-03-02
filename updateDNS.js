const https = require("https");
const dotenv = require("dotenv");
const moment = require("moment");

dotenv.config({ path: "./config/.env" });

const authData = Buffer.from(
    process.env.username + ":" + process.env.password
).toString("base64");

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
            res.on("data", (resp) => {
                console.log(
                    moment().utc().format("Y-M-D H:M:S") +
                        "\t\t" +
                        resp +
                        ", Updated to: " +
                        newIP
                );
            });
        })
        .end();
}

module.exports = { updateDNS };
