const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
module.exports = validateNumber