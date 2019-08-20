#!/usr/bin/env node
'use strict'
var inInstall = require('./index.js').inInstall
process.exit(inInstall() ? 1 : 0)
