module.exports = httpDelete = (url, callback, err = console.error) => {
const request = new XMLHttpRequest();
request.open("DELETE", url, true);
request.onload = () => callback(request);
request.onerror = () => err(request);
request.send();
};