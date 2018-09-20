const takeRightWhile = (arr, func) => arr.reduceRight((acc, el) => func(el) ? acc : [el, ...acc], []);
module.exports = takeRightWhile;
