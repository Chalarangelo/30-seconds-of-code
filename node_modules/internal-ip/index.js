'use strict';
const os = require('os');
const defaultGateway = require('default-gateway');
const ipaddr = require('ipaddr.js');

function findIp(gateway) {
	const interfaces = os.networkInterfaces();
	const gatewayIp = ipaddr.parse(gateway);
	let ip;

	// Look for the matching interface in all local interfaces
	Object.keys(interfaces).some(name => {
		return interfaces[name].some(addr => {
			const prefix = ipaddr.parse(addr.netmask).prefixLengthFromSubnetMask();
			const net = ipaddr.parseCIDR(`${addr.address}/${prefix}`);

			if (net[0] && net[0].kind() === gatewayIp.kind() && gatewayIp.match(net)) {
				ip = net[0].toString();
			}

			return Boolean(ip);
		});
	});

	return ip;
}

function promise(family) {
	return defaultGateway[family]().then(result => {
		return findIp(result.gateway) || null;
	}).catch(() => null);
}

function sync(family) {
	try {
		const result = defaultGateway[family].sync();
		return findIp(result.gateway) || null;
	} catch (error) {
		return null;
	}
}

const internalIp = {};
internalIp.v6 = () => promise('v6');
internalIp.v4 = () => promise('v4');
internalIp.v6.sync = () => sync('v6');
internalIp.v4.sync = () => sync('v4');

module.exports = internalIp;
// TODO: Remove this for the next major release
module.exports.default = internalIp;
