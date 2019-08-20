'use strict'

const assert = require('assert')
const Buffer = require('buffer').Buffer
const realZlib = require('zlib')

const constants = exports.constants = require('./constants.js')
const MiniPass = require('minipass')

const OriginalBufferConcat = Buffer.concat

class ZlibError extends Error {
  constructor (msg, errno) {
    super('zlib: ' + msg)
    this.errno = errno
    this.code = codes.get(errno)
  }

  get name () {
    return 'ZlibError'
  }
}

// translation table for return codes.
const codes = new Map([
  [constants.Z_OK, 'Z_OK'],
  [constants.Z_STREAM_END, 'Z_STREAM_END'],
  [constants.Z_NEED_DICT, 'Z_NEED_DICT'],
  [constants.Z_ERRNO, 'Z_ERRNO'],
  [constants.Z_STREAM_ERROR, 'Z_STREAM_ERROR'],
  [constants.Z_DATA_ERROR, 'Z_DATA_ERROR'],
  [constants.Z_MEM_ERROR, 'Z_MEM_ERROR'],
  [constants.Z_BUF_ERROR, 'Z_BUF_ERROR'],
  [constants.Z_VERSION_ERROR, 'Z_VERSION_ERROR']
])

const validFlushFlags = new Set([
  constants.Z_NO_FLUSH,
  constants.Z_PARTIAL_FLUSH,
  constants.Z_SYNC_FLUSH,
  constants.Z_FULL_FLUSH,
  constants.Z_FINISH,
  constants.Z_BLOCK
])

const strategies = new Set([
  constants.Z_FILTERED,
  constants.Z_HUFFMAN_ONLY,
  constants.Z_RLE,
  constants.Z_FIXED,
  constants.Z_DEFAULT_STRATEGY
])

// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.
const _opts = Symbol('opts')
const _flushFlag = Symbol('flushFlag')
const _finishFlush = Symbol('finishFlush')
const _handle = Symbol('handle')
const _onError = Symbol('onError')
const _level = Symbol('level')
const _strategy = Symbol('strategy')
const _ended = Symbol('ended')

class Zlib extends MiniPass {
  constructor (opts, mode) {
    super(opts)
    this[_ended] = false
    this[_opts] = opts = opts || {}
    if (opts.flush && !validFlushFlags.has(opts.flush)) {
      throw new TypeError('Invalid flush flag: ' + opts.flush)
    }
    if (opts.finishFlush && !validFlushFlags.has(opts.finishFlush)) {
      throw new TypeError('Invalid flush flag: ' + opts.finishFlush)
    }

    this[_flushFlag] = opts.flush || constants.Z_NO_FLUSH
    this[_finishFlush] = typeof opts.finishFlush !== 'undefined' ?
      opts.finishFlush : constants.Z_FINISH

    if (opts.chunkSize) {
      if (opts.chunkSize < constants.Z_MIN_CHUNK) {
        throw new RangeError('Invalid chunk size: ' + opts.chunkSize)
      }
    }

    if (opts.windowBits) {
      if (opts.windowBits < constants.Z_MIN_WINDOWBITS ||
          opts.windowBits > constants.Z_MAX_WINDOWBITS) {
        throw new RangeError('Invalid windowBits: ' + opts.windowBits)
      }
    }

    if (opts.level) {
      if (opts.level < constants.Z_MIN_LEVEL ||
          opts.level > constants.Z_MAX_LEVEL) {
        throw new RangeError('Invalid compression level: ' + opts.level)
      }
    }

    if (opts.memLevel) {
      if (opts.memLevel < constants.Z_MIN_MEMLEVEL ||
          opts.memLevel > constants.Z_MAX_MEMLEVEL) {
        throw new RangeError('Invalid memLevel: ' + opts.memLevel)
      }
    }

    if (opts.strategy && !(strategies.has(opts.strategy)))
      throw new TypeError('Invalid strategy: ' + opts.strategy)

    if (opts.dictionary) {
      if (!(opts.dictionary instanceof Buffer)) {
        throw new TypeError('Invalid dictionary: it should be a Buffer instance')
      }
    }

    this[_handle] = new realZlib[mode](opts)

    this[_onError] = (err) => {
      // there is no way to cleanly recover.
      // continuing only obscures problems.
      this.close()

      const error = new ZlibError(err.message, err.errno)
      this.emit('error', error)
    }
    this[_handle].on('error', this[_onError])

    const level = typeof opts.level === 'number' ? opts.level
                : constants.Z_DEFAULT_COMPRESSION

    var strategy = typeof opts.strategy === 'number' ? opts.strategy
                 : constants.Z_DEFAULT_STRATEGY

    // API changed in node v9
    /* istanbul ignore next */

    this[_level] = level
    this[_strategy] = strategy

    this.once('end', this.close)
  }

  close () {
    if (this[_handle]) {
      this[_handle].close()
      this[_handle] = null
      this.emit('close')
    }
  }

