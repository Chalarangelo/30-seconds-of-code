const collectInto = fn => (...args) => fn(args);

module.exports = collectInto;