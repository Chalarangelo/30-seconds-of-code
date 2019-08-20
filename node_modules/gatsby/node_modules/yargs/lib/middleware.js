module.exports = function (globalMiddleware, context) {
  return function (callback) {
    if (Array.isArray(callback)) {
      Array.prototype.push.apply(globalMiddleware, callback)
    } else if (typeof callback === 'function') {
      globalMiddleware.push(callback)
    }
    return context
  }
}
