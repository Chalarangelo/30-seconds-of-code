'use strict';

// Load modules

const Hoek = require('hoek');
const ObjectType = require('../object');
const Ref = require('../../ref');


// Declare internals

const internals = {};


internals.Func = class extends ObjectType.constructor {

    constructor() {

        super();
        this._flags.func = true;
    }

    arity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

        return this._test('arity', n, function (value, state, options) {

            if (value.length === n) {
                return value;
            }

            return this.createError('function.arity', { n }, state, options);
        });
    }

    minArity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n > 0, 'n must be a strict positive integer');

        return this._test('minArity', n, function (value, state, options) {

            if (value.length >= n) {
                return value;
            }

            return this.createError('function.minArity', { n }, state, options);
        });
    }

    maxArity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

        return this._test('maxArity', n, function (value, state, options) {

            if (value.length <= n) {
                return value;
            }

            return this.createError('function.maxArity', { n }, state, options);
        });
    }

    ref() {

        return this._test('ref', null, function (value, state, options) {

            if (Ref.isRef(value)) {
                return value;
            }

            return this.createError('function.ref', null, state, options);
        });
    }

    class() {

        return this._test('class', null, function (value, state, options) {

            if ((/^\s*class\s/).test(value.toString())) {
                return value;
            }

            return this.createError('function.class', null, state, options);
        });
    }
};

module.exports = new internals.Func();
