var expect = require('chai').expect;

describe('has-cors', function() {
  beforeEach(function() {
    // make sure result is not cached
    delete require.cache[require.resolve('./')];
  });
  
  it('should not have cors', function() {
    var hasCors = require('./');

    expect(hasCors).to.be.false;
  });
  
  it('should have cors', function() {
    global.XMLHttpRequest = function() {
      this.withCredentials = true;
    };

    var hasCors = require('./');

    expect(hasCors).to.be.true;
  });
});
