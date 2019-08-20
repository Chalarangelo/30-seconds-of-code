module.exports = EntryWriter

var tar = require("../tar.js")
  , TarHeader = require("./header.js")
  , Entry = require("./entry.js")
  , inherits = require("inherits")
  , BlockStream = require("block-stream")
  , ExtendedHeaderWriter
  , Stream = require("stream").Stream
  , EOF = {}

inherits(EntryWriter, Stream)

function EntryWriter (props) {
  var me = this

  if (!(me instanceof EntryWriter)) {
    return new EntryWriter(props)
  }

  Stream.apply(this)

  me.writable = true
  me.readable = true

  me._stream = new BlockStream(512)

  me._stream.on("data", function (c) {
    me.emit("data", c)
  })

  me._stream.on("drain", function () {
    me.emit("drain")
  })

  me._stream.on("end", function () {
    me.emit("end")
    me.emit("close")
  })

  me.props = props
  if (props.type === "Directory") {
    props.size = 0
  }
  props.ustar = "ustar\0"
  props.ustarver = "00"
  me.path = props.path

  me._buffer = []
  me._didHeader = false
  me._meta = false

  me.on("pipe", function () {
    me._process()
  })
}

EntryWriter.prototype.write = function (c) {
  // console.error(".. ew write")
  if (this._ended) return this.emit("error", new Error("write after end"))
  this._buffer.push(c)
  this._process()
  this._needDrain = this._buffer.length > 0
  return !this._needDrain
}

EntryWriter.prototype.end = function (c) {
  // console.error(".. ew end")
  if (c) this._buffer.push(c)
  this._buffer.push(EOF)
  this._ended = true
  this._process()
  this._needDrain = this._buffer.length > 0
}

EntryWriter.prototype.pause = function () {
  // console.error(".. ew pause")
  this._paused = true
  this.emit("pause")
}

EntryWriter.prototype.resume = function () {
  // console.error(".. ew resume")
  this._paused = false
  this.emit("resume")
  this._process()
}

EntryWriter.prototype.add = function (entry) {
  // console.error(".. ew add")
  if (!this.parent) return this.emit("error", new Error("no parent"))

  // make sure that the _header and such is emitted, and clear out
  // the _currentEntry link on the parent.
  if (!this._ended) this.end()

  return this.parent.add(entry)
}

EntryWriter.prototype._header = function () {
  // console.error(".. ew header")
  if (this._didHeader) return
  this._didHeader = true

  var headerBlock = TarHeader.encode(this.props)

  if (this.props.needExtended && !this._meta) {
    var me = this

    ExtendedHeaderWriter = ExtendedHeaderWriter ||
      require("./extended-header-writer.js")

    ExtendedHeaderWriter(this.props)
      .on("data", function (c) {
        me.emit("data", c)
      })
      .on("error", function (er) {
        me.emit("error", er)
      })
      .end()
  }

  // console.error(".. .. ew headerBlock emitting")
  this.emit("data", headerBlock)
  this.emit("header")
}

EntryWriter.prototype._process = function () {
  // console.error(".. .. ew process")
  if (!this._didHeader && !this._meta) {
    this._header()
  }

  if (this._paused || this._processing) {
    // console.error(".. .. .. paused=%j, processing=%j", this._paused, this._processing)
    return
  }

  this._processing = true

  var buf = this._buffer
  for (var i = 0; i < buf.length; i ++) {
    // console.error(".. .. .. i=%d", i)

    var c = buf[i]

    if (c === EOF) this._stream.end()
    else this._stream.write(c)

    if (this._paused) {
      // console.error(".. .. .. paused mid-emission")
      this._processing = false
      if (i < buf.length) {
        this._needDrain = true
        this._buffer = buf.slice(i + 1)
      }
      return
    }
  }

  // console.error(".. .. .. emitted")
  this._buffer.length = 0
  this._processing = false

  // console.error(".. .. .. emitting drain")
  this.emit("drain")
}

EntryWriter.prototype.destroy = function () {}
