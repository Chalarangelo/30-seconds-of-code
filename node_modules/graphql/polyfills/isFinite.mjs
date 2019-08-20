/* eslint-disable no-redeclare */
// $FlowFixMe workaround for: https://github.com/facebook/flow/issues/4441
var isFinite = Number.isFinite || function (value) {
  return typeof value === 'number' && isFinite(value);
};

export default isFinite;
