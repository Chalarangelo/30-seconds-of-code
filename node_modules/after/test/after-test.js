/*global suite, test*/

var assert = require("assert")
    , after = require("../")

test("exists", function () {
    assert(typeof after === "function", "after is not a function")
})

test("after when called with 0 invokes", function (done) {
    after(0, done)
});

test("after 1", function (done) {
    var next = after(1, done)
    next()
})

test("after 5", function (done) {
    var next = after(5, done)
    , i = 5

    while (i--) {
        next()
    }
})

test("manipulate count", function (done) {
    var next = after(1, done)
    , i = 5

    next.count = i
    while (i--) {
        next()
    }
})

test("after terminates on error", function (done) {
    var next = after(2, function(err) {
        assert.equal(err.message, 'test');
        done();
    })
    next(new Error('test'))
    next(new Error('test2'))
})

test('gee', function(done) {
    done = after(2, done)

    function cb(err) {
        assert.equal(err.message, 1);
        done()
    }

    var next = after(3, cb, function(err) {
        assert.equal(err.message, 2)
        done()
    });

    next()
    next(new Error(1))
    next(new Error(2))
})

test('eee', function(done) {
    done = after(3, done)

    function cb(err) {
        assert.equal(err.message, 1);
        done()
    }

    var next = after(3, cb, function(err) {
        assert.equal(err.message, 2)
        done()
    });

    next(new Error(1))
    next(new Error(2))
    next(new Error(2))
})

test('gge', function(done) {
    function cb(err) {
        assert.equal(err.message, 1);
        done()
    }

    var next = after(3, cb, function(err) {
        // should not happen
        assert.ok(false);
    });

    next()
    next()
    next(new Error(1))
})

test('egg', function(done) {
    function cb(err) {
        assert.equal(err.message, 1);
        done()
    }

    var next = after(3, cb, function(err) {
        // should not happen
        assert.ok(false);
    });

    next(new Error(1))
    next()
    next()
})

test('throws on too many calls', function(done) {
    var next = after(1, done);
    next()
    assert.throws(next, /after called too many times/);
});

