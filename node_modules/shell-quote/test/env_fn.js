var test = require('tape');
var parse = require('../').parse;

test('functional env expansion', function (t) {
    t.plan(4);
    
    t.same(parse('a $XYZ c', getEnv), [ 'a', 'xxx', 'c' ]);
    t.same(parse('a $XYZ c', getEnvObj), [ 'a', { op: '@@' }, 'c' ]);
    t.same(parse('a${XYZ}c', getEnvObj), [ 'a', { op: '@@' }, 'c' ]);
    t.same(parse('"a $XYZ c"', getEnvObj), [ 'a ', { op: '@@' }, ' c' ]);
    
    function getEnv (key) {
        return 'xxx';
    }
    
    function getEnvObj (key) {
        return { op: '@@' };
    }
});
