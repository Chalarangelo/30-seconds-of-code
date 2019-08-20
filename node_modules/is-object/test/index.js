var test = require('tape');

var isObject = require('../index');

test('returns true for objects', function (assert) {
	assert.equal(isObject({}), true);
	assert.equal(isObject([]), true);

	assert.end();
});

test('returns false for null', function (assert) {
	assert.equal(isObject(null), false);

	assert.end();
});

test('returns false for primitives', function (assert) {
	assert.equal(isObject(42), false);
	assert.equal(isObject('foo'), false);

	assert.end();
});
