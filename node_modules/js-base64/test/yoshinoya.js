/*
 * use mocha to test me
 * http://visionmedia.github.com/mocha/
 */
var assert = assert || require("assert");
var Base64 = Base64 || require('../base64.js').Base64;
var is = function (a, e, m) {
    return function () {
        assert.equal(a, e, m)
    }
};

describe('Yoshinoya', function () {
    it('.encode', is(Base64.encode('𠮷野家'), '8KCut+mHjuWutg=='));
    it('.encodeURI', is(Base64.encodeURI('𠮷野家'), '8KCut-mHjuWutg'));
    it('.decode', is(Base64.decode('8KCut+mHjuWutg=='), '𠮷野家'));
    it('.decode', is(Base64.decode('8KCut-mHjuWutg'), '𠮷野家'));
    /* it('.decode', is(Base64.decode('7aGC7b636YeO5a62'), '𠮷野家')); */
});
