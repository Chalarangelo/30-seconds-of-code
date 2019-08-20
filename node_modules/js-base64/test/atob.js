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

describe('atob', function () {

    describe('basic', function () {
        it('d',    is(Base64.btoa('d'),    'ZA=='));
        it('da',   is(Base64.btoa('da'),   'ZGE='));
        it('dan',  is(Base64.btoa('dan'),  'ZGFu'));
        it('ZA==', is(Base64.atob('ZA=='), 'd'   ));
        it('ZGE=', is(Base64.atob('ZGE='), 'da'  ));
        it('ZGFu', is(Base64.atob('ZGFu'), 'dan' ));
    });

    describe('whitespace', function () {
        it('Z A==', is(Base64.atob('ZA =='), 'd'   ));
        it('ZG E=', is(Base64.atob('ZG E='), 'da'  ));
        it('ZGF u', is(Base64.atob('ZGF u'), 'dan' ));
    });

    describe('null', function () {
        it('\\0',       is(Base64.btoa('\0'),     'AA=='));
        it('\\0\\0',    is(Base64.btoa('\0\0'),   'AAA='));
        it('\\0\\0\\0', is(Base64.btoa('\0\0\0'), 'AAAA'));
        it('AA==',      is(Base64.atob('AA=='), '\0'    ));
        it('AAA=',      is(Base64.atob('AAA='), '\0\0'  ));
        it('AAAA',      is(Base64.atob('AAAA'), '\0\0\0'));
    });

    describe('binary', function () {
        var pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        var pngBinary = '\x89\x50\x4e\x47\x0d\x0a\x1a\x0a\x00\x00\x00\x0d\x49\x48\x44\x52\x00\x00\x00\x01\x00\x00\x00\x01\x08\x04\x00\x00\x00\xb5\x1c\x0c\x02\x00\x00\x00\x0b\x49\x44\x41\x54\x78\xda\x63\x64\x60\x00\x00\x00\x06\x00\x02\x30\x81\xd0\x2f\x00\x00\x00\x00\x49\x45\x4e\x44\xae\x42\x60\x82';
        it('.btoa', is(Base64.btoa(pngBinary), pngBase64));
        it('.atob', is(Base64.atob(pngBase64), pngBinary));
    });

});
