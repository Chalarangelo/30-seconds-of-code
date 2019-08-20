var hpack = exports;

hpack.utils = require('./hpack/utils');
hpack.huffman = require('./hpack/huffman');
hpack['static-table'] = require('./hpack/static-table');
hpack.table = require('./hpack/table');

hpack.decoder = require('./hpack/decoder');
hpack.decompressor = require('./hpack/decompressor');

hpack.encoder = require('./hpack/encoder');
hpack.compressor = require('./hpack/compressor');
