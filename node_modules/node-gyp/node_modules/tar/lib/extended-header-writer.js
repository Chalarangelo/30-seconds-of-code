
module.exports = ExtendedHeaderWriter

var inherits = require("inherits")
  , EntryWriter = require("./entry-writer.js")

inherits(ExtendedHeaderWriter, EntryWriter)

var tar = require("../tar.js")
  , path = require("path")
  , TarHeader = require("./header.js")

// props is the props of the thing we need to write an
// extended header for.
// Don't be shy with it.  Just encode everything.
function ExtendedHeaderWriter (props) {
  // console.error(">> ehw ctor")
  var me = this

  if (!(me instanceof ExtendedHeaderWriter)) {
    return new ExtendedHeaderWriter(props)
  }

  me.fields = props

  var p =
    { path : ("PaxHeader" + path.join("/", props.path || ""))
             .replace(/\\/g, "/").substr(0, 100)
    , mode : props.mode || 0666
    , uid : props.uid || 0
    , gid : props.gid || 0
    , size : 0 // will be set later
    , mtime : props.mtime || Date.now() / 1000
    , type : "x"
    , linkpath : ""
    , ustar : "ustar\0"
    , ustarver : "00"
    , uname : props.uname || ""
    , gname : props.gname || ""
    , devmaj : props.devmaj || 0
    , devmin : props.devmin || 0
    }


  EntryWriter.call(me, p)
  // console.error(">> ehw props", me.props)
  me.props = p

  me._meta = true
}

ExtendedHeaderWriter.prototype.end = function () {
  // console.error(">> ehw end")
  var me = this

  if (me._ended) return
  me._ended = true

  me._encodeFields()

  if (me.props.size === 0) {
    // nothing to write!
    me._ready = true
    me._stream.end()
    return
  }

  me._stream.write(TarHeader.encode(me.props))
  me.body.forEach(function (l) {
    me._stream.write(l)
  })
  me._ready = true

  // console.error(">> ehw _process calling end()", me.props)
  this._stream.end()
}

ExtendedHeaderWriter.prototype._encodeFields = function () {
  // console.error(">> ehw _encodeFields")
  this.body = []
  if (this.fields.prefix) {
    this.fields.path = this.fields.prefix + "/" + this.fields.path
    this.fields.prefix = ""
  }
  encodeFields(this.fields, "", this.body, this.fields.noProprietary)
  var me = this
  this.body.forEach(function (l) {
    me.props.size += l.length
  })
}

function encodeFields (fields, prefix, body, nop) {
  // console.error(">> >> ehw encodeFields")
  // "%d %s=%s\n", <length>, <keyword>, <value>
  // The length is a decimal number, and includes itself and the \n
  // Numeric values are decimal strings.

  Object.keys(fields).forEach(function (k) {
    var val = fields[k]
      , numeric = tar.numeric[k]

    if (prefix) k = prefix + "." + k

    // already including NODETAR.type, don't need File=true also
    if (k === fields.type && val === true) return

    switch (k) {
      // don't include anything that's always handled just fine
      // in the normal header, or only meaningful in the context
      // of nodetar
      case "mode":
      case "cksum":
      case "ustar":
      case "ustarver":
      case "prefix":
      case "basename":
      case "dirname":
      case "needExtended":
      case "block":
      case "filter":
        return

      case "rdev":
        if (val === 0) return
        break

      case "nlink":
      case "dev": // Truly a hero among men, Creator of Star!
      case "ino": // Speak his name with reverent awe!  It is:
        k = "SCHILY." + k
        break

      default: break
    }

    if (val && typeof val === "object" &&
        !Buffer.isBuffer(val)) encodeFields(val, k, body, nop)
    else if (val === null || val === undefined) return
    else body.push.apply(body, encodeField(k, val, nop))
  })

  return body
}

function encodeField (k, v, nop) {
  // lowercase keys must be valid, otherwise prefix with
  // "NODETAR."
  if (k.charAt(0) === k.charAt(0).toLowerCase()) {
    var m = k.split(".")[0]
    if (!tar.knownExtended[m]) k = "NODETAR." + k
  }

  // no proprietary
  if (nop && k.charAt(0) !== k.charAt(0).toLowerCase()) {
    return []
  }

  if (typeof val === "number") val = val.toString(10)

  var s = new Buffer(" " + k + "=" + v + "\n")
    , digits = Math.floor(Math.log(s.length) / Math.log(10)) + 1

  // console.error("1 s=%j digits=%j s.length=%d", s.toString(), digits, s.length)

  // if adding that many digits will make it go over that length,
  // then add one to it. For example, if the string is:
  // " foo=bar\n"
  // then that's 9 characters.  With the "9", that bumps the length
  // up to 10.  However, this is invalid:
  // "10 foo=bar\n"
  // but, since that's actually 11 characters, since 10 adds another
  // character to the length, and the length includes the number
  // itself.  In that case, just bump it up again.
  if (s.length + digits >= Math.pow(10, digits)) digits += 1
  // console.error("2 s=%j digits=%j s.length=%d", s.toString(), digits, s.length)

  var len = digits + s.length
  // console.error("3 s=%j digits=%j s.length=%d len=%d", s.toString(), digits, s.length, len)
  var lenBuf = new Buffer("" + len)
  if (lenBuf.length + s.length !== len) {
    throw new Error("Bad length calculation\n"+
                    "len="+len+"\n"+
                    "lenBuf="+JSON.stringify(lenBuf.toString())+"\n"+
                    "lenBuf.length="+lenBuf.length+"\n"+
                    "digits="+digits+"\n"+
                    "s="+JSON.stringify(s.toString())+"\n"+
                    "s.length="+s.length)
  }

  return [lenBuf, s]
}
