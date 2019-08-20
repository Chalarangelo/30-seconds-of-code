#!/usr/bin/env node
'use strict'
var inPublish = require('./index.js').inPublish
process.exit(inPublish() ? 1 : 0)
