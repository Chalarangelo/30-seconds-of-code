const runAsync = fn => {
const blob = `var fn = ${fn.toString()}; postMessage(fn());`;
const worker = new Worker(
URL.createObjectURL(new Blob([blob]), {
type: 'application/javascript; charset=utf-8'
})
);
return new Promise((res, rej) => {
worker.onmessage = ({ data }) => {
res(data), worker.terminate();
};
worker.onerror = err => {
rej(err), worker.terminate();
};
});
};
module.exports = runAsync