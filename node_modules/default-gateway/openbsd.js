"use strict";

const net = require("net");
const execa = require("execa");
const dests = ["default", "0.0.0.0", "0.0.0.0/0", "::", "::/0"];

const args = {
  v4: ["-rn", "-f", "inet"],
  v6: ["-rn", "-f", "inet6"],
};

const parse = stdout => {
  let result;

  (stdout || "").trim().split("\n").some(line => {
    const results = line.split(/ +/) || [];
    const target = results[0];
    const gateway = results[1];
    const iface = results[7];
    if (dests.indexOf(target) !== -1 && gateway && net.isIP(gateway)) {
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
  return execa.stdout("netstat", args[family]).then(stdout => {
    return parse(stdout);
  });
};

const sync = family => {
  const result = execa.sync("netstat", args[family]);
  return parse(result.stdout);
};

module.exports.v4 = () => promise("v4");
module.exports.v6 = () => promise("v6");

module.exports.v4.sync = () => sync("v4");
module.exports.v6.sync = () => sync("v6");
