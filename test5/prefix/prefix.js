const prefix = prop => {
const capitalizedProp = prop.charAt(0).toUpperCase() + prop.slice(1);
const prefixes = ['', 'webkit', 'moz', 'ms', 'o'];
const i = prefixes.findIndex(
prefix => typeof document.body.style[prefix ? prefix + capitalizedProp : prop] !== 'undefined'
);
return i !== -1 ? (i === 0 ? prop : prefixes[i] + capitalizedProp) : null;
};
module.exports = prefix;