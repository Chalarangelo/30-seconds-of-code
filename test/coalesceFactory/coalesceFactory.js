const coalesceFactory = valid => (...args) => args.find(valid);
module.exports = coalesceFactory;
