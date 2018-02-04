const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);
module.exports = getColonTimeFromDate;