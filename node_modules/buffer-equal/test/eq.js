var bufferEqual = require('../');
var test = require('tap').test;

test('equal', function (t) {
    var eq = bufferEqual(
        new Buffer([253,254,255]),
        new Buffer([253,254,255])
    );
    t.strictEqual(eq, true);
    t.end();
});

test('not equal', function (t) {
    var eq = bufferEqual(
        new Buffer('abc'),
        new Buffer('abcd')
    );
    t.strictEqual(eq, false);
    t.end();
});

test('not equal not buffer', function (t) {
    var eq = bufferEqual(
        new Buffer('abc'),
        'abc'
    );
    t.strictEqual(eq, undefined);
    t.end();
});

test('equal not buffer', function (t) {
    var eq = bufferEqual('abc', 'abc');
    t.strictEqual(eq, undefined);
    t.end();
});
