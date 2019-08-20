'use strict';
const fs = require('fs');
const path = require('path');
const fastGlob = require('fast-glob');
const gitIgnore = require('ignore');
const pify = require('pify');
const slash = require('slash');

const DEFAULT_IGNORE = [
	'**/node_modules/**',
	'**/bower_components/**',
	'**/flow-typed/**',
	'**/coverage/**',
	'**/.git'
];

const readFileP = pify(fs.readFile);

const mapGitIgnorePatternTo = base => ignore => {
	if (ignore.startsWith('!')) {
		return '!' + path.posix.join(base, ignore.substr(1));
	}

	return path.posix.join(base, ignore);
};

const parseGitIgnore = (content, opts) => {
	const base = slash(path.relative(opts.cwd, path.dirname(opts.fileName)));

	return content
		.split(/\r?\n/)
		.filter(Boolean)
		.filter(l => l.charAt(0) !== '#')
		.map(mapGitIgnorePatternTo(base));
};

const reduceIgnore = files => {
	return files.reduce((ignores, file) => {
		ignores.add(parseGitIgnore(file.content, {
			cwd: file.cwd,
			fileName: file.filePath
		}));
		return ignores;
	}, gitIgnore());
};

const getIsIgnoredPredecate = (ignores, cwd) => {
	return p => ignores.ignores(slash(path.relative(cwd, p)));
};

const getFile = (file, cwd) => {
	const filePath = path.join(cwd, file);
	return readFileP(filePath, 'utf8')
		.then(content => ({
			content,
			cwd,
			filePath
		}));
};

const getFileSync = (file, cwd) => {
	const filePath = path.join(cwd, file);
	const content = fs.readFileSync(filePath, 'utf8');

	return {
		content,
		cwd,
		filePath
	};
};

const normalizeOpts = opts => {
	opts = opts || {};
	const ignore = opts.ignore || [];
	const cwd = opts.cwd || process.cwd();
	return {ignore, cwd};
};

module.exports = o => {
	const opts = normalizeOpts(o);

	return fastGlob('**/.gitignore', {ignore: DEFAULT_IGNORE.concat(opts.ignore), cwd: opts.cwd})
		.then(paths => Promise.all(paths.map(file => getFile(file, opts.cwd))))
		.then(files => reduceIgnore(files))
		.then(ignores => getIsIgnoredPredecate(ignores, opts.cwd));
};

module.exports.sync = o => {
	const opts = normalizeOpts(o);

	const paths = fastGlob.sync('**/.gitignore', {ignore: DEFAULT_IGNORE.concat(opts.ignore), cwd: opts.cwd});
	const files = paths.map(file => getFileSync(file, opts.cwd));
	const ignores = reduceIgnore(files);
	return getIsIgnoredPredecate(ignores, opts.cwd);
};
