'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encode = encode;
function encode(data) {
    return data.replace(/"/g, '\'').replace(/%/g, '%25').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\s+/g, ' ');
};

const decode = exports.decode = decodeURIComponent;