/*
 * $Id: large.js,v 0.3 2012/08/23 19:14:37 dankogai Exp dankogai $
 *
 * use mocha to test me
 *   http://visionmedia.github.com/mocha/
 */
var assert = assert || require("assert");
var Base64 = Base64 || require('../base64.js').Base64;
var is = function (a, e, m) {
    return function () {
        assert.equal(a, e, m)
    }
};
var seed = function () {
    var a, i;
    for (a = [], i = 0; i < 256; i++) {
        a.push(String.fromCharCode(i));
    }
    return a.join('');
}();
describe('Base64', function () {
    for (var i = 0, str = seed; i < 16; str += str, i++) {
        it(''+str.length, is(Base64.decode(Base64.encode(str)), str));
    }
});
