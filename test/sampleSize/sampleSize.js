const sampleSize = ([...arr], n = 1) => {
let m = arr.length;
while (m) {
const i = Math.floor(Math.random() * m--);
[arr[m], arr[i]] = [arr[i], arr[m]];
}
return arr.slice(0, n);
};
module.exports = sampleSize;