'use strict';
const pReduce = require('p-reduce');

module.exports = (iterable, iterator) => pReduce(iterable, (a, b, i) => iterator(b, i)).then(() => iterable);
