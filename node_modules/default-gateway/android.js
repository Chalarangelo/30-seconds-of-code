"use strict";

const net = require("net");
const execa = require("execa");

const args = {
  v4: ["-4", "r"],
  v6: ["-6", "r"],
};

const parse = stdout => {
  let result;

  (stdout || "").trim().split("\n").some(line => {
    const results = /default via (.+?) dev (.+?)( |$)/.exec(line) || [];
    const gateway = results[1];
    const iface = results[2];
    if (gateway && net.isIP(gateway)) {
      result = {gateway, interface: (iface ? iface : null)};
      return true;
    }
  });

  if (!result) {
    throw new Error("Unable to determine default gateway");
  }

  return result;
};

const promise = family => {
  return execa.stdout("ip", args[family]).then(stdout => {
    return parse(stdout);
  });
};

const sync = family => {
  const result = execa.sync("ip", args[family]);
  return parse(result.stdout);
};

module.exports.v4 = () => promise("v4");
module.exports.v6 = () => promise("v6");

module.exports.v4.sync = () => sync("v4");
module.exports.v6.sync = () => sync("v6");
