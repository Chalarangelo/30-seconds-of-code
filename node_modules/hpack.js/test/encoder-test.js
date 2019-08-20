var assert = require('assert');
var hpack = require('../');

describe('hpack/encoder', function() {
  var encoder;

  beforeEach(function() {
    encoder = hpack.encoder.create();
  });

  function expect(arr, enc) {
    function isNumber(num) {
      return typeof num === 'number';
    }

    var out = Buffer.concat(encoder.render()).toString('hex');
    if (Array.isArray(arr) && !arr.every(isNumber)) {
      arr = arr.map(function(item) {
        return new Buffer(item, enc);
      });
      arr = Buffer.concat(arr);
    } else {
      arr = new Buffer(arr, enc);
    }
    var actual = arr.toString('hex');
    assert.equal(out, actual);
  }

  describe('bit', function() {
    it('should encode number bit-by-bit', function() {
      [ 1, 1, 1, 0, 1, 0, 1, 0,
        1, 0, 1, 0, 1, 1, 1, 1 ].forEach(function(bit) {
        encoder.encodeBit(bit);
      });
      expect([
        0b11101010,
        0b10101111
      ]);
    });

    it('should encode number using multiple bits', function() {
      for (var i = 0; i < 8; i++)
        encoder.encodeBits(0b1011010, 7);
      expect([
        0b10110101,
        0b01101010,
        0b11010101,
        0b10101011,
        0b01010110,
        0b10101101,
        0b01011010
      ]);
    });
  });

  describe('integer', function() {
    it('should encode 10 in prefix-5 (C.1.1)', function() {
      encoder.skipBits(3);
      encoder.encodeInt(10);
      expect([ 0x0a ]);
    });

    it('should decode 1337 in prefix-5 (C.1.2)', function() {
      encoder.skipBits(3);
      encoder.encodeInt(1337);
      expect([
        0b00011111,
        0b10011010,
        0b00001010
      ]);
    });

    it('should decode 42 at octect boundary (C.1.3)', function() {
      encoder.encodeInt(42);
      expect([ 0b00101010 ]);
    });

    it('should regression 6-bit test', function() {
      encoder.skipBits(2);
      encoder.encodeInt(63);
      expect([ 0b00111111, 0b00000000 ]);
    });
  });

  describe('string', function() {
    it('should encode literal from (C.2.1)', function() {
      encoder.encodeStr(new Buffer('custom-key'), false);
      expect([ [ 0x0a ], 'custom-key' ]);
    });

    it('should encode literal from (C.4.1)', function() {
      encoder.encodeStr(new Buffer('www.example.com'), true);
      expect('8c' +
                 'f1e3 c2e5 f23a 6ba0 ab90 f4ff'.replace(/ /g, ''),
             'hex');
    });

    it('should decode literal from (C.4.2)', function() {
      encoder.encodeStr(new Buffer('no-cache'), true);
      expect(
        '86' +
            'a8eb 1064 9cbf'.replace(/ /g, ''),
        'hex');
    });

    it('should encode literal from (C.4.3) #1', function() {
      encoder.encodeStr(new Buffer('custom-key'), true);
      expect(
        '88' +
            '25a8 49e9 5ba9 7d7f'.replace(/ /g, ''),
        'hex');
    });

    it('should encode literal from (C.4.3) #2', function() {
      encoder.encodeStr(new Buffer('custom-value'), true);
      expect(
        '89' +
            '25a8 49e9 5bb8 e8b4 bf'.replace(/ /g, ''),
        'hex');
    });

    it('should encode literal from (C.6.1) #1', function() {
      encoder.encodeStr(new Buffer('Mon, 21 Oct 2013 20:13:21 GMT'), true);
      expect(
        ('96' +
            'd07a be94 1054 d444 a820 0595 040b 8166' +
            'e082 a62d 1bff').replace(/ /g, ''),
        'hex');
    });

    it('should encode literal from (C.6.1) #2', function() {
      encoder.encodeStr(new Buffer('https://www.example.com'), true);
      expect(
        ('91' +
            '9d29 ad17 1863 c78f 0b97 c8e9 ae82 ae43' +
            'd3').replace(/ /g, ''),
        'hex');
    });

    it('should encode many 5 bit chars', function() {
      encoder.encodeStr(new Buffer('eeeeeeee'), true);
      // e = 00101, 0x294A5294A5 = 00101 x 8
      expect('85294A5294A5', 'hex');
    });

    it('should encode many 5 bit chars with 3-bit EOS', function() {
      // e = 00101, EOS=111,
      // 0x294A5294A52F = 00101 x 9 + 111
      encoder.encodeStr(new Buffer('eeeeeeeee'), true);
      expect('86294A5294A52F', 'hex');
    });

    it('should decode many 5 bit chars with 2-bit EOS', function() {
      // e = 00101, EOS=11,
      // 0x294A5297 = 00101 x 6 + 11
      encoder.encodeStr(new Buffer('eeeeee'), true);
      expect('84294A5297', 'hex');
    });

    it('should decode many multi-octet chars', function() {
      encoder.encodeStr([ 1, 1, 1, 1, 1, 1, 1, 1 ], true);
      expect('97ffffb1ffff63fffec7fffd8ffffb1ffff63fffec7fffd8',
             'hex');
    });
  });
});
