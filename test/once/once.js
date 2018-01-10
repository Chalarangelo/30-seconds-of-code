module.exports = once = fn => {
let called = false;
return function(...args) {
if (called) return;
called = true;
return fn.apply(this, args);
};
};