var test = require('tape')
var isFunction = require('./index.js')

test('isFunction', function (t) {
    t.ok(!isFunction(), 'undefined is not a function')
    t.ok(!isFunction(null), 'null is not a function')
    t.ok(!isFunction(''), 'string is not a function')
    t.ok(!isFunction(/a/), 'regex is not a function')
    t.ok(!isFunction(true), 'true is not a function')
    t.ok(!isFunction(false), 'false is not a function')
    t.ok(!isFunction(NaN), 'NaN is not a function')
    t.ok(!isFunction(42), '42 is not a function')
    t.ok(isFunction(function () {}), 'function is a function')
    t.ok(isFunction(setTimeout), 'setTimeout is a function')
    t.end()
})

if (typeof window !== 'undefined') {
    test('browser quirks', function (t) {
        t.plan(2)
        
        t.ok(isFunction(window.alert), 'alert is a function')

        window.testRegExpFromIframe = function (regexp) {
            t.ok(!isFunction(regexp))
        }
        
        var iframe = document.createElement('iframe')
        document.body.appendChild(iframe)
        
        iframe.contentWindow.document.write([
            "<html><body><script type=\"text/javascript\">",
            "parent.testRegExpFromIframe(/a/)",
            "</script></body></html>"
        ].join("\n"));
    })
}
