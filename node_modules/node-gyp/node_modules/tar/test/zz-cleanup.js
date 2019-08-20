// clean up the fixtures

var tap = require("tap")
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
