var vm = require('vm');

$(function () {
    var res = vm.runInNewContext('a + 5', { a : 100 });
    $('#res').text(res);
});
