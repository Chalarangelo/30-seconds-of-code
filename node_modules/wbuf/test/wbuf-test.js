var assert = require('assert');
var WriteBuffer = require('../');

describe('WriteBuffer', function() {
  var w;
  beforeEach(function() {
    w = new WriteBuffer();
  });

  function join(arr) {
    return arr.map(function(buf) {
      return buf.toString('hex');
    }).join('');
  }

  describe('.writeUInt8', function() {
    it('should write bytes', function() {
      w.writeUInt8(1);
      w.writeUInt8(2);
      w.writeUInt8(3);
      w.writeUInt8(4);
      assert.equal(join(w.render()), '01020304');
    });

    it('should correctly handle overflow', function() {
      w.reserve(3);
      w.writeUInt8(1);
      w.writeUInt8(2);
      w.writeUInt8(3);
      w.writeUInt8(4);
      assert.equal(join(w.render()), '01020304');
    });
  });

  describe('.writeInt8', function() {
    it('should write bytes', function() {
      w.writeInt8(-1);
      w.writeInt8(2);
      assert.equal(join(w.render()), 'ff02');
    });
  });

  describe('.writeUInt16BE', function() {
    it('should write bytes', function() {
      w.writeUInt16BE(0x0102);
      w.writeUInt16BE(0x0304);
      assert.equal(join(w.render()), '01020304');
    });

    it('should correctly handle overflow', function() {
      w.reserve(2);
      w.reserve(3);
      w.writeUInt16BE(0x0102);
      w.writeUInt16BE(0x0304);
      w.writeUInt16BE(0x0506);
      assert.equal(join(w.render()), '010203040506');
    });
  });

  describe('.writeInt16BE', function() {
    it('should write bytes', function() {
      w.writeInt16BE(-0x0102);
      w.writeInt16BE(0x0304);
      assert.equal(join(w.render()), 'fefe0304');
    });
  });

  describe('.writeUInt16LE', function() {
    it('should write bytes', function() {
      w.writeUInt16LE(0x0102);
      w.writeUInt16LE(0x0304);
      assert.equal(join(w.render()), '02010403');
    });

    it('should correctly handle overflow', function() {
      w.reserve(2);
      w.reserve(3);
      w.writeUInt16LE(0x0102);
      w.writeUInt16LE(0x0304);
      w.writeUInt16LE(0x0506);
      assert.equal(join(w.render()), '020104030605');
    });
  });

  describe('.writeInt16LE', function() {
    it('should write bytes', function() {
      w.writeInt16LE(-0x0201);
      w.writeInt16LE(0x0304);
      assert.equal(join(w.render()), 'fffd0403');
    });
  });

  describe('.writeUInt24BE', function() {
    it('should write bytes', function() {
      w.writeUInt24BE(0x010203);
      w.writeUInt24BE(0x040506);
      assert.equal(join(w.render()), '010203040506');
    });

    it('should correctly set avail on boundary', function() {
      w = new WriteBuffer();
      w.reserveRate = 4;
      w.writeUInt16BE(1);
      w.writeUInt24BE(1);
      assert.equal(w.avail, 3);
    });
  });

  describe('.writeInt24BE', function() {
    it('should write bytes', function() {
      w.writeInt24BE(-0x010203);
      w.writeInt24BE(0x040506);
      assert.equal(join(w.render()), 'fefdfd040506');
    });
  });

  describe('.writeUInt24LE', function() {
    it('should write bytes', function() {
      w.writeUInt24LE(0x010203);
      w.writeUInt24LE(0x040506);
      assert.equal(join(w.render()), '030201060504');
    });
  });

  describe('.writeInt24LE', function() {
    it('should write bytes', function() {
      w.writeInt24LE(-0x010203);
      w.writeInt24LE(0x040506);
      assert.equal(join(w.render()), 'fdfdfe060504');
    });
  });

  describe('.writeUInt32BE', function() {
    it('should write bytes', function() {
      w.writeUInt32BE(0x01020304);
      w.writeUInt32BE(0x05060708);
      assert.equal(join(w.render()), '0102030405060708');
    });

    it('should write bytes on the boundary', function() {
      w.reserve(4);
      w.writeUInt8(0x00);
      w.writeUInt32BE(0x01020304);
      assert.equal(join(w.render()), '0001020304');
    });
  });

  describe('.writeInt32BE', function() {
    it('should write bytes', function() {
      w.writeInt32BE(-0x01020304);
      w.writeInt32BE(0x05060708);
      assert.equal(join(w.render()), 'fefdfcfc05060708');
    });
  });

  describe('.writeUInt32LE', function() {
    it('should write bytes', function() {
      w.writeUInt32LE(0x01020304);
      w.writeUInt32LE(0x05060708);
      assert.equal(join(w.render()), '0403020108070605');
    });

    it('should write max uint32 value', function() {
      w.writeUInt32LE(0xffffffff);
      assert.equal(join(w.render()), 'ffffffff');
    });
  });

  describe('.combWrite', function() {
    it('should write bytes', function() {
      w.writeComb(1, 'le', 0x01);
      w.writeComb(1, 'be', 0x02);
      w.writeComb(2, 'le', 0x0102);
      w.writeComb(2, 'be', 0x0304);
      w.writeComb(3, 'le', 0x010203);
      w.writeComb(3, 'be', 0x040506);
      w.writeComb(4, 'le', 0x01020304);
      w.writeComb(4, 'be', 0x05060708);
      assert.equal(join(w.render()),
                   '0102020103040302010405060403020105060708');
    });

    it('should write max uint32 value', function() {
      w.writeUInt32LE(0xffffffff);
      assert.equal(join(w.render()), 'ffffffff');
    });
  });

  describe('.writeInt32LE', function() {
    it('should write bytes', function() {
      w.writeInt32LE(-0x01020304);
      w.writeInt32LE(0x05060708);
      assert.equal(join(w.render()), 'fcfcfdfe08070605');
    });
  });

  describe('.skip', function() {
    it('should skip bytes', function() {
      w.skip(4);
      w.writeUInt32BE(0xdeadbeef);
      assert(/^.{8}deadbeef$/.test(join(w.render())));
    });

    it('should skip 0 bytes', function() {
      var skip = w.skip(0);
      assert.equal(skip.size, 0);
      w.writeUInt32BE(0xdeadbeef);
      assert(/^deadbeef$/.test(join(w.render())));
    });

    it('should skip bytes on the boundary', function() {
      w.reserve(4);
      w.writeUInt8(0x01);
      var skip = w.skip(4);
      w.writeUInt32BE(0xdeadbeef);
      skip.writeUInt32BE(0xabbabaab);
      assert(/^01abbabaabdeadbeef$/.test(join(w.render())));
    });

    it('should skip bytes on the boundary in two chunks', function() {
      w.reserve(4);
      var skip1 = w.skip(2);
      var skip2 = w.skip(2);
      w.writeUInt32BE(0xdeadbeef);
      skip1.writeUInt16BE(0xabba);
      skip2.writeUInt16BE(0xbaba);
      assert(/^abbababadeadbeef$/.test(join(w.render())));
    });
  });

  describe('.slice', function() {
    it('should return empty slice', function() {
      w.writeUInt32BE(0xabbadead);
      assert.equal(join(w.slice(4, 4).render()), '');
      assert.equal(join(w.render()), 'abbadead');
    });

    it('should return full slice', function() {
      w.writeUInt32BE(0xabbadead);
      var slice = w.slice(0, 4);
      slice.writeUInt32BE(0xdeadbeef);
      assert.equal(join(slice.render()), 'deadbeef');
      assert.equal(join(w.render()), 'deadbeef');
    });

    it('should return partial slice', function() {
      w.writeUInt32BE(0xabbadead);
      var slice = w.slice(0, 3);
      slice.writeUInt24BE(0xdeadbe);
      assert.equal(join(slice.render()), 'deadbe');
      assert.equal(join(w.render()), 'deadbead');
    });

    it('should return over-the-boundary slice', function() {
      for (var i = 0; i < 16; i++) {
        w.reserve(3);
        w.writeUInt24BE(i);
      }
      assert.equal(join(w.render()),
                   '000000000001000002000003000004000005000006000007' +
                       '00000800000900000a00000b00000c00000d00000e00000f');

      var slice = w.slice(5, 12);
      slice.writeUInt24BE(0xaaabac);
      slice.writeUInt24BE(0xbabbbc);
      slice.writeUInt8(0xcc);

      assert.equal(join(slice.render()), 'aaabacbabbbccc');
      assert.equal(join(w.render()),
                   '0000000000aaabacbabbbccc000004000005000006000007' +
                       '00000800000900000a00000b00000c00000d00000e00000f');
    });
  });

  describe('.copyFrom', function() {
    it('should copy bytes', function() {
      var tmp = new Buffer(128);
      for (var i = 0; i < tmp.length; i++)
        tmp[i] = i;
      w.writeUInt32BE(0xdeadbeef);
      w.copyFrom(tmp);
      w.writeUInt32BE(0xabbadead);

      assert.equal(
        join(w.render()),
        'deadbeef000102030405060708090a0b0c0d0e0f101112131415161718191a1b' +
        '1c1d1e1f202122232425262728292a2b2c2d2e2f303132333435363738393a3b' +
        '3c3d3e3f404142434445464748494a4b4c4d4e4f505152535455565758595a5b' +
        '5c5d5e5f606162636465666768696a6b6c6d6e6f707172737475767778797a7b' +
        '7c7d7e7fabbadead');
    });

    it('should copy bytes using offset', function() {
      var tmp = new Buffer(128);
      for (var i = 0; i < tmp.length; i++)
        tmp[i] = i;
      w.writeUInt32BE(0xdeadbeef);
      w.copyFrom(tmp, 10, 12);
      w.writeUInt32BE(0xabbadead);

      assert.equal(
        join(w.render()),
        'deadbeef0a0babbadead');
    });
  });

  describe('.write', function() {
    it('should write utf8 string', function() {
      w.writeUInt32BE(0xdeadbeef);
      w.write('ohai\u1023');
      w.writeUInt32BE(0xabbadead);

      assert.equal(
        join(w.render()),
        'deadbeef' +
            '6f6861691023' +
            'abbadead');
    });

    it('should copy bytes using offset', function() {
      var tmp = new Buffer(128);
      for (var i = 0; i < tmp.length; i++)
        tmp[i] = i;
      w.writeUInt32BE(0xdeadbeef);
      w.copyFrom(tmp, 10, 12);
      w.writeUInt32BE(0xabbadead);

      assert.equal(
        join(w.render()),
        'deadbeef0a0babbadead');
    });
  });

  describe('.skip', function() {
    it('should copy bytes', function() {
      w.reserve(5);
      var h = w.skip(4);
      w.writeUInt32BE(0xabbadead);
      h.writeUInt32BE(0xdeadbeef);

      assert.equal(
        join(w.render()),
        'deadbeefabbadead');
    });
  });

  describe('.forceReserve = true', function() {
    it('should allocate more bytes', function() {
      w.forceReserve = true;
      w.reserve(4);
      w.writeUInt32BE(0xabbadead);
      w.writeUInt32BE(0xabbadead);

      assert.equal(w.render().length, 1);
    });
  });
});
