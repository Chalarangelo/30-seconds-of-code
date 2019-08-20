"use strict";
/* jshint node:true */
var MyCustomLogger = (function() {
    // @include ../lib/loglevel.js
    return this.log;
}).apply({});
