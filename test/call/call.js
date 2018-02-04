const call = (key, ...args) => context => context[key](...args);
module.exports = call;