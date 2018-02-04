const attempt = (fn, ...args) => {
try {
return fn(args);
} catch (e) {
return e instanceof Error ? e : new Error(e);
}
};
module.exports = attempt;