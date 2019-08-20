var prefix = function (name) {
  return '_' + name
}

var defined = function (name) {
  return name
}

exports.stringify = function (data) {
  if (typeof data === 'object' && data && data.name) return exports.stringify(data.name, data.protocol, data.subtypes)
  return Array.prototype.concat.apply([], arguments).filter(defined).map(prefix).join('.')
}

exports.parse = function (str) {
  var parts = str.split('.')

  for (var i = 0; i < parts.length; i++) {
    if (parts[i][0] !== '_') continue
    parts[i] = parts[i].slice(1)
  }

  return {
    name: parts.shift(),
    protocol: parts.shift() || null,
    subtypes: parts
  }
}

exports.tcp = function (name) {
  return exports.stringify(name, 'tcp', Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1)))
}

exports.udp = function (name) {
  return exports.stringify(name, 'udp', Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1)))
}
