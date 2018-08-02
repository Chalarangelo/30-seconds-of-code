const bind = (fn, context, ...args) =>
  function() {
    return fn.apply(context, args.concat(...arguments));
  };
module.exports = bind;
