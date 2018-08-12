const rearg = (fn, indexes) => (...args) => fn(...indexes.map(idx => args[idx]));
module.exports = rearg;
