const deepFreeze = obj =>
  Object.keys(obj).forEach(
    prop =>
      !obj[prop] instanceof Object || Object.isFrozen(obj[prop]) ? null : deepFreeze(obj[prop])
  ) || Object.freeze(obj);
module.exports = deepFreeze;
