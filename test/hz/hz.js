const hz = (fn, iterations = 100) => {
const before = performance.now();
for (let i = 0; i < iterations; i++) fn();
return 1000 * iterations / (performance.now() - before);
};
module.exports = hz;