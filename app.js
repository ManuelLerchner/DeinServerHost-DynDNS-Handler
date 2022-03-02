const { updateDNS } = require("./updateDNS");
const { getIP } = require("./getIP");

var oldIP = "";

setInterval(() => {
    getIP((ip) => {
        if (ip != oldIP) {
            oldIP = ip;

            updateDNS(ip);

            console.log("Updated to: " + ip);
        }
    });
}, 60 * 1000);

// a function that opens the browser
