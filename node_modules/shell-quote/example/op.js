var parse = require('../').parse;
var xs = parse('beep || boop > /byte');
console.dir(xs);
