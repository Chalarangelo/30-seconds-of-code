# Tokenizer

<!-- MarkdownTOC -->

- [Static properties](#static-properties)
    - [CssSyntaxError](#csssyntaxerror)
    - [TYPE](#type)
    - [NAME](#name)
    - [SYMBOL_TYPE](#symbol_type)
    - [PUNCTUATION](#punctuation)
- [Static methods](#static-methods)
    - [firstCharOffset\(source\)](#firstcharoffsetsource)
    - [isHex\(code\)](#ishexcode)
    - [isNumber\(code\)](#isnumbercode)
    - [isNewline\(source, offset, code\)](#isnewlinesource-offset-code)
    - [cmpChar\(testStr, offset, referenceCode\)](#cmpcharteststr-offset-referencecode)
    - [cmpStr\(testStr, start, end, referenceStr\)](#cmpstrteststr-start-end-referencestr)
    - [endsWith\(testStr, referenceStr\)](#endswithteststr-referencestr)
    - [findLastNonSpaceLocation\(scanner\)](#findlastnonspacelocationscanner)
    - [findWhitespaceEnd\(source, offset\)](#findwhitespaceendsource-offset)
    - [findCommentEnd\(source, offset\)](#findcommentendsource-offset)
    - [findStringEnd\(source, offset, quote\)](#findstringendsource-offset-quote)
    - [findDecimalNumberEnd\(source, offset\)](#finddecimalnumberendsource-offset)
    - [findNumberEnd\(source, offset, allowFraction\)](#findnumberendsource-offset-allowfraction)
    - [findEscaseEnd\(source, offset\)](#findescaseendsource-offset)
    - [findIdentifierEnd\(source, offset\)](#findidentifierendsource-offset)
- [Methods](#methods)
    - [setSource\(source, startOffset, startLine, startColumn\)](#setsourcesource-startoffset-startline-startcolumn)
    - [lookupType\(offset\)](#lookuptypeoffset)
    - [lookupNonWSType\(offset\)](#lookupnonwstypeoffset)
    - [lookupValue\(offset, referenceStr\)](#lookupvalueoffset-referencestr)
    - [getTokenValue\(\)](#gettokenvalue)
    - [substrToCursor\(start\)](#substrtocursorstart)
    - [skipWS\(\)](#skipws)
    - [skip\(tokenCount\)](#skiptokencount)
    - [next\(\)](#next)
    - [eat\(tokenType\)](#eattokentype)
    - [eatNonWS\(tokenType\)](#eatnonwstokentype)
    - [consume\(tokenType\)](#consumetokentype)
    - [consumeNonWS\(tokenType\)](#consumenonwstokentype)
    - [expectIdentifier\(name\)](#expectidentifiername)
    - [getLocation\(offset, filename\)](#getlocationoffset-filename)
    - [getLocationRange\(start, end, filename\)](#getlocationrangestart-end-filename)
    - [error\(message, offset\)](#errormessage-offset)
    - [getTypes\(\)](#gettypes)

<!-- /MarkdownTOC -->

## Static properties

### CssSyntaxError

### TYPE

### NAME

### SYMBOL_TYPE

### PUNCTUATION


## Static methods

### firstCharOffset(source)

### isHex(code)

### isNumber(code)

### isNewline(source, offset, code)

### cmpChar(testStr, offset, referenceCode)

### cmpStr(testStr, start, end, referenceStr)

### endsWith(testStr, referenceStr)

### findLastNonSpaceLocation(scanner)

### findWhitespaceEnd(source, offset)

### findCommentEnd(source, offset)

### findStringEnd(source, offset, quote)

### findDecimalNumberEnd(source, offset)

### findNumberEnd(source, offset, allowFraction)

### findEscaseEnd(source, offset)

### findIdentifierEnd(source, offset)


## Methods

### setSource(source, startOffset, startLine, startColumn)

### lookupType(offset)

### lookupNonWSType(offset)

### lookupValue(offset, referenceStr)

### getTokenValue()

### substrToCursor(start)

### skipWS()

### skip(tokenCount)

### next()

### eat(tokenType)

### eatNonWS(tokenType)

### consume(tokenType)

### consumeNonWS(tokenType)

### expectIdentifier(name)

### getLocation(offset, filename)

### getLocationRange(start, end, filename)

### error(message, offset)

### getTypes()
