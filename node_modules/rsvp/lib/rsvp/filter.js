import Promise from './promise';
import { MapEnumerator } from './map';
import {
  fulfill,
  REJECTED
} from './-internal';

const EMPTY_OBJECT = {};

class FilterEnumerator extends MapEnumerator {

  _checkFullfillment() {
    if (this._remaining === 0 && this._result !== null) {
      let result = this._result.filter((val) => val !== EMPTY_OBJECT);
      fulfill(this.promise, result);
      this._result = null;
    }
  }

  _setResultAt(state, i, value, firstPass) {
    if (firstPass) {
      this._result[i] = value;
      let val, succeeded = true;
      try {
        val = this._mapFn(value, i);
      } catch (error) {
        succeeded = false;
        this._settledAt(REJECTED, i, error, false);
      }
      if (succeeded) {
        this._eachEntry(val, i, false);
      }
    } else {
      this._remaining--;
      if (!value) {
        this._result[i] = EMPTY_OBJECT;
      }
    }
  }
}

/**
 `filter` is similar to JavaScript's native `filter` method.
 `filterFn` is eagerly called meaning that as soon as any promise
  resolves its value will be passed to `filterFn`. `filter` returns
  a promise that will become fulfilled with the result of running
  `filterFn` on the values the promises become fulfilled with.

  For example:

  ```javascript
  import { filter, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);

  let promises = [promise1, promise2, promise3];

  let filterFn = function(item){
    return item > 1;
  };

  filter(promises, filterFn).then(function(result){
    // result is [ 2, 3 ]
  });
  ```

  If any of the `promises` given to `filter` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  import { filter, reject, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = reject(new Error('2'));
  let promise3 = reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let filterFn = function(item){
    return item > 1;
  };

  filter(promises, filterFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `filter` will also wait for any promises returned from `filterFn`.
  For instance, you may want to fetch a list of users then return a subset
  of those users based on some asynchronous operation:

  ```javascript
  import { filter, resolve } from 'rsvp';

  let alice = { name: 'alice' };
  let bob   = { name: 'bob' };
  let users = [ alice, bob ];

  let promises = users.map(function(user){
    return resolve(user);
  });

  let filterFn = function(user){
    // Here, Alice has permissions to create a blog post, but Bob does not.
    return getPrivilegesForUser(user).then(function(privs){
      return privs.can_create_blog_post === true;
    });
  };
  filter(promises, filterFn).then(function(users){
    // true, because the server told us only Alice can create a blog post.
    users.length === 1;
    // false, because Alice is the only user present in `users`
    users[0] === bob;
  });
  ```

  @method filter
  @public
  @static
  @for rsvp
  @param {Array} promises
  @param {Function} filterFn - function to be called on each resolved value to
  filter the final results.
  @param {String} [label] optional string describing the promise. Useful for
  tooling.
  @return {Promise}
*/

export default function filter(promises, filterFn, label) {
  if (typeof filterFn !== 'function') {
    return Promise.reject(new TypeError("filter expects function as a second argument"), label);
  }

  return Promise.resolve(promises, label)
    .then(function(promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("filter must be called with an array");
      }
      return new FilterEnumerator(Promise, promises, filterFn, label).promise;
    });
}
