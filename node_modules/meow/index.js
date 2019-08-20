'use strict';
var path = require('path');
var minimist = require('minimist');
var objectAssign = require('object-assign');
var camelcaseKeys = require('camelcase-keys');
var decamelize = require('decamelize');
var mapObj = require('map-obj');
var trimNewlines = require('trim-newlines');
var redent = require('redent');
var readPkgUp = require('read-pkg-up');
var loudRejection = require('loud-rejection');
var normalizePackageData = require('normalize-package-data');

// get the uncached parent
delete require.cache[__filename];
var parentDir = path.dirname(module.parent.filename);

module.exports = function (opts, minimistOpts) {
	loudRejection();

	if (Array.isArray(opts) || typeof opts === 'string') {
		opts = {help: opts};
	}

	opts = objectAssign({
		pkg: readPkgUp.sync({
			cwd: parentDir,
			normalize: false
		}).pkg,
		argv: process.argv.slice(2)
	}, opts);

	minimistOpts = objectAssign({}, minimistOpts);

	minimistOpts.default = mapObj(minimistOpts.default || {}, function (key, value) {
		return [decamelize(key, '-'), value];
	});

	if (Array.isArray(opts.help)) {
		opts.help = opts.help.join('\n');
	}

	var pkg = typeof opts.pkg === 'string' ? require(path.join(parentDir, opts.pkg)) : opts.pkg;
	var argv = minimist(opts.argv, minimistOpts);
	var help = redent(trimNewlines(opts.help || ''), 2);

	normalizePackageData(pkg);

	process.title = pkg.bin ? Object.keys(pkg.bin)[0] : pkg.name;

	var description = opts.description;
	if (!description && description !== false) {
		description = pkg.description;
	}

	help = (description ? '\n  ' + description + '\n' : '') + (help ? '\n' + help : '\n');

	var showHelp = function (code) {
		console.log(help);
		process.exit(code || 0);
	};

	if (argv.version && opts.version !== false) {
		console.log(typeof opts.version === 'string' ? opts.version : pkg.version);
		process.exit();
	}

	if (argv.help && opts.help !== false) {
		showHelp();
	}

	var _ = argv._;
	delete argv._;

	return {
		input: _,
		flags: camelcaseKeys(argv),
		pkg: pkg,
		help: help,
		showHelp: showHelp
	};
};
