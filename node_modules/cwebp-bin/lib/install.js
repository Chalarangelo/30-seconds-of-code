'use strict';
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

bin.run(['-version']).then(() => {
	log.success('cwebp pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('cwebp pre-build test failed');
	log.info('compiling from source');

	binBuild.url('http://downloads.webmproject.org/releases/webp/libwebp-1.0.2.tar.gz', [
		`./configure --disable-shared --prefix="${bin.dest()}" --bindir="${bin.dest()}"`,
		'make && make install'
	]).then(() => {
		log.success('cwebp built successfully');
	}).catch(error => {
		log.error(error.stack);
	});
});
