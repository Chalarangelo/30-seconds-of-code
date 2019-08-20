'use strict';
const execa = require('execa');

const env = Object.assign({}, process.env, {LC_CTYPE: 'UTF-8'});

module.exports = {
	copy: opts => execa('pbcopy', Object.assign({}, opts, {env})),
	paste: opts => execa.stdout('pbpaste', Object.assign({}, opts, {env})),
	copySync: opts => execa.sync('pbcopy', Object.assign({}, opts, {env})),
	pasteSync: opts => execa.sync('pbpaste', Object.assign({}, opts, {env}))
};
