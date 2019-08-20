'use strict';
const execa = require('execa');
const lcid = require('lcid');
const mem = require('mem');

const defaultOptions = {spawn: true};
const defaultLocale = 'en_US';

function getEnvLocale(env = process.env) {
	return env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE;
}

function parseLocale(string) {
	const env = string.split('\n').reduce((env, def) => {
		const [key, value] = def.split('=');
		env[key] = value.replace(/^"|"$/g, '');
		return env;
	}, {});

	return getEnvLocale(env);
}

function getLocale(string) {
	return (string && string.replace(/[.:].*/, ''));
}

function getLocales() {
	return execa.stdout('locale', ['-a']);
}

function getLocalesSync() {
	return execa.sync('locale', ['-a']).stdout;
}

function getSupportedLocale(locale, locales = '') {
	return locales.includes(locale) ? locale : defaultLocale;
}

function getAppleLocale() {
	return Promise.all([
		execa.stdout('defaults', ['read', '-globalDomain', 'AppleLocale']),
		getLocales()
	]).then(results => getSupportedLocale(results[0], results[1]));
}

function getAppleLocaleSync() {
	return getSupportedLocale(
		execa.sync('defaults', ['read', '-globalDomain', 'AppleLocale']).stdout,
		getLocalesSync()
	);
}

function getUnixLocale() {
	if (process.platform === 'darwin') {
		return getAppleLocale();
	}

	return execa.stdout('locale')
		.then(stdout => getLocale(parseLocale(stdout)));
}

function getUnixLocaleSync() {
	if (process.platform === 'darwin') {
		return getAppleLocaleSync();
	}

	return getLocale(parseLocale(execa.sync('locale').stdout));
}

function getWinLocale() {
	return execa.stdout('wmic', ['os', 'get', 'locale'])
		.then(stdout => {
			const lcidCode = parseInt(stdout.replace('Locale', ''), 16);
			return lcid.from(lcidCode);
		});
}

function getWinLocaleSync() {
	const {stdout} = execa.sync('wmic', ['os', 'get', 'locale']);
	const lcidCode = parseInt(stdout.replace('Locale', ''), 16);
	return lcid.from(lcidCode);
}

module.exports = mem((options = defaultOptions) => {
	const envLocale = getEnvLocale();

	let thenable;
	if (envLocale || options.spawn === false) {
		thenable = Promise.resolve(getLocale(envLocale));
	} else if (process.platform === 'win32') {
		thenable = getWinLocale();
	} else {
		thenable = getUnixLocale();
	}

	return thenable
		.then(locale => locale || defaultLocale)
		.catch(() => defaultLocale);
});

module.exports.sync = mem((options = defaultOptions) => {
	const envLocale = getEnvLocale();

	let res;
	if (envLocale || options.spawn === false) {
		res = getLocale(envLocale);
	} else {
		try {
			res = process.platform === 'win32' ? getWinLocaleSync() : getUnixLocaleSync();
		} catch (_) {}
	}

	return res || defaultLocale;
});
