#!/usr/bin/env node
'use strict';
const execa = require('execa');
const m = require('.');

execa(m, process.argv.slice(2), {stdio: 'inherit'});
