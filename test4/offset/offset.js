const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
module.exports = offset;