// the fixtures have some weird stuff that is painful
// to include directly in the repo for various reasons.
//
// So, unpack the fixtures with the system tar first.
//
// This means, of course, that it'll only work if you
// already have a tar implementation, and some of them
// will not properly unpack the fixtures anyway.
//
// But, since usually those tests will fail on Windows
// and other systems with less capable filesystems anyway,
// at least this way we don't cause inconveniences by
// merely cloning the repo or installing the package.

var tap = require("tap")
, child_process = require("child_process")
, rimraf = require("rimraf")
, test = tap.test
, path = require("path")

test("clean fixtures", function (t) {
  rimraf(path.resolve(__dirname, "fixtures"), function (er) {
    t.ifError(er, "rimraf ./fixtures/")
    t.end()
  })
})

test("clean tmp", function (t) {
  rimraf(path.resolve(__dirname, "tmp"), function (er) {
    t.ifError(er, "rimraf ./tmp/")
    t.end()
  })
})

test("extract fixtures", function (t) {
  var c = child_process.spawn("tar"
                             ,["xzvf", "fixtures.tgz"]
                             ,{ cwd: __dirname })

  c.stdout.on("data", errwrite)
  c.stderr.on("data", errwrite)
  function errwrite (chunk) {
    process.stderr.write(chunk)
  }

  c.on("exit", function (code) {
    t.equal(code, 0, "extract fixtures should exit with 0")
    if (code) {
      t.comment("Note, all tests from here on out will fail because of this.")
    }
    t.end()
  })
})
