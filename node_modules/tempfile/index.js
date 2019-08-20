'use strict';
const path = require('path');
const uuid = require('uuid');
const tempDir = require('temp-dir');

module.exports = ext => path.join(tempDir, uuid.v4() + (ext || ''));
