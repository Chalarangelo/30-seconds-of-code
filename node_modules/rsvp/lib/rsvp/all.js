import Promise from "./promise";

/**
  This is a convenient alias for `Promise.all`.

  @method all
  @public
  @static
  @for rsvp
  @param {Array} array Array of promises.
  @param {String} [label] An optional label. This is useful
  for tooling.
*/
export default function all(array, label) {
  return Promise.all(array, label);
}
