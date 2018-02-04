const debounce = (fn, wait = 0) => {
let inDebounce;
return function() {
const context = this,
args = arguments;
clearTimeout(inDebounce);
inDebounce = setTimeout(() => fn.apply(context, args), wait);
};
};
module.exports = debounce;