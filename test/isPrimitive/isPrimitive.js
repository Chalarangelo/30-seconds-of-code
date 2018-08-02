const isPrimitive = val => !['object', 'function'].includes(typeof val) || val === null;

module.exports = isPrimitive;