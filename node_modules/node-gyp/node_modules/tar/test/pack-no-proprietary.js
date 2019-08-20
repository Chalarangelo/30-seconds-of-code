// This is exactly like test/pack.js, except that it's excluding
// any proprietary headers.
//
// This loses some information about the filesystem, but creates
// tarballs that are supported by more versions of tar, especially
// old non-spec-compliant copies of gnutar.

// the symlink file is excluded from git, because it makes
// windows freak the hell out.
var fs = require("fs")
  , path = require("path")
  , symlink = path.resolve(__dirname, "fixtures/symlink")
try { fs.unlinkSync(symlink) } catch (e) {}
fs.symlinkSync("./hardlink-1", symlink)
process.on("exit", function () {
  fs.unlinkSync(symlink)
})

var tap = require("tap")
  , tar = require("../tar.js")
  , pkg = require("../package.json")
  , Pack = tar.Pack
  , fstream = require("fstream")
  , Reader = fstream.Reader
  , Writer = fstream.Writer
  , input = path.resolve(__dirname, "fixtures/")
  , target = path.resolve(__dirname, "tmp/pack.tar")
  , uid = process.getuid ? process.getuid() : 0
  , gid = process.getgid ? process.getgid() : 0

  , entries =

    // the global header and root fixtures/ dir are going to get
    // a different date each time, so omit that bit.
    // Also, dev/ino values differ across machines, so that's not
    // included.
    [ [ 'entry',
      { path: 'fixtures/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'extendedHeader',
      { path: 'PaxHeader/fixtures/200cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        mode: 420,
        uid: uid,
        gid: gid,
        type: 'x',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' },
      { path: 'fixtures/200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        uid: uid,
        gid: gid,
        size: 200 } ]

    , [ 'entry',
      { path: 'fixtures/200ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 200,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/a.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 257,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/b.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 512,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/c.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 513,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/cc.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 513,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/dir/',
        mode: 488,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/dir/sub/',
        mode: 488,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/foo.js',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 4,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/hardlink-1',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 200,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/hardlink-2',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 0,
        type: '1',
        linkpath: 'fixtures/hardlink-1',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/omega.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 2,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/packtest/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/packtest/omega.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 2,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/packtest/star.4.html',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 54081,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'extendedHeader',
      { path: 'PaxHeader/fixtures/packtest/Ω.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        type: 'x',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' },
      { path: 'fixtures/packtest/Ω.txt',
        uid: uid,
        gid: gid,
        size: 2 } ]

    , [ 'entry',
      { path: 'fixtures/packtest/Ω.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 2,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/h/',
        mode: 493,
        uid: uid,
        gid: gid,
        size: 0,
        type: '5',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/r/e/a/l/l/y/-/d/e/e/p/-/f/o/l/d/e/r/-/p/a/t/h/cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 100,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'entry',
      { path: 'fixtures/symlink',
        uid: uid,
        gid: gid,
        size: 0,
        type: '2',
        linkpath: 'hardlink-1',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]

    , [ 'extendedHeader',
      { path: 'PaxHeader/fixtures/Ω.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        type: 'x',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' },
      { path: "fixtures/Ω.txt"
      , uid: uid
      , gid: gid
      , size: 2 } ]

    , [ 'entry',
      { path: 'fixtures/Ω.txt',
        mode: 420,
        uid: uid,
        gid: gid,
        size: 2,
        type: '0',
        linkpath: '',
        ustar: 'ustar\u0000',
        ustarver: '00',
        uname: '',
        gname: '',
        devmaj: 0,
        devmin: 0,
        fill: '' } ]
    ]


// first, make sure that the hardlinks are actually hardlinks, or this
// won't work.  Git has a way of replacing them with a copy.
var hard1 = path.resolve(__dirname, "fixtures/hardlink-1")
  , hard2 = path.resolve(__dirname, "fixtures/hardlink-2")
  , fs = require("fs")

try { fs.unlinkSync(hard2) } catch (e) {}
fs.linkSync(hard1, hard2)

tap.test("with global header", { timeout: 10000 }, function (t) {
  runTest(t, true)
})

tap.test("without global header", { timeout: 10000 }, function (t) {
  runTest(t, false)
})

function alphasort (a, b) {
  return a === b ? 0
       : a.toLowerCase() > b.toLowerCase() ? 1
       : a.toLowerCase() < b.toLowerCase() ? -1
       : a > b ? 1
       : -1
}


function runTest (t, doGH) {
  var reader = Reader({ path: input
                      , filter: function () {
                          return !this.path.match(/\.(tar|hex)$/)
                        }
                      , sort: alphasort
                      })

  var props = doGH ? pkg : {}
  props.noProprietary = true
  var pack = Pack(props)
  var writer = Writer(target)

  // global header should be skipped regardless, since it has no content.
  var entry = 0

  t.ok(reader, "reader ok")
  t.ok(pack, "pack ok")
  t.ok(writer, "writer ok")

  pack.pipe(writer)

  var parse = tar.Parse()
  t.ok(parse, "parser should be ok")

  pack.on("data", function (c) {
    // console.error("PACK DATA")
    if (c.length !== 512) {
      // this one is too noisy, only assert if it'll be relevant
      t.equal(c.length, 512, "parser should emit data in 512byte blocks")
    }
    parse.write(c)
  })

  pack.on("end", function () {
    // console.error("PACK END")
    t.pass("parser ends")
    parse.end()
  })

  pack.on("error", function (er) {
    t.fail("pack error", er)
  })

  parse.on("error", function (er) {
    t.fail("parse error", er)
  })

  writer.on("error", function (er) {
    t.fail("writer error", er)
  })

  reader.on("error", function (er) {
    t.fail("reader error", er)
  })

  parse.on("*", function (ev, e) {
    var wanted = entries[entry++]
    if (!wanted) {
      t.fail("unexpected event: "+ev)
      return
    }
    t.equal(ev, wanted[0], "event type should be "+wanted[0])

    if (ev !== wanted[0] || e.path !== wanted[1].path) {
      console.error("wanted", wanted)
      console.error([ev, e.props])
      e.on("end", function () {
        console.error(e.fields)
        throw "break"
      })
    }

    t.has(e.props, wanted[1], "properties "+wanted[1].path)
    if (wanted[2]) {
      e.on("end", function () {
        if (!e.fields) {
          t.ok(e.fields, "should get fields")
        } else {
          t.has(e.fields, wanted[2], "should get expected fields")
        }
      })
    }
  })

  reader.pipe(pack)

  writer.on("close", function () {
    t.equal(entry, entries.length, "should get all expected entries")
    t.pass("it finished")
    t.end()
  })

}
