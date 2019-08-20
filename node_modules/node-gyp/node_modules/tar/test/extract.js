// Set the umask, so that it works the same everywhere.
process.umask(parseInt('22', 8))

var tap = require("tap")
  , tar = require("../tar.js")
  , fs = require("fs")
  , path = require("path")
  , file = path.resolve(__dirname, "fixtures/c.tar")
  , target = path.resolve(__dirname, "tmp/extract-test")
  , index = 0
  , fstream = require("fstream")

  , ee = 0
  , expectEntries =
[ { path: 'c.txt',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 513,
    linkpath: '',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: 'cc.txt',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 513,
    linkpath: '',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: 'r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/h/cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 100,
    linkpath: '',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: 'Ω.txt',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 2,
    linkpath: '',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: 'Ω.txt',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 2,
    linkpath: '',
    nlink: 1,
    dev: 234881026,
    ino: 51693379 },
  { path: '200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 200,
    linkpath: '',
    nlink: 1,
    dev: 234881026,
    ino: 51681874 },
  { path: '200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 201,
    linkpath: '',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: '200LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
    mode: '777',
    type: '2',
    depth: undefined,
    size: 0,
    linkpath: '200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    nlink: undefined,
    dev: undefined,
    ino: undefined },
  { path: '200-hard',
    mode: '644',
    type: '0',
    depth: undefined,
    size: 200,
    linkpath: '',
    nlink: 2,
    dev: 234881026,
    ino: 51681874 },
  { path: '200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '644',
    type: '1',
    depth: undefined,
    size: 0,
    linkpath: path.resolve(target, '200-hard'),
    nlink: 2,
    dev: 234881026,
    ino: 51681874 } ]

  , ef = 0
  , expectFiles =
[ { path: '',
    mode: '40755',
    type: 'Directory',
    depth: 0,
    linkpath: undefined },
  { path: '/200-hard',
    mode: '100644',
    type: 'File',
    depth: 1,
    size: 200,
    linkpath: undefined,
    nlink: 2 },
  { path: '/200LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
    mode: '120777',
    type: 'SymbolicLink',
    depth: 1,
    size: 200,
    linkpath: '200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    nlink: 1 },
  { path: '/200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '100644',
    type: 'Link',
    depth: 1,
    size: 200,
    linkpath: path.join(target, '200-hard'),
    nlink: 2 },
  { path: '/c.txt',
    mode: '100644',
    type: 'File',
    depth: 1,
    size: 513,
    linkpath: undefined,
    nlink: 1 },
  { path: '/cc.txt',
    mode: '100644',
    type: 'File',
    depth: 1,
    size: 513,
    linkpath: undefined,
    nlink: 1 },
  { path: '/r',
    mode: '40755',
    type: 'Directory',
    depth: 1,
    linkpath: undefined },
  { path: '/r/e',
    mode: '40755',
    type: 'Directory',
    depth: 2,
    linkpath: undefined },
  { path: '/r/e/a',
    mode: '40755',
    type: 'Directory',
    depth: 3,
    linkpath: undefined },
  { path: '/r/e/a/l',
    mode: '40755',
    type: 'Directory',
    depth: 4,
    linkpath: undefined },
  { path: '/r/e/a/l/l',
    mode: '40755',
    type: 'Directory',
    depth: 5,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y',
    mode: '40755',
    type: 'Directory',
    depth: 6,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-',
    mode: '40755',
    type: 'Directory',
    depth: 7,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d',
    mode: '40755',
    type: 'Directory',
    depth: 8,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e',
    mode: '40755',
    type: 'Directory',
    depth: 9,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e',
    mode: '40755',
    type: 'Directory',
    depth: 10,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p',
    mode: '40755',
    type: 'Directory',
    depth: 11,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-',
    mode: '40755',
    type: 'Directory',
    depth: 12,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f',
    mode: '40755',
    type: 'Directory',
    depth: 13,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o',
    mode: '40755',
    type: 'Directory',
    depth: 14,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l',
    mode: '40755',
    type: 'Directory',
    depth: 15,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d',
    mode: '40755',
    type: 'Directory',
    depth: 16,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e',
    mode: '40755',
    type: 'Directory',
    depth: 17,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r',
    mode: '40755',
    type: 'Directory',
    depth: 18,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-',
    mode: '40755',
    type: 'Directory',
    depth: 19,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p',
    mode: '40755',
    type: 'Directory',
    depth: 20,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a',
    mode: '40755',
    type: 'Directory',
    depth: 21,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t',
    mode: '40755',
    type: 'Directory',
    depth: 22,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/h',
    mode: '40755',
    type: 'Directory',
    depth: 23,
    linkpath: undefined },
  { path: '/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/h/cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    mode: '100644',
    type: 'File',
    depth: 24,
    size: 100,
    linkpath: undefined,
    nlink: 1 },
  { path: '/Ω.txt',
    mode: '100644',
    type: 'File',
    depth: 1,
    size: 2,
    linkpath: undefined,
    nlink: 1 } ]



// The extract class basically just pipes the input
// to a Reader, and then to a fstream.DirWriter

// So, this is as much a test of fstream.Reader and fstream.Writer
// as it is of tar.Extract, but it sort of makes sense.

tap.test("preclean", function (t) {
  require("rimraf").sync(__dirname + "/tmp/extract-test")
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
    t.equal(ee, expectEntries.length, "should see "+ee+" entries")

    // should get no more entries after end
    extract.removeAllListeners("entry")
    extract.on("entry", function (e) {
      t.fail("Should not get entries after end!")
    })

    next()
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

  function next () {
    var r = fstream.Reader({ path: target
                           , type: "Directory"
                           // this is just to encourage consistency
                           , sort: "alpha" })

    r.on("ready", function () {
      foundEntry(r)
    })

    r.on("end", finish)

    function foundEntry (entry) {
      var p = entry.path.substr(target.length)
      var found =
        { path: p
        , mode: entry.props.mode.toString(8)
        , type: entry.props.type
        , depth: entry.props.depth
        , size: entry.props.size
        , linkpath: entry.props.linkpath
        , nlink: entry.props.nlink
        }

      var wanted = expectFiles[ef ++]

      t.has(found, wanted, "unpacked file " + ef + " " + wanted.path)

      entry.on("entry", foundEntry)
    }

    function finish () {
      t.equal(ef, expectFiles.length, "should have "+ef+" items")
      t.end()
    }
  }
})
