import {
  noop,
  resolve,
  handleMaybeThenable,
  reject,
  fulfill,
  subscribe,
  FULFILLED,
  REJECTED,
  PENDING,
} from './-internal';

import { default as OwnPromise } from './promise';
import ownThen from './then';
import ownResolve from './promise/resolve';

export default class Enumerator {
  constructor(Constructor, input, abortOnReject, label) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop, label);
    this._abortOnReject = abortOnReject;
    this._isUsingOwnPromise = Constructor === OwnPromise;
    this._isUsingOwnResolve = Constructor.resolve === ownResolve;

    this._init(...arguments);
  }

  _init(Constructor, input) {
    let len = input.length || 0;
    this.length     = len;
    this._remaining = len;
    this._result = new Array(len);

    this._enumerate(input);
  }

  _enumerate(input) {
    let length  = this.length;
    let promise = this.promise;

    for (let i = 0; promise._state === PENDING && i < length; i++) {
      this._eachEntry(input[i], i, true);
    }
    this._checkFullfillment();
  }

  _checkFullfillment() {
    if (this._remaining === 0) {
      let result = this._result;
      fulfill(this.promise, result);
      this._result = null
    }
  }

  _settleMaybeThenable(entry, i, firstPass) {
    let c = this._instanceConstructor;

    if (this._isUsingOwnResolve) {
      let then, error, succeeded = true;
      try {
        then = entry.then;
      } catch (e) {
        succeeded = false;
        error = e;
      }

      if (then === ownThen && entry._state !== PENDING) {
        entry._onError = null;
        this._settledAt(entry._state, i, entry._result, firstPass);
      } else if (typeof then !== 'function') {
        this._settledAt(FULFILLED, i, entry, firstPass);
      } else if (this._isUsingOwnPromise) {
        let promise = new c(noop);
        if (succeeded === false) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, then);
          this._willSettleAt(promise, i, firstPass);
        }
      } else {
        this._willSettleAt(new c(resolve => resolve(entry)), i, firstPass);
      }
    } else {
      this._willSettleAt(c.resolve(entry), i, firstPass);
    }
  }

  _eachEntry(entry, i, firstPass) {
    if (entry !== null && typeof entry === 'object') {
      this._settleMaybeThenable(entry, i, firstPass);
    } else {
      this._setResultAt(FULFILLED, i, entry, firstPass);
    }
  }

  _settledAt(state, i, value, firstPass) {
    let promise = this.promise;

    if (promise._state === PENDING) {
      if (this._abortOnReject && state === REJECTED) {
        reject(promise, value);
      } else {
        this._setResultAt(state, i, value, firstPass);
        this._checkFullfillment();
      }
    }
  }

  _setResultAt(state, i, value, firstPass) {
    this._remaining--;
    this._result[i] = value;
  }

  _willSettleAt(promise, i, firstPass) {
    subscribe(
      promise, undefined,
      value  => this._settledAt(FULFILLED, i, value, firstPass),
      reason => this._settledAt(REJECTED,  i, reason, firstPass)
    );
  }
}

export function setSettledResult(state, i, value) {
  this._remaining--;
  if (state === FULFILLED) {
    this._result[i] = {
      state: 'fulfilled',
      value: value
    };
  } else {
     this._result[i] = {
      state: 'rejected',
      reason: value
    };
  }
}
