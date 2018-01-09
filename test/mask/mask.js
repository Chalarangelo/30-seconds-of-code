module.exports = (cc, num = 4, mask = '*') =>
('' + cc).slice(0, -num).replace(/./g, mask) + ('' + cc).slice(-num);