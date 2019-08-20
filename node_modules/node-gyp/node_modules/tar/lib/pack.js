// pipe in an fstream, and it'll make a tarball.
// key-value pair argument is global extended header props.

module.exports = Pack

var EntryWriter = require("./entry-writer.js")
  , Stream = require("stream").Stream
  , path = require("path")
  , inherits = require("inherits")
  , GlobalHeaderWriter = require("./global-header-writer.js")
  , collect = require("fstream").collect
  , eof = new Buffer(512)

for (var i = 0; i < 512; i ++) eof[i] = 0

inherits(Pack, Stream)

function Pack (props) {
  // console.error("-- p ctor")
  var me = this
  if (!(me instanceof Pack)) return new Pack(props)

  if (props) me._noProprietary = props.noProprietary
  else me._noProprietary = false

  me._global = props

  me.readable = true
  me.writable = true
  me._buffer = []
  // console.error("-- -- set current to null in ctor")
  me._currentEntry = null
  me._processing = false

  me._pipeRoot = null
  me.on("pipe", function (src) {
    if (src.root === me._pipeRoot) return
    me._pipeRoot = src
    src.on("end", function () {
      me._pipeRoot = null
    })
    me.add(src)
  })
}

Pack.prototype.addGlobal = function (props) {
  // console.error("-- p addGlobal")
  if (this._didGlobal) return
  this._didGlobal = true

  var me = this
  GlobalHeaderWriter(props)
    .on("data", function (c) {
      me.emit("data", c)
    })
    .end()
}

Pack.prototype.add = function (stream) {
  if (this._global && !this._didGlobal) this.addGlobal(this._global)

  if (this._ended) return this.emit("error", new Error("add after end"))

  collect(stream)
  this._buffer.push(stream)
  this._process()
  this._needDrain = this._buffer.length > 0
  return !this._needDrain
}

Pack.prototype.pause = function () {
  this._paused = true
  if (this._currentEntry) this._currentEntry.pause()
  this.emit("pause")
}

Pack.prototype.resume = function () {
  this._paused = false
  if (this._currentEntry) this._currentEntry.resume()
  this.emit("resume")
  this._process()
}

Pack.prototype.end = function () {
  this._ended = true
  this._buffer.push(eof)
  this._process()
}

Pack.prototype._process = function () {
  var me = this
  if (me._paused || me._processing) {
    return
  }

  var entry = me._buffer.shift()

  if (!entry) {
    if (me._needDrain) {
      me.emit("drain")
    }
    return
  }

  if (entry.ready === false) {
    // console.error("-- entry is not ready", entry)
    me._buffer.unshift(entry)
    entry.on("ready", function () {
      // console.error("-- -- ready!", entry)
      me._process()
    })
    return
  }

  me._processing = true

  if (entry === eof) {
    // need 2 ending null blocks.
    me.emit("data", eof)
    me.emit("data", eof)
    me.emit("end")
    me.emit("close")
    return
  }

  // Change the path to be relative to the root dir that was
  // added to the tarball.
  //
  // XXX This should be more like how -C works, so you can
  // explicitly set a root dir, and also explicitly set a pathname
  // in the tarball to use.  That way we can skip a lot of extra
  // work when resolving symlinks for bundled dependencies in npm.

  var root = path.dirname((entry.root || entry).path);
  if (me._global && me._global.fromBase && entry.root && entry.root.path) {
    // user set 'fromBase: true' indicating tar root should be directory itself
    root = entry.root.path;
  }

  var wprops = {}

  Object.keys(entry.props || {}).forEach(function (k) {
    wprops[k] = entry.props[k]
  })

  if (me._noProprietary) wprops.noProprietary = true

  wprops.path = path.relative(root, entry.path || '')

  // actually not a matter of opinion or taste.
  if (process.platform === "win32") {
    wprops.path = wprops.path.replace(/\\/g, "/")
  }

  if (!wprops.type)
    wprops.type = 'Directory'

  switch (wprops.type) {
    // sockets not supported
    case "Socket":
      return

    case "Directory":
      wprops.path += "/"
      wprops.size = 0
      break

    case "Link":
      var lp = path.resolve(path.dirname(entry.path), entry.linkpath)
      wprops.linkpath = path.relative(root, lp) || "."
      wprops.size = 0
      break

    case "SymbolicLink":
      var lp = path.resolve(path.dirname(entry.path), entry.linkpath)
      wprops.linkpath = path.relative(path.dirname(entry.path), lp) || "."
      wprops.size = 0
      break
  }

  // console.error("-- new writer", wprops)
  // if (!wprops.type) {
  //   // console.error("-- no type?", entry.constructor.name, entry)
  // }

  // console.error("-- -- set current to new writer", wprops.path)
  var writer = me._currentEntry = EntryWriter(wprops)

  writer.parent = me

  // writer.on("end", function () {
  //   // console.error("-- -- writer end", writer.path)
  // })

  writer.on("data", function (c) {
    me.emit("data", c)
  })

  writer.on("header", function () {
    Buffer.prototype.toJSON = function () {
      return this.toString().split(/\0/).join(".")
    }
    // console.error("-- -- writer header %j", writer.props)
    if (writer.props.size === 0) nextEntry()
  })
  writer.on("close", nextEntry)

  var ended = false
  function nextEntry () {
    if (ended) return
    ended = true

    // console.error("-- -- writer close", writer.path)
    // console.error("-- -- set current to null", wprops.path)
    me._currentEntry = null
    me._processing = false
    me._process()
  }

  writer.on("error", function (er) {
    // console.error("-- -- writer error", writer.path)
    me.emit("error", er)
  })

  // if it's the root, then there's no need to add its entries,
  // or data, since they'll be added directly.
  if (entry === me._pipeRoot) {
    // console.error("-- is the root, don't auto-add")
    writer.add = null
  }

  entry.pipe(writer)
}

Pack.prototype.destroy = function () {}
Pack.prototype.write = function () {}
