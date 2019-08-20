'use strict';

const internals = {};


module.exports = function (timeout) {

    return new Promise((resolve) => setTimeout(resolve, timeout));
};
