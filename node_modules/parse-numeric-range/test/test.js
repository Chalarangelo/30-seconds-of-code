var expect = require('chai').expect;
var strparse = require('../index').parse;

function peq(x, y) {
  expect(strparse(x)).to.eql(y);
}

describe('range-parser', function(){
  describe('#parse', function(){
    it('should parse 1', function() {
      peq('1', [1]);
    });
    it('should parse 1,1', function(){
      peq('1,1', [1,1]);
    });
    it('should parse 1-5', function(){
      peq('1-5', [1,2,3,4,5]);
    });
    it('should parse 5-1', function(){
      peq('5-1', [5,4,3,2,1]);
    });
    it('should parse 1-3,5-6', function(){
      peq('1-3,5-6', [1,2,3,5,6]);
    });
    it('should parse 10..15', function(){
      peq('10..15', [10,11,12,13,14,15]);
    });
    it('should parse 10...15', function(){
      peq('10...15', [10,11,12,13,14]);
    });
    it('should parse 10..12,13...15,2,8', function(){
      peq('10..12,13...15,2,8', [10,11,12,13,14,2,8]);
    });
    it('should parse ""', function(){
      peq('', []);
    });
    it('should parse -5', function(){
      peq('-5', [-5]);
    });
    it('should parse -5--10', function(){
      peq('-5--10', [-5,-6,-7,-8,-9,-10]);
    });
    it('should parse -1..2,-1...2', function(){
      peq('-1..2,-1...2', [-1,0,1,2,-1,0,1]);
    });
		it('should parse 1‥3', function() {
			peq('1‥3', [1,2,3]);
		});
		it('should parse 1⋯3', function() {
			peq('1⋯3', [1,2]);
		});
		it('should parse 1…3', function() {
			peq('1…3', [1,2]);
		});
  });
});
