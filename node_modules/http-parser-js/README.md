# HTTP Parser

This library parses HTTP protocol for requests and responses.  It was created to replace `http_parser.c` since calling C++ function from JS is really slow in V8.

This was further modified by Jimbly to be useable in parsing responses, specifically tested with the "request" module, and addresses issues such as corrupt HTTP headers, which would otherwise cause Node's parser to throw a fatal error (HPE_INVALID_HEADER_TOKEN).

Jan Schär (jscissr) made some bigger changes and added tests. This fixed some bugs and added many missing features.

This is packaged as a standalone npm module.  To use in node, monkeypatch HTTPParser.

```js
// Monkey patch before you require http for the first time.
process.binding('http_parser').HTTPParser = require('http-parser-js').HTTPParser;

var http = require('http');
// ...
```

## Testing

Simply do `npm test`. The tests are copied from node and mscedex/io.js, with some modifcations.

## Status

This should now be usable in any node application, it now supports (nearly) everything `http_parser.c` does while still being tolerant with corrupted headers.

## License

MIT. See LICENSE.md
