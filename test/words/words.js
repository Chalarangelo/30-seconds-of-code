const words = (str, pattern = /[^a-zA-Z-]+/) => str.split(pattern).filter(Boolean);
module.exports = words;