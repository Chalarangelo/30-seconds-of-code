const zipWith = (...arrays) => {
const length = arrays.length;
let fn = length > 1 ? arrays[length - 1] : undefined;
fn = typeof fn == 'function' ? (arrays.pop(), fn) : undefined;
const maxLength = Math.max(...arrays.map(x => x.length));
const result = Array.from({ length: maxLength }).map((_, i) => {
return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
});
return fn ? result.map(arr => fn(...arr)) : result;
};
 module.exports = zipWith