const sumPower = (end, power = 2, start = 1) =>
Array(end + 1 - start)
.fill(0)
.map((x, i) => (i + start) ** power)
.reduce((a, b) => a + b, 0);
 module.exports = sumPower