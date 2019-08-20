# file-type [![Build Status](https://travis-ci.org/sindresorhus/file-type.svg?branch=master)](https://travis-ci.org/sindresorhus/file-type)

> Detect the file type of a Buffer/Uint8Array

The file type is detected by checking the [magic number](http://en.wikipedia.org/wiki/Magic_number_(programming)#Magic_numbers_in_files) of the buffer.


## Install

```
$ npm install file-type
```

<a href="https://www.patreon.com/sindresorhus">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>


## Usage

##### Node.js

```js
const readChunk = require('read-chunk');
const fileType = require('file-type');
const buffer = readChunk.sync('unicorn.png', 0, 4100);

fileType(buffer);
//=> {ext: 'png', mime: 'image/png'}
```

Or from a remote location:

```js
const http = require('http');
const fileType = require('file-type');
const url = 'http://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif';

http.get(url, res => {
	res.once('data', chunk => {
		res.destroy();
		console.log(fileType(chunk));
		//=> {ext: 'gif', mime: 'image/gif'}
	});
});
```

##### Browser

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'unicorn.png');
xhr.responseType = 'arraybuffer';

xhr.onload = () => {
	fileType(new Uint8Array(this.response));
	//=> {ext: 'png', mime: 'image/png'}
};

xhr.send();
```


## API

### fileType(input)

Returns an `Object` with:

- `ext` - One of the [supported file types](#supported-file-types)
- `mime` - The [MIME type](http://en.wikipedia.org/wiki/Internet_media_type)

Or `null` when no match.

#### input

Type: `Buffer` `Uint8Array`

It only needs the first 4100 bytes. The exception is detection of `docx`, `pptx`, and `xlsx` which potentially requires reading the whole file.


## Supported file types

- [`jpg`](https://en.wikipedia.org/wiki/JPEG)
- [`png`](https://en.wikipedia.org/wiki/Portable_Network_Graphics)
- [`gif`](https://en.wikipedia.org/wiki/GIF)
- [`webp`](https://en.wikipedia.org/wiki/WebP)
- [`flif`](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format)
- [`cr2`](http://fileinfo.com/extension/cr2)
- [`tif`](https://en.wikipedia.org/wiki/Tagged_Image_File_Format)
- [`bmp`](https://en.wikipedia.org/wiki/BMP_file_format)
- [`jxr`](https://en.wikipedia.org/wiki/JPEG_XR)
- [`psd`](https://en.wikipedia.org/wiki/Adobe_Photoshop#File_format)
- [`zip`](https://en.wikipedia.org/wiki/Zip_(file_format))
- [`tar`](https://en.wikipedia.org/wiki/Tar_(computing)#File_format)
- [`rar`](https://en.wikipedia.org/wiki/RAR_(file_format))
- [`gz`](https://en.wikipedia.org/wiki/Gzip)
- [`bz2`](https://en.wikipedia.org/wiki/Bzip2)
- [`7z`](https://en.wikipedia.org/wiki/7z)
- [`dmg`](https://en.wikipedia.org/wiki/Apple_Disk_Image)
- [`mp4`](https://en.wikipedia.org/wiki/MPEG-4_Part_14#Filename_extensions)
- [`m4v`](https://en.wikipedia.org/wiki/M4V)
- [`mid`](https://en.wikipedia.org/wiki/MIDI)
- [`mkv`](https://en.wikipedia.org/wiki/Matroska)
- [`webm`](https://en.wikipedia.org/wiki/WebM)
- [`mov`](https://en.wikipedia.org/wiki/QuickTime_File_Format)
- [`avi`](https://en.wikipedia.org/wiki/Audio_Video_Interleave)
- [`wmv`](https://en.wikipedia.org/wiki/Windows_Media_Video)
- [`mpg`](https://en.wikipedia.org/wiki/MPEG-1)
- [`mp2`](https://en.wikipedia.org/wiki/MPEG-1_Audio_Layer_II)
- [`mp3`](https://en.wikipedia.org/wiki/MP3)
- [`m4a`](https://en.wikipedia.org/wiki/MPEG-4_Part_14#.MP4_versus_.M4A)
- [`ogg`](https://en.wikipedia.org/wiki/Ogg)
- [`opus`](https://en.wikipedia.org/wiki/Opus_(audio_format))
- [`flac`](https://en.wikipedia.org/wiki/FLAC)
- [`wav`](https://en.wikipedia.org/wiki/WAV)
- [`qcp`](https://en.wikipedia.org/wiki/QCP)
- [`amr`](https://en.wikipedia.org/wiki/Adaptive_Multi-Rate_audio_codec)
- [`pdf`](https://en.wikipedia.org/wiki/Portable_Document_Format)
- [`epub`](https://en.wikipedia.org/wiki/EPUB)
- [`mobi`](https://en.wikipedia.org/wiki/Mobipocket) - Mobipocket
- [`exe`](https://en.wikipedia.org/wiki/.exe)
- [`swf`](https://en.wikipedia.org/wiki/SWF)
- [`rtf`](https://en.wikipedia.org/wiki/Rich_Text_Format)
- [`woff`](https://en.wikipedia.org/wiki/Web_Open_Font_Format)
- [`woff2`](https://en.wikipedia.org/wiki/Web_Open_Font_Format)
- [`eot`](https://en.wikipedia.org/wiki/Embedded_OpenType)
- [`ttf`](https://en.wikipedia.org/wiki/TrueType)
- [`otf`](https://en.wikipedia.org/wiki/OpenType)
- [`ico`](https://en.wikipedia.org/wiki/ICO_(file_format))
- [`flv`](https://en.wikipedia.org/wiki/Flash_Video)
- [`ps`](https://en.wikipedia.org/wiki/Postscript)
- [`xz`](https://en.wikipedia.org/wiki/Xz)
- [`sqlite`](https://www.sqlite.org/fileformat2.html)
- [`nes`](http://fileinfo.com/extension/nes)
- [`crx`](https://developer.chrome.com/extensions/crx)
- [`xpi`](https://en.wikipedia.org/wiki/XPInstall)
- [`cab`](https://en.wikipedia.org/wiki/Cabinet_(file_format))
- [`deb`](https://en.wikipedia.org/wiki/Deb_(file_format))
- [`ar`](https://en.wikipedia.org/wiki/Ar_(Unix))
- [`rpm`](http://fileinfo.com/extension/rpm)
- [`Z`](http://fileinfo.com/extension/z)
- [`lz`](https://en.wikipedia.org/wiki/Lzip)
- [`msi`](https://en.wikipedia.org/wiki/Windows_Installer)
- [`mxf`](https://en.wikipedia.org/wiki/Material_Exchange_Format)
- [`mts`](https://en.wikipedia.org/wiki/.m2ts)
- [`wasm`](https://en.wikipedia.org/wiki/WebAssembly)
- [`blend`](https://wiki.blender.org/index.php/Dev:Source/Architecture/File_Format)
- [`bpg`](https://bellard.org/bpg/)
- [`docx`](https://en.wikipedia.org/wiki/Office_Open_XML)
- [`pptx`](https://en.wikipedia.org/wiki/Office_Open_XML)
- [`xlsx`](https://en.wikipedia.org/wiki/Office_Open_XML)
- [`3gp`](https://en.wikipedia.org/wiki/3GP_and_3G2)
- [`jp2`](https://en.wikipedia.org/wiki/JPEG_2000) - JPEG 2000
- [`jpm`](https://en.wikipedia.org/wiki/JPEG_2000) - JPEG 2000
- [`jpx`](https://en.wikipedia.org/wiki/JPEG_2000) - JPEG 2000
- [`mj2`](https://en.wikipedia.org/wiki/Motion_JPEG_2000) - Motion JPEG 2000
- [`aif`](https://en.wikipedia.org/wiki/Audio_Interchange_File_Format)
- [`odt`](https://en.wikipedia.org/wiki/OpenDocument) - OpenDocument for word processing
- [`ods`](https://en.wikipedia.org/wiki/OpenDocument) - OpenDocument for spreadsheets
- [`odp`](https://en.wikipedia.org/wiki/OpenDocument) - OpenDocument for presentations
- [`xml`](https://en.wikipedia.org/wiki/XML)
- [`heic`](http://nokiatech.github.io/heif/technical.html)
- [`cur`](https://en.wikipedia.org/wiki/ICO_(file_format))
- [`ktx`](https://www.khronos.org/opengles/sdk/tools/KTX/file_format_spec/)
- [`ape`](https://en.wikipedia.org/wiki/Monkey%27s_Audio) - Monkey's Audio
- [`wv`](https://en.wikipedia.org/wiki/WavPack) - WavPack

*SVG isn't included as it requires the whole file to be read, but you can get it [here](https://github.com/sindresorhus/is-svg).*

*Pull request welcome for additional commonly used file types.*


## Related

- [file-type-cli](https://github.com/sindresorhus/file-type-cli) - CLI for this module


## Created by

- [Sindre Sorhus](https://github.com/sindresorhus)
- [Mikael Finstad](https://github.com/mifi)


## License

MIT
