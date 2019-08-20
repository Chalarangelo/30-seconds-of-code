
var assert = require('assert');
var logger = require('..');

describe('noop-logger', function(){
  it('should expose methods', function(){
    assert.equal('function', typeof logger.debug);
    assert.equal('function', typeof logger.info);
    assert.equal('function', typeof logger.warn);
    assert.equal('function', typeof logger.error);
    assert.equal('function', typeof logger.critical);
    assert.equal('function', typeof logger.alert);
    assert.equal('function', typeof logger.emergency);
    assert.equal('function', typeof logger.notice);
    assert.equal('function', typeof logger.verbose);
    assert.equal('function', typeof logger.fatal);
  });
});
