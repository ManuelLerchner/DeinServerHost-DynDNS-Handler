const { updateDNS } = require("./updateDNS");
const { getIP } = require("./getIP");

var oldIP = "";

setInterval(() => {
    getIP((ip) => {
        if (ip != oldIP) {
            oldIP = ip;
            updateDNS(ip);
        }
    });
}, 120 * 1000);
