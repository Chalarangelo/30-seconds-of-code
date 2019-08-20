# vlq.js

Convert integers to a Base64-encoded VLQ string, and vice versa. No dependencies, works in node.js or browsers, supports AMD.


## Why would you want to do that?

Sourcemaps are the most likely use case. Mappings from original source to generated content are encoded as a sequence of VLQ strings.


## What is a VLQ string?

A [variable-length quantity](http://en.wikipedia.org/wiki/Variable-length_quantity) is a compact way of encoding large integers in text (i.e. in situations where you can't transmit raw binary data). An integer represented as digits will always take up more space than the equivalent VLQ representation:

| Integer             | VLQ        |
| :------------------ | :--------- |
| 0                   | A          |
| 1                   | C          |
| -1                  | D          |
| 123                 | 2H         |
| 123456789           | qxmvrH     |
| 123456789123456789  | gxvh6sB    |


## Installation

```bash
npm install vlq
```

...or...

```bash
bower install vlq
```

...or grab the vlq.js file and include it with a `<script src='vlq.js'>` tag.


## Usage

### Encoding

`vlq.encode` accepts an integer, or an array of integers, and returns a string:

```js
vlq.encode( 123 ); // '2H';
vlq.encode([ 123, 456, 789 ]); // '2HwcqxB'
```

### Decoding

`vlq.decode` accepts a string and always returns an array:

```js
vlq.decode( '2H' ); // [ 123 ]
vlq.decode( '2HwcqxB' ); // [ 123, 456, 789 ]
```


## Using vlq.js with sourcemaps

[See here for an example of using vlq.js with sourcemaps.](https://github.com/Rich-Harris/vlq/tree/master/sourcemaps)


## Credits

Adapted from [murzwin.com/base64vlq.html](http://murzwin.com/base64vlq.html) by Alexander Pavlov.


## License

[MIT](LICENSE).
