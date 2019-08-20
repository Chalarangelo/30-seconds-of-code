'use strict';

const Ref = require('./ref');

module.exports = class Set {

    constructor() {

        this._set = [];
    }

    add(value, refs) {

        if (!Ref.isRef(value) && this.has(value, null, null, false)) {

            return;
        }

        if (refs !== undefined) { // If it's a merge, we don't have any refs
            Ref.push(refs, value);
        }

        this._set.push(value);
        return this;
    }

    merge(add, remove) {

        for (let i = 0; i < add._set.length; ++i) {
            this.add(add._set[i]);
        }

        for (let i = 0; i < remove._set.length; ++i) {
            this.remove(remove._set[i]);
        }

        return this;
    }

    remove(value) {

        this._set = this._set.filter((item) => value !== item);
        return this;
    }

    has(value, state, options, insensitive) {

        for (let i = 0; i < this._set.length; ++i) {
            let items = this._set[i];

            if (state && Ref.isRef(items)) { // Only resolve references if there is a state, otherwise it's a merge
                items = items(state.reference || state.parent, options);
            }

            if (!Array.isArray(items)) {
                items = [items];
            }

            for (let j = 0; j < items.length; ++j) {
                const item = items[j];
                if (typeof value !== typeof item) {
                    continue;
                }

                if (value === item ||
                    (value instanceof Date && item instanceof Date && value.getTime() === item.getTime()) ||
                    (insensitive && typeof value === 'string' && value.toLowerCase() === item.toLowerCase()) ||
                    (Buffer.isBuffer(value) && Buffer.isBuffer(item) && value.length === item.length && value.toString('binary') === item.toString('binary'))) {

                    return true;
                }
            }
        }

        return false;
    }

    values(options) {

        if (options && options.stripUndefined) {
            const values = [];

            for (let i = 0; i < this._set.length; ++i) {
                const item = this._set[i];
                if (item !== undefined) {
                    values.push(item);
                }
            }

            return values;
        }

        return this._set.slice();
    }

    slice() {

        const newSet = new Set();
        newSet._set = this._set.slice();

        return newSet;
    }

    concat(source) {

        const newSet = new Set();
        newSet._set = this._set.concat(source._set);

        return newSet;
    }
};
