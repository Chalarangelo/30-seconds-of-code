module.exports = initialize2DArray = (w, h, val = null) =>
Array.from({ length: h }).map(() => Array.from({ length: w }).fill(val));