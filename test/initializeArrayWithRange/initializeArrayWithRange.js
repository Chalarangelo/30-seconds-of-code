const initializeArrayWithRange = (end, start = 0, step = 1) =>
  Array.from({length: Math.ceil((end - start + 1) / step)}, (v, i) => i * step + start);
module.exports = initializeArrayWithRange;
