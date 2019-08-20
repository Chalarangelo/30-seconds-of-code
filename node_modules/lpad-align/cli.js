#!/usr/bin/env node
'use strict';
var getStdin = require('get-stdin');
var meow = require('meow');
var lpadAlign = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ cat <file> | lpad-align',
		'',
		'Example',
		'  $ cat unicorn.txt | lpad-align',
		'        foo',
		'     foobar',
		'  foobarcat'
	]
}, {
	default: {
		indent: 4
	}
});

getStdin(function (data) {
	var arr = data.split(/\r?\n/);

	arr.forEach(function (el) {
		console.log(lpadAlign(el, arr, cli.flags.indent));
	});
});
