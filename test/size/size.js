const size = val =>
Array.isArray(val)
? val.length
: val && typeof val === 'object'
? val.size || val.length || Object.keys(val).length
: typeof val === 'string' ? new Blob([val]).size : 0;
 module.exports = size