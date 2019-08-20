#!/usr/bin/env node

'use strict'

const md5File = require('./')

console.log(md5File.sync(process.argv[2]))
