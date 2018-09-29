const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates));
module.exports = maxDate;
