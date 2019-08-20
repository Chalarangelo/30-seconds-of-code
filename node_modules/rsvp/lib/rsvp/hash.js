import Promise from './promise';
import PromiseHash from './promise-hash';

/**
  `hash` is similar to `all`, but takes an object instead of an array
  for its `promises` argument.

  Returns a promise that is fulfilled when all the given promises have been
  fulfilled, or rejected if any of them become rejected. The returned promise
  is fulfilled with a hash that has the same key names as the `promises` object
  argument. If any of the values in the object are not promises, they will
  simply be copied over to the fulfilled object.

  Example:

  ```javascript
  let promises = {
    myPromise: resolve(1),
    yourPromise: resolve(2),
    theirPromise: resolve(3),
    notAPromise: 4
  };

  hash(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise: 1,
    //   yourPromise: 2,
    //   theirPromise: 3,
    //   notAPromise: 4
    // }
  });
  ```

  If any of the `promises` given to `hash` are rejected, the first promise
  that is rejected will be given as the reason to the rejection handler.

  Example:

  ```javascript
  let promises = {
    myPromise: resolve(1),
    rejectedPromise: reject(new Error('rejectedPromise')),
    anotherRejectedPromise: reject(new Error('anotherRejectedPromise')),
  };

  hash(promises).then(function(hash){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === 'rejectedPromise'
  });
  ```

  An important note: `hash` is intended for plain JavaScript objects that
  are just a set of keys and values. `hash` will NOT preserve prototype
  chains.

  Example:

  ```javascript
  import { hash, resolve } from 'rsvp';
  function MyConstructor(){
    this.example = resolve('Example');
  }

  MyConstructor.prototype = {
    protoProperty: resolve('Proto Property')
  };

  let myObject = new MyConstructor();

  hash(myObject).then(function(hash){
    // protoProperty will not be present, instead you will just have an
    // object that looks like:
    // {
    //   example: 'Example'
    // }
    //
    // hash.hasOwnProperty('protoProperty'); // false
    // 'undefined' === typeof hash.protoProperty
  });
  ```

  @method hash
  @public
  @static
  @for rsvp
  @param {Object} object
  @param {String} [label] optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all properties of `promises`
  have been fulfilled, or rejected if any of them become rejected.
*/
export default function hash(object, label) {
  return Promise.resolve(object, label)
    .then(function(object) {
      if (object === null || typeof object !== 'object') {
        throw new TypeError("Promise.hash must be called with an object");
      }
      return new PromiseHash(Promise, object, label).promise;
    });
}
