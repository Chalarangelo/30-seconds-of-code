// @flow strict

declare function isInteger(value: mixed): boolean %checks(typeof value ===
  'number');

/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
const isInteger =
  Number.isInteger ||
  function(value) {
    return (
      typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
export default isInteger;
