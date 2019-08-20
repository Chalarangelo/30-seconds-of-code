'use strict';

var fn = module.exports = function (x) {
	return fn.end(fn.start(x));
};

fn.start = function (x) {
	return x.replace(/^[\r\n]+/, '');
};

fn.end = function (x) {
	return x.replace(/[\r\n]+$/, '');
};
