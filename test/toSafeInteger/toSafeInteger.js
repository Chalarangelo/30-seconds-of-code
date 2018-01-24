const toSafeInteger = num =>
Math.round(Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER));
module.exports = toSafeInteger