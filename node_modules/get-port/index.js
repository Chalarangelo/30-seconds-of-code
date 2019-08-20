'use strict';
const net = require('net');

const getPort = options => new Promise((resolve, reject) => {
	// For backwards compatibility with number-only input
	// TODO: Remove this in the next major version
	if (typeof options === 'number') {
		options = {
			port: options
		};
	}

	const server = net.createServer();

	server.unref();
	server.on('error', reject);

	server.listen(options, () => {
		const port = server.address().port;
		server.close(() => {
			resolve(port);
		});
	});
});

module.exports = options => options ?
	getPort(options).catch(() => getPort(0)) :
	getPort(0);
