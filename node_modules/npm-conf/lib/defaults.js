
	// Generated with `lib/make.js`
	'use strict';
	const os = require('os');
	const path = require('path');

	const temp = os.tmpdir();
	const uidOrPid = process.getuid ? process.getuid() : process.pid;
	const hasUnicode = () => true;
	const isWindows = process.platform === 'win32';

	const osenv = {
		editor: () => process.env.EDITOR || process.env.VISUAL || (isWindows ? 'notepad.exe' : 'vi'),
		shell: () => isWindows ? (process.env.COMSPEC || 'cmd.exe') : (process.env.SHELL || '/bin/bash')
	};

	const umask = {
		fromString: () => process.umask()
	};

	let home = os.homedir();

	if (home) {
		process.env.HOME = home;
	} else {
		home = path.resolve(temp, 'npm-' + uidOrPid);
	}

	const cacheExtra = process.platform === 'win32' ? 'npm-cache' : '.npm';
	const cacheRoot = process.platform === 'win32' ? process.env.APPDATA : home;
	const cache = path.resolve(cacheRoot, cacheExtra);

	let defaults;
	let globalPrefix;

	Object.defineProperty(exports, 'defaults', {
  get: function () {
    if (defaults) return defaults;

    if (process.env.PREFIX) {
      globalPrefix = process.env.PREFIX;
    } else if (process.platform === 'win32') {
      // c:\node\node.exe --> prefix=c:\node\
      globalPrefix = path.dirname(process.execPath);
    } else {
      // /usr/local/bin/node --> prefix=/usr/local
      globalPrefix = path.dirname(path.dirname(process.execPath)); // destdir only is respected on Unix

      if (process.env.DESTDIR) {
        globalPrefix = path.join(process.env.DESTDIR, globalPrefix);
      }
    }

    defaults = {
      access: null,
      'allow-same-version': false,
      'always-auth': false,
      also: null,
      'auth-type': 'legacy',
      'bin-links': true,
      browser: null,
      ca: null,
      cafile: null,
      cache: cache,
      'cache-lock-stale': 60000,
      'cache-lock-retries': 10,
      'cache-lock-wait': 10000,
      'cache-max': Infinity,
      'cache-min': 10,
      cert: null,
      color: true,
      depth: Infinity,
      description: true,
      dev: false,
      'dry-run': false,
      editor: osenv.editor(),
      'engine-strict': false,
      force: false,
      'fetch-retries': 2,
      'fetch-retry-factor': 10,
      'fetch-retry-mintimeout': 10000,
      'fetch-retry-maxtimeout': 60000,
      git: 'git',
      'git-tag-version': true,
      global: false,
      globalconfig: path.resolve(globalPrefix, 'etc', 'npmrc'),
      'global-style': false,
      group: process.platform === 'win32' ? 0 : process.env.SUDO_GID || process.getgid && process.getgid(),
      'ham-it-up': false,
      heading: 'npm',
      'if-present': false,
      'ignore-prepublish': false,
      'ignore-scripts': false,
      'init-module': path.resolve(home, '.npm-init.js'),
      'init-author-name': '',
      'init-author-email': '',
      'init-author-url': '',
      'init-version': '1.0.0',
      'init-license': 'ISC',
      json: false,
      key: null,
      'legacy-bundling': false,
      link: false,
      'local-address': undefined,
      loglevel: 'notice',
      logstream: process.stderr,
      'logs-max': 10,
      long: false,
      maxsockets: 50,
      message: '%s',
      'metrics-registry': null,
      'node-version': process.version,
      'offline': false,
      'onload-script': false,
      only: null,
      optional: true,
      'package-lock': true,
      parseable: false,
      'prefer-offline': false,
      'prefer-online': false,
      prefix: globalPrefix,
      production: process.env.NODE_ENV === 'production',
      'progress': !process.env.TRAVIS && !process.env.CI,
      'proprietary-attribs': true,
      proxy: null,
      'https-proxy': null,
      'user-agent': 'npm/{npm-version} ' + 'node/{node-version} ' + '{platform} ' + '{arch}',
      'rebuild-bundle': true,
      registry: 'https://registry.npmjs.org/',
      rollback: true,
      save: true,
      'save-bundle': false,
      'save-dev': false,
      'save-exact': false,
      'save-optional': false,
      'save-prefix': '^',
      'save-prod': false,
      scope: '',
      'script-shell': null,
      'scripts-prepend-node-path': 'warn-only',
      searchopts: '',
      searchexclude: null,
      searchlimit: 20,
      searchstaleness: 15 * 60,
      'send-metrics': false,
      shell: osenv.shell(),
      shrinkwrap: true,
      'sign-git-tag': false,
      'sso-poll-frequency': 500,
      'sso-type': 'oauth',
      'strict-ssl': true,
      tag: 'latest',
      'tag-version-prefix': 'v',
      timing: false,
      tmp: temp,
      unicode: hasUnicode(),
      'unsafe-perm': process.platform === 'win32' || process.platform === 'cygwin' || !(process.getuid && process.setuid && process.getgid && process.setgid) || process.getuid() !== 0,
      usage: false,
      user: process.platform === 'win32' ? 0 : 'nobody',
      userconfig: path.resolve(home, '.npmrc'),
      umask: process.umask ? process.umask() : umask.fromString('022'),
      version: false,
      versions: false,
      viewer: process.platform === 'win32' ? 'browser' : 'man',
      _exit: true
    };
    return defaults;
  }
})
