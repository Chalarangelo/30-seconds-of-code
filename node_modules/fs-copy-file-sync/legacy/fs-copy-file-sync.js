'use strict';

var fs = require('fs');

var SIZE = 65536;

var COPYFILE_EXCL = 1;
var COPYFILE_FICLONE = 2;
var COPYFILE_FICLONE_FORCE = 4;

var constants = {
    COPYFILE_EXCL: COPYFILE_EXCL,
    COPYFILE_FICLONE: COPYFILE_FICLONE,
    COPYFILE_FICLONE_FORCE: COPYFILE_FICLONE_FORCE,
};

module.exports = fs.copyFileSync ? fs.copyFileSync : copyFileSync;
module.exports.constants = constants;

var isNumber = function (a) { return typeof a === 'number'; };
var or = function (a, b) { return a | b; };
var getValue = function (obj) { return function (key) { return obj[key]; }; };

var getMaxMask = function (obj) { return Object
    .keys(obj)
    .map(getValue(obj))
    .reduce(or); };

var MAX_MASK = getMaxMask(constants);
var isExcl = function (flags) { return flags & COPYFILE_EXCL; };

function copyFileSync(src, dest, flag) {
    check(src, dest, flag);
    
    var writeFlag = isExcl(flag) ? 'wx' : 'w';
    
    var ref = fs.statSync(src);
    var size = ref.size;
    var mode = ref.mode;
    
    var fdSrc = fs.openSync(src, 'r');
    var fdDest = fs.openSync(dest, writeFlag, mode);
    
    var length = size < SIZE ? size : SIZE;
    
    var position = 0;
    var peaceSize = size < SIZE ? 0 : size % SIZE;
    var offset = 0;
    
    var buffer = Buffer.allocUnsafe(length);
    for (var i = 0; length + position + peaceSize <= size; i++, position = length * i) {
        fs.readSync(fdSrc, buffer, offset, length, position);
        fs.writeSync(fdDest, buffer, offset, length, position);
    }
    
    if (peaceSize) {
        var length$1 = peaceSize;
        buffer = Buffer.allocUnsafe(length$1);
        
        fs.readSync(fdSrc, buffer, offset, length$1, position);
        fs.writeSync(fdDest, buffer, offset, length$1, position);
    }
    
    fs.closeSync(fdSrc);
    fs.closeSync(fdDest);
}

var getError = function (name, arg) {
    var e = TypeError(("The \"" + name + "\" argument must be one of type string, Buffer, or URL. Received type " + (typeof arg)));
    e.code = 'ERR_INVALID_ARGS_TYPE';
    
    return e;
};

function check(src, dest, flags) {
    if (typeof src !== 'string')
        { throw getError('src', src); }
    
    if (typeof dest !== 'string')
        { throw getError('dest', dest); }
    
    if (flags && isNumber(flags) && (flags > MAX_MASK || flags < 0))
        { throw Error(("EINVAL: invalid argument, copyfile -> '" + dest + "'")); }
}

