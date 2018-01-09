module.exports = callback => {
console.time('timeTaken');
const r = callback();
console.timeEnd('timeTaken');
return r;
};