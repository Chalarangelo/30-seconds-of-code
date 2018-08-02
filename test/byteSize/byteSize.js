const byteSize = str => new Blob([str]).size;

module.exports = byteSize;