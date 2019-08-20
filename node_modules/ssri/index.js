'use strict'

const crypto = require('crypto')
const figgyPudding = require('figgy-pudding')
const Transform = require('stream').Transform

const SPEC_ALGORITHMS = ['sha256', 'sha384', 'sha512']

const BASE64_REGEX = /^[a-z0-9+/]+(?:=?=?)$/i
const SRI_REGEX = /^([^-]+)-([^?]+)([?\S*]*)$/
const STRICT_SRI_REGEX = /^([^-]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)*$/
const VCHAR_REGEX = /^[\x21-\x7E]+$/

const SsriOpts = figgyPudding({
  algorithms: {default: ['sha512']},
  error: {default: false},
  integrity: {},
  options: {default: []},
  pickAlgorithm: {default: () => getPrioritizedHash},
  Promise: {default: () => Promise},
  sep: {default: ' '},
  single: {default: false},
  size: {},
  strict: {default: false}
})

class Hash {
  get isHash () { return true }
  constructor (hash, opts) {
    opts = SsriOpts(opts)
    const strict = !!opts.strict
    this.source = hash.trim()
    // 3.1. Integrity metadata (called "Hash" by ssri)
    // https://w3c.github.io/webappsec-subresource-integrity/#integrity-metadata-description
    const match = this.source.match(
      strict
      ? STRICT_SRI_REGEX
      : SRI_REGEX
    )
    if (!match) { return }
    if (strict && !SPEC_ALGORITHMS.some(a => a === match[1])) { return }
    this.algorithm = match[1]
    this.digest = match[2]

    const rawOpts = match[3]
    this.options = rawOpts ? rawOpts.slice(1).split('?') : []
  }
  hexDigest () {
    return this.digest && Buffer.from(this.digest, 'base64').toString('hex')
  }
  toJSON () {
    return this.toString()
  }
  toString (opts) {
    opts = SsriOpts(opts)
    if (opts.strict) {
      // Strict mode enforces the standard as close to the foot of the
      // letter as it can.
      if (!(
        // The spec has very restricted productions for algorithms.
        // https://www.w3.org/TR/CSP2/#source-list-syntax
        SPEC_ALGORITHMS.some(x => x === this.algorithm) &&
        // Usually, if someone insists on using a "different" base64, we
        // leave it as-is, since there's multiple standards, and the
        // specified is not a URL-safe variant.
        // https://www.w3.org/TR/CSP2/#base64_value
        this.digest.match(BASE64_REGEX) &&
        // Option syntax is strictly visual chars.
        // https://w3c.github.io/webappsec-subresource-integrity/#grammardef-option-expression
        // https://tools.ietf.org/html/rfc5234#appendix-B.1
        (this.options || []).every(opt => opt.match(VCHAR_REGEX))
      )) {
        return ''
      }
    }
    const options = this.options && this.options.length
    ? `?${this.options.join('?')}`
    : ''
    return `${this.algorithm}-${this.digest}${options}`
  }
}

class Integrity {
  get isIntegrity () { return true }
  toJSON () {
    return this.toString()
  }
  toString (opts) {
    opts = SsriOpts(opts)
    let sep = opts.sep || ' '
    if (opts.strict) {
      // Entries must be separated by whitespace, according to spec.
      sep = sep.replace(/\S+/g, ' ')
    }
    return Object.keys(this).map(k => {
      return this[k].map(hash => {
        return Hash.prototype.toString.call(hash, opts)
      }).filter(x => x.length).join(sep)
    }).filter(x => x.length).join(sep)
  }
  concat (integrity, opts) {
    opts = SsriOpts(opts)
    const other = typeof integrity === 'string'
    ? integrity
    : stringify(integrity, opts)
    return parse(`${this.toString(opts)} ${other}`, opts)
  }
  hexDigest () {
    return parse(this, {single: true}).hexDigest()
  }
  match (integrity, opts) {
    opts = SsriOpts(opts)
    const other = parse(integrity, opts)
    const algo = other.pickAlgorithm(opts)
    return (
      this[algo] &&
      other[algo] &&
      this[algo].find(hash =>
        other[algo].find(otherhash =>
          hash.digest === otherhash.digest
        )
      )
    ) || false
  }
  pickAlgorithm (opts) {
    opts = SsriOpts(opts)
    const pickAlgorithm = opts.pickAlgorithm
    const keys = Object.keys(this)
    if (!keys.length) {
      throw new Error(`No algorithms available for ${
        JSON.stringify(this.toString())
      }`)
    }
    return keys.reduce((acc, algo) => {
      return pickAlgorithm(acc, algo) || acc
    })
  }
}

module.exports.parse = parse
function parse (sri, opts) {
  opts = SsriOpts(opts)
  if (typeof sri === 'string') {
    return _parse(sri, opts)
  } else if (sri.algorithm && sri.digest) {
    const fullSri = new Integrity()
    fullSri[sri.algorithm] = [sri]
    return _parse(stringify(fullSri, opts), opts)
  } else {
    return _parse(stringify(sri, opts), opts)
  }
}

function _parse (integrity, opts) {
  // 3.4.3. Parse metadata
  // https://w3c.github.io/webappsec-subresource-integrity/#parse-metadata
  if (opts.single) {
    return new Hash(integrity, opts)
  }
  return integrity.trim().split(/\s+/).reduce((acc, string) => {
    const hash = new Hash(string, opts)
    if (hash.algorithm && hash.digest) {
      const algo = hash.algorithm
      if (!acc[algo]) { acc[algo] = [] }
      acc[algo].push(hash)
    }
    return acc
  }, new Integrity())
}

module.exports.stringify = stringify
function stringify (obj, opts) {
  opts = SsriOpts(opts)
  if (obj.algorithm && obj.digest) {
    return Hash.prototype.toString.call(obj, opts)
  } else if (typeof obj === 'string') {
    return stringify(parse(obj, opts), opts)
  } else {
    return Integrity.prototype.toString.call(obj, opts)
  }
}

module.exports.fromHex = fromHex
function fromHex (hexDigest, algorithm, opts) {
  opts = SsriOpts(opts)
  const optString = opts.options && opts.options.length
  ? `?${opts.options.join('?')}`
  : ''
  return parse(
    `${algorithm}-${
      Buffer.from(hexDigest, 'hex').toString('base64')
    }${optString}`, opts
  )
}

module.exports.fromData = fromData
function fromData (data, opts) {
  opts = SsriOpts(opts)
  const algorithms = opts.algorithms
  const optString = opts.options && opts.options.length
  ? `?${opts.options.join('?')}`
  : ''
  return algorithms.reduce((acc, algo) => {
    const digest = crypto.createHash(algo).update(data).digest('base64')
    const hash = new Hash(
      `${algo}-${digest}${optString}`,
       opts
    )
    if (hash.algorithm && hash.digest) {
      const algo = hash.algorithm
      if (!acc[algo]) { acc[algo] = [] }
      acc[algo].push(hash)
    }
    return acc
  }, new Integrity())
}

module.exports.fromStream = fromStream
function fromStream (stream, opts) {
  opts = SsriOpts(opts)
  const P = opts.Promise || Promise
  const istream = integrityStream(opts)
  return new P((resolve, reject) => {
    stream.pipe(istream)
    stream.on('error', reject)
    istream.on('error', reject)
    let sri
    istream.on('integrity', s => { sri = s })
    istream.on('end', () => resolve(sri))
    istream.on('data', () => {})
  })
}

module.exports.checkData = checkData
function checkData (data, sri, opts) {
  opts = SsriOpts(opts)
  sri = parse(sri, opts)
  if (!Object.keys(sri).length) {
    if (opts.error) {
      throw Object.assign(
        new Error('No valid integrity hashes to check against'), {
          code: 'EINTEGRITY'
        }
      )
    } else {
      return false
    }
  }
  const algorithm = sri.pickAlgorithm(opts)
  const digest = crypto.createHash(algorithm).update(data).digest('base64')
  const newSri = parse({algorithm, digest})
  const match = newSri.match(sri, opts)
  if (match || !opts.error) {
    return match
  } else if (typeof opts.size === 'number' && (data.length !== opts.size)) {
    const err = new Error(`data size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${data.length}`)
    err.code = 'EBADSIZE'
    err.found = data.length
    err.expected = opts.size
    err.sri = sri
    throw err
  } else {
    const err = new Error(`Integrity checksum failed when using ${algorithm}: Wanted ${sri}, but got ${newSri}. (${data.length} bytes)`)
    err.code = 'EINTEGRITY'
    err.found = newSri
    err.expected = sri
    err.algorithm = algorithm
    err.sri = sri
    throw err
  }
}

module.exports.checkStream = checkStream
function checkStream (stream, sri, opts) {
  opts = SsriOpts(opts)
  const P = opts.Promise || Promise
  const checker = integrityStream(opts.concat({
    integrity: sri
  }))
  return new P((resolve, reject) => {
    stream.pipe(checker)
    stream.on('error', reject)
    checker.on('error', reject)
    let sri
    checker.on('verified', s => { sri = s })
    checker.on('end', () => resolve(sri))
    checker.on('data', () => {})
  })
}

module.exports.integrityStream = integrityStream
function integrityStream (opts) {
  opts = SsriOpts(opts)
  // For verification
  const sri = opts.integrity && parse(opts.integrity, opts)
  const goodSri = sri && Object.keys(sri).length
  const algorithm = goodSri && sri.pickAlgorithm(opts)
  const digests = goodSri && sri[algorithm]
  // Calculating stream
  const algorithms = Array.from(
    new Set(opts.algorithms.concat(algorithm ? [algorithm] : []))
  )
  const hashes = algorithms.map(crypto.createHash)
  let streamSize = 0
  const stream = new Transform({
    transform (chunk, enc, cb) {
      streamSize += chunk.length
      hashes.forEach(h => h.update(chunk, enc))
      cb(null, chunk, enc)
    }
  }).on('end', () => {
    const optString = (opts.options && opts.options.length)
    ? `?${opts.options.join('?')}`
    : ''
    const newSri = parse(hashes.map((h, i) => {
      return `${algorithms[i]}-${h.digest('base64')}${optString}`
    }).join(' '), opts)
    // Integrity verification mode
    const match = goodSri && newSri.match(sri, opts)
    if (typeof opts.size === 'number' && streamSize !== opts.size) {
      const err = new Error(`stream size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${streamSize}`)
      err.code = 'EBADSIZE'
      err.found = streamSize
      err.expected = opts.size
      err.sri = sri
      stream.emit('error', err)
    } else if (opts.integrity && !match) {
      const err = new Error(`${sri} integrity checksum failed when using ${algorithm}: wanted ${digests} but got ${newSri}. (${streamSize} bytes)`)
      err.code = 'EINTEGRITY'
      err.found = newSri
      err.expected = digests
      err.algorithm = algorithm
      err.sri = sri
      stream.emit('error', err)
    } else {
      stream.emit('size', streamSize)
      stream.emit('integrity', newSri)
      match && stream.emit('verified', match)
    }
  })
  return stream
}

module.exports.create = createIntegrity
function createIntegrity (opts) {
  opts = SsriOpts(opts)
  const algorithms = opts.algorithms
  const optString = opts.options.length
  ? `?${opts.options.join('?')}`
  : ''

  const hashes = algorithms.map(crypto.createHash)

  return {
    update: function (chunk, enc) {
      hashes.forEach(h => h.update(chunk, enc))
      return this
    },
    digest: function (enc) {
      const integrity = algorithms.reduce((acc, algo) => {
        const digest = hashes.shift().digest('base64')
        const hash = new Hash(
          `${algo}-${digest}${optString}`,
          opts
        )
        if (hash.algorithm && hash.digest) {
          const algo = hash.algorithm
          if (!acc[algo]) { acc[algo] = [] }
          acc[algo].push(hash)
        }
        return acc
      }, new Integrity())

      return integrity
    }
  }
}

const NODE_HASHES = new Set(crypto.getHashes())

// This is a Best Effort™ at a reasonable priority for hash algos
const DEFAULT_PRIORITY = [
  'md5', 'whirlpool', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512',
  // TODO - it's unclear _which_ of these Node will actually use as its name
  //        for the algorithm, so we guesswork it based on the OpenSSL names.
  'sha3',
  'sha3-256', 'sha3-384', 'sha3-512',
  'sha3_256', 'sha3_384', 'sha3_512'
].filter(algo => NODE_HASHES.has(algo))

function getPrioritizedHash (algo1, algo2) {
  return DEFAULT_PRIORITY.indexOf(algo1.toLowerCase()) >= DEFAULT_PRIORITY.indexOf(algo2.toLowerCase())
  ? algo1
  : algo2
}
