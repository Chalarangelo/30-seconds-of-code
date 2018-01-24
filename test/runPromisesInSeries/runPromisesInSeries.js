const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
module.exports = runPromisesInSeries