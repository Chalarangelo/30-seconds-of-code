'use strict';
const {builtinModules} = require('module');

const blacklist = [
	'sys'
];

// eslint-disable-next-line node/no-deprecated-api
module.exports = (builtinModules || Object.keys(process.binding('natives')))
	.filter(x => !/^_|^(internal|v8|node-inspect)\/|\//.test(x) && !blacklist.includes(x))
	.sort();
