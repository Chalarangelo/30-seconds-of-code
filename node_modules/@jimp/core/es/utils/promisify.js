var promisify = function promisify(fun, ctx) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return new Promise(function (resolve, reject) {
    args.push(function (err, data) {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
    fun.bind(ctx).apply(void 0, args);
  });
};

export default promisify;
//# sourceMappingURL=promisify.js.map