import Promise from './promise';
import {
  default as Enumerator
} from './enumerator';
import {
  REJECTED
} from './-internal';

export class MapEnumerator extends Enumerator {
  constructor(Constructor, entries, mapFn, label) {
    super(Constructor, entries, true, label, mapFn);
  }

  _init(Constructor, input, bool, label, mapFn) {
    let len = input.length || 0;
    this.length     = len;
    this._remaining = len;
    this._result = new Array(len);
    this._mapFn = mapFn;

    this._enumerate(input);
  }

  _setResultAt(state, i, value, firstPass) {
    if (firstPass) {
      try {
        this._eachEntry(this._mapFn(value, i), i, false);
      } catch (error) {
        this._settledAt(REJECTED, i, error, false);
      }
    } else {
      this._remaining--;
      this._result[i] = value;
    }
  }
}


/**
 `map` is similar to JavaScript's native `map` method. `mapFn` is eagerly called
  meaning that as soon as any promise resolves its value will be passed to `mapFn`.
  `map` returns a promise that will become fulfilled with the result of running
  `mapFn` on the values the promises become fulfilled with.

  For example:

  ```javascript
  import { map, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  map(promises, mapFn).then(function(result){
    // result is [ 2, 3, 4 ]
  });
  ```

  If any of the `promises` given to `map` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  import { map, reject, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = reject(new Error('2'));
  let promise3 = reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  map(promises, mapFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `map` will also wait if a promise is returned from `mapFn`. For example,
  say you want to get all comments from a set of blog posts, but you need
  the blog posts first because they contain a url to those comments.

  ```javscript
  import { map } from 'rsvp';

  let mapFn = function(blogPost){
    // getComments does some ajax and returns an Promise that is fulfilled
    // with some comments data
    return getComments(blogPost.comments_url);
  };

  // getBlogPosts does some ajax and returns an Promise that is fulfilled
  // with some blog post data
  map(getBlogPosts(), mapFn).then(function(comments){
    // comments is the result of asking the server for the comments
    // of all blog posts returned from getBlogPosts()
  });
  ```

  @method map
  @public
  @static
  @for rsvp
  @param {Array} promises
  @param {Function} mapFn function to be called on each fulfilled promise.
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with the result of calling
  `mapFn` on each fulfilled promise or value when they become fulfilled.
   The promise will be rejected if any of the given `promises` become rejected.
*/
export default function map(promises, mapFn, label) {
  if (typeof mapFn !== 'function') {
    return Promise.reject(new TypeError("map expects a function as a second argument"), label);
  }

  return Promise.resolve(promises, label)
    .then(function(promises) {
      if (!Array.isArray(promises)) {
        throw new TypeError("map must be called with an array");
      }
      return new MapEnumerator(Promise, promises, mapFn, label).promise;
    });
}
