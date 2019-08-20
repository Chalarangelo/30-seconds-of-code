# imagemin-webp [![Build Status](https://travis-ci.org/imagemin/imagemin-webp.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-webp)

> WebP [imagemin](https://github.com/imagemin/imagemin) plugin


## Install

```
$ npm install imagemin-webp
```


## Usage

```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
	use: [
		imageminWebp({quality: 50})
	]
}).then(() => {
	console.log('Images optimized');
});
```


## API

### imageminWebp([options])(buffer)

#### options

Type: `Object`

##### preset

Type: `string`<br>
Default: `default`

Preset setting, one of `default`, `photo`, `picture`, `drawing`, `icon` and `text`.

##### quality

Type: `number`<br>
Default: `75`

Set quality factor between `0` and `100`.

##### alphaQuality

Type: `number`<br>
Default: `100`

Set transparency-compression quality between `0` and `100`.

##### method

Type: `number`<br>
Default: `4`

Specify the compression method to use, between `0` (fastest) and `6` (slowest). This parameter controls the trade off between encoding speed and the compressed file size and quality.

##### size

Type: `number`<br>

Set target size in bytes.

##### sns

Type: `number`<br>
Default: `80`

Set the amplitude of spatial noise shaping between `0` and `100`.

##### filter

Type: `number`<br>

Set deblocking filter strength between `0` (off) and `100`.

##### autoFilter

Type: `boolean`<br>
Default: `false`<br>

Adjust filter strength automatically.

##### sharpness

Type: `number`<br>
Default: `0`

Set filter sharpness between `0` (sharpest) and `7` (least sharp).

##### lossless

Type: `boolean`<br>
Default: `false`

Encode images losslessly.

##### nearLossless

Type: `number`<br>
Default: `100`

Encode losslessly with an additional [lossy pre-processing step](https://groups.google.com/a/webmproject.org/forum/#!msg/webp-discuss/0GmxDmlexek/3ggyYsaYdFEJ), with a quality factor between `0` (maximum pre-processing) and `100` (same as `lossless`).

##### crop

Type: `Object { x: number, y: number, width: number, height: number }`

Crop the image.

##### resize

Type: `Object { width: number, height: number }`

Resize the image. Happens after `crop`.

##### metadata

Type: `string | string[]`<br>
Default: `none`<br>
Values: `all` `none` `exif` `icc` `xmp`

A list of metadata to copy from the input to the output if present.

#### buffer

Type: `Buffer`

Buffer to optimize.


## License

MIT © [Imagemin](https://github.com/imagemin)
