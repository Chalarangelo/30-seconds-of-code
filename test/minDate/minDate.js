const minDate = (...dates) => new Date(Math.min.apply(null, ...dates));
module.exports = minDate;
