'use strict';

const Types = require('./types');
const Utils = require('./utils');


const internals = {
    needsProtoHack: new Set([Types.set, Types.map, Types.weakSet, Types.weakMap])
};


module.exports = internals.clone = function (obj, options = {}, _seen = null) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    let clone = internals.clone;
    let seen = _seen;

    if (options.shallow) {
        if (options.shallow !== true) {
            return internals.cloneWithShallow(obj, options);
        }

        clone = (value) => value;
    }
    else {
        seen = seen || new Map();

        const lookup = seen.get(obj);
        if (lookup) {
            return lookup;
        }
    }

    const baseProto = Types.getInternalProto(obj);
    let newObj;

    switch (baseProto) {
        case Types.buffer:
            return Buffer && Buffer.from(obj);              // $lab:coverage:ignore$

        case Types.date:
            return new Date(obj.getTime());

        case Types.regex:
            return new RegExp(obj);

        case Types.array:
            newObj = [];
            break;

        default:
            if (options.prototype !== false) {              // Defaults to true
                const proto = Object.getPrototypeOf(obj);
                if (proto &&
                    proto.isImmutable) {

                    return obj;
                }

                if (internals.needsProtoHack.has(baseProto)) {
                    newObj = new proto.constructor();
                    if (proto !== baseProto) {
                        Object.setPrototypeOf(newObj, proto);
                    }
                }
                else {
                    newObj = Object.create(proto);
                }
            }
            else if (internals.needsProtoHack.has(baseProto)) {
                newObj = new baseProto.constructor();
            }
            else {
                newObj = {};
            }
    }

    if (seen) {
        seen.set(obj, newObj);                              // Set seen, since obj could recurse
    }

    if (baseProto === Types.set) {
        for (const value of obj) {
            newObj.add(clone(value, options, seen));
        }
    }
    else if (baseProto === Types.map) {
        for (const [key, value] of obj) {
            newObj.set(key, clone(value, options, seen));
        }
    }

    const keys = Utils.keys(obj, options);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];

        if (baseProto === Types.array &&
            key === 'length') {

            continue;
        }

        const descriptor = Object.getOwnPropertyDescriptor(obj, key);
        if (descriptor &&
            (descriptor.get || descriptor.set)) {

            Object.defineProperty(newObj, key, descriptor);
        }
        else {
            Object.defineProperty(newObj, key, {
                enumerable: descriptor ? descriptor.enumerable : true,
                writable: true,
                configurable: true,
                value: clone(obj[key], options, seen)
            });
        }
    }

    if (baseProto === Types.array) {
        newObj.length = obj.length;
    }

    return newObj;
};


internals.cloneWithShallow = function (source, options) {

    const keys = options.shallow;
    options = Object.assign({}, options);
    options.shallow = false;

    const storage = Utils.store(source, keys);    // Move shallow copy items to storage
    const copy = internals.clone(source, options);      // Deep copy the rest
    Utils.restore(copy, source, storage);         // Shallow copy the stored items and restore
    return copy;
};
