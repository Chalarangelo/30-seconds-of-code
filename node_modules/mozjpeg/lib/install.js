'use strict';
const os = require('os');
const binBuild = require('bin-build');
const log = require('logalot');
const bin = require('.');

const cpuNum = os.cpus().length;

bin.run(['-version']).then(() => {
	log.success('mozjpeg pre-build test passed successfully');
}).catch(error => {
	log.warn(error.message);
	log.warn('mozjpeg pre-build test failed');
	log.info('compiling from source');

	let cfgExtras = '';
	if (process.platform === 'darwin') {
		cfgExtras = 'libpng_LIBS=\'/usr/local/lib/libpng16.a -lz\' --enable-static';
	}

	const cfg = [
		`./configure --enable-static --disable-shared --disable-dependency-tracking --with-jpeg8 ${cfgExtras}`,
		`--prefix="${bin.dest()}" --bindir="${bin.dest()}" --libdir="${bin.dest()}"`
	].join(' ');

	binBuild.url('https://github.com/mozilla/mozjpeg/releases/download/v3.2/mozjpeg-3.2-release-source.tar.gz', [
		'autoreconf -fiv',
		cfg,
		`make -j${cpuNum}`,
		`make install -j${cpuNum}`
	]).then(() => {
		log.success('mozjpeg built successfully');
	}).catch(error => {
		log.error(error.stack);
	});
});
