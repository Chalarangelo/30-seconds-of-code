const matchesWith = (obj, source, fn) =>
Object.keys(source).every(
key =>
obj.hasOwnProperty(key) && fn
? fn(obj[key], source[key], key, obj, source)
: obj[key] == source[key]
);
 module.exports = matchesWith