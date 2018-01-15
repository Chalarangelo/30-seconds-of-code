module.exports = randomIntArrayInRange = (min, max, n = 1) =>
Array.from({ length: n }, () => Math.floor(Math.random() * (max - min + 1)) + min);