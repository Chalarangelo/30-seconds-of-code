/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

function SyncAsyncFileSystemDecorator(fs) {
	this.fs = fs;
	if(fs.statSync) {
		this.stat = function(arg, callback) {
			let result;
			try {
				result = fs.statSync(arg);
			} catch(e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if(fs.readdirSync) {
		this.readdir = function(arg, callback) {
			let result;
			try {
				result = fs.readdirSync(arg);
			} catch(e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if(fs.readFileSync) {
		this.readFile = function(arg, callback) {
			let result;
			try {
				result = fs.readFileSync(arg);
			} catch(e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if(fs.readlinkSync) {
		this.readlink = function(arg, callback) {
			let result;
			try {
				result = fs.readlinkSync(arg);
			} catch(e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
	if(fs.readJsonSync) {
		this.readJson = function(arg, callback) {
			let result;
			try {
				result = fs.readJsonSync(arg);
			} catch(e) {
				return callback(e);
			}
			callback(null, result);
		};
	}
}
module.exports = SyncAsyncFileSystemDecorator;
