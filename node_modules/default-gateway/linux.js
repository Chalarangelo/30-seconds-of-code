"use strict";

const net = require("net");
const os = require("os");
const execa = require("execa");

const args = {
  v4: ["-4", "r"],
  v6: ["-6", "r"],
};

const parse = (stdout, family) => {
  let result;

  (stdout || "").trim().split("\n").some(line => {
    const results = /default( via .+?)?( dev .+?)( |$)/.exec(line) || [];
    const gateway = (results[1] || "").substring(5);
    const iface = (results[2] || "").substring(5);
    if (gateway && net.isIP(gateway)) { // default via 1.2.3.4 dev en0
      result = {gateway, interface: (iface ? iface : null)};
      return true;
    } else if (iface && !gateway) { // default via dev en0
      const interfaces = os.networkInterfaces();
      const addresses = interfaces[iface];
      if (!addresses || !addresses.length) return;

      addresses.some(addr => {
        if (addr.family.substring(2) === family && net.isIP(addr.address)) {
          result = {gateway: addr.address, interface: (iface ? iface : null)};
          return true;
        }
      });
    }
  });

  if (!result) {
    throw new Error("Unable to determine default gateway");
  }

  return result;
};

const promise = family => {
  return execa.stdout("ip", args[family]).then(stdout => {
    return parse(stdout, family);
  });
};

const sync = family => {
  const result = execa.sync("ip", args[family]);
  return parse(result.stdout, family);
};

module.exports.v4 = () => promise("v4");
module.exports.v6 = () => promise("v6");

module.exports.v4.sync = () => sync("v4");
module.exports.v6.sync = () => sync("v6");
