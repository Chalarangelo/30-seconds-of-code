const mask = (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
module.exports = mask;
