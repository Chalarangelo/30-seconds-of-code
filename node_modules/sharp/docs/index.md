# sharp

<img src="image/sharp-logo.svg" width="160" height="160" alt="sharp logo" align="right">

The typical use case for this high speed Node.js module
is to convert large images in common formats to
smaller, web-friendly JPEG, PNG and WebP images of varying dimensions.

Resizing an image is typically 4x-5x faster than using the
quickest ImageMagick and GraphicsMagick settings.

Colour spaces, embedded ICC profiles and alpha transparency channels are all handled correctly.
Lanczos resampling ensures quality is not sacrificed for speed.

As well as image resizing, operations such as
rotation, extraction, compositing and gamma correction are available.

Most modern 64-bit OS X, Windows and Linux systems running
Node versions 6, 8, 10, 11 and 12
do not require any additional install or runtime dependencies.

[![Test Coverage](https://coveralls.io/repos/lovell/sharp/badge.png?branch=master)](https://coveralls.io/r/lovell/sharp?branch=master)

### Formats

This module supports reading JPEG, PNG, WebP, TIFF, GIF and SVG images.

Output images can be in JPEG, PNG, WebP and TIFF formats as well as uncompressed raw pixel data.

Streams, Buffer objects and the filesystem can be used for input and output.

A single input Stream can be split into multiple processing pipelines and output Streams.

Deep Zoom image pyramids can be generated,
suitable for use with "slippy map" tile viewers like
[OpenSeadragon](https://github.com/openseadragon/openseadragon)
and [Leaflet](https://github.com/turban/Leaflet.Zoomify).

### Fast

This module is powered by the blazingly fast
[libvips](https://github.com/libvips/libvips) image processing library,
originally created in 1989 at Birkbeck College
and currently maintained by
[John Cupitt](https://github.com/jcupitt).

Only small regions of uncompressed image data
are held in memory and processed at a time,
taking full advantage of multiple CPU cores and L1/L2/L3 cache.

Everything remains non-blocking thanks to _libuv_,
no child processes are spawned and Promises/async/await are supported.

### Optimal

Huffman tables are optimised when generating JPEG output images
without having to use separate command line tools like
[jpegoptim](https://github.com/tjko/jpegoptim) and
[jpegtran](http://jpegclub.org/jpegtran/).

PNG filtering is disabled by default,
which for diagrams and line art often produces the same result
as [pngcrush](https://pmt.sourceforge.io/pngcrush/).

### Contributing

A [guide for contributors](https://github.com/lovell/sharp/blob/master/.github/CONTRIBUTING.md)
covers reporting bugs, requesting features and submitting code changes.

### Credits

This module would never have been possible without
the help and code contributions of the following people:

* [John Cupitt](https://github.com/jcupitt)
* [Pierre Inglebert](https://github.com/pierreinglebert)
* [Jonathan Ong](https://github.com/jonathanong)
* [Chanon Sajjamanochai](https://github.com/chanon)
* [Juliano Julio](https://github.com/julianojulio)
* [Daniel Gasienica](https://github.com/gasi)
* [Julian Walker](https://github.com/julianwa)
* [Amit Pitaru](https://github.com/apitaru)
* [Brandon Aaron](https://github.com/brandonaaron)
* [Andreas Lind](https://github.com/papandreou)
* [Maurus Cuelenaere](https://github.com/mcuelenaere)
* [Linus Unnebäck](https://github.com/LinusU)
* [Victor Mateevitsi](https://github.com/mvictoras)
* [Alaric Holloway](https://github.com/skedastik)
* [Bernhard K. Weisshuhn](https://github.com/bkw)
* [David A. Carley](https://github.com/dacarley)
* [John Tobin](https://github.com/jtobinisaniceguy)
* [Kenton Gray](https://github.com/kentongray)
* [Felix Bünemann](https://github.com/felixbuenemann)
* [Samy Al Zahrani](https://github.com/salzhrani)
* [Chintan Thakkar](https://github.com/lemnisk8)
* [F. Orlando Galashan](https://github.com/frulo)
* [Kleis Auke Wolthuizen](https://github.com/kleisauke)
* [Matt Hirsch](https://github.com/mhirsch)
* [Rahul Nanwani](https://github.com/rnanwani)
* [Matthias Thoemmes](https://github.com/cmtt)
* [Patrick Paskaris](https://github.com/ppaskaris)
* [Jérémy Lal](https://github.com/kapouer)
* [Alice Monday](https://github.com/alice0meta)
* [Kristo Jorgenson](https://github.com/kristojorg)
* [Yves Bos](https://github.com/YvesBos)
* [Nicolas Coden](https://github.com/ncoden)
* [Matt Parrish](https://github.com/pbomb)
* [Matthew McEachen](https://github.com/mceachen)
* [Jarda Kotěšovec](https://github.com/jardakotesovec)
* [Kenric D'Souza](https://github.com/AzureByte)
* [Oleh Aleinyk](https://github.com/oaleynik)
* [Marcel Bretschneider](https://github.com/3epnm)
* [Andrea Bianco](https://github.com/BiancoA)
* [Rik Heywood](https://github.com/rikh42)
* [Thomas Parisot](https://github.com/oncletom)
* [Nathan Graves](https://github.com/woolite64)
* [Tom Lokhorst](https://github.com/tomlokhorst)
* [Espen Hovlandsdal](https://github.com/rexxars)
* [Sylvain Dumont](https://github.com/sylvaindumont)
* [Alun Davies](https://github.com/alundavies)
* [Aidan Hoolachan](https://github.com/ajhool)
* [Axel Eirola](https://github.com/aeirola)
* [Freezy](https://github.com/freezy)
* [Julian Aubourg](https://github.com/jaubourg)
* [Keith Belovay](https://github.com/fromkeith)
* [Michael B. Klein](https://github.com/mbklein)
* [Jakub Michálek](https://github.com/Goues)

Thank you!

### Licensing

Copyright 2013, 2014, 2015, 2016, 2017, 2018, 2019 Lovell Fuller and contributors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
[https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
