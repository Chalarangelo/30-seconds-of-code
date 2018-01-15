module.exports = functions = (obj, inherited = false) =>
(inherited
? [...Object.keys(obj), ...Object.keys(Object.getPrototypeOf(obj))]
: Object.keys(obj)
).filter(key => typeof obj[key] === 'function');