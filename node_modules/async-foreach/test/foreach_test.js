/*global require:true, setTimeout:true */
var forEach = require('../lib/foreach').forEach;

exports['foreach'] = {
  setUp: function(done) {
    this.order = [];
    this.track = function() {
      [].push.apply(this.order, arguments);
    };
    done();
  },
  'Synchronous': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
    });

    test.deepEqual(that.order, [
      "each", "a", 0, arr,
      "each", "b", 1, arr,
      "each", "c", 2, arr
    ], "should call eachFn for each array item, in order.");
    test.done();
  },
  'Synchronous, done': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
    });

    test.deepEqual(that.order, [
      "each", "a", 0, arr,
      "each", "b", 1, arr,
      "each", "c", 2, arr,
      "done", true, arr
      ], "should call eachFn for each array item, in order, followed by doneFn.");
    test.done();
  },
  'Synchronous, early abort': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      if (item === "b") { return false; }
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
    });

    test.deepEqual(that.order, [
      "each", "a", 0, arr,
      "each", "b", 1, arr,
      "done", false, arr
      ], "should call eachFn for each array item, in order, followed by doneFn.");
    test.done();
  },
  'Asynchronous': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      var done = this.async();
      setTimeout(done, 10);
    });
    
    setTimeout(function() {
      test.deepEqual(that.order, [
        "each", "a", 0, arr,
        "each", "b", 1, arr,
        "each", "c", 2, arr
      ], "should call eachFn for each array item, in order.");
      test.done();
    }, 100);
  },
  'Asynchronous, done': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      var done = this.async();
      setTimeout(done, 10);
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
      test.deepEqual(that.order, [
        "each", "a", 0, arr,
        "each", "b", 1, arr,
        "each", "c", 2, arr,
        "done", true, arr
        ], "should call eachFn for each array item, in order, followed by doneFn.");
      test.done();
    });
  },
  'Asynchronous, early abort': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      var done = this.async();
      setTimeout(function() {
        done(item !== "b");
      }, 10);
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
      test.deepEqual(that.order, [
        "each", "a", 0, arr,
        "each", "b", 1, arr,
        "done", false, arr
        ], "should call eachFn for each array item, in order, followed by doneFn.");
      test.done();
    });
  },
  'Not actually asynchronous': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      var done = this.async();
      done();
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
      test.deepEqual(that.order, [
        "each", "a", 0, arr,
        "each", "b", 1, arr,
        "each", "c", 2, arr,
        "done", true, arr
        ], "should call eachFn for each array item, in order, followed by doneFn.");
      test.done();
    });
  },
  'Not actually asynchronous, early abort': function(test) {
    test.expect(1);
    var that = this;

    var arr = ["a", "b", "c"];
    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
      var done = this.async();
      done(item !== "b");
    }, function(notAborted, arr) {
      that.track("done", notAborted, arr);
      test.deepEqual(that.order, [
        "each", "a", 0, arr,
        "each", "b", 1, arr,
        "done", false, arr
        ], "should call eachFn for each array item, in order, followed by doneFn.");
      test.done();
    });
  },
  'Sparse array support': function(test) {
    test.expect(1);
    var that = this;

    var arr = [];
    arr[0] = "a";
    arr[9] = "z";

    forEach(arr, function(item, index, arr) {
      that.track("each", item, index, arr);
    });

    test.deepEqual(that.order, [
      "each", "a", 0, arr,
      "each", "z", 9, arr
    ], "should skip nonexistent array items.");
    test.done();
  },
  'Invalid length sanitization': function(test) {
    test.expect(1);
    var that = this;

    var obj = {length: 4294967299, 0: "a", 2: "b", 3: "c" };

    forEach(obj, function(item, index, arr) {
      that.track("each", item, index, arr);
    });

    test.deepEqual(that.order, [
      "each", "a", 0, obj,
      "each", "b", 2, obj
    ], "should sanitize length property (ToUint32).");
    test.done();
  }
};
