var test = require('tape');

require('./legacy-compat');
var common = require('./common');

// we do this to easily wrap each file in a mocha test
// and also have browserify be able to statically analyze this file
var orig_require = require;
var require = function(file) {
    test(file, function(t) {
        // Store the tape object so tests can access it.
        t.on('end', function () { delete common.test; });
        common.test = t;

        try { orig_require(file); } catch (err) { t.fail(err); }
        t.end();
    });
};

require('./add-listeners.js');
require('./check-listener-leaks.js');
require('./errors.js');
require('./events-list.js');
require('./listener-count.js');
require('./listeners-side-effects.js');
require('./listeners.js');
require('./max-listeners.js');
if ((function A () {}).name === 'A') {
  require('./method-names.js');
} else {
  // Function.name is not supported in IE
  test('./method-names.js', { skip: true }, function () {});
}
require('./modify-in-emit.js');
require('./num-args.js');
require('./once.js');
require('./prepend.js');
require('./set-max-listeners-side-effects.js');
require('./special-event-names.js');
require('./subclass.js');
if (typeof Symbol === 'function') {
  require('./symbols.js');
} else {
  // Symbol is not available.
  test('./symbols.js', { skip: true }, function () {});
}
require('./remove-all-listeners.js');
require('./remove-listeners.js');
