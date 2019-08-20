#!/usr/bin/env node
'use strict';
const {spawn} = require('child_process');
const mozjpeg = require('.');

const input = process.argv.slice(2);

spawn(mozjpeg, input, {stdio: 'inherit'})
	.on('exit', process.exit);
