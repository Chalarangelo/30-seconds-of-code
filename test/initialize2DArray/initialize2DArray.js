module.exports = (w, h, val = null) =>
Array(h)
.fill()
.map(() => Array(w).fill(val));