'use strict';
const execa = require('execa');
const findVersions = require('find-versions');

module.exports = (binary, options = {}) => {
	return execa(binary, options.args || ['--version'])
		.then(result => findVersions(result.stdout || result.stderr, {loose: true})[0])
		.catch(error => {
			if (error.code === 'ENOENT') {
				error.message = `Couldn't find the \`${binary}\` binary. Make sure it's installed and in your $PATH.`;
			}

			throw error;
		});
};
