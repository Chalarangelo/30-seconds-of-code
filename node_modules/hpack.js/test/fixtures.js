exports.specExamples = [
  {
    id: 'C.3.1',
    huffman: false,
    input: '8286 8441 0f77 7777 2e65 7861 6d70 6c65' +
           '2e63 6f6d',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'http' ],
      [ ':path', '/' ],
      [ ':authority', 'www.example.com' ]
    ],
    table: [
      [ ':authority', 'www.example.com', 57 ]
    ]
  },
  {
    id: 'C.3.2',
    continuation: true,
    huffman: false,
    input: '8286 84be 5808 6e6f 2d63 6163 6865',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'http' ],
      [ ':path', '/' ],
      [ ':authority', 'www.example.com' ],
      [ 'cache-control', 'no-cache' ]
    ],
    table: [
      [ 'cache-control', 'no-cache', 53 ],
      [ ':authority', 'www.example.com', 57 ]
    ]
  },
  {
    id: 'C.3.3',
    continuation: true,
    huffman: false,
    input: '8287 85bf 400a 6375 7374 6f6d 2d6b 6579' +
           '0c63 7573 746f 6d2d 7661 6c75 65',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'https' ],
      [ ':path', '/index.html' ],
      [ ':authority', 'www.example.com' ],
      [ 'custom-key', 'custom-value' ]
    ],
    table: [
      [ 'custom-key', 'custom-value', 54 ],
      [ 'cache-control', 'no-cache', 53 ],
      [ ':authority', 'www.example.com', 57 ]
    ]
  },

  {
    id: 'C.4.1',
    input: '8286 8441 8cf1 e3c2 e5f2 3a6b a0ab 90f4' +
           'ff',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'http' ],
      [ ':path', '/' ],
      [ ':authority', 'www.example.com' ]
    ],
    table: [
      [ ':authority', 'www.example.com', 57 ]
    ]
  },
  {
    id: 'C.4.2',
    continuation: true,
    input: '8286 84be 5886 a8eb 1064 9cbf',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'http' ],
      [ ':path', '/' ],
      [ ':authority', 'www.example.com' ],
      [ 'cache-control', 'no-cache' ]
    ],
    table: [
      [ 'cache-control', 'no-cache', 53 ],
      [ ':authority', 'www.example.com', 57 ]
    ]
  },
  {
    id: 'C.4.3',
    continuation: true,
    input: '8287 85bf 4088 25a8 49e9 5ba9 7d7f 8925' +
           'a849 e95b b8e8 b4bf',
    output: [
      [ ':method', 'GET' ],
      [ ':scheme', 'https' ],
      [ ':path', '/index.html' ],
      [ ':authority', 'www.example.com' ],
      [ 'custom-key', 'custom-value' ]
    ],
    table: [
      [ 'custom-key', 'custom-value', 54 ],
      [ 'cache-control', 'no-cache', 53 ],
      [ ':authority', 'www.example.com', 57 ]
    ]
  },

  {
    id: 'C.5.1',
    huffman: false,
    input: '4803 3330 3258 0770 7269 7661 7465 611d' +
           '4d6f 6e2c 2032 3120 4f63 7420 3230 3133' +
           '2032 303a 3133 3a32 3120 474d 546e 1768' +
           '7474 7073 3a2f 2f77 7777 2e65 7861 6d70' +
           '6c65 2e63 6f6d',
    output: [
      [ ':status', '302' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT' ],
      [ 'location', 'https://www.example.com' ]
    ],
    table: [
      [ 'location', 'https://www.example.com', 63 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT', 65 ],
      [ 'cache-control', 'private', 52 ],
      [ ':status', '302', 42 ]
    ]
  },
  {
    id: 'C.5.2',
    huffman: false,
    continuation: true,
    input: '4803 3330 37c1 c0bf',
    output: [
      [ ':status', '307' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT' ],
      [ 'location', 'https://www.example.com' ]
    ],
    table: [
      [ ':status', '307', 42 ],
      [ 'location', 'https://www.example.com', 63 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT', 65 ],
      [ 'cache-control', 'private', 52 ]
    ]
  },
  {
    id: 'C.5.3',
    huffman: false,
    continuation: true,
    input: '88c1 611d 4d6f 6e2c 2032 3120 4f63 7420' +
           '3230 3133 2032 303a 3133 3a32 3220 474d' +
           '54c0 5a04 677a 6970 7738 666f 6f3d 4153' +
           '444a 4b48 514b 425a 584f 5157 454f 5049' +
           '5541 5851 5745 4f49 553b 206d 6178 2d61' +
           '6765 3d33 3630 303b 2076 6572 7369 6f6e' +
           '3d31',
    output: [
      [ ':status', '200' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:22 GMT' ],
      [ 'location', 'https://www.example.com' ],
      [ 'content-encoding', 'gzip' ],
      [ 'set-cookie',
        'foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1' ]
    ],
    table: [
      [ 'set-cookie',
        'foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1',
        98 ],
      [ 'content-encoding', 'gzip', 52 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:22 GMT', 65 ]
    ]
  },

  {
    id: 'C.6.1',
    input: '4882 6402 5885 aec3 771a 4b61 96d0 7abe' +
           '9410 54d4 44a8 2005 9504 0b81 66e0 82a6' +
           '2d1b ff6e 919d 29ad 1718 63c7 8f0b 97c8' +
           'e9ae 82ae 43d3',
    output: [
      [ ':status', '302' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT' ],
      [ 'location', 'https://www.example.com' ]
    ],
    table: [
      [ 'location', 'https://www.example.com', 63 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT', 65 ],
      [ 'cache-control', 'private', 52 ],
      [ ':status', '302', 42 ]
    ]
  },
  {
    id: 'C.6.2',
    continuation: true,
    input: '4883 640e ffc1 c0bf',
    output: [
      [ ':status', '307' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT' ],
      [ 'location', 'https://www.example.com' ]
    ],
    table: [
      [ ':status', '307', 42 ],
      [ 'location', 'https://www.example.com', 63 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:21 GMT', 65 ],
      [ 'cache-control', 'private', 52 ]
    ]
  },
  {
    id: 'C.6.3',
    continuation: true,
    input: '88c1 6196 d07a be94 1054 d444 a820 0595' +
           '040b 8166 e084 a62d 1bff c05a 839b d9ab' +
           '77ad 94e7 821d d7f2 e6c7 b335 dfdf cd5b' +
           '3960 d5af 2708 7f36 72c1 ab27 0fb5 291f' +
           '9587 3160 65c0 03ed 4ee5 b106 3d50 07',
    output: [
      [ ':status', '200' ],
      [ 'cache-control', 'private' ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:22 GMT' ],
      [ 'location', 'https://www.example.com' ],
      [ 'content-encoding', 'gzip' ],
      [ 'set-cookie',
        'foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1' ]
    ],
    table: [
      [ 'set-cookie',
        'foo=ASDJKHQKBZXOQWEOPIUAXQWEOIU; max-age=3600; version=1',
        98 ],
      [ 'content-encoding', 'gzip', 52 ],
      [ 'date', 'Mon, 21 Oct 2013 20:13:22 GMT', 65 ]
    ]
  }
];
