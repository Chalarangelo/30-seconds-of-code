const runAsync = fn => {
const worker = new Worker(
URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
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
module.exports = runAsync;