const coalesce = (...args) => args.find(_ => ![undefined, null].includes(_));
module.exports = coalesce;
