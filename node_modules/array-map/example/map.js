var map = require('../');
var letters = map([97,98,99], function (c) {
    return String.fromCharCode(c);
});
console.log(letters.join(''));
