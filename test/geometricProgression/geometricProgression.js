const geometricProgression = (end, start = 1, step = 2) =>
Array.from({ length: Math.floor(Math.log(end / start) / Math.log(step)) + 1 }).map(
(v, i) => start * step ** i
);
 module.exports = geometricProgression