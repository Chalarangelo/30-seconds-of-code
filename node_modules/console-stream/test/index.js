var ConsoleStream = require("../index")
var console = require("console")
var test = require("tape")

test("console stream", function (assert) {
    var stream = ConsoleStream()

    assert.ok(stream.write)
    assert.ok(stream.end)
    assert.ok(stream.destroy)

    assert.end()
})

test("console stream destroy", function (assert) {
    var stream = ConsoleStream()

    stream.once("close", function () {
        assert.ok(true)
        assert.end()
    })

    stream.destroy()
})

test("console stream end", function (assert) {
    var old = console.log
    console.log = intercept

    var closed = false
    var stream = ConsoleStream()
    var list = []

    stream.once("close", function () {
        closed = true

        console.log = old

        assert.deepEqual(list, ["foo"])
        assert.equal(closed, true)

        assert.end()
    })

    stream.end("foo")

    function intercept(chunk) {
        list.push(chunk)

        // old.apply(this, arguments)
    }
})

test("console stream write", function (assert) {
    var old = console.log
    console.log = intercept

    var list = []
    var stream = ConsoleStream()

    stream.write("one")
    stream.write("two")
    stream.write("three")
    stream.write("four\n")
    stream.write("five\na")
    stream.write("bar")
    stream.end()

    console.log = old

    assert.deepEqual(list, [
        "onetwothreefour"
        , "five"
        , "abar"
    ])
    assert.end()

    function intercept(chunk) {
        list.push(chunk)

        // old.apply(this, arguments)
    }
})
