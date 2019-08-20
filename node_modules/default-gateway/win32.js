"use strict";

const execa = require("execa");
const ipRegex = require("ip-regex");

const gwArgs = "path Win32_NetworkAdapterConfiguration where IPEnabled=true get DefaultIPGateway,Index /format:table".split(" ");
const ifArgs = "path Win32_NetworkAdapter get Index,NetConnectionID /format:table".split(" ");

const parse = (gwTable, ifTable, family) => {
  let gateway, gwid, result;

  (gwTable || "").trim().split("\n").splice(1).some(line => {
    const results = line.trim().split(/} +/) || [];
    const gw = results[0];
    const id = results[1];
    gateway = (ipRegex[family]().exec((gw || "").trim()) || [])[0];
    if (gateway) {
      gwid = id;
      return true;
    }
  });

  (ifTable || "").trim().split("\n").splice(1).some(line => {
    const i = line.indexOf(" ");
    const id = line.substr(0, i).trim();
    const name = line.substr(i + 1).trim();
    if (id === gwid) {
      result = {gateway, interface: name ? name : null};
      return true;
    }
  });

  if (!result) {
    throw new Error("Unable to determine default gateway");
  }

  return result;
};

const spawnOpts = {
  windowsHide: true,
};

const promise = family => {
  return Promise.all([
    execa.stdout("wmic", gwArgs, spawnOpts),
    execa.stdout("wmic", ifArgs, spawnOpts),
  ]).then(results => {
    const gwTable = results[0];
    const ifTable = results[1];

    return parse(gwTable, ifTable, family);
  });
};

const sync = family => {
  const gwTable = execa.sync("wmic", gwArgs, spawnOpts).stdout;
  const ifTable = execa.sync("wmic", ifArgs, spawnOpts).stdout;

  return parse(gwTable, ifTable, family);
};

module.exports.v4 = () => promise("v4");
module.exports.v6 = () => promise("v6");

module.exports.v4.sync = () => sync("v4");
module.exports.v6.sync = () => sync("v6");
