/*
 * $Id: es5.js,v 0.1 2012/08/23 19:43:17 dankogai Exp dankogai $
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

if ('extendString' in Base64){
    Base64.extendString();
    describe('String', function () {
        it('.toBase64', is('小飼弾'.toBase64(), '5bCP6aO85by+'));
        it('.toBase64', is('小飼弾'.toBase64(true), '5bCP6aO85by-'));
        it('.toBase64URI', is('小飼弾'.toBase64URI(), '5bCP6aO85by-'));
        it('.fromBase64', is('5bCP6aO85by+'.fromBase64(), '小飼弾'));
        it('.fromBase64', is('5bCP6aO85by-'.fromBase64(), '小飼弾'));
    });
}
