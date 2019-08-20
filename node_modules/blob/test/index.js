var Blob = require('../');
var expect = require('expect.js');

describe('blob', function() {
  if (!Blob) {
    it('should not have a blob or a blob builder in the global namespace, or blob should not be a constructor function if the module exports false', function() {
      try {
        var ab = (new Uint8Array(5)).buffer;
        global.Blob([ab]);
        expect().fail('Blob shouldn\'t be constructable');
      } catch (e) {}

      var BlobBuilder = global.BlobBuilder
        || global.WebKitBlobBuilder
        || global.MSBlobBuilder
        || global.MozBlobBuilder;
      expect(BlobBuilder).to.be(undefined);
    });
  } else {
    it('should encode a proper sized blob when given a string argument', function() {
      var b = new Blob(['hi']);
      expect(b.size).to.be(2);
    });

    it('should encode a blob with proper size when given two strings as arguments', function() {
      var b = new Blob(['hi', 'hello']);
      expect(b.size).to.be(7);
    });

    it('should encode arraybuffers with right content', function(done) {
      var ary = new Uint8Array(5);
      for (var i = 0; i < 5; i++) ary[i] = i;
      var b = new Blob([ary.buffer]);
      var fr = new FileReader();
      fr.onload = function() {
        var newAry = new Uint8Array(this.result);
        for (var i = 0; i < 5; i++) expect(newAry[i]).to.be(i);
        done();
      };
      fr.readAsArrayBuffer(b);
    });

    it('should encode typed arrays with right content', function(done) {
      var ary = new Uint8Array(5);
      for (var i = 0; i < 5; i++) ary[i] = i;
      var b = new Blob([ary]);
      var fr = new FileReader();
      fr.onload = function() {
        var newAry = new Uint8Array(this.result);
        for (var i = 0; i < 5; i++) expect(newAry[i]).to.be(i);
        done();
      };
      fr.readAsArrayBuffer(b);
    });

    it('should encode sliced typed arrays with right content', function(done) {
      var ary = new Uint8Array(5);
      for (var i = 0; i < 5; i++) ary[i] = i;
      var b = new Blob([ary.subarray(2)]);
      var fr = new FileReader();
      fr.onload = function() {
        var newAry = new Uint8Array(this.result);
        for (var i = 0; i < 3; i++) expect(newAry[i]).to.be(i + 2);
        done();
      };
      fr.readAsArrayBuffer(b);
    });

    it('should encode with blobs', function(done) {
      var ary = new Uint8Array(5);
      for (var i = 0; i < 5; i++) ary[i] = i;
      var b = new Blob([new Blob([ary.buffer])]);
      var fr = new FileReader();
      fr.onload = function() {
        var newAry = new Uint8Array(this.result);
        for (var i = 0; i < 5; i++) expect(newAry[i]).to.be(i);
        done();
      };
      fr.readAsArrayBuffer(b);
    });

    it('should enode mixed contents to right size', function() {
      var ary = new Uint8Array(5);
      for (var i = 0; i < 5; i++) ary[i] = i;
      var b = new Blob([ary.buffer, 'hello']);
      expect(b.size).to.be(10);
    });

    it('should accept mime type', function() {
      var b = new Blob(['hi', 'hello'], { type: 'text/html' });
      expect(b.type).to.be('text/html');
    });

    it('should be an instance of constructor', function() {
      var b = new Blob(['hi']);
      expect(b).to.be.a(Blob);
      expect(b).to.be.a(global.Blob);
    });
  }
});
