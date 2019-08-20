'use strict';
const fs = require('fs');
const path = require('path');
const ConfigChain = require('config-chain').ConfigChain;
const util = require('./util');

class Conf extends ConfigChain {
	// https://github.com/npm/npm/blob/latest/lib/config/core.js#L208-L222
	constructor(base) {
		super(base);
		this.root = base;
	}

	// https://github.com/npm/npm/blob/latest/lib/config/core.js#L332-L342
	add(data, marker) {
		try {
			for (const x of Object.keys(data)) {
				data[x] = util.parseField(data[x], x);
			}
		} catch (err) {
			throw err;
		}

		return super.add(data, marker);
	}

	// https://github.com/npm/npm/blob/latest/lib/config/core.js#L312-L325
	addFile(file, name) {
		name = name || file;

		const marker = {__source__: name};

		this.sources[name] = {path: file, type: 'ini'};
		this.push(marker);
		this._await();

		try {
			const contents = fs.readFileSync(file, 'utf8');
			this.addString(contents, file, 'ini', marker);
		} catch (err) {
			this.add({}, marker);
		}

		return this;
	}

	// https://github.com/npm/npm/blob/latest/lib/config/core.js#L344-L360
	addEnv(env) {
		env = env || process.env;

		const conf = {};

		Object.keys(env)
			.filter(x => /^npm_config_/i.test(x))
			.forEach(x => {
				if (!env[x]) {
					return;
				}

				const p = x.toLowerCase()
					.replace(/^npm_config_/, '')
					.replace(/(?!^)_/g, '-');

				conf[p] = env[x];
			});

		return super.addEnv('', conf, 'env');
	}

	// https://github.com/npm/npm/blob/latest/lib/config/load-prefix.js
	loadPrefix() {
		const cli = this.list[0];

		Object.defineProperty(this, 'prefix', {
			enumerable: true,
			set: prefix => {
				const g = this.get('global');
				this[g ? 'globalPrefix' : 'localPrefix'] = prefix;
			},
			get: () => {
				const g = this.get('global');
				return g ? this.globalPrefix : this.localPrefix;
			}
		});

		Object.defineProperty(this, 'globalPrefix', {
			enumerable: true,
			set: prefix => {
				this.set('prefix', prefix);
			},
			get: () => {
				return path.resolve(this.get('prefix'));
			}
		});

		let p;

		Object.defineProperty(this, 'localPrefix', {
			enumerable: true,
			set: prefix => {
				p = prefix;
			},
			get: () => {
				return p;
			}
		});

		if (Object.prototype.hasOwnProperty.call(cli, 'prefix')) {
			p = path.resolve(cli.prefix);
		} else {
			try {
				const prefix = util.findPrefix(process.cwd());
				p = prefix;
			} catch (err) {
				throw err;
			}
		}

		return p;
	}

	// https://github.com/npm/npm/blob/latest/lib/config/load-cafile.js
	loadCAFile(file) {
		if (!file) {
			return;
		}

		try {
			const contents = fs.readFileSync(file, 'utf8');
			const delim = '-----END CERTIFICATE-----';
			const output = contents
				.split(delim)
				.filter(x => Boolean(x.trim()))
				.map(x => x.trimLeft() + delim);

			this.set('ca', output);
		} catch (err) {
			if (err.code === 'ENOENT') {
				return;
			}

			throw err;
		}
	}

	// https://github.com/npm/npm/blob/latest/lib/config/set-user.js
	loadUser() {
		const defConf = this.root;

		if (this.get('global')) {
			return;
		}

		if (process.env.SUDO_UID) {
			defConf.user = Number(process.env.SUDO_UID);
			return;
		}

		const prefix = path.resolve(this.get('prefix'));

		try {
			const stats = fs.statSync(prefix);
			defConf.user = stats.uid;
		} catch (err) {
			if (err.code === 'ENOENT') {
				return;
			}

			throw err;
		}
	}
}

module.exports = Conf;
