'use strict'

class FiggyPudding {
  constructor (specs, opts, providers) {
    this.__specs = specs || {}
    Object.keys(this.__specs).forEach(alias => {
      if (typeof this.__specs[alias] === 'string') {
        const key = this.__specs[alias]
        const realSpec = this.__specs[key]
        if (realSpec) {
          const aliasArr = realSpec.aliases || []
          aliasArr.push(alias, key)
          realSpec.aliases = [...(new Set(aliasArr))]
          this.__specs[alias] = realSpec
        } else {
          throw new Error(`Alias refers to invalid key: ${key} -> ${alias}`)
        }
      }
    })
    this.__opts = opts || {}
    this.__providers = reverse((providers).filter(
      x => x != null && typeof x === 'object'
    ))
    this.__isFiggyPudding = true
  }
  get (key) {
    return pudGet(this, key, true)
  }
  get [Symbol.toStringTag] () { return 'FiggyPudding' }
  forEach (fn, thisArg = this) {
    for (let [key, value] of this.entries()) {
      fn.call(thisArg, value, key, this)
    }
  }
  toJSON () {
    const obj = {}
    this.forEach((val, key) => {
      obj[key] = val
    })
    return obj
  }
  * entries (_matcher) {
    for (let key of Object.keys(this.__specs)) {
      yield [key, this.get(key)]
    }
    const matcher = _matcher || this.__opts.other
    if (matcher) {
      const seen = new Set()
      for (let p of this.__providers) {
        const iter = p.entries ? p.entries(matcher) : entries(p)
        for (let [key, val] of iter) {
          if (matcher(key) && !seen.has(key)) {
            seen.add(key)
            yield [key, val]
          }
        }
      }
    }
  }
  * [Symbol.iterator] () {
    for (let [key, value] of this.entries()) {
      yield [key, value]
    }
  }
  * keys () {
    for (let [key] of this.entries()) {
      yield key
    }
  }
  * values () {
    for (let [, value] of this.entries()) {
      yield value
    }
  }
  concat (...moreConfig) {
    return new Proxy(new FiggyPudding(
      this.__specs,
      this.__opts,
      reverse(this.__providers).concat(moreConfig)
    ), proxyHandler)
  }
}
try {
  const util = require('util')
  FiggyPudding.prototype[util.inspect.custom] = function (depth, opts) {
    return (
      this[Symbol.toStringTag] + ' '
    ) + util.inspect(this.toJSON(), opts)
  }
} catch (e) {}

function BadKeyError (key) {
  throw Object.assign(new Error(
    `invalid config key requested: ${key}`
  ), {code: 'EBADKEY'})
}

function pudGet (pud, key, validate) {
  let spec = pud.__specs[key]
  if (validate && !spec && (!pud.__opts.other || !pud.__opts.other(key))) {
    BadKeyError(key)
  } else {
    if (!spec) { spec = {} }
    let ret
    for (let p of pud.__providers) {
      ret = tryGet(key, p)
      if (ret === undefined && spec.aliases && spec.aliases.length) {
        for (let alias of spec.aliases) {
          if (alias === key) { continue }
          ret = tryGet(alias, p)
          if (ret !== undefined) {
            break
          }
        }
      }
      if (ret !== undefined) {
        break
      }
    }
    if (ret === undefined && spec.default !== undefined) {
      if (typeof spec.default === 'function') {
        return spec.default(pud)
      } else {
        return spec.default
      }
    } else {
      return ret
    }
  }
}

function tryGet (key, p) {
  let ret
  if (p.__isFiggyPudding) {
    ret = pudGet(p, key, false)
  } else if (typeof p.get === 'function') {
    ret = p.get(key)
  } else {
    ret = p[key]
  }
  return ret
}

const proxyHandler = {
  has (obj, prop) {
    return prop in obj.__specs && pudGet(obj, prop, false) !== undefined
  },
  ownKeys (obj) {
    return Object.keys(obj.__specs)
  },
  get (obj, prop) {
    if (
      typeof prop === 'symbol' ||
      prop.slice(0, 2) === '__' ||
      prop in FiggyPudding.prototype
    ) {
      return obj[prop]
    }
    return obj.get(prop)
  },
  set (obj, prop, value) {
    if (
      typeof prop === 'symbol' ||
      prop.slice(0, 2) === '__'
    ) {
      obj[prop] = value
      return true
    } else {
      throw new Error('figgyPudding options cannot be modified. Use .concat() instead.')
    }
  },
  deleteProperty () {
    throw new Error('figgyPudding options cannot be deleted. Use .concat() and shadow them instead.')
  }
}

module.exports = figgyPudding
function figgyPudding (specs, opts) {
  function factory (...providers) {
    return new Proxy(new FiggyPudding(
      specs,
      opts,
      providers
    ), proxyHandler)
  }
  return factory
}

function reverse (arr) {
  const ret = []
  arr.forEach(x => ret.unshift(x))
  return ret
}

function entries (obj) {
  return Object.keys(obj).map(k => [k, obj[k]])
}
