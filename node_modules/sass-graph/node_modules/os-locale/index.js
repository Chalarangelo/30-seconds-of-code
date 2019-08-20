'use strict';
var childProcess = require('child_process');
var execFileSync = childProcess.execFileSync;
var lcid = require('lcid');
var defaultOpts = {spawn: true};
var cache;

function fallback() {
	cache = 'en_US';
	return cache;
}

function getEnvLocale(env) {
	env = env || process.env;
	var ret = env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
	cache = getLocale(ret);
	return ret;
}

function parseLocale(x) {
	var env = x.split('\n').reduce(function (env, def) {
		def = def.split('=');
		env[def[0]] = def[1];
		return env;
	}, {});
	return getEnvLocale(env);
}

function getLocale(str) {
	return (str && str.replace(/[.:].*/, '')) || fallback();
}

module.exports = function (opts, cb) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = defaultOpts;
	} else {
		opts = opts || defaultOpts;
	}

	if (cache || getEnvLocale() || opts.spawn === false) {
		setImmediate(cb, null, cache);
		return;
	}

	var getAppleLocale = function () {
		childProcess.execFile('defaults', ['read', '-g', 'AppleLocale'], function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			cache = stdout.trim() || fallback();
			cb(null, cache);
		});
	};

	if (process.platform === 'win32') {
		childProcess.execFile('wmic', ['os', 'get', 'locale'], function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			var lcidCode = parseInt(stdout.replace('Locale', ''), 16);
			cache = lcid.from(lcidCode) || fallback();
			cb(null, cache);
		});
	} else {
		childProcess.execFile('locale', function (err, stdout) {
			if (err) {
				fallback();
				return;
			}

			var res = parseLocale(stdout);

			if (!res && process.platform === 'darwin') {
				getAppleLocale();
				return;
			}

			cache = getLocale(res);
			cb(null, cache);
		});
	}
};

module.exports.sync = function (opts) {
	opts = opts || defaultOpts;

	if (cache || getEnvLocale() || !execFileSync || opts.spawn === false) {
		return cache;
	}

	if (process.platform === 'win32') {
		var stdout;

		try {
			stdout = execFileSync('wmic', ['os', 'get', 'locale'], {encoding: 'utf8'});
		} catch (err) {
			return fallback();
		}

		var lcidCode = parseInt(stdout.replace('Locale', ''), 16);
		cache = lcid.from(lcidCode) || fallback();
		return cache;
	}

	var res;

	try {
		res = parseLocale(execFileSync('locale', {encoding: 'utf8'}));
	} catch (err) {}

	if (!res && process.platform === 'darwin') {
		try {
			cache = execFileSync('defaults', ['read', '-g', 'AppleLocale'], {encoding: 'utf8'}).trim() || fallback();
			return cache;
		} catch (err) {
			return fallback();
		}
	}

	cache = getLocale(res);
	return cache;
};
