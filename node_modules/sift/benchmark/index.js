var Benchmark = require("benchmark");
var sift      = require("..");

var queries = [
  { num: { $lt: 5 }}
];

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


var arrays = Array.apply(void 0, new Array(9)).map(function(v, i) {
  return Array.apply(void 0, new Array(((i+1)<<i) * 10)).map(function() {
    return loremArr[Math.floor(Math.random() * loremArr.length)];
  });
})


// console.log(items)
var suite = new Benchmark.Suite;

arrays.forEach(function(array) {
  queries.forEach(function(query) {

    suite.add(JSON.stringify(query) + " x " + array.length + " items", function() {
      sift(query, array);
    });

  });
});


suite
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
