import Enumerator from './enumerator';
import {
  PENDING,
  FULFILLED,
  fulfill
} from './-internal';

export default class PromiseHash extends Enumerator {
  constructor(Constructor, object, abortOnReject = true, label) {
    super(Constructor, object, abortOnReject, label);
  }

  _init(Constructor, object) {
    this._result = {};
    this._enumerate(object);
  }

  _enumerate(input) {
    let keys = Object.keys(input);

    let length = keys.length;
    let promise = this.promise;
    this._remaining = length;

    let key, val;
    for (let i = 0; promise._state === PENDING && i < length; i++) {
      key = keys[i];
      val = input[key];
      this._eachEntry(val, key, true);
    }

    this._checkFullfillment();
  }
}
