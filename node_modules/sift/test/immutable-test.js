var assert = require("assert"),
Immutable = require("immutable"),
sift = require(".."),
ObjectID = require('bson').pure().ObjectID;

describe(__filename + "#", function() {

  it("can use custom operators", function() {

    var i = 0;

    sift.use({
      $abba: function(a, b) {
        i++;
      }
    });

    sift({ a: {$abba:-1}}, Immutable.List([1, 2, 3]));

    // expect(i).to.be(3);
    assert.equal(i, 3);
  });

  var topic = Immutable.List([1, 2, 3, 4, 5, 6, 6, 4, 3]);

  it("works with Immutable.List", function() {
    assert.equal(sift({$notb: 6 }, topic).includes(6), false);
  });

  var persons = Immutable.fromJS([{ person: {age: 3} }, { person: {age: 5} }, { person: {age: 8} }]);

  it("works with Immutable.Map in a Immutable.List", function() {
    assert.equal(sift({ 'person.age' : { $gt: 4 } }, persons).size, 2);
    assert.equal(persons.filter(sift({ 'person.age' : { $gt: 4 } })).size, 2);
  });
});
