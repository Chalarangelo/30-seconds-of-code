import Promise from "./promise";

/**
  `defer` returns an object similar to jQuery's `$.Deferred`.
  `defer` should be used when porting over code reliant on `$.Deferred`'s
  interface. New code should use the `Promise` constructor instead.

  The object returned from `defer` is a plain object with three properties:

  * promise - an `Promise`.
  * reject - a function that causes the `promise` property on this object to
    become rejected
  * resolve - a function that causes the `promise` property on this object to
    become fulfilled.

  Example:

   ```javascript
   let deferred = defer();

   deferred.resolve("Success!");

   deferred.promise.then(function(value){
     // value here is "Success!"
   });
   ```

  @method defer
  @public
  @static
  @for rsvp
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Object}
 */

export default function defer(label) {
  let deferred = { resolve: undefined, reject: undefined };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  }, label);

  return deferred;
}
