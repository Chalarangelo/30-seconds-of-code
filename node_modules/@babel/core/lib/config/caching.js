"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStrongCache = makeStrongCache;
exports.makeWeakCache = makeWeakCache;
exports.assertSimpleType = assertSimpleType;

function makeStrongCache(handler) {
  return makeCachedFunction(new Map(), handler);
}

function makeWeakCache(handler) {
  return makeCachedFunction(new WeakMap(), handler);
}

function makeCachedFunction(callCache, handler) {
  return function cachedFunction(arg, data) {
    let cachedValue = callCache.get(arg);

    if (cachedValue) {
      for (const _ref of cachedValue) {
        const {
          value,
          valid
        } = _ref;
        if (valid(data)) return value;
      }
    }

    const cache = new CacheConfigurator(data);
    const value = handler(arg, cache);
    if (!cache.configured()) cache.forever();
    cache.deactivate();

    switch (cache.mode()) {
      case "forever":
        cachedValue = [{
          value,
          valid: () => true
        }];
        callCache.set(arg, cachedValue);
        break;

      case "invalidate":
        cachedValue = [{
          value,
          valid: cache.validator()
        }];
        callCache.set(arg, cachedValue);
        break;

      case "valid":
        if (cachedValue) {
          cachedValue.push({
            value,
            valid: cache.validator()
          });
        } else {
          cachedValue = [{
            value,
            valid: cache.validator()
          }];
          callCache.set(arg, cachedValue);
        }

    }

    return value;
  };
}

class CacheConfigurator {
  constructor(data) {
    this._active = true;
    this._never = false;
    this._forever = false;
    this._invalidate = false;
    this._configured = false;
    this._pairs = [];
    this._data = data;
  }

  simple() {
    return makeSimpleConfigurator(this);
  }

  mode() {
    if (this._never) return "never";
    if (this._forever) return "forever";
    if (this._invalidate) return "invalidate";
    return "valid";
  }

  forever() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never) {
      throw new Error("Caching has already been configured with .never()");
    }

    this._forever = true;
    this._configured = true;
  }

  never() {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._forever) {
      throw new Error("Caching has already been configured with .forever()");
    }

    this._never = true;
    this._configured = true;
  }

  using(handler) {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never || this._forever) {
      throw new Error("Caching has already been configured with .never or .forever()");
    }

    this._configured = true;
    const key = handler(this._data);

    this._pairs.push([key, handler]);

    return key;
  }

  invalidate(handler) {
    if (!this._active) {
      throw new Error("Cannot change caching after evaluation has completed.");
    }

    if (this._never || this._forever) {
      throw new Error("Caching has already been configured with .never or .forever()");
    }

    this._invalidate = true;
    this._configured = true;
    const key = handler(this._data);

    this._pairs.push([key, handler]);

    return key;
  }

  validator() {
    const pairs = this._pairs;
    return data => pairs.every(([key, fn]) => key === fn(data));
  }

  deactivate() {
    this._active = false;
  }

  configured() {
    return this._configured;
  }

}

function makeSimpleConfigurator(cache) {
  function cacheFn(val) {
    if (typeof val === "boolean") {
      if (val) cache.forever();else cache.never();
      return;
    }

    return cache.using(() => assertSimpleType(val()));
  }

  cacheFn.forever = () => cache.forever();

  cacheFn.never = () => cache.never();

  cacheFn.using = cb => cache.using(() => assertSimpleType(cb()));

  cacheFn.invalidate = cb => cache.invalidate(() => assertSimpleType(cb()));

  return cacheFn;
}

function assertSimpleType(value) {
  if (value != null && typeof value !== "string" && typeof value !== "boolean" && typeof value !== "number") {
    throw new Error("Cache keys must be either string, boolean, number, null, or undefined.");
  }

  return value;
}