module.exports = randomIntWithLengthInRange = (len, min, max) =>
Array.from({ length: len }, () =>
Math.floor(Math.random() * (max - min) + min)
);