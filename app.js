const { updateDNS } = require("./updateDNS");
const { getIP } = require("./getIP");

var oldIP = "";

setInterval(() => {
    getIP((ip) => {
        if ("" + oldIP !== "" + ip) {
            oldIP = ip;
            updateDNS(ip);
        }
    });
}, 120 * 1000);
