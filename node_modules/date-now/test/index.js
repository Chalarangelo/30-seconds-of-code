var test = require("tape")
var setTimeout = require("timers").setTimeout

var now = require("../index")
var seeded = require("../seed")

test("date", function (assert) {
    var ts = now()
    var ts2 = Date.now()
    assert.equal(ts, ts2)
    assert.end()
})

test("seeded", function (assert) {
    var time = seeded(40)
    var ts = time()

    within(assert, time(), 40, 5)
    setTimeout(function () {
        within(assert, time(), 90, 10)
        assert.end()
    }, 50)
})

function within(assert, a, b, offset) {
    assert.ok(a + offset > b)
    assert.ok(a - offset < b)
}
