var postcss = require('postcss');
var bug4 = require('./bugs/bug4');
var bug6 = require('./bugs/bug6');
var bug81a = require('./bugs/bug81a');

var doNothingValues = ['none', 'auto', 'content', 'inherit', 'initial', 'unset'];

module.exports = postcss.plugin('postcss-flexbugs-fixes', function (opts) {
    opts = opts || {};

    return function (css) {
        css.walkDecls(function (d) {
            if (d.value === 'none') {
                return;
            }
            var values = postcss.list.space(d.value);
            if (doNothingValues.indexOf(d.value) > 0 && values.length === 1) {
                return;
            }
            bug4(d);
            bug6(d);
            bug81a(d);
        });
    };
});
