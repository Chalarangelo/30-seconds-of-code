'use strict';
const npmConf = require('npm-conf')();

module.exports = () => {
	return process.env.HTTPS_PROXY ||
		process.env.https_proxy ||
		process.env.HTTP_PROXY ||
		process.env.http_proxy ||
		npmConf.get('https-proxy') ||
		npmConf.get('http-proxy') ||
		npmConf.get('proxy') ||
		null;
};
