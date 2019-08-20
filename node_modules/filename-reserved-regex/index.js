'use strict';
/* eslint-disable no-control-regex */
// TODO: remove parens when Node.js 6 is targeted. Node.js 4 barfs at it.
module.exports = () => (/[<>:"\/\\|?*\x00-\x1F]/g);
module.exports.windowsNames = () => (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i);
