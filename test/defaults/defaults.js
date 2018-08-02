const defaults = (obj, ...defs) => Object.assign({}, obj, ...defs.reverse(), obj);

module.exports = defaults;