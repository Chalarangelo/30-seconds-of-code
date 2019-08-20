var test = require('tape');
var parse = require('../').parse;

test('single operators', function (t) {
    t.same(parse('beep | boop'), [ 'beep', { op: '|' }, 'boop' ]);
    t.same(parse('beep|boop'), [ 'beep', { op: '|' }, 'boop' ]);
    t.same(parse('beep \\| boop'), [ 'beep', '|', 'boop' ]);
    t.same(parse('beep "|boop"'), [ 'beep', '|boop' ]);
    
    t.same(parse('echo zing &'), [ 'echo', 'zing', { op: '&' } ]);
    t.same(parse('echo zing&'), [ 'echo', 'zing', { op: '&' } ]);
    t.same(parse('echo zing\\&'), [ 'echo', 'zing&' ]);
    t.same(parse('echo "zing\\&"'), [ 'echo', 'zing\\&' ]);
    
    t.same(parse('beep;boop'), [ 'beep', { op: ';' }, 'boop' ]);
    t.same(parse('(beep;boop)'), [
        { op: '(' }, 'beep', { op: ';' }, 'boop', { op: ')' }
    ]);
    
    t.same(parse('beep>boop'), [ 'beep', { op: '>' }, 'boop' ]);
    t.same(parse('beep 2>boop'), [ 'beep', '2', { op: '>' }, 'boop' ]);
    t.same(parse('beep<boop'), [ 'beep', { op: '<' }, 'boop' ]);
    
    t.end();
});

test('double operators', function (t) {
    t.same(parse('beep || boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep||boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep ||boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep|| boop'), [ 'beep', { op: '||' }, 'boop' ]);
    t.same(parse('beep  ||   boop'), [ 'beep', { op: '||' }, 'boop' ]);
    
    t.same(parse('beep && boop'), [ 'beep', { op: '&&' }, 'boop' ]);
    t.same(
        parse('beep && boop || byte'),
        [ 'beep', { op: '&&' }, 'boop', { op: '||' }, 'byte' ]
    );
    t.same(
        parse('beep&&boop||byte'),
        [ 'beep', { op: '&&' }, 'boop', { op: '||' }, 'byte' ]
    );
    t.same(
        parse('beep\\&\\&boop||byte'),
        [ 'beep&&boop', { op: '||' }, 'byte' ]
    );
    t.same(
        parse('beep\\&&boop||byte'),
        [ 'beep&', { op: '&' }, 'boop', { op: '||' }, 'byte' ]
    );
    t.same(
        parse('beep;;boop|&byte'),
        [ 'beep', { op: ';;' }, 'boop', { op: '|&' }, 'byte' ]
    );
    
    t.end();
});

test('glob patterns', function (t) {
    t.same(
        parse('tap test/*.test.js'),
        [ 'tap', { op: 'glob', pattern: 'test/*.test.js' } ]
    );

    t.same(parse('tap "test/*.test.js"'), ['tap', 'test/*.test.js']);
    t.end();
})
