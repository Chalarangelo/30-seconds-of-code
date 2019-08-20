'use strict'

exports.name = 'spdy'

exports.dictionary = require('./dictionary')
exports.constants = require('./constants')
exports.parser = require('./parser')
exports.framer = require('./framer')
exports.compressionPool = require('./zlib-pool')
