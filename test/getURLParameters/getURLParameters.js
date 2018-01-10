module.exports = getURLParameters = url =>
url
.match(/([^?=&]+)(=([^&]*))/g)
.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {});