const rearg = (fn, indexes) => (...args) =>
  fn(
    ...args.reduce(
      (acc, val, i) => ((acc[indexes.indexOf(i)] = val), acc),
      Array.from({ length: indexes.length })
    )
  );

module.exports = rearg;