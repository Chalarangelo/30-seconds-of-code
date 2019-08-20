var assert = require("assert"),
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

    sift({ a: {$abba:-1}}, [1, 2, 3]);

    // expect(i).to.be(3);
    assert.equal(i, 3);
  });

  it("can use a function", function(next) {
    sift.use(function(sift) {
      assert.equal(sift(1, [1, 2, 3]).length, 1);
      next();
    })
  });

  sift.use({
    $notb: function(a, b) {
      return a != b ? true : false;
    }
  });

  var topic = [1, 2, 3, 4, 5, 6, 6, 4, 3];

  it("can use custom $notb operator", function() {
    assert.equal(sift({$notb: 6 }, topic).indexOf(6), -1);
  });

  describe('testing equality of custom objects', function () {
    var compare = sift.compare;

    before(function() {
      sift.compare = function(a, b) {
        if(a && b && a._bsontype && b._bsontype) {
          if(a.equals(b)) return 0;
          a = a.getTimestamp().getTime();
          b = b.getTimestamp().getTime();
        }
        return compare(a,b);
      };
    });

    after(function() {
      //put the original back
      sift.compare = compare;
    });

    var past = ObjectID(new Date(2015,2,16).getTime()/1000);
    var now = ObjectID();
    var future = ObjectID.createFromTime(new Date(2038,0,1).getTime()/1000);//https://github.com/mongodb/js-bson/issues/158
    var topic = [past, now, future];

    it('should use the customized compare function to determine equality', function () {
      var result = sift(ObjectID(future.toString()), topic);
      assert.equal(result.length, 1);
      assert.equal(result[0], future);
    });

    function test(query, expected) {
      var result = sift(query, topic);
      assert.equal(JSON.stringify(result), JSON.stringify(expected));
    }

    it('should use an ObjectIds timestamp to determine $gt', function () {
      test({ $gt: ObjectID(now) }, [future]);
    });

    it('should use an ObjectIds timestamp to determine $lt', function () {
      test({ $lt: ObjectID(now) }, [past]);
    });

    it('should use an ObjectIds timestamp to determine $lte', function () {
      test({ $lte: ObjectID(now) }, [past,now]);
    });

    it('should use an ObjectIds timestamp to determine $gte', function () {
      test({ $gte: ObjectID(now) }, [now,future]);
    });

  });

});
