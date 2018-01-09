module.exports = (...arrays) => {
const maxLength = Math.max(...arrays.map(x => x.length));
return Array.from({ length: maxLength }).map((_, i) => {
return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
});
};