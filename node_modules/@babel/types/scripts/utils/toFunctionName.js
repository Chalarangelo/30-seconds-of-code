module.exports = function toFunctionName(typeName) {
  const _ = typeName.replace(/^TS/, "ts").replace(/^JSX/, "jsx");
  return _.slice(0, 1).toLowerCase() + _.slice(1);
};
