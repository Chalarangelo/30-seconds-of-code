const bindKey = (context, fn, ...boundArgs) => (...args) => context[fn].apply(context, [...boundArgs, ...args]);
module.exports = bindKey;
