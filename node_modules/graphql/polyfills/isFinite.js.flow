// @flow strict

declare function isFinite(value: mixed): boolean %checks(typeof value ===
  'number');

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
const isFinite =
  Number.isFinite ||
  function(value) {
    return typeof value === 'number' && isFinite(value);
  };
export default isFinite;
