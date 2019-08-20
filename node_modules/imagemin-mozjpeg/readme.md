# imagemin-mozjpeg [![Build Status](https://travis-ci.org/imagemin/imagemin-mozjpeg.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-mozjpeg) [![Build status](https://ci.appveyor.com/api/projects/status/uuh7yi48erf4ykyo?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/imagemin-mozjpeg)

> [Imagemin](https://github.com/imagemin/imagemin) plugin for [mozjpeg](https://github.com/mozilla/mozjpeg)


## Install

```
$ npm install imagemin-mozjpeg
```


## Usage

```js
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

(async () => {
	await imagemin(['images/*.jpg'], 'build/images', {
		use: [
			imageminMozjpeg()
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminMozjpeg([options])(buffer)

Returns a `Promise<Buffer>`.

#### options

##### quality

Type: `number`

Compression quality, in range `0` (worst) to `100` (perfect).

##### progressive

Type: `boolean`<br>
Default: `true`

`false` creates baseline JPEG file.

##### targa

Type: `boolean`<br>
Default: `false`

Input file is Targa format (usually not needed).

##### revert

Type: `boolean`<br>
Default: `false`

Revert to standard defaults instead of mozjpeg defaults.

##### fastCrush

Type: `boolean`<br>
Default: `false`

Disable progressive scan optimization.

##### dcScanOpt

Type: `number`<br>
Default: `1`

Set DC scan optimization mode.

- `0` One scan for all components
- `1` One scan per component
- `2` Optimize between one scan for all components and one scan for 1st component plus one scan for remaining components

##### trellis

Type: `boolean`<br>
Default: `true`

[Trellis optimization](https://en.wikipedia.org/wiki/Trellis_quantization).

##### trellisDC

Type: `boolean`<br>
Default: `true`

Trellis optimization of DC coefficients.

##### tune

Type: `string`<br>
Default: `hvs-psnr`

Set Trellis optimization method. Available methods: `psnr`, `hvs-psnr`, `ssim`, `ms-ssim`

##### overshoot

Type: `boolean`<br>
Default: `true`

Black-on-white deringing via overshoot.

##### arithmetic

Type: `boolean`<br>
Default: `false`

Use [arithmetic coding](https://en.wikipedia.org/wiki/Arithmetic_coding).

##### dct

Type: `string`<br>
Default: `int`

Set [DCT](https://en.wikipedia.org/wiki/Discrete_cosine_transform) method:

- `int` Use integer DCT
- `fast` Use fast integer DCT (less accurate)
- `float` Use floating-point DCT

##### quantBaseline

Type: `boolean`<br>
Default: `false`

Use 8-bit quantization table entries for baseline JPEG compatibility.

##### quantTable

Type: `number`

Use predefined quantization table.

- `0` JPEG Annex K
- `1` Flat
- `2` Custom, tuned for MS-SSIM
- `3` ImageMagick table by N. Robidoux
- `4` Custom, tuned for PSNR-HVS
- `5` Table from paper by Klein, Silverstein and Carney

##### smooth

Type: `number`

Set the strength of smooth dithered input. (1...100)

##### maxMemory

Type: `number`

Set the maximum memory to use in kilobytes.

##### sample

Type: `string[]`

Set component sampling factors. Each item should be in the format `HxV`, for example `2x1`.

#### buffer

Type: `buffer`

Buffer to optimize.


## License

MIT © [Imagemin](https://github.com/imagemin)
