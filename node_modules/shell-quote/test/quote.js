var test = require('tape');
var quote = require('../').quote;

test('quote', function (t) {
    t.equal(quote([ 'a', 'b', 'c d' ]), 'a b \'c d\'');
    t.equal(
        quote([ 'a', 'b', "it's a \"neat thing\"" ]),
        'a b "it\'s a \\"neat thing\\""'
    );
    t.equal(
        quote([ '$', '`', '\'' ]),
        '\\$ \\` "\'"'
    );
    t.equal(quote([]), '');                                                                                                                                                                                                                                                                                                                   
    t.equal(quote(["a\nb"]), "'a\nb'");                                                                                                                                                                                                                                                                                                       
    t.equal(quote([' #(){}*|][!']), "' #(){}*|][!'");                                                                                                                                                                                                                                                                                         
    t.equal(quote(["'#(){}*|][!"]), '"\'#(){}*|][\\!"');                                                                                                                                                                                                                                                                                      
    t.equal(quote(["X#(){}*|][!"]), "X\\#\\(\\)\\{\\}\\*\\|\\]\\[\\!");                                                                                                                                                                                                                                                                       
    t.equal(quote(["a\n#\nb"]), "'a\n#\nb'");                                                                                                                                                                                                                                                                                                 
    t.equal(quote(['><;{}']), '\\>\\<\\;\\{\\}');                                                                                                                                                                                                                                                                                             
    t.equal(quote([ 'a', 1, true, false ]), 'a 1 true false');                                                                                                                                                                                                                                                                                
    t.equal(quote([ 'a', 1, null, undefined ]), 'a 1 null undefined');                                                                                                                                                                                                                                                                        
    t.end();  
});

test('quote ops', function (t) {
    t.equal(quote([ 'a', { op: '|' }, 'b' ]), 'a \\| b');
    t.equal(
        quote([ 'a', { op: '&&' }, 'b', { op: ';' }, 'c' ]),
        'a \\&\\& b \\; c'
    );
    t.end();
});
