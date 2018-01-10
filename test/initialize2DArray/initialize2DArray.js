module.exports = initialize2DArray = (w, h, val = null) =>
Array(h)
.fill()
.map(() => Array(w).fill(val));