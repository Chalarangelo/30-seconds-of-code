
/**
 * Module dependencies.
 */

var inherit = require('..');

describe('inherit(a, b)', function(){
  it('should inherit b\'s prototype', function(){
    function Loki(){}
    function Animal(){}

    Animal.prototype.species = 'unknown';

    inherit(Loki, Animal);

    var loki = new Loki;
    loki.species.should.equal('unknown');
    loki.constructor.should.equal(Loki);
  })
})