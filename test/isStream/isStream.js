const isStream = val => val !== null && typeof val === 'object' && typeof val.pipe === 'function';
module.exports = isStream;
