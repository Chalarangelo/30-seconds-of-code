# Performance

### Test environment

* AWS EC2 eu-west-1 [c5.large](https://aws.amazon.com/ec2/instance-types/c5/) (2x Xeon Platinum 8124M CPU @ 3.00GHz)
* Ubuntu 18.04 (hvm-ssd/ubuntu-bionic-18.04-amd64-server-20180912 ami-00035f41c82244dab)
* Node.js v10.11.0

### The contenders

* [jimp](https://www.npmjs.com/package/jimp) v0.5.3 - Image processing in pure JavaScript. Provides bicubic interpolation.
* [mapnik](https://www.npmjs.org/package/mapnik) v4.0.1 - Whilst primarily a map renderer, Mapnik contains bitmap image utilities.
* [imagemagick-native](https://www.npmjs.com/package/imagemagick-native) v1.9.3 - Wrapper around libmagick++, supports Buffers only.
* [imagemagick](https://www.npmjs.com/package/imagemagick) v0.1.3 - Supports filesystem only and "*has been unmaintained for a long time*".
* [gm](https://www.npmjs.com/package/gm) v1.23.1 - Fully featured wrapper around GraphicsMagick's `gm` command line utility.
* sharp v0.21.0 / libvips v8.7.0 - Caching within libvips disabled to ensure a fair comparison.

### The task

Decompress a 2725x2225 JPEG image,
resize to 720x588 using Lanczos 3 resampling (where available),
then compress to JPEG at a "quality" setting of 80.

### Results

| Module             | Input  | Output | Ops/sec | Speed-up |
| :----------------- | :----- | :----- | ------: | -------: |
| jimp               | buffer | buffer |    0.71 |      1.0 |
| mapnik             | buffer | buffer |    3.32 |      4.7 |
| gm                 | buffer | buffer |    3.97 |      5.6 |
| imagemagick-native | buffer | buffer |    4.06 |      5.7 |
| imagemagick        | file   | file   |    4.24 |      6.0 |
| sharp              | stream | stream |   25.30 |     35.6 |
| sharp              | file   | file   |   26.17 |     36.9 |
| sharp              | buffer | buffer |   26.45 |     37.3 |

Greater libvips performance can be expected with caching enabled (default)
and using 8+ core machines, especially those with larger L1/L2 CPU caches.

The I/O limits of the relevant (de)compression library will generally determine maximum throughput.

### Benchmark test prerequisites

Requires _ImageMagick_, _GraphicsMagick_ and _Mapnik_:

```sh
brew install imagemagick
brew install graphicsmagick
brew install mapnik
```

```sh
sudo apt-get install imagemagick libmagick++-dev graphicsmagick libmapnik-dev
```

```sh
sudo yum install ImageMagick-devel ImageMagick-c++-devel GraphicsMagick mapnik-devel
```

### Running the benchmark test

```sh
git clone https://github.com/lovell/sharp.git
cd sharp
npm install
cd test/bench
npm install
npm test
```
