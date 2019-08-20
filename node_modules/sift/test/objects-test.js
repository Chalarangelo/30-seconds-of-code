var sift = require(".."),
    assert = require("assert");


describe(__filename + "#", function () {


    var topic = [
        {
            name: 'craig',
            age: 90001,
            tags: ['coder', 'programmer', 'traveler', 'photographer'],
            address: {
                city: 'Minneapolis',
                state: 'MN',
                phone: '9999999999'
            },
            tags: ['photos', 'cook'],
            hobbies: [
                {
                    name: 'programming',
                    description: 'some desc'
                },
                {
                    name: 'cooking'
                },
                {
                    name: 'photography',
                    places: ['haiti', 'brazil', 'costa rica']
                },
                {
                    name: 'backpacking'
                }
            ]
        },
        {
            name: 'tim',
            age: 90001,
            tags: ['traveler', 'photographer'],
            address: {
                city: 'St. Paul',
                state: 'MN',
                phone: '765765756765'
            },
            tags: ['dj'],
            hobbies: [
                {
                    name: 'biking',
                    description: 'some desc'
                },
                {
                    name: 'DJ'
                },
                {
                    name: 'photography',
                    places: ['costa rica']
                }
            ]
        }
    ];
    xit("throws error if $not is incorrect", function () {
        assert.throws(function () {
            sift({
                $not: ['abc']
            }, topic);
        }, Error);
    });
    it("has sifted through photography in brazil count of 1", function () {
        var sifted = sift({
            hobbies: {
                name: 'photography',
                places: {
                    $in: ['brazil']
                }
            }
        }, topic);
        assert.equal(sifted.length, 1);
    });
    it("has sifted through photography in brazil, haiti, and costa rica count of 1", function () {
        var sifted = sift({
            hobbies: {
                name: 'photography',
                places: {
                    $all: ['brazil', 'haiti', 'costa rica']
                }
            }
        }, topic);
        assert.equal(sifted.length, 1);
        assert.equal(sifted[0], topic[0]);
    });
    it("has a sifted hobbies of photography, cooking, or biking count of 2", function () {
        var sifted = sift({
            hobbies: {
                name: {
                    $in: ['photography', 'cooking', 'biking']
                }
            }
        }, topic);
        assert.equal(sifted.length, 2);
    });
    it("has sifted to complex count of 2", function () {
        var sifted = sift({
            hobbies: {
                name: 'photography',
                places: {
                    $in: ['costa rica']
                }
            },
            address: {
                state: 'MN',
                phone: {
                    $exists: true
                }
            }
        }, topic);

        assert.equal(sifted.length, 2);
    });
    it("has sifted to complex count of 0", function () {
        var sifted = sift({
            hobbies: {
                name: 'photos',
                places: {
                    $in: ['costa rica']
                }
            }
        }, topic);
        assert.equal(sifted.length, 0);
    });
    it("has sifted subobject hobbies count of 3", function () {
        var sifted = sift({
            "hobbies.name": "photography"
        }, topic);
        assert.equal(sifted.length, 2);
    });
    it('has sifted dot-notation hobbies of photography, cooking, and biking count of 3', function () {
        var sifted = sift({
            "hobbies.name": {
                $in: ['photography', 'cooking', 'biking']
            }
        }, topic);
        assert.equal(sifted.length, 2);
    });
    it("has sifted to complex dot-search count of 2", function () {
        var sifted = sift({
            "hobbies.name": "photography",
            "hobbies.places": {
                $in: ['costa rica']
            },
            "address.state": "MN",
            "address.phone": {
                $exists: true
            }
        }, topic);
        assert.equal(sifted.length, 2);
    });
    it("has sifted with selector function count of 2", function () {
        var sifted = sift({
            "name": "photography",
            "places": {
                $in: ['costa rica']
            }
        }, topic, function (item) {
            return item.hobbies;
        });
        assert.equal(sifted.length, 2);
    });

    describe("nesting", function () {
        it("$eq for nested object", function () {
            var sifted = sift({'sub.num': {'$eq': 10}}, loremArr);
            assert(sifted.length > 0);
            sifted.forEach(function (v) {
                assert.equal(10, v.sub.num);
            });
        });

        it("$ne for nested object", function () {
            var sifted = sift({'sub.num': {'$ne': 10}}, loremArr);
            assert(sifted.length > 0);
            sifted.forEach(function (v) {
                assert.notEqual(10, v.sub.num);
            });
        });

        it("$regex for nested object (one missing key)", function () {
            var persons = [{
              id: 1,
              prof: 'Mr. Moriarty'
            }, {
              id: 2,
              prof: 'Mycroft Holmes'
            }, {
              id: 3,
              name: 'Dr. Watson',
              prof: 'Doctor'
            }, {
              id: 4,
              name: 'Mr. Holmes',
              prof: 'Detective'
            }];
            var q = { "name": { "$regex": "n" } };
            var sifted = sift(q, persons);
            assert.deepEqual(sifted, [{
              id: 3,
              name: 'Dr. Watson',
              prof: 'Doctor'
            }]);
        });
    });

    describe("$where", function() {

      var couples = [{
          name: "SMITH",
          person: [{
                  firstName: "craig",
                  gender: "female",
                  age: 29
              }, {
                  firstName: "tim",
                  gender: "male",
                  age: 32
              }

          ]
      }, {
          name: "JOHNSON",
          person: [{
                  firstName: "emily",
                  gender: "female",
                  age: 35
              }, {
                  firstName: "jacob",
                  gender: "male",
                  age: 32
              }

          ]
      }];

      it("can filter people", function() {
          var results = sift({"person": {$elemMatch: { "gender": "female", "age": {"$lt": 30}}}}, couples);
          assert.equal(results[0].name, "SMITH");

          var results = sift({"person": {$elemMatch: { "gender": "male", "age": {"$lt": 30}}}}, [couples[0]]);
          assert.equal(results.length, 0);
      });
    });

    describe("keypath", function () {

        var arr = [
            {
                a: {
                    b: {
                        c: 1,
                        c2: 1
                    }
                }
            }
        ]
        it("can be used", function () {
            assert.equal(sift({"a.b.c":1})(arr[0]), true);
        });
    });
});


var loremArr = [
    {
        "num": 1,
        "pum": 1,
        "sub": {
            "num": 1,
            "pum": 1
        }
    },
    {
        "num": 2,
        "pum": 2,
        "sub": {
            "num": 2,
            "pum": 2
        }
    },
    {
        "num": 3,
        "pum": 3,
        "sub": {
            "num": 3,
            "pum": 3
        }
    },
    {
        "num": 4,
        "pum": 4,
        "sub": {
            "num": 4,
            "pum": 4
        }
    },
    {
        "num": 5,
        "pum": 5,
        "sub": {
            "num": 5,
            "pum": 5
        }
    },
    {
        "num": 6,
        "pum": 6,
        "sub": {
            "num": 6,
            "pum": 6
        }
    },
    {
        "num": 7,
        "pum": 7,
        "sub": {
            "num": 7,
            "pum": 7
        }
    },
    {
        "num": 8,
        "pum": 8,
        "sub": {
            "num": 8,
            "pum": 8
        }
    },
    {
        "num": 9,
        "pum": 9,
        "sub": {
            "num": 9,
            "pum": 9
        }
    },
    {
        "num": 10,
        "pum": 10,
        "sub": {
            "num": 10,
            "pum": 10
        }
    },
    {
        "num": 11,
        "pum": 11,
        "sub": {
            "num": 10,
            "pum": 10
        }
    }
];
