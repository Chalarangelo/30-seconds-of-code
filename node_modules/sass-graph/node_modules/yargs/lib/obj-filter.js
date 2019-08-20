module.exports = function (original, filter) {
  const obj = {}
  filter = filter || function (k, v) { return true }
  Object.keys(original || {}).forEach(function (key) {
    if (filter(key, original[key])) {
      obj[key] = original[key]
    }
  })
  return obj
}
