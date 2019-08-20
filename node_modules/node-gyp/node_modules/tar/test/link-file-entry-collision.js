// Set the umask, so that it works the same everywhere.
process.umask(parseInt('22', 8))

var tap = require("tap")
  , tar = require("../tar.js")
  , fs = require("fs")
  , path = require("path")
  , file = path.resolve(__dirname, "link-file-entry-collision/bad-link.tar")
  , target = path.resolve(__dirname, "tmp/link-file-entry-collision")
  , index = 0
  , fstream = require("fstream")
  , mkdirp = require("mkdirp")
  , rimraf = require("rimraf")

tap.test("preclean", function (t) {
  rimraf.sync(target)
  t.pass("cleaned!")
  t.end()
})

tap.test("extract test", function (t) {
  var extract = tar.Extract(target)
  var inp = fs.createReadStream(file)
  inp.pipe(extract)

  extract.on("end", function () {
    t.equal(fs.readFileSync(target + "/bad-link-target", "utf8"),
      "this should remain the same\n")
    t.equal(fs.readFileSync(target + "/a.txt", "utf8"),
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    t.end()
  })
})

tap.test("cleanup", function (t) {
  rimraf.sync(target)
  t.pass("cleaned!")
  t.end()
})
