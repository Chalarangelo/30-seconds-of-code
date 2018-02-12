const debounce = (fn, ms = 0) => {
let timeoutId;
return function(...args) {
clearTimeout(timeoutId);
timeoutId = setTimeout(() => fn.apply(this, args), ms);
};
};
module.exports = debounce;