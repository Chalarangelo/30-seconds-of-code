'use strict';

const Hoek = require('@hapi/hoek');

const Cast = require('../../cast');
const Settings = require('./settings');
const Ref = require('../../ref');
const Errors = require('../../errors');
const State = require('../state');
const Symbols = require('../symbols');

const Pkg = require('../../../package.json');

let Alternatives = null;                            // Delay-loaded to prevent circular dependencies
let Schemas = null;


const internals = {
    Set: require('../../set'),
    symbol: Symbol.for('@hapi/joi/schema')
};


internals.defaults = {
    abortEarly: true,
    convert: true,
    allowUnknown: false,
    skipFunctions: false,
    stripUnknown: false,
    language: {},
    presence: 'optional',
    noDefaults: false,
    escapeHtml: false

    // context: null
};


module.exports = internals.Any = class {

    constructor() {

        this.isJoi = true;
        this._type = 'any';
        this._settings = null;
        this._valids = new internals.Set();
        this._invalids = new internals.Set();
        this._tests = [];
        this._refs = [];
        this._flags = {
            /*
             presence: 'optional',                   // optional, required, forbidden, ignore
             allowOnly: false,
             allowUnknown: undefined,
             default: undefined,
             forbidden: false,
             encoding: undefined,
             insensitive: false,
             trim: false,
             normalize: undefined,                   // NFC, NFD, NFKC, NFKD
             case: undefined,                        // upper, lower
             empty: undefined,
             func: false,
             raw: false
             */
        };

        this._description = null;
        this._unit = null;
        this._notes = [];
        this._tags = [];
        this._examples = [];
        this._meta = [];

        this._inner = {};                           // Hash of arrays of immutable objects
    }

    _init() {

        return this;
    }

    get schemaType() {

        return this._type;
    }

    createError(type, context, state, options, flags = this._flags) {

        return Errors.create(type, context, state, options, flags);
    }

    createOverrideError(type, context, state, options, message, template) {

        return Errors.create(type, context, state, options, this._flags, message, template);
    }

    checkOptions(options) {

        Schemas = Schemas || require('../../schemas');

        const result = Schemas.options.validate(options);

        if (result.error) {
            throw new Error(result.error.details[0].message);
        }
    }

    clone() {

        const obj = Object.create(Object.getPrototypeOf(this));

        obj.isJoi = true;
        obj._currentJoi = this._currentJoi;
        obj._type = this._type;
        obj._settings = this._settings;
        obj._baseType = this._baseType;
        obj._valids = this._valids.slice();
        obj._invalids = this._invalids.slice();
        obj._tests = this._tests.slice();
        obj._refs = this._refs.slice();
        obj._flags = Hoek.clone(this._flags);

        obj._description = this._description;
        obj._unit = this._unit;
        obj._notes = this._notes.slice();
        obj._tags = this._tags.slice();
        obj._examples = this._examples.slice();
        obj._meta = this._meta.slice();

        obj._inner = {};
        const inners = Object.keys(this._inner);
        for (let i = 0; i < inners.length; ++i) {
            const key = inners[i];
            obj._inner[key] = this._inner[key] ? this._inner[key].slice() : null;
        }

        return obj;
    }

    concat(schema) {

        Hoek.assert(schema instanceof internals.Any, 'Invalid schema object');
        Hoek.assert(this._type === 'any' || schema._type === 'any' || schema._type === this._type, 'Cannot merge type', this._type, 'with another type:', schema._type);

        let obj = this.clone();

        if (this._type === 'any' && schema._type !== 'any') {

            // Reset values as if we were "this"
            const tmpObj = schema.clone();
            const keysToRestore = ['_settings', '_valids', '_invalids', '_tests', '_refs', '_flags', '_description', '_unit',
                '_notes', '_tags', '_examples', '_meta', '_inner'];

            for (let i = 0; i < keysToRestore.length; ++i) {
                tmpObj[keysToRestore[i]] = obj[keysToRestore[i]];
            }

            obj = tmpObj;
        }

        obj._settings = obj._settings ? Settings.concat(obj._settings, schema._settings) : schema._settings;
        obj._valids.merge(schema._valids, schema._invalids);
        obj._invalids.merge(schema._invalids, schema._valids);
        obj._tests.push(...schema._tests);
        obj._refs.push(...schema._refs);
        if (obj._flags.empty && schema._flags.empty) {
            obj._flags.empty = obj._flags.empty.concat(schema._flags.empty);
            const flags = Object.assign({}, schema._flags);
            delete flags.empty;
            Hoek.merge(obj._flags, flags);
        }
        else if (schema._flags.empty) {
            obj._flags.empty = schema._flags.empty;
            const flags = Object.assign({}, schema._flags);
            delete flags.empty;
            Hoek.merge(obj._flags, flags);
        }
        else {
            Hoek.merge(obj._flags, schema._flags);
        }

        obj._description = schema._description || obj._description;
        obj._unit = schema._unit || obj._unit;
        obj._notes.push(...schema._notes);
        obj._tags.push(...schema._tags);
        obj._examples.push(...schema._examples);
        obj._meta.push(...schema._meta);

        const inners = Object.keys(schema._inner);
        const isObject = obj._type === 'object';
        for (let i = 0; i < inners.length; ++i) {
            const key = inners[i];
            const source = schema._inner[key];
            if (source) {
                const target = obj._inner[key];
                if (target) {
                    if (isObject && key === 'children') {
                        const keys = {};

                        for (let j = 0; j < target.length; ++j) {
                            keys[target[j].key] = j;
                        }

                        for (let j = 0; j < source.length; ++j) {
                            const sourceKey = source[j].key;
                            if (keys[sourceKey] >= 0) {
                                target[keys[sourceKey]] = {
                                    key: sourceKey,
                                    schema: target[keys[sourceKey]].schema.concat(source[j].schema)
                                };
                            }
                            else {
                                target.push(source[j]);
                            }
                        }
                    }
                    else {
                        obj._inner[key] = obj._inner[key].concat(source);
                    }
                }
                else {
                    obj._inner[key] = source.slice();
                }
            }
        }

        return obj;
    }

    _test(name, arg, func, options) {

        const obj = this.clone();
        obj._tests.push({ func, name, arg, options });
        return obj;
    }

    _testUnique(name, arg, func, options) {

        const obj = this.clone();
        obj._tests = obj._tests.filter((test) => test.name !== name);
        obj._tests.push({ func, name, arg, options });
        return obj;
    }

    options(options) {

        Hoek.assert(!options.context, 'Cannot override context');
        this.checkOptions(options);

        const obj = this.clone();
        obj._settings = Settings.concat(obj._settings, options);
        return obj;
    }

    strict(isStrict) {

        const obj = this.clone();

        const convert = isStrict === undefined ? false : !isStrict;
        obj._settings = Settings.concat(obj._settings, { convert });
        return obj;
    }

    raw(isRaw) {

        const value = isRaw === undefined ? true : isRaw;

        if (this._flags.raw === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.raw = value;
        return obj;
    }

    error(err, options = { self: false }) {

        Hoek.assert(err && (err instanceof Error || typeof err === 'function'), 'Must provide a valid Error object or a function');

        const unknownKeys = Object.keys(options).filter((k) => !['self'].includes(k));
        Hoek.assert(unknownKeys.length === 0, `Options ${unknownKeys} are unknown`);

        const obj = this.clone();
        obj._flags.error = err;

        if (options.self) {
            obj._flags.selfError = true;
        }

        return obj;
    }

    allow(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
            obj._invalids.remove(value);
            obj._valids.add(value, obj._refs);
        }

        return obj;
    }

    valid(...values) {

        const obj = this.allow(...values);
        obj._flags.allowOnly = true;
        return obj;
    }

    invalid(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
            obj._valids.remove(value);
            obj._invalids.add(value, obj._refs);
        }

        return obj;
    }

    required() {

        if (this._flags.presence === 'required') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'required';
        return obj;
    }

    optional() {

        if (this._flags.presence === 'optional') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'optional';
        return obj;
    }


    forbidden() {

        if (this._flags.presence === 'forbidden') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'forbidden';
        return obj;
    }


    strip() {

        if (this._flags.strip) {
            return this;
        }

        const obj = this.clone();
        obj._flags.strip = true;
        return obj;
    }

    applyFunctionToChildren(children, fn, args = [], root) {

        children = [].concat(children);

        if (children.length !== 1 || children[0] !== '') {
            root = root ? (root + '.') : '';

            const extraChildren = (children[0] === '' ? children.slice(1) : children).map((child) => {

                return root + child;
            });

            throw new Error('unknown key(s) ' + extraChildren.join(', '));
        }

        return this[fn](...args);
    }

    default(value, description) {

        if (typeof value === 'function' &&
            !Ref.isRef(value)) {

            if (!value.description &&
                description) {

                value.description = description;
            }

            if (!this._flags.func) {
                Hoek.assert(typeof value.description === 'string' && value.description.length > 0, 'description must be provided when default value is a function');
            }
        }

        const obj = this.clone();
        obj._flags.default = value;
        Ref.push(obj._refs, value);
        return obj;
    }

    empty(schema) {

        const obj = this.clone();
        if (schema === undefined) {
            delete obj._flags.empty;
        }
        else {
            obj._flags.empty = Cast.schema(this._currentJoi, schema);
        }

        return obj;
    }

    when(condition, options) {

        Hoek.assert(options && typeof options === 'object', 'Invalid options');
        Hoek.assert(options.then !== undefined || options.otherwise !== undefined, 'options must have at least one of "then" or "otherwise"');

        const then = options.hasOwnProperty('then') ? this.concat(Cast.schema(this._currentJoi, options.then)) : undefined;
        const otherwise = options.hasOwnProperty('otherwise') ? this.concat(Cast.schema(this._currentJoi, options.otherwise)) : undefined;

        Alternatives = Alternatives || require('../alternatives');

        const alternativeOptions = { then, otherwise };
        if (Object.prototype.hasOwnProperty.call(options, 'is')) {
            alternativeOptions.is = options.is;
        }

        const obj = Alternatives.when(condition, alternativeOptions);
        obj._flags.presence = 'ignore';
        obj._baseType = this;

        return obj;
    }

    description(desc) {

        Hoek.assert(desc && typeof desc === 'string', 'Description must be a non-empty string');

        const obj = this.clone();
        obj._description = desc;
        return obj;
    }

    notes(notes) {

        Hoek.assert(notes && (typeof notes === 'string' || Array.isArray(notes)), 'Notes must be a non-empty string or array');

        const obj = this.clone();
        obj._notes = obj._notes.concat(notes);
        return obj;
    }

    tags(tags) {

        Hoek.assert(tags && (typeof tags === 'string' || Array.isArray(tags)), 'Tags must be a non-empty string or array');

        const obj = this.clone();
        obj._tags = obj._tags.concat(tags);
        return obj;
    }

    meta(meta) {

        Hoek.assert(meta !== undefined, 'Meta cannot be undefined');

        const obj = this.clone();
        obj._meta = obj._meta.concat(meta);
        return obj;
    }

    example(...examples) {

        Hoek.assert(examples.length > 0, 'Missing examples');

        const processed = [];
        for (let i = 0; i < examples.length; ++i) {
            const example = [].concat(examples[i]);
            Hoek.assert(example.length <= 2, `Bad example format at index ${i}`);

            const value = example[0];
            let options = example[1];
            if (options !== undefined) {
                Hoek.assert(options && typeof options === 'object', `Options for example at index ${i} must be an object`);
                const unknownOptions = Object.keys(options).filter((option) => !['parent', 'context'].includes(option));
                Hoek.assert(unknownOptions.length === 0, `Unknown example options ${unknownOptions} at index ${i}`);
            }
            else {
                options = {};
            }

            const localState = new State('', [], options.parent || null);
            const result = this._validate(value, localState, Settings.concat(internals.defaults, options.context ? { context: options.context } : null));
            Hoek.assert(!result.errors, `Bad example at index ${i}:`, result.errors && Errors.process(result.errors, value));

            const ex = { value };
            if (Object.keys(options).length) {
                ex.options = options;
            }

            processed.push(ex);
        }

        const obj = this.clone();
        obj._examples = processed;
        return obj;
    }

    unit(name) {

        Hoek.assert(name && typeof name === 'string', 'Unit name must be a non-empty string');

        const obj = this.clone();
        obj._unit = name;
        return obj;
    }

    _prepareEmptyValue(value) {

        if (typeof value === 'string' && this._flags.trim) {
            return value.trim();
        }

        return value;
    }

    _validate(value, state, options, reference) {

        const originalValue = value;

        // Setup state and settings

        state = state || new State('', [], null, reference);

        if (this._settings) {
            const isDefaultOptions = options === internals.defaults;
            if (isDefaultOptions && this._settings[Symbols.settingsCache]) {
                options = this._settings[Symbols.settingsCache];
            }
            else {
                options = Settings.concat(this._language ? Settings.concat({ language: this._language }, options) : options, this._settings);
                if (isDefaultOptions) {
                    this._settings[Symbols.settingsCache] = options;
                }
            }
        }
        else if (this._language) {
            options = Settings.concat({ language: this._language }, options);
        }

        let errors = [];

        if (this._coerce) {
            const coerced = this._coerce(value, state, options);
            if (coerced.errors) {
                value = coerced.value;
                errors = errors.concat(coerced.errors);
                return this._finalizeValue(value, originalValue, errors, state, options);                            // Coerced error always aborts early
            }

            value = coerced.value;
        }

        if (this._flags.empty && !this._flags.empty._validate(this._prepareEmptyValue(value), null, internals.defaults).errors) {
            value = undefined;
        }

        // Check presence requirements

        const presence = this._flags.presence || options.presence;
        if (presence === 'optional') {
            if (value === undefined) {
                const isDeepDefault = this._flags.hasOwnProperty('default') && this._flags.default === undefined;
                if (isDeepDefault && this._type === 'object') {
                    value = {};
                }
                else {
                    return this._finalizeValue(value, originalValue, errors, state, options);
                }
            }
        }
        else if (presence === 'required' &&
            value === undefined) {

            errors.push(this.createError('any.required', null, state, options));
            return this._finalizeValue(value, originalValue, errors, state, options);
        }
        else if (presence === 'forbidden') {
            if (value === undefined) {
                return this._finalizeValue(value, originalValue, errors, state, options);
            }

            errors.push(this.createError('any.unknown', null, state, options));
            return this._finalizeValue(value, originalValue, errors, state, options);
        }

        // Check allowed and denied values using the original value

        let match = this._valids.get(value, state, options, this._flags.insensitive);
        if (match) {
            if (options.convert) {
                value = match.value;
            }

            return this._finalizeValue(value, originalValue, errors, state, options);
        }

        if (this._invalids.has(value, state, options, this._flags.insensitive)) {
            errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', { value, invalids: this._invalids.values({ stripUndefined: true }) }, state, options));
            if (options.abortEarly) {

                return this._finalizeValue(value, originalValue, errors, state, options);
            }
        }

        // Convert value and validate type

        if (this._base) {
            const base = this._base(value, state, options);
            if (base.errors) {
                value = base.value;
                errors = errors.concat(base.errors);
                return this._finalizeValue(value, originalValue, errors, state, options);                            // Base error always aborts early
            }

            if (base.value !== value) {
                value = base.value;

                // Check allowed and denied values using the converted value

                match = this._valids.get(value, state, options, this._flags.insensitive);
                if (match) {
                    value = match.value;
                    return this._finalizeValue(value, originalValue, errors, state, options);
                }

                if (this._invalids.has(value, state, options, this._flags.insensitive)) {
                    errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', { value, invalids: this._invalids.values({ stripUndefined: true }) }, state, options));
                    if (options.abortEarly) {
                        return this._finalizeValue(value, originalValue, errors, state, options);
                    }
                }
            }
        }

        // Required values did not match

        if (this._flags.allowOnly) {
            errors.push(this.createError('any.allowOnly', { value, valids: this._valids.values({ stripUndefined: true }) }, state, options));
            if (options.abortEarly) {
                return this._finalizeValue(value, originalValue, errors, state, options);
            }
        }

        // Validate tests

        for (let i = 0; i < this._tests.length; ++i) {
            const test = this._tests[i];
            const ret = test.func.call(this, value, state, options);
            if (ret instanceof Errors.Err) {
                errors.push(ret);
                if (options.abortEarly) {
                    return this._finalizeValue(value, originalValue, errors, state, options);
                }
            }
            else {
                value = ret;
            }
        }

        return this._finalizeValue(value, originalValue, errors, state, options);
    }

    _finalizeValue(value, originalValue, errors, state, options) {

        let finalValue;

        if (value !== undefined) {
            finalValue = this._flags.raw ? originalValue : value;
        }
        else if (options.noDefaults) {
            finalValue = value;
        }
        else if (Ref.isRef(this._flags.default)) {
            finalValue = this._flags.default(state.parent, options);
        }
        else if (typeof this._flags.default === 'function' &&
            !(this._flags.func && !this._flags.default.description)) {

            let args;

            if (state.parent !== null &&
                this._flags.default.length > 0) {

                args = [Hoek.clone(state.parent), options];
            }

            const defaultValue = internals._try(this._flags.default, args);
            finalValue = defaultValue.value;
            if (defaultValue.error) {
                errors.push(this.createError('any.default', { error: defaultValue.error }, state, options));
            }
        }
        else {
            finalValue = Hoek.clone(this._flags.default);
        }

        if (errors.length &&
            typeof this._flags.error === 'function' &&
            (
                !this._flags.selfError ||
                errors.some((e) => state.path.length === e.path.length)
            )
        ) {
            const change = this._flags.error.call(this, errors);

            if (typeof change === 'string') {
                errors = [this.createOverrideError('override', { reason: errors }, state, options, change)];
            }
            else {
                errors = [].concat(change)
                    .map((err) => {

                        return err instanceof Error ?
                            err :
                            this.createOverrideError(err.type || 'override', err.context, state, options, err.message, err.template);
                    });
            }
        }

        return {
            value: this._flags.strip ? undefined : finalValue,
            finalValue,
            errors: errors.length ? errors : null
        };
    }

    _validateWithOptions(value, options, callback) {

        if (options) {
            this.checkOptions(options);
        }

        const settings = Settings.concat(internals.defaults, options);
        const result = this._validate(value, null, settings);
        const errors = Errors.process(result.errors, value);

        if (callback) {
            return callback(errors, result.value);
        }

        return {
            error: errors,
            value: result.value,
            then(resolve, reject) {

                if (errors) {
                    return Promise.reject(errors).catch(reject);
                }

                return Promise.resolve(result.value).then(resolve);
            },
            catch(reject) {

                if (errors) {
                    return Promise.reject(errors).catch(reject);
                }

                return Promise.resolve(result.value);
            }
        };
    }

    validate(value, options, callback) {

        if (typeof options === 'function') {
            return this._validateWithOptions(value, null, options);
        }

        return this._validateWithOptions(value, options, callback);
    }

    describe() {

        const description = {
            type: this._type
        };

        const flags = Object.keys(this._flags);
        if (flags.length) {
            if (['empty', 'default', 'lazy', 'label'].some((flag) => this._flags.hasOwnProperty(flag))) {
                description.flags = {};
                for (let i = 0; i < flags.length; ++i) {
                    const flag = flags[i];
                    if (flag === 'empty') {
                        description.flags[flag] = this._flags[flag].describe();
                    }
                    else if (flag === 'default') {
                        if (Ref.isRef(this._flags[flag])) {
                            description.flags[flag] = this._flags[flag].toString();
                        }
                        else if (typeof this._flags[flag] === 'function') {
                            description.flags[flag] = {
                                description: this._flags[flag].description,
                                function   : this._flags[flag]
                            };
                        }
                        else {
                            description.flags[flag] = this._flags[flag];
                        }
                    }
                    else if (flag === 'lazy' || flag === 'label') {
                        // We don't want it in the description
                    }
                    else {
                        description.flags[flag] = this._flags[flag];
                    }
                }
            }
            else {
                description.flags = this._flags;
            }
        }

        if (this._settings) {
            description.options = Hoek.clone(this._settings);
        }

        if (this._baseType) {
            description.base = this._baseType.describe();
        }

        if (this._description) {
            description.description = this._description;
        }

        if (this._notes.length) {
            description.notes = this._notes;
        }

        if (this._tags.length) {
            description.tags = this._tags;
        }

        if (this._meta.length) {
            description.meta = this._meta;
        }

        if (this._examples.length) {
            description.examples = this._examples;
        }

        if (this._unit) {
            description.unit = this._unit;
        }

        const valids = this._valids.values();
        if (valids.length) {
            description.valids = valids.map((v) => {

                return Ref.isRef(v) ? v.toString() : v;
            });
        }

        const invalids = this._invalids.values();
        if (invalids.length) {
            description.invalids = invalids.map((v) => {

                return Ref.isRef(v) ? v.toString() : v;
            });
        }

        description.rules = [];

        for (let i = 0; i < this._tests.length; ++i) {
            const validator = this._tests[i];
            const item = { name: validator.name };

            if (validator.arg !== void 0) {
                item.arg = Ref.isRef(validator.arg) ? validator.arg.toString() : validator.arg;
            }

            const options = validator.options;
            if (options) {
                if (options.hasRef) {
                    item.arg = {};
                    const keys = Object.keys(validator.arg);
                    for (let j = 0; j < keys.length; ++j) {
                        const key = keys[j];
                        const value = validator.arg[key];
                        item.arg[key] = Ref.isRef(value) ? value.toString() : value;
                    }
                }

                if (typeof options.description === 'string') {
                    item.description = options.description;
                }
                else if (typeof options.description === 'function') {
                    item.description = options.description(item.arg);
                }
            }

            description.rules.push(item);
        }

        if (!description.rules.length) {
            delete description.rules;
        }

        const label = this._getLabel();
        if (label) {
            description.label = label;
        }

        return description;
    }

    label(name) {

        Hoek.assert(name && typeof name === 'string', 'Label name must be a non-empty string');

        const obj = this.clone();
        obj._flags.label = name;
        return obj;
    }

    _getLabel(def) {

        return this._flags.label || def;
    }

};


internals.Any.prototype.isImmutable = true;     // Prevents Hoek from deep cloning schema objects

// Aliases

internals.Any.prototype.only = internals.Any.prototype.equal = internals.Any.prototype.valid;
internals.Any.prototype.disallow = internals.Any.prototype.not = internals.Any.prototype.invalid;
internals.Any.prototype.exist = internals.Any.prototype.required;


internals.Any.prototype[internals.symbol] = {
    version: Pkg.version,
    compile: Cast.schema,
    root: '_currentJoi'
};


internals._try = function (fn, args = []) {

    let err;
    let result;

    try {
        result = fn(...args);
    }
    catch (e) {
        err = e;
    }

    return {
        value: result,
        error: err
    };
};
