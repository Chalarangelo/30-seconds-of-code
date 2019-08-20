module.exports = function isPromise (maybePromise) {
  return maybePromise instanceof Promise
}
