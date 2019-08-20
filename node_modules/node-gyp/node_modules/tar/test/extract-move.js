// Set the umask, so that it works the same everywhere.
process.umask(parseInt('22', 8))

var tap = require("tap")
  , tar = require("../tar.js")
  , fs = require("fs")
  , gfs = require("graceful-fs")
  , path = require("path")
  , file = path.resolve(__dirname, "fixtures/dir.tar")
  , target = path.resolve(__dirname, "tmp/extract-test")
  , index = 0
  , fstream = require("fstream")
  , rimraf = require("rimraf")
  , mkdirp = require("mkdirp")

  , ee = 0
  , expectEntries = [
      {
        "path" : "dir/",
        "mode" : "750",
        "type" : "5",
        "depth" : undefined,
        "size" : 0,
        "linkpath" : "",
        "nlink" : undefined,
        "dev" : undefined,
        "ino" : undefined
      },
      {
        "path" : "dir/sub/",
        "mode" : "750",
        "type" : "5",
        "depth" : undefined,
        "size" : 0,
        "linkpath" : "",
        "nlink" : undefined,
        "dev" : undefined,
        "ino" : undefined
      } ]

function slow (fs, method, t1, t2) {
  var orig = fs[method]
  if (!orig) return null
  fs[method] = function () {
    var args = [].slice.call(arguments)
    console.error("slow", method, args[0])
    var cb = args.pop()

    setTimeout(function () {
      orig.apply(fs, args.concat(function(er, data) {
        setTimeout(function() {
          cb(er, data)
        }, t2)
      }))
    }, t1)
  }
}

// Make sure we get the graceful-fs that fstream is using.
var gfs2
try {
  gfs2 = require("fstream/node_modules/graceful-fs")
} catch (er) {}

var slowMethods = ["chown", "chmod", "utimes", "lutimes"]
slowMethods.forEach(function (method) {
  var t1 = 500
  var t2 = 0
  slow(fs, method, t1, t2)
  slow(gfs, method, t1, t2)
  if (gfs2) {
    slow(gfs2, method, t1, t2)
  }
})



// The extract class basically just pipes the input
// to a Reader, and then to a fstream.DirWriter

// So, this is as much a test of fstream.Reader and fstream.Writer
// as it is of tar.Extract, but it sort of makes sense.

tap.test("preclean", function (t) {
  rimraf.sync(target)
  /mkdirp.sync(target)
  t.pass("cleaned!")
  t.end()
})

tap.test("extract test", function (t) {
  var extract = tar.Extract(target)
  var inp = fs.createReadStream(file)

  // give it a weird buffer size to try to break in odd places
  inp.bufferSize = 1234

  inp.pipe(extract)

  extract.on("end", function () {
    rimraf.sync(target)

    t.equal(ee, expectEntries.length, "should see "+ee+" entries")

    // should get no more entries after end
    extract.removeAllListeners("entry")
    extract.on("entry", function (e) {
      t.fail("Should not get entries after end!")
    })

    t.end()
  })


  extract.on("entry", function (entry) {
    var found =
      { path: entry.path
      , mode: entry.props.mode.toString(8)
      , type: entry.props.type
      , depth: entry.props.depth
      , size: entry.props.size
      , linkpath: entry.props.linkpath
      , nlink: entry.props.nlink
      , dev: entry.props.dev
      , ino: entry.props.ino
      }

    var wanted = expectEntries[ee ++]

    t.equivalent(found, wanted, "tar entry " + ee + " " + wanted.path)
  })
})
