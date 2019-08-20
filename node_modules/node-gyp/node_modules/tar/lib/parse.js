
// A writable stream.
// It emits "entry" events, which provide a readable stream that has
// header info attached.

module.exports = Parse.create = Parse

var stream = require("stream")
  , Stream = stream.Stream
  , BlockStream = require("block-stream")
  , tar = require("../tar.js")
  , TarHeader = require("./header.js")
  , Entry = require("./entry.js")
  , BufferEntry = require("./buffer-entry.js")
  , ExtendedHeader = require("./extended-header.js")
  , assert = require("assert").ok
  , inherits = require("inherits")
  , fstream = require("fstream")

// reading a tar is a lot like reading a directory
// However, we're actually not going to run the ctor,
// since it does a stat and various other stuff.
// This inheritance gives us the pause/resume/pipe
// behavior that is desired.
inherits(Parse, fstream.Reader)

function Parse () {
  var me = this
  if (!(me instanceof Parse)) return new Parse()

  // doesn't apply fstream.Reader ctor?
  // no, becasue we don't want to stat/etc, we just
  // want to get the entry/add logic from .pipe()
  Stream.apply(me)

  me.writable = true
  me.readable = true
  me._stream = new BlockStream(512)
  me.position = 0
  me._ended = false
  me._hardLinks = {}

  me._stream.on("error", function (e) {
    me.emit("error", e)
  })

  me._stream.on("data", function (c) {
    me._process(c)
  })

  me._stream.on("end", function () {
    me._streamEnd()
  })

  me._stream.on("drain", function () {
    me.emit("drain")
  })
}

// overridden in Extract class, since it needs to
// wait for its DirWriter part to finish before
// emitting "end"
Parse.prototype._streamEnd = function () {
  var me = this
  if (!me._ended || me._entry) me.error("unexpected eof")
  me.emit("end")
}

// a tar reader is actually a filter, not just a readable stream.
// So, you should pipe a tarball stream into it, and it needs these
// write/end methods to do that.
Parse.prototype.write = function (c) {
  if (this._ended) {
    // gnutar puts a LOT of nulls at the end.
    // you can keep writing these things forever.
    // Just ignore them.
    for (var i = 0, l = c.length; i > l; i ++) {
      if (c[i] !== 0) return this.error("write() after end()")
    }
    return
  }
  return this._stream.write(c)
}

Parse.prototype.end = function (c) {
  this._ended = true
  return this._stream.end(c)
}

// don't need to do anything, since we're just
// proxying the data up from the _stream.
// Just need to override the parent's "Not Implemented"
// error-thrower.
Parse.prototype._read = function () {}

Parse.prototype._process = function (c) {
  assert(c && c.length === 512, "block size should be 512")

  // one of three cases.
  // 1. A new header
  // 2. A part of a file/extended header
  // 3. One of two or more EOF null blocks

  if (this._entry) {
    var entry = this._entry
    if(!entry._abort) entry.write(c)
    else {
      entry._remaining -= c.length
      if(entry._remaining < 0) entry._remaining = 0
    }
    if (entry._remaining === 0) {
      entry.end()
      this._entry = null
    }
  } else {
    // either zeroes or a header
    var zero = true
    for (var i = 0; i < 512 && zero; i ++) {
      zero = c[i] === 0
    }

    // eof is *at least* 2 blocks of nulls, and then the end of the
    // file.  you can put blocks of nulls between entries anywhere,
    // so appending one tarball to another is technically valid.
    // ending without the eof null blocks is not allowed, however.
    if (zero) {
      if (this._eofStarted)
        this._ended = true
      this._eofStarted = true
    } else {
      this._eofStarted = false
      this._startEntry(c)
    }
  }

  this.position += 512
}

// take a header chunk, start the right kind of entry.
Parse.prototype._startEntry = function (c) {
  var header = new TarHeader(c)
    , self = this
    , entry
    , ev
    , EntryType
    , onend
    , meta = false

  if (null === header.size || !header.cksumValid) {
    var e = new Error("invalid tar file")
    e.header = header
    e.tar_file_offset = this.position
    e.tar_block = this.position / 512
    return this.emit("error", e)
  }

  switch (tar.types[header.type]) {
    case "File":
    case "OldFile":
    case "Link":
    case "SymbolicLink":
    case "CharacterDevice":
    case "BlockDevice":
    case "Directory":
    case "FIFO":
    case "ContiguousFile":
    case "GNUDumpDir":
      // start a file.
      // pass in any extended headers
      // These ones consumers are typically most interested in.
      EntryType = Entry
      ev = "entry"
      break

    case "GlobalExtendedHeader":
      // extended headers that apply to the rest of the tarball
      EntryType = ExtendedHeader
      onend = function () {
        self._global = self._global || {}
        Object.keys(entry.fields).forEach(function (k) {
          self._global[k] = entry.fields[k]
        })
      }
      ev = "globalExtendedHeader"
      meta = true
      break

    case "ExtendedHeader":
    case "OldExtendedHeader":
      // extended headers that apply to the next entry
      EntryType = ExtendedHeader
      onend = function () {
        self._extended = entry.fields
      }
      ev = "extendedHeader"
      meta = true
      break

    case "NextFileHasLongLinkpath":
      // set linkpath=<contents> in extended header
      EntryType = BufferEntry
      onend = function () {
        self._extended = self._extended || {}
        self._extended.linkpath = entry.body
      }
      ev = "longLinkpath"
      meta = true
      break

    case "NextFileHasLongPath":
    case "OldGnuLongPath":
      // set path=<contents> in file-extended header
      EntryType = BufferEntry
      onend = function () {
        self._extended = self._extended || {}
        self._extended.path = entry.body
      }
      ev = "longPath"
      meta = true
      break

    default:
      // all the rest we skip, but still set the _entry
      // member, so that we can skip over their data appropriately.
      // emit an event to say that this is an ignored entry type?
      EntryType = Entry
      ev = "ignoredEntry"
      break
  }

  var global, extended
  if (meta) {
    global = extended = null
  } else {
    var global = this._global
    var extended = this._extended

    // extendedHeader only applies to one entry, so once we start
    // an entry, it's over.
    this._extended = null
  }
  entry = new EntryType(header, extended, global)
  entry.meta = meta

  // only proxy data events of normal files.
  if (!meta) {
    entry.on("data", function (c) {
      me.emit("data", c)
    })
  }

  if (onend) entry.on("end", onend)

  this._entry = entry

  if (entry.type === "Link") {
    this._hardLinks[entry.path] = entry
  }

  var me = this

  entry.on("pause", function () {
    me.pause()
  })

  entry.on("resume", function () {
    me.resume()
  })

  if (this.listeners("*").length) {
    this.emit("*", ev, entry)
  }

  this.emit(ev, entry)

  // Zero-byte entry.  End immediately.
  if (entry.props.size === 0) {
    entry.end()
    this._entry = null
  }
}
