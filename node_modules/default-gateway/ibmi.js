"use strict";

const execa = require("execa");

const db2util = "/QOpenSys/pkgs/bin/db2util";
const sql = "select NEXT_HOP, LOCAL_BINDING_INTERFACE from QSYS2.NETSTAT_ROUTE_INFO where ROUTE_TYPE='DFTROUTE' and NEXT_HOP!='*DIRECT' and CONNECTION_TYPE=?";

const parse = stdout => {
  let result;
  try {
    const resultObj = JSON.parse(stdout);
    const gateway = resultObj.records[0].NEXT_HOP;
    const iface = resultObj.records[0].LOCAL_BINDING_INTERFACE;
    result = {gateway, iface};
  } catch (err) {}
  if (!result) {
    throw new Error("Unable to determine default gateway");
  }
  return result;
};

const promise = family => {
  return execa.stdout(db2util, [sql, "-p", family, "-o", "json"]).then(stdout => parse(stdout));
};

const sync = family => {
  const {stdout} = execa.sync(db2util, [sql, "-p", family, "-o", "json"]);
  return parse(stdout);
};

module.exports.v4 = () => promise("IPV4");
module.exports.v6 = () => promise("IPV6");

module.exports.v4.sync = () => sync("IPV4");
module.exports.v6.sync = () => sync("IPV6");
