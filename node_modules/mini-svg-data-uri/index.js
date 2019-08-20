var shorterNames = require('./shorter-css-color-names');
var REGEX = {
  whitespace: /\s+/g,
  urlHexPairs: /%[\dA-F]{2}/g,
  quotes: /"/g,
}

function collapseWhitespace(str) {
  return str.trim().replace(REGEX.whitespace, ' ');
}

function dataURIPayload(string) {
  return encodeURIComponent(string)
    .replace(REGEX.urlHexPairs, specialHexEncode);
}

// `#` gets converted to `%23`, so quite a few CSS named colors are shorter than
// their equivalent URL-encoded hex codes.
function colorCodeToShorterNames(string) {
  Object.keys(shorterNames).forEach(function(key) {
    if (shorterNames[key].test(string)) {
      string = string.replace(shorterNames[key], key);
    }
  });

  return string;
}

function specialHexEncode(match) {
  switch (match) { // Browsers tolerate these characters, and they're frequent
    case '%20': return ' ';
    case '%3D': return '=';
    case '%3A': return ':';
    case '%2F': return '/';
    default: return match.toLowerCase(); // compresses better
  }
}

function svgToTinyDataUri(svgString) {
  if (typeof svgString !== 'string') {
    throw new TypeError('Expected a string, but received ' + typeof svgString);
  }
  // Strip the Byte-Order Mark if the SVG has one
  if (svgString.charCodeAt(0) === 0xfeff) { svgString = svgString.slice(1) }

  var body = colorCodeToShorterNames(collapseWhitespace(svgString))
    .replace(REGEX.quotes, "'");
  return 'data:image/svg+xml,' + dataURIPayload(body);
}

svgToTinyDataUri.toSrcset = function toSrcset(svgString) {
  return svgToTinyDataUri(svgString).replace(/ /g, '%20');
}

module.exports = svgToTinyDataUri;
