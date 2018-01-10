module.exports = httpPut = (url, data, callback, err = console.error) => {
const request = new XMLHttpRequest();
request.open("PUT", url, true);
request.setRequestHeader('Content-type','application/json; charset=utf-8');
request.onload = () => callback(request);
request.onerror = () => err(request);
request.send(data);
};