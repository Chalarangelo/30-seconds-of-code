const pullBy = (arr, ...args) => {
const length = args.length;
let fn = length > 1 ? args[length - 1] : undefined;
fn = typeof fn == 'function' ? (args.pop(), fn) : undefined;
let argState = (Array.isArray(args[0]) ? args[0] : args).map(val => fn(val));
let pulled = arr.filter((v, i) => !argState.includes(fn(v)));
arr.length = 0;
pulled.forEach(v => arr.push(v));
};
module.exports = pullBy