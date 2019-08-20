'use strict';
var EventEmitter = require('events').EventEmitter;
var fmt = require('util').format;
var inherits = require('util').inherits;
var chalk = require('chalk');
var consoleStream = require('console-stream');
var lpadAlign = require('lpad-align');

/**
 * Initialize a new `Squeak`
 *
 * @param {Object} opts
 * @api public
 */

function Squeak(opts) {
	if (!(this instanceof Squeak)) {
		return new Squeak(opts);
	}

	EventEmitter.call(this);

	this.opts = opts || {};
	this.align = this.opts.align !== false;
	this.indent = this.opts.indent || 2;
	this.separator = this.opts.separator || ' : ';
	this.stream = this.opts.stream || process.stderr || consoleStream();
	this.types = [];
}

inherits(Squeak, EventEmitter);
module.exports = Squeak;

/**
 * Write args to stream
 *
 * @api public
 */

Squeak.prototype.write = function () {
	this.log([].slice.call(arguments));
	return this;
};

/**
 * Write args and new line to stream
 *
 * @api public
 */

Squeak.prototype.writeln = function () {
	this.log([].slice.call(arguments));
	this.stream.write('\n');
	return this;
};

/**
 * Pad and write args to stream
 *
 * @api public
 */

Squeak.prototype.writelpad = function () {
	var args = [].slice.call(arguments);
	var pad = new Array(this.indent + 1).join(' ');

	if (args.length) {
		args[0] = pad + args[0];
	}

	this.log(args);
	return this;
};

/**
 * Add type
 *
 * @param {String} type
 * @param {Object} opts
 * @param {Function} cb
 * @api public
 */

Squeak.prototype.type = function (type, opts, cb) {
	if (!cb && typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	opts = opts || {};
	opts.color = opts.color || 'reset';
	opts.prefix = opts.prefix || type;

	this.types.push(opts.prefix);
	this[type] = function () {
		this.log([].slice.call(arguments), opts);

		if (cb) {
			cb();
		}
	};

	return this;
};

/**
 * End
 *
 * @param {Function} cb
 * @api public
 */

Squeak.prototype.end = function (cb) {
	this.stream.write('\n');

	if (cb) {
		cb();
	}

	return this;
};

/**
 * Log
 *
 * @param {Array} args
 * @param {Object} opts
 * @api private
 */

Squeak.prototype.log = function (args, opts) {
	opts = opts || {};

	var msg = [fmt.apply(null, args)];
	var color = opts.color;
	var prefix = opts.prefix;

	if (prefix) {
		var arr = this.align ? this.types : [prefix];
		msg.unshift(chalk[color](lpadAlign(prefix, arr, this.indent)));
	}

	this.stream.write(msg.join(this.separator));
	this.stream.write('\n');

	return this;
};