  params (level, strategy) {
    if (!this[_handle])
      throw new Error('cannot switch params when binding is closed')

    // no way to test this without also not supporting params at all
    /* istanbul ignore if */
    if (!this[_handle].params)
      throw new Error('not supported in this implementation')

    if (level < constants.Z_MIN_LEVEL ||
        level > constants.Z_MAX_LEVEL) {
      throw new RangeError('Invalid compression level: ' + level)
    }

    if (!(strategies.has(strategy)))
      throw new TypeError('Invalid strategy: ' + strategy)

    if (this[_level] !== level || this[_strategy] !== strategy) {
      this.flush(constants.Z_SYNC_FLUSH)
      assert(this[_handle], 'zlib binding closed')
      // .params() calls .flush(), but the latter is always async in the
      // core zlib. We override .flush() temporarily to intercept that and
      // flush synchronously.
      const origFlush = this[_handle].flush
      this[_handle].flush = (flushFlag, cb) => {
        this[_handle].flush = origFlush
        this.flush(flushFlag)
        cb()
      }
      this[_handle].params(level, strategy)
      /* istanbul ignore else */
      if (this[_handle]) {
        this[_level] = level
        this[_strategy] = strategy
      }
    }
  }

  reset () {
    assert(this[_handle], 'zlib binding closed')
    return this[_handle].reset()
  }

  flush (kind) {
    if (kind === undefined)
      kind = constants.Z_FULL_FLUSH

    if (this.ended)
      return

    const flushFlag = this[_flushFlag]
    this[_flushFlag] = kind
    this.write(Buffer.alloc(0))
    this[_flushFlag] = flushFlag
  }

  end (chunk, encoding, cb) {
    if (chunk)
      this.write(chunk, encoding)
    this.flush(this[_finishFlush])
    this[_ended] = true
    return super.end(null, null, cb)
  }

  get ended () {
    return this[_ended]
  }

  write (chunk, encoding, cb) {
    // process the chunk using the sync process
    // then super.write() all the outputted chunks
    if (typeof encoding === 'function')
      cb = encoding, encoding = 'utf8'

    if (typeof chunk === 'string')
      chunk = Buffer.from(chunk, encoding)

    assert(this[_handle], 'zlib binding closed')

    // _processChunk tries to .close() the native handle after it's done, so we
    // intercept that by temporarily making it a no-op.
    const nativeHandle = this[_handle]._handle
    const originalNativeClose = nativeHandle.close
    nativeHandle.close = () => {}
    const originalClose = this[_handle].close
    this[_handle].close = () => {}
    // It also calls `Buffer.concat()` at the end, which may be convenient
    // for some, but which we are not interested in as it slows us down.
    Buffer.concat = (args) => args
    let result
    try {
      result = this[_handle]._processChunk(chunk, this[_flushFlag])
    } catch (err) {
      this[_onError](err)
    } finally {
      Buffer.concat = OriginalBufferConcat
      if (this[_handle]) {
        // Core zlib resets `_handle` to null after attempting to close the
        // native handle. Our no-op handler prevented actual closure, but we
        // need to restore the `._handle` property.
        this[_handle]._handle = nativeHandle
        nativeHandle.close = originalNativeClose
        this[_handle].close = originalClose
        // `_processChunk()` adds an 'error' listener. If we don't remove it
        // after each call, these handlers start piling up.
        this[_handle].removeAllListeners('error')
      }
    }

    let writeReturn
    if (result) {
      if (Array.isArray(result) && result.length > 0) {
        // The first buffer is always `handle._outBuffer`, which would be
        // re-used for later invocations; so, we always have to copy that one.
        writeReturn = super.write(Buffer.from(result[0]))
        for (let i = 1; i < result.length; i++) {
          writeReturn = super.write(result[i])
        }
      } else {
        writeReturn = super.write(Buffer.from(result))
      }
    }

    if (cb)
      cb()
    return writeReturn
  }
}

// minimal 2-byte header
class Deflate extends Zlib {
  constructor (opts) {
    super(opts, 'Deflate')
  }
}

class Inflate extends Zlib {
  constructor (opts) {
    super(opts, 'Inflate')
  }
}

// gzip - bigger header, same deflate compression
class Gzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gzip')
  }
}

class Gunzip extends Zlib {
  constructor (opts) {
    super(opts, 'Gunzip')
  }
}

// raw - no header
class DeflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'DeflateRaw')
  }
}

class InflateRaw extends Zlib {
  constructor (opts) {
    super(opts, 'InflateRaw')
  }
}

// auto-detect header.
class Unzip extends Zlib {
  constructor (opts) {
    super(opts, 'Unzip')
  }
}

exports.Deflate = Deflate
exports.Inflate = Inflate
exports.Gzip = Gzip
exports.Gunzip = Gunzip
exports.DeflateRaw = DeflateRaw
exports.InflateRaw = InflateRaw
exports.Unzip = Unzip
