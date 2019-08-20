'use strict';
const callerCallsite = require('caller-callsite');

module.exports = () => callerCallsite().getFileName();
