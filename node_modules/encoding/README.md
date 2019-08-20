# Encoding

**encoding** is a simple wrapper around [node-iconv](https://github.com/bnoordhuis/node-iconv) and [iconv-lite](https://github.com/ashtuchkin/iconv-lite/) to convert strings from one encoding to another. If node-iconv is not available for some reason,
iconv-lite will be used instead of it as a fallback.

[![Build Status](https://secure.travis-ci.org/andris9/encoding.svg)](http://travis-ci.org/andris9/Nodemailer)
[![npm version](https://badge.fury.io/js/encoding.svg)](http://badge.fury.io/js/encoding)

## Install

Install through npm

    npm install encoding

## Usage

Require the module

    var encoding = require("encoding");

Convert with encoding.convert()

    var resultBuffer = encoding.convert(text, toCharset, fromCharset);

Where

  * **text** is either a Buffer or a String to be converted
  * **toCharset** is the characterset to convert the string
  * **fromCharset** (*optional*, defaults to UTF-8) is the source charset

Output of the conversion is always a Buffer object.

Example

    var result = encoding.convert("ÕÄÖÜ", "Latin_1");
    console.log(result); //<Buffer d5 c4 d6 dc>

## iconv support

By default only iconv-lite is bundled. If you need node-iconv support, you need to add it
as an additional dependency for your project:

    ...,
    "dependencies":{
        "encoding": "*",
        "iconv": "*"
    },
    ...

## License

**MIT**
