const isPlainObject = val => !!val && typeof val === 'object' && val.constructor === Object;
 module.exports = isPlainObject