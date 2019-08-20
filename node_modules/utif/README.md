# UTIF.js
A small, fast and advanced TIFF / EXIF (+ DNG and other TIFF-ish files) decoder and encoder. It is the main TIFF library for [Photopea image editor](https://www.photopea.com). Try to open your TIFF file with Photopea to see, if UTIF.js can parse it.

* Supports Black & White, Grayscale, RGB and Paletted images
* Supports Fax 3 and Fax 4 (CCITT), JPEG, LZW, PackBits and other compressions (1,3,4,5,6,7,8,32773,32809)
* E.g. [this 8 MPix image](//www.photopea.com/api/img/G4.TIF) with Fax 4 compression is just 56 kB ( [Open in Photopea](https://www.photopea.com?p=%7B%22files%22:%5B%22//www.photopea.com/api/img/G4.TIF%22%5D%7D) )

## Installation

Download and include the `UTIF.js` file in your code. If you're in NodeJS or otherwise using NPM, run:

```sh
npm install utif
```

#### `UTIF.decode(buffer)`
* `buffer`: ArrayBuffer containing TIFF or EXIF data
* returns an array of "IFDs" (image file directories). Each IFD is an object, keys are "tXYZ" (XYZ is a TIFF tag number), values are values of these tags. You can get the the dimension (and other properties, "metadata") of the image without decompressing pixel data.

#### `UTIF.decodeImages(buffer, ifds)`
* `buffer`: ArrayBuffer containing TIFF or EXIF data
* `ifds`: the output of UTIF.decode()
* loops through each IFD. If there is an image inside it, it is decoded and three new properties are added to the IFD:
* * `width`: the width of the image
* * `height`: the height of the image
* * `data`: decompressed pixel data of the image

TIFF files may have various number of channels and various color depth. The interpretation of `data` depends on many tags (see the [TIFF 6 specification](http://www.npes.org/pdf/TIFF-v6.pdf)). The following function converts any TIFF image into a 8-bit RGBA image.

#### `UTIF.toRGBA8(ifd)`
* `ifd`: image file directory (element of "ifds" returned by UTIF.decode(), processed by UTIF.decodeImages())
* returns Uint8Array of the image in RGBA format, 8 bits per channel (ready to use in context2d.putImageData() etc.)

### Example

```javascript
function imgLoaded(e) {
  var ifds = UTIF.decode(e.target.response);
  UTIF.decodeImages(e.target.response, ifds)
  var rgba  = UTIF.toRGBA8(ifds[0]);  // Uint8Array with RGBA pixels
  console.log(ifds[0].width, ifds[0].height, ifds[0]);
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "my_image.tif");
xhr.responseType = "arraybuffer";
xhr.onload = imgLoaded;   xhr.send();
```
## Use TIFF images in HTML

If you are not a programmer, you can use TIFF images directly inside the `<img>` element of HTML. Then, it is enough to call `UTIF.replaceIMG()` once at some point.

#### `UTIF.replaceIMG()`
```html
<body onload="UTIF.replaceIMG()">
...
<img src="image.tif" />  <img src="dog.tif" /> ...
```
And UTIF.js will do the rest. Internally, an Image elements will be replaced by a Canvas elements. The attributes "id", "class" and "style" will be copied from the original Image to the new Canvas. Use CSS to style such images.


## Encoding TIFF images

You should not save images into TIFF format in the 21st century. Save them as PNG instead (e.g. using [UPNG.js](https://github.com/photopea/UPNG.js)). If you still want to use TIFF format for some reason, here it is.

#### `UTIF.encodeImage(rgba, w, h, metadata)`
* `rgba`: ArrayBuffer containing RGBA pixel data
* `w`: image width
* `h`: image height
* `metadata` [optional]: IFD object (see below)
* returns ArrayBuffer of the binary TIFF file. No compression right now.

#### `UTIF.encode(ifds)`
* `ifds`: array of IFDs (image file directories). An IFD is a JS object with properties "tXYZ" (where XYZ are TIFF tags)
* returns ArrayBuffer of binary data. You can use it to encode EXIF data.

## Dependencies
TIFF format sometimes uses Inflate algorithm for compression (but it is quite rare). Right now, UTIF.js calls [Pako.js](https://github.com/nodeca/pako) for the Inflate method.
TIFF format sometimes uses JPEG compression (but it is quite rare). Right now, UTIF.js calls "JpegDecoder" constructor, which comes from [pdf.js](https://github.com/mozilla/pdf.js). You can find it "separated" from pdf.js in libraries such as jpg.js.
