var createCustomError = require('../../utils/createCustomError');

var SyntaxParseError = function(message, input, offset) {
    var error = createCustomError('SyntaxParseError', message);

    error.input = input;
    error.offset = offset;
    error.rawMessage = message;
    error.message = error.rawMessage + '\n' +
        '  ' + error.input + '\n' +
        '--' + new Array((error.offset || error.input.length) + 1).join('-') + '^';

    return error;
};

module.exports = {
    SyntaxParseError: SyntaxParseError
};
