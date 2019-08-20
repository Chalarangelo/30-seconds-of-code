var cmp = require('../');
var test = require('tape');

var versions = [
    '1.2.3',
    '4.11.6',
    '4.2.0',
    '1.5.19',
    '1.5.5',
    '4.1.3',
    '2.3.1',
    '10.5.5',
    '11.3.0'
];

test('cmp', function (t) {
    t.plan(1);
    t.deepEqual(versions.sort(cmp), [
        '1.2.3',
        '1.5.5',
        '1.5.19',
        '2.3.1',
        '4.1.3',
        '4.2.0',
        '4.11.6',
        '10.5.5',
        '11.3.0'
    ]);
});
