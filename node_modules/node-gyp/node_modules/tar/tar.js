// field paths that every tar file must have.
// header is padded to 512 bytes.
var f = 0
  , fields = {}
  , path = fields.path = f++
  , mode = fields.mode = f++
  , uid = fields.uid = f++
  , gid = fields.gid = f++
  , size = fields.size = f++
  , mtime = fields.mtime = f++
  , cksum = fields.cksum = f++
  , type = fields.type = f++
  , linkpath = fields.linkpath = f++
  , headerSize = 512
  , blockSize = 512
  , fieldSize = []

fieldSize[path] = 100
fieldSize[mode] = 8
fieldSize[uid] = 8
fieldSize[gid] = 8
fieldSize[size] = 12
fieldSize[mtime] = 12
fieldSize[cksum] = 8
fieldSize[type] = 1
fieldSize[linkpath] = 100

// "ustar\0" may introduce another bunch of headers.
// these are optional, and will be nulled out if not present.

var ustar = fields.ustar = f++
  , ustarver = fields.ustarver = f++
  , uname = fields.uname = f++
  , gname = fields.gname = f++
  , devmaj = fields.devmaj = f++
  , devmin = fields.devmin = f++
  , prefix = fields.prefix = f++
  , fill = fields.fill = f++

// terminate fields.
fields[f] = null

fieldSize[ustar] = 6
fieldSize[ustarver] = 2
fieldSize[uname] = 32
fieldSize[gname] = 32
fieldSize[devmaj] = 8
fieldSize[devmin] = 8
fieldSize[prefix] = 155
fieldSize[fill] = 12

// nb: prefix field may in fact be 130 bytes of prefix,
// a null char, 12 bytes for atime, 12 bytes for ctime.
//
// To recognize this format:
// 1. prefix[130] === ' ' or '\0'
// 2. atime and ctime are octal numeric values
// 3. atime and ctime have ' ' in their last byte

var fieldEnds = {}
  , fieldOffs = {}
  , fe = 0
for (var i = 0; i < f; i ++) {
  fieldOffs[i] = fe
  fieldEnds[i] = (fe += fieldSize[i])
}

// build a translation table of field paths.
Object.keys(fields).forEach(function (f) {
  if (fields[f] !== null) fields[fields[f]] = f
})

// different values of the 'type' field
// paths match the values of Stats.isX() functions, where appropriate
var types =
  { 0: "File"
  , "\0": "OldFile" // like 0
  , "": "OldFile"
  , 1: "Link"
  , 2: "SymbolicLink"
  , 3: "CharacterDevice"
  , 4: "BlockDevice"
  , 5: "Directory"
  , 6: "FIFO"
  , 7: "ContiguousFile" // like 0
  // posix headers
  , g: "GlobalExtendedHeader" // k=v for the rest of the archive
  , x: "ExtendedHeader" // k=v for the next file
  // vendor-specific stuff
  , A: "SolarisACL" // skip
  , D: "GNUDumpDir" // like 5, but with data, which should be skipped
  , I: "Inode" // metadata only, skip
  , K: "NextFileHasLongLinkpath" // data = link path of next file
  , L: "NextFileHasLongPath" // data = path of next file
  , M: "ContinuationFile" // skip
  , N: "OldGnuLongPath" // like L
  , S: "SparseFile" // skip
  , V: "TapeVolumeHeader" // skip
  , X: "OldExtendedHeader" // like x
  }

Object.keys(types).forEach(function (t) {
  types[types[t]] = types[types[t]] || t
})

// values for the mode field
var modes =
  { suid: 04000 // set uid on extraction
  , sgid: 02000 // set gid on extraction
  , svtx: 01000 // set restricted deletion flag on dirs on extraction
  , uread:  0400
  , uwrite: 0200
  , uexec:  0100
  , gread:  040
  , gwrite: 020
  , gexec:  010
  , oread:  4
  , owrite: 2
  , oexec:  1
  , all: 07777
  }

var numeric =
  { mode: true
  , uid: true
  , gid: true
  , size: true
  , mtime: true
  , devmaj: true
  , devmin: true
  , cksum: true
  , atime: true
  , ctime: true
  , dev: true
  , ino: true
  , nlink: true
  }

Object.keys(modes).forEach(function (t) {
  modes[modes[t]] = modes[modes[t]] || t
})

var knownExtended =
  { atime: true
  , charset: true
  , comment: true
  , ctime: true
  , gid: true
  , gname: true
  , linkpath: true
  , mtime: true
  , path: true
  , realtime: true
  , security: true
  , size: true
  , uid: true
  , uname: true }


exports.fields = fields
exports.fieldSize = fieldSize
exports.fieldOffs = fieldOffs
exports.fieldEnds = fieldEnds
exports.types = types
exports.modes = modes
exports.numeric = numeric
exports.headerSize = headerSize
exports.blockSize = blockSize
exports.knownExtended = knownExtended

exports.Pack = require("./lib/pack.js")
exports.Parse = require("./lib/parse.js")
exports.Extract = require("./lib/extract.js")
