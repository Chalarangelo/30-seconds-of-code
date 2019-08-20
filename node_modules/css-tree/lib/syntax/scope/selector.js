var TYPE = require('../../tokenizer').TYPE;
var CHARCODE = require('../../tokenizer').CHARCODE;

var DELIM = TYPE.Delim;
var IDENT = TYPE.Ident;
var DIMENSION = TYPE.Dimension;
var PERCENTAGE = TYPE.Percentage;
var NUMBER = TYPE.Number;
var HASH = TYPE.Hash;
var COLON = TYPE.Colon;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var NUMBERSIGN = CHARCODE.NumberSign;
var PLUSSIGN = CHARCODE.PlusSign;
var SOLIDUS = CHARCODE.Solidus;
var ASTERISK = CHARCODE.Asterisk;
var FULLSTOP = CHARCODE.FullStop;
var GREATERTHANSIGN = CHARCODE.GreaterThanSign;
var VERTICALLINE = CHARCODE.VerticalLine;
var TILDE = CHARCODE.Tilde;

function getNode(context) {
    switch (this.scanner.tokenType) {
        case LEFTSQUAREBRACKET:
            return this.AttributeSelector();

        case HASH:
            return this.IdSelector();

        case COLON:
            if (this.scanner.lookupType(1) === COLON) {
                return this.PseudoElementSelector();
            } else {
                return this.PseudoClassSelector();
            }

        case IDENT:
            return this.TypeSelector();

        case NUMBER:
        case PERCENTAGE:
            return this.Percentage();

        case DIMENSION:
            // throws when .123ident
            if (this.scanner.source.charCodeAt(this.scanner.tokenStart) === FULLSTOP) {
                this.error('Identifier is expected', this.scanner.tokenStart + 1);
            }
            break;

        case DELIM:
            var code = this.scanner.source.charCodeAt(this.scanner.tokenStart);

            switch (code) {
                case PLUSSIGN:
                case GREATERTHANSIGN:
                case TILDE:
                    context.space = null;
                    context.ignoreWSAfter = true;
                    return this.Combinator();

                case SOLIDUS:  // /deep/
                    return this.Combinator();

                case FULLSTOP:
                    return this.ClassSelector();

                case ASTERISK:
                case VERTICALLINE:
                    return this.TypeSelector();

                case NUMBERSIGN:
                    return this.IdSelector();
            }

            break;
    }
};

module.exports = {
    getNode: getNode
};
