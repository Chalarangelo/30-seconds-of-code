const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
(dateFinal - dateInitial) / (1000 * 3600 * 24);
module.exports = getDaysDiffBetweenDates