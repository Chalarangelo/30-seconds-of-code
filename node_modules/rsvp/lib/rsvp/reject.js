import Promise from './promise';

/**
  This is a convenient alias for `Promise.reject`.

  @method reject
  @public
  @static
  @for rsvp
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
export default function reject(reason, label) {
  return Promise.reject(reason, label);
}
