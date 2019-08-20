'use strict';
const path = require('path');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['--version']).then(() => {
	log.success('pngquant pre-build test passed successfully');
}).catch(err => {
	log.warn(err.message);
	log.warn('pngquant pre-build test failed');
	log.info('compiling from source');

	const libpng = process.platform === 'darwin' ? 'libpng' : 'libpng-dev';

	binBuild.file(path.resolve(__dirname, '../vendor/source/pngquant.tar.gz'), [
		'rm ./INSTALL',
		`./configure --prefix="${bin.dest()}"`,
		`make install BINPREFIX="${bin.dest()}"`
	]).then(() => {
		log.success('pngquant built successfully');
	}).catch(err => {
		err.message = `pngquant failed to build, make sure that ${libpng} is installed`;
		log.error(err.stack);

		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(1);
	});
});
