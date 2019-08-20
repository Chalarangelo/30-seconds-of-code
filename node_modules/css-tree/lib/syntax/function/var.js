var TYPE = require('../../tokenizer').TYPE;
var rawMode = require('../node/Raw').mode;

var COMMA = TYPE.Comma;

// var( <ident> , <value>? )
module.exports = function() {
    var children = this.createList();

    this.scanner.skipSC();

    // NOTE: Don't check more than a first argument is an ident, rest checks are for lexer
    children.push(this.Identifier());

    this.scanner.skipSC();

    if (this.scanner.tokenType === COMMA) {
        children.push(this.Operator());
        children.push(this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.scanner.tokenIndex, rawMode.exclamationMarkOrSemicolon, false)
        );
    }

    return children;
};
