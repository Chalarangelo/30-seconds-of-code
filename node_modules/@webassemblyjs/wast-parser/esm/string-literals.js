// string literal characters cannot contain control codes
var CONTROL_CODES = [0, // null
7, // bell
8, // backspace
9, // horizontal
10, // line feed
11, // vertical tab
12, // form feed
13, // carriage return
26, // Control-Z
27, // escape
127 // delete
]; // escaped sequences can either be a two character hex value, or one of the
// following single character codes

function decodeControlCharacter(char) {
  switch (char) {
    case "t":
      return 0x09;

    case "n":
      return 0x0a;

    case "r":
      return 0x0d;

    case '"':
      return 0x22;

    case "′":
      return 0x27;

    case "\\":
      return 0x5c;
  }

  return -1;
}

var ESCAPE_CHAR = 92; // backslash

var QUOTE_CHAR = 34; // backslash
// parse string as per the spec:
// https://webassembly.github.io/spec/core/multipage/text/values.html#text-string

export function parseString(value) {
  var byteArray = [];
  var index = 0;

  while (index < value.length) {
    var charCode = value.charCodeAt(index);

    if (CONTROL_CODES.indexOf(charCode) !== -1) {
      throw new Error("ASCII control characters are not permitted within string literals");
    }

    if (charCode === QUOTE_CHAR) {
      throw new Error("quotes are not permitted within string literals");
    }

    if (charCode === ESCAPE_CHAR) {
      var firstChar = value.substr(index + 1, 1);
      var decodedControlChar = decodeControlCharacter(firstChar);

      if (decodedControlChar !== -1) {
        // single character escaped values, e.g. \r
        byteArray.push(decodedControlChar);
        index += 2;
      } else {
        // hex escaped values, e.g. \2a
        var hexValue = value.substr(index + 1, 2);

        if (!/^[0-9A-F]{2}$/i.test(hexValue)) {
          throw new Error("invalid character encoding");
        }

        byteArray.push(parseInt(hexValue, 16));
        index += 3;
      }
    } else {
      // ASCII encoded values
      byteArray.push(charCode);
      index++;
    }
  }

  return byteArray;
}