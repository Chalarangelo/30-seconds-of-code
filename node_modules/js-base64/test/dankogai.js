/*
 * $Id: dankogai.js,v 0.4 2012/08/24 05:23:18 dankogai Exp dankogai $
 *
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

describe('basic', function () {
    it('d',    is(Base64.encode('d'),    'ZA=='));
    it('da',   is(Base64.encode('da'),   'ZGE='));
    it('dan',  is(Base64.encode('dan'),  'ZGFu'));
    it('ZA==', is(Base64.decode('ZA=='), 'd'   ));
    it('ZGE=', is(Base64.decode('ZGE='), 'da'  ));
    it('ZGFu', is(Base64.decode('ZGFu'), 'dan' ));
});

describe('whitespace', function () {
    it('Z A==', is(Base64.decode('ZA =='), 'd'   ));
    it('ZG E=', is(Base64.decode('ZG E='), 'da'  ));
    it('ZGF u', is(Base64.decode('ZGF u'), 'dan' ));
});

describe('null', function () {
    it('\\0',       is(Base64.encode('\0'),     'AA=='));
    it('\\0\\0',    is(Base64.encode('\0\0'),   'AAA='));
    it('\\0\\0\\0', is(Base64.encode('\0\0\0'), 'AAAA'));
    it('AA==',      is(Base64.decode('AA=='), '\0'    ));
    it('AAA=',      is(Base64.decode('AAA='), '\0\0'  ));
    it('AAAA',      is(Base64.decode('AAAA'), '\0\0\0'));
});

describe('Base64', function () {
    it('.encode', is(Base64.encode('小飼弾'), '5bCP6aO85by+'));
    it('.encodeURI', is(Base64.encodeURI('小飼弾'), '5bCP6aO85by-'));
    it('.decode', is(Base64.decode('5bCP6aO85by+'), '小飼弾'));
    it('.decode', is(Base64.decode('5bCP6aO85by-'), '小飼弾'));
});
