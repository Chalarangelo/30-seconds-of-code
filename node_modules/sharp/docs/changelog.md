# Changelog

### v0.22 - "*uptake*"

Requires libvips v8.7.4.

#### v0.22.1 - 25<sup>th</sup> April 2019

* Add `modulate` operation for brightness, saturation and hue.
  [#1601](https://github.com/lovell/sharp/pull/1601)
  [@Goues](https://github.com/Goues)

* Improve help messaging should `require("sharp")` fail.
  [#1638](https://github.com/lovell/sharp/pull/1638)
  [@sidharthachatterjee](https://github.com/sidharthachatterjee)

* Add support for Node 12.
  [#1668](https://github.com/lovell/sharp/issues/1668)

#### v0.22.0 - 18<sup>th</sup> March 2019

* Remove functions previously deprecated in v0.21.0:
    `background`, `crop`, `embed`, `ignoreAspectRatio`, `max`, `min` and `withoutEnlargement`.

* Add `composite` operation supporting multiple images and blend modes; deprecate `overlayWith`.
  [#728](https://github.com/lovell/sharp/issues/728)

* Add support for `pages` input option for multi-page input.
  [#1566](https://github.com/lovell/sharp/issues/1566)

* Allow Stream-based input of raw pixel data.
  [#1579](https://github.com/lovell/sharp/issues/1579)

* Add support for `page` input option to GIF and PDF.
  [#1595](https://github.com/lovell/sharp/pull/1595)
  [@ramiel](https://github.com/ramiel)

### v0.21 - "*teeth*"

Requires libvips v8.7.0.

#### v0.21.3 - 19<sup>th</sup> January 2019

* Input image decoding now fails fast, set `failOnError` to change this behaviour.

* Failed filesystem-based input now separates missing file and invalid format errors.
  [#1542](https://github.com/lovell/sharp/issues/1542)

#### v0.21.2 - 13<sup>th</sup> January 2019

* Ensure all metadata is removed from PNG output unless `withMetadata` used.

* Ensure shortest edge is at least one pixel after resizing.
  [#1003](https://github.com/lovell/sharp/issues/1003)

* Add `ensureAlpha` operation to add an alpha channel, if missing.
  [#1153](https://github.com/lovell/sharp/issues/1153)

* Expose `pages` and `pageHeight` metadata for multi-page input images.
  [#1205](https://github.com/lovell/sharp/issues/1205)

* Expose PNG output options requiring libimagequant.
  [#1484](https://github.com/lovell/sharp/issues/1484)

* Expose underlying error message for invalid input.
  [#1505](https://github.com/lovell/sharp/issues/1505)

* Prevent mutatation of options passed to `jpeg`.
  [#1516](https://github.com/lovell/sharp/issues/1516)

* Ensure forced output format applied correctly when output chaining.
  [#1528](https://github.com/lovell/sharp/issues/1528)

#### v0.21.1 - 7<sup>th</sup> December 2018

* Install: support `sharp_dist_base_url` npm config, like existing `SHARP_DIST_BASE_URL`.
  [#1422](https://github.com/lovell/sharp/pull/1422)
  [@SethWen](https://github.com/SethWen)

* Ensure `channel` metadata is correct for raw, greyscale output.
  [#1425](https://github.com/lovell/sharp/issues/1425)

* Add support for the "mitchell" kernel for image reductions.
  [#1438](https://github.com/lovell/sharp/pull/1438)
  [@Daiz](https://github.com/Daiz)

* Allow separate parameters for gamma encoding and decoding.
  [#1439](https://github.com/lovell/sharp/pull/1439)
  [@Daiz](https://github.com/Daiz)

* Build prototype with `Object.assign` to allow minification.
  [#1475](https://github.com/lovell/sharp/pull/1475)
  [@jaubourg](https://github.com/jaubourg)

* Expose libvips' recombination matrix operation.
  [#1477](https://github.com/lovell/sharp/pull/1477)
  [@fromkeith](https://github.com/fromkeith)

* Expose libvips' pyramid/tile options for TIFF output.
  [#1483](https://github.com/lovell/sharp/pull/1483)
  [@mbklein](https://github.com/mbklein)

#### v0.21.0 - 4<sup>th</sup> October 2018

* Deprecate the following resize-related functions:
    `crop`, `embed`, `ignoreAspectRatio`, `max`, `min` and `withoutEnlargement`.
  Access to these is now via options passed to the `resize` function.
  For example:
    `embed('north')` is now `resize(width, height, { fit: 'contain', position: 'north' })`,
    `crop('attention')` is now `resize(width, height, { fit: 'cover', position: 'attention' })`,
    `max().withoutEnlargement()` is now `resize(width, height, { fit: 'inside', withoutEnlargement: true })`.
  [#1135](https://github.com/lovell/sharp/issues/1135)

* Deprecate the `background` function.
    Per-operation `background` options added to `resize`, `extend` and `flatten` operations.
  [#1392](https://github.com/lovell/sharp/issues/1392)

* Add `size` to `metadata` response (Stream and Buffer input only).
  [#695](https://github.com/lovell/sharp/issues/695)

* Switch from custom trim operation to `vips_find_trim`.
  [#914](https://github.com/lovell/sharp/issues/914)

* Add `chromaSubsampling` and `isProgressive` properties to `metadata` response.
  [#1186](https://github.com/lovell/sharp/issues/1186)

* Drop Node 4 support.
  [#1212](https://github.com/lovell/sharp/issues/1212)

* Enable SIMD convolution by default.
  [#1213](https://github.com/lovell/sharp/issues/1213)

* Add experimental prebuilt binaries for musl-based Linux.
  [#1379](https://github.com/lovell/sharp/issues/1379)

* Add support for arbitrary rotation angle via vips_rotate.
  [#1385](https://github.com/lovell/sharp/pull/1385)
  [@freezy](https://github.com/freezy)

### v0.20 - "*prebuild*"

Requires libvips v8.6.1.

#### v0.20.8 - 5<sup>th</sup> September 2018

* Avoid race conditions when creating directories during installation.
  [#1358](https://github.com/lovell/sharp/pull/1358)
  [@ajhool](https://github.com/ajhool)

* Accept floating point values for input density parameter.
  [#1362](https://github.com/lovell/sharp/pull/1362)
  [@aeirola](https://github.com/aeirola)

#### v0.20.7 - 21<sup>st</sup> August 2018

* Use copy+unlink if rename operation fails during installation.
  [#1345](https://github.com/lovell/sharp/issues/1345)

#### v0.20.6 - 20<sup>th</sup> August 2018

* Add removeAlpha operation to remove alpha channel, if any.
  [#1248](https://github.com/lovell/sharp/issues/1248)

* Expose mozjpeg quant_table flag.
  [#1285](https://github.com/lovell/sharp/pull/1285)
  [@rexxars](https://github.com/rexxars)

* Allow full WebP alphaQuality range of 0-100.
  [#1290](https://github.com/lovell/sharp/pull/1290)
  [@sylvaindumont](https://github.com/sylvaindumont)

* Cache libvips binaries to reduce re-install time.
  [#1301](https://github.com/lovell/sharp/issues/1301)

* Ensure vendor platform mismatch throws error at install time.
  [#1303](https://github.com/lovell/sharp/issues/1303)

* Improve install time error messages for FreeBSD users.
  [#1310](https://github.com/lovell/sharp/issues/1310)

* Ensure extractChannel works with 16-bit images.
  [#1330](https://github.com/lovell/sharp/issues/1330)

* Expose depth option for tile-based output.
  [#1342](https://github.com/lovell/sharp/pull/1342)
  [@alundavies](https://github.com/alundavies)

* Add experimental entropy field to stats response.

#### v0.20.5 - 27<sup>th</sup> June 2018

* Expose libjpeg optimize_coding flag.
  [#1265](https://github.com/lovell/sharp/pull/1265)
  [@tomlokhorst](https://github.com/tomlokhorst)

#### v0.20.4 - 20<sup>th</sup> June 2018

* Prevent possible rounding error when using shrink-on-load and 90/270 degree rotation.
  [#1241](https://github.com/lovell/sharp/issues/1241)
  [@anahit42](https://github.com/anahit42)

* Ensure extractChannel sets correct single-channel colour space interpretation.
  [#1257](https://github.com/lovell/sharp/issues/1257)
  [@jeremychone](https://github.com/jeremychone)

#### v0.20.3 - 29<sup>th</sup> May 2018

* Fix tint operation by ensuring LAB interpretation and allowing negative values.
  [#1235](https://github.com/lovell/sharp/issues/1235)
  [@wezside](https://github.com/wezside)

#### v0.20.2 - 28<sup>th</sup> April 2018

* Add tint operation to set image chroma.
  [#825](https://github.com/lovell/sharp/pull/825)
  [@rikh42](https://github.com/rikh42)

* Add environment variable to ignore globally-installed libvips.
  [#1165](https://github.com/lovell/sharp/pull/1165)
  [@oncletom](https://github.com/oncletom)

* Add support for page selection with multi-page input (GIF/TIFF).
  [#1204](https://github.com/lovell/sharp/pull/1204)
  [@woolite64](https://github.com/woolite64)

* Add support for Group4 (CCITTFAX4) compression with TIFF output.
  [#1208](https://github.com/lovell/sharp/pull/1208)
  [@woolite64](https://github.com/woolite64)

#### v0.20.1 - 17<sup>th</sup> March 2018

* Improve installation experience when a globally-installed libvips below the minimum required version is found.
  [#1148](https://github.com/lovell/sharp/issues/1148)

* Prevent smartcrop error when cumulative rounding is below target size.
  [#1154](https://github.com/lovell/sharp/issues/1154)
  [@ralrom](https://github.com/ralrom)

* Expose libvips' median filter operation.
  [#1161](https://github.com/lovell/sharp/pull/1161)
  [@BiancoA](https://github.com/BiancoA)

#### v0.20.0 - 5<sup>th</sup> March 2018

* Add support for prebuilt sharp binaries on common platforms.
  [#186](https://github.com/lovell/sharp/issues/186)

### v0.19 - "*suit*"

Requires libvips v8.6.1.

#### v0.19.1 - 24<sup>th</sup> February 2018

* Expose libvips' linear transform feature.
  [#1024](https://github.com/lovell/sharp/pull/1024)
  [@3epnm](https://github.com/3epnm)

* Expose angle option for tile-based output.
  [#1121](https://github.com/lovell/sharp/pull/1121)
  [@BiancoA](https://github.com/BiancoA)

* Prevent crop operation when image already at or below target dimensions.
  [#1134](https://github.com/lovell/sharp/issues/1134)
  [@pieh](https://github.com/pieh)

#### v0.19.0 - 11<sup>th</sup> January 2018

* Expose offset coordinates of strategy-based crop.
  [#868](https://github.com/lovell/sharp/issues/868)
  [@mirohristov-com](https://github.com/mirohristov-com)

* PNG output now defaults to adaptiveFiltering=false, compressionLevel=9
  [#872](https://github.com/lovell/sharp/issues/872)
  [@wmertens](https://github.com/wmertens)

* Add stats feature for pixel-derived image statistics.
  [#915](https://github.com/lovell/sharp/pull/915)
  [@rnanwani](https://github.com/rnanwani)

* Add failOnError option to fail-fast on bad input image data.
  [#976](https://github.com/lovell/sharp/pull/976)
  [@mceachen](https://github.com/mceachen)

* Resize: switch to libvips' implementation, make fastShrinkOnLoad optional, remove interpolator and centreSampling options.
  [#977](https://github.com/lovell/sharp/pull/977)
  [@jardakotesovec](https://github.com/jardakotesovec)

* Attach finish event listener to a clone only for Stream-based input.
  [#995](https://github.com/lovell/sharp/issues/995)
  [@whmountains](https://github.com/whmountains)

* Add tilecache before smartcrop to avoid over-computation of previous operations.
  [#1028](https://github.com/lovell/sharp/issues/1028)
  [@coffeebite](https://github.com/coffeebite)

* Prevent toFile extension taking precedence over requested format.
  [#1037](https://github.com/lovell/sharp/issues/1037)
  [@tomgallagher](https://github.com/tomgallagher)

* Add support for gravity option to existing embed feature.
  [#1038](https://github.com/lovell/sharp/pull/1038)
  [@AzureByte](https://github.com/AzureByte)

* Expose IPTC and XMP metadata when available.
  [#1079](https://github.com/lovell/sharp/pull/1079)
  [@oaleynik](https://github.com/oaleynik)

* TIFF output: switch default predictor from 'none' to 'horizontal' to match libvips' behaviour.

### v0.18 - "*ridge*"

Requires libvips v8.5.5.

#### v0.18.4 - 18<sup>th</sup> September 2017

* Ensure input Buffer really is marked as Persistent, prevents mark-sweep GC.
  [#950](https://github.com/lovell/sharp/issues/950)
  [@lfdoherty](https://github.com/lfdoherty)

#### v0.18.3 - 13<sup>th</sup> September 2017

* Skip shrink-on-load when trimming.
  [#888](https://github.com/lovell/sharp/pull/888)
  [@kleisauke](https://github.com/kleisauke)

* Migrate from got to simple-get for basic auth support.
  [#945](https://github.com/lovell/sharp/pull/945)
  [@pbomb](https://github.com/pbomb)

#### v0.18.2 - 1<sup>st</sup> July 2017

* Expose libvips' xres and yres properties for TIFF output.
  [#828](https://github.com/lovell/sharp/pull/828)
  [@YvesBos](https://github.com/YvesBos)

* Ensure flip and flop operations work with auto-rotate.
  [#837](https://github.com/lovell/sharp/issues/837)
  [@rexxars](https://github.com/rexxars)

* Allow binary download URL override via SHARP_DIST_BASE_URL env variable.
  [#841](https://github.com/lovell/sharp/issues/841)

* Add support for Solus Linux.
  [#857](https://github.com/lovell/sharp/pull/857)
  [@ekremkaraca](https://github.com/ekremkaraca)

#### v0.18.1 - 30<sup>th</sup> May 2017

* Remove regression from #781 that could cause incorrect shrink calculation.
  [#831](https://github.com/lovell/sharp/issues/831)
  [@suprMax](https://github.com/suprMax)

#### v0.18.0 - 30<sup>th</sup> May 2017

* Remove the previously-deprecated output format "option" functions:
    quality, progressive, compressionLevel, withoutAdaptiveFiltering,
    withoutChromaSubsampling, trellisQuantisation, trellisQuantization,
    overshootDeringing, optimiseScans and optimizeScans.

* Ensure maximum output dimensions are based on the format to be used.
  [#176](https://github.com/lovell/sharp/issues/176)
  [@stephanebachelier](https://github.com/stephanebachelier)

* Avoid costly (un)premultiply when using overlayWith without alpha channel.
  [#573](https://github.com/lovell/sharp/issues/573)
  [@strarsis](https://github.com/strarsis)

* Include pixel depth (e.g. "uchar") when reading metadata.
  [#577](https://github.com/lovell/sharp/issues/577)
  [@moedusa](https://github.com/moedusa)

* Add support for Buffer and Stream-based TIFF output.
  [#587](https://github.com/lovell/sharp/issues/587)
  [@strarsis](https://github.com/strarsis)

* Expose warnings from libvips via NODE_DEBUG=sharp environment variable.
  [#607](https://github.com/lovell/sharp/issues/607)
  [@puzrin](https://github.com/puzrin)

* Switch to the libvips implementation of "attention" and "entropy" crop strategies.
  [#727](https://github.com/lovell/sharp/issues/727)

* Improve performance and accuracy of nearest neighbour integral upsampling.
  [#752](https://github.com/lovell/sharp/issues/752)
  [@MrIbby](https://github.com/MrIbby)

* Constructor single argument API: allow plain object, reject null/undefined.
  [#768](https://github.com/lovell/sharp/issues/768)
  [@kub1x](https://github.com/kub1x)

* Ensure ARM64 pre-built binaries use correct C++11 ABI version.
  [#772](https://github.com/lovell/sharp/issues/772)
  [@ajiratech2](https://github.com/ajiratech2)

* Prevent aliasing by using dynamic values for shrink(-on-load).
  [#781](https://github.com/lovell/sharp/issues/781)
  [@kleisauke](https://github.com/kleisauke)

* Expose libvips' "squash" parameter to enable 1-bit TIFF output.
  [#783](https://github.com/lovell/sharp/pull/783)
  [@YvesBos](https://github.com/YvesBos)

* Add support for rotation using any multiple of +/-90 degrees.
  [#791](https://github.com/lovell/sharp/pull/791)
  [@ncoden](https://github.com/ncoden)

* Add "jpg" alias to toFormat as shortened form of "jpeg".
  [#814](https://github.com/lovell/sharp/pull/814)
  [@jingsam](https://github.com/jingsam)

### v0.17 - "*quill*"

Requires libvips v8.4.2.

#### v0.17.3 - 1<sup>st</sup> April 2017

* Allow toBuffer to optionally resolve a Promise with both info and data.
  [#143](https://github.com/lovell/sharp/issues/143)
  [@salzhrani](https://github.com/salzhrani)

* Create blank image of given width, height, channels and background.
  [#470](https://github.com/lovell/sharp/issues/470)
  [@pjarts](https://github.com/pjarts)

* Add support for the "nearest" kernel for image reductions.
  [#732](https://github.com/lovell/sharp/pull/732)
  [@alice0meta](https://github.com/alice0meta)

* Add support for TIFF compression and predictor options.
  [#738](https://github.com/lovell/sharp/pull/738)
  [@kristojorg](https://github.com/kristojorg)

#### v0.17.2 - 11<sup>th</sup> February 2017

* Ensure Readable side of Stream can start flowing after Writable side has finished.
  [#671](https://github.com/lovell/sharp/issues/671)
  [@danhaller](https://github.com/danhaller)

* Expose WebP alpha quality, lossless and near-lossless output options.
  [#685](https://github.com/lovell/sharp/pull/685)
  [@rnanwani](https://github.com/rnanwani)

#### v0.17.1 - 15<sup>th</sup> January 2017

* Improve error messages for invalid parameters.
  [@spikeon](https://github.com/spikeon)
  [#644](https://github.com/lovell/sharp/pull/644)

* Simplify expression for finding vips-cpp libdir.
  [#656](https://github.com/lovell/sharp/pull/656)

* Allow HTTPS-over-HTTP proxy when downloading pre-compiled dependencies.
  [@wangzhiwei1888](https://github.com/wangzhiwei1888)
  [#679](https://github.com/lovell/sharp/issues/679)

#### v0.17.0 - 11<sup>th</sup> December 2016

* Drop support for versions of Node prior to v4.

* Deprecate the following output format "option" functions:
    quality, progressive, compressionLevel, withoutAdaptiveFiltering,
    withoutChromaSubsampling, trellisQuantisation, trellisQuantization,
    overshootDeringing, optimiseScans and optimizeScans.
  Access to these is now via output format functions, for example `quality(n)`
    is now `jpeg({quality: n})` and/or `webp({quality: n})`.

* Autoconvert GIF and SVG input to PNG output if no other format is specified.

* Expose libvips' "centre" resize option to mimic \*magick's +0.5px convention.
  [#568](https://github.com/lovell/sharp/issues/568)

* Ensure support for embedded base64 PNG and JPEG images within an SVG.
  [#601](https://github.com/lovell/sharp/issues/601)
  [@dynamite-ready](https://github.com/dynamite-ready)

* Ensure premultiply operation occurs before box filter shrink.
  [#605](https://github.com/lovell/sharp/issues/605)
  [@CmdrShepardsPie](https://github.com/CmdrShepardsPie)
  [@teroparvinen](https://github.com/teroparvinen)

* Add support for PNG and WebP tile-based output formats (in addition to JPEG).
  [#622](https://github.com/lovell/sharp/pull/622)
  [@ppaskaris](https://github.com/ppaskaris)

* Allow use of extend with greyscale input.
  [#623](https://github.com/lovell/sharp/pull/623)
  [@ppaskaris](https://github.com/ppaskaris)

* Allow non-RGB input to embed/extend onto background with an alpha channel.
  [#646](https://github.com/lovell/sharp/issues/646)
  [@DaGaMs](https://github.com/DaGaMs)

### v0.16 - "*pencil*"

Requires libvips v8.3.3

#### v0.16.2 - 22<sup>nd</sup> October 2016

* Restrict readelf usage to Linux only when detecting global libvips version.
  [#602](https://github.com/lovell/sharp/issues/602)
  [@caoko](https://github.com/caoko)

#### v0.16.1 - 13<sup>th</sup> October 2016

* C++11 ABI version is now auto-detected, remove sharp-cxx11 installation flag.

* Add experimental 'attention' crop strategy.
  [#295](https://github.com/lovell/sharp/issues/295)

* Include .node extension for Meteor's require() implementation.
  [#537](https://github.com/lovell/sharp/issues/537)
  [@isjackwild](https://github.com/isjackwild)

* Ensure convolution kernel scale is clamped to a minimum value of 1.
  [#561](https://github.com/lovell/sharp/issues/561)
  [@abagshaw](https://github.com/abagshaw)

* Correct calculation of y-axis placement when overlaying image at a fixed point.
  [#566](https://github.com/lovell/sharp/issues/566)
  [@Nateowami](https://github.com/Nateowami)

#### v0.16.0 - 18<sup>th</sup> August 2016

* Add pre-compiled libvips for OS X, ARMv7 and ARMv8.
  [#312](https://github.com/lovell/sharp/issues/312)

* Ensure boolean, bandbool, extractChannel ops occur before sRGB conversion.
  [#504](https://github.com/lovell/sharp/pull/504)
  [@mhirsch](https://github.com/mhirsch)

* Recalculate factors after WebP shrink-on-load to avoid round-to-zero errors.
  [#508](https://github.com/lovell/sharp/issues/508)
  [@asilvas](https://github.com/asilvas)

* Prevent boolean errors during extract operation.
  [#511](https://github.com/lovell/sharp/pull/511)
  [@mhirsch](https://github.com/mhirsch)

* Add joinChannel and toColourspace/toColorspace operations.
  [#513](https://github.com/lovell/sharp/pull/513)
  [@mhirsch](https://github.com/mhirsch)

* Add support for raw pixel data with boolean and withOverlay operations.
  [#516](https://github.com/lovell/sharp/pull/516)
  [@mhirsch](https://github.com/mhirsch)

* Prevent bandbool creating a single channel sRGB image.
  [#519](https://github.com/lovell/sharp/pull/519)
  [@mhirsch](https://github.com/mhirsch)

* Ensure ICC profiles are removed from PNG output unless withMetadata used.
  [#521](https://github.com/lovell/sharp/issues/521)
  [@ChrisPinewood](https://github.com/ChrisPinewood)

* Add alpha channels, if missing, to overlayWith images.
  [#540](https://github.com/lovell/sharp/pull/540)
  [@cmtt](https://github.com/cmtt)

* Remove deprecated interpolateWith method - use resize(w, h, { interpolator: ... })
  [#310](https://github.com/lovell/sharp/issues/310)

### v0.15 - "*outfit*"

Requires libvips v8.3.1

#### v0.15.1 - 12<sup>th</sup> July 2016

* Concat Stream-based input in single operation for ~+3% perf and less GC.
  [#429](https://github.com/lovell/sharp/issues/429)
  [@papandreou](https://github.com/papandreou)

* Add alpha channel, if required, before extend operation.
  [#439](https://github.com/lovell/sharp/pull/439)
  [@frulo](https://github.com/frulo)

* Allow overlay image to be repeated across entire image via tile option.
  [#443](https://github.com/lovell/sharp/pull/443)
  [@lemnisk8](https://github.com/lemnisk8)

* Add cutout option to overlayWith feature, applies only the alpha channel of the overlay image.
  [#448](https://github.com/lovell/sharp/pull/448)
  [@kleisauke](https://github.com/kleisauke)

* Ensure scaling factors are calculated independently to prevent rounding errors.
  [#452](https://github.com/lovell/sharp/issues/452)
  [@puzrin](https://github.com/puzrin)

* Add --sharp-cxx11 flag to compile with gcc's new C++11 ABI.
  [#456](https://github.com/lovell/sharp/pull/456)
  [@kapouer](https://github.com/kapouer)

* Add top/left offset support to overlayWith operation.
  [#473](https://github.com/lovell/sharp/pull/473)
  [@rnanwani](https://github.com/rnanwani)

* Add convolve operation for kernel-based convolution.
  [#479](https://github.com/lovell/sharp/pull/479)
  [@mhirsch](https://github.com/mhirsch)

* Add greyscale option to threshold operation for colourspace conversion control.
  [#480](https://github.com/lovell/sharp/pull/480)
  [@mhirsch](https://github.com/mhirsch)

* Ensure ICC profiles are licenced for distribution.
  [#486](https://github.com/lovell/sharp/issues/486)
  [@kapouer](https://github.com/kapouer)

* Allow images with an alpha channel to work with LAB-colourspace based sharpen.
  [#490](https://github.com/lovell/sharp/issues/490)
  [@jwagner](https://github.com/jwagner)

* Add trim operation to remove "boring" edges.
  [#492](https://github.com/lovell/sharp/pull/492)
  [@kleisauke](https://github.com/kleisauke)

* Add bandbool feature for channel-wise boolean operations.
  [#496](https://github.com/lovell/sharp/pull/496)
  [@mhirsch](https://github.com/mhirsch)

* Add extractChannel operation to extract a channel from an image.
  [#497](https://github.com/lovell/sharp/pull/497)
  [@mhirsch](https://github.com/mhirsch)

* Add ability to read and write native libvips .v files.
  [#500](https://github.com/lovell/sharp/pull/500)
  [@mhirsch](https://github.com/mhirsch)

* Add boolean feature for bitwise image operations.
  [#501](https://github.com/lovell/sharp/pull/501)
  [@mhirsch](https://github.com/mhirsch)

#### v0.15.0 - 21<sup>st</sup> May 2016

* Use libvips' new Lanczos 3 kernel as default for image reduction.
  Deprecate interpolateWith method, now provided as a resize option.
  [#310](https://github.com/lovell/sharp/issues/310)
  [@jcupitt](https://github.com/jcupitt)

* Take advantage of libvips v8.3 features.
  Add support for libvips' new GIF and SVG loaders.
  Pre-built binaries now include giflib and librsvg, exclude *magick.
  Use shrink-on-load for WebP input.
  Break existing sharpen API to accept sigma and improve precision.
  [#369](https://github.com/lovell/sharp/issues/369)

* Remove unnecessary (un)premultiply operations when not resizing/compositing.
  [#413](https://github.com/lovell/sharp/issues/413)
  [@jardakotesovec](https://github.com/jardakotesovec)

### v0.14 - "*needle*"

Requires libvips v8.2.3

#### v0.14.1 - 16<sup>th</sup> April 2016

* Allow removal of limitation on input pixel count via limitInputPixels. Use with care.
  [#250](https://github.com/lovell/sharp/issues/250)
  [#316](https://github.com/lovell/sharp/pull/316)
  [@anandthakker](https://github.com/anandthakker)
  [@kentongray](https://github.com/kentongray)

* Use final output image for metadata passed to callback.
  [#399](https://github.com/lovell/sharp/pull/399)
  [@salzhrani](https://github.com/salzhrani)

* Add support for writing tiled images to a zip container.
  [#402](https://github.com/lovell/sharp/pull/402)
  [@felixbuenemann](https://github.com/felixbuenemann)

* Allow use of embed with 1 and 2 channel images.
  [#411](https://github.com/lovell/sharp/issues/411)
  [@janaz](https://github.com/janaz)

* Improve Electron compatibility by allowing node-gyp rebuilds without npm.
  [#412](https://github.com/lovell/sharp/issues/412)
  [@nouh](https://github.com/nouh)

#### v0.14.0 - 2<sup>nd</sup> April 2016

* Add ability to extend (pad) the edges of an image.
  [#128](https://github.com/lovell/sharp/issues/128)
  [@blowsie](https://github.com/blowsie)

* Add support for Zoomify and Google tile layouts. Breaks existing tile API.
  [#223](https://github.com/lovell/sharp/issues/223)
  [@bdunnette](https://github.com/bdunnette)

* Improvements to overlayWith: differing sizes/formats, gravity, buffer input.
  [#239](https://github.com/lovell/sharp/issues/239)
  [@chrisriley](https://github.com/chrisriley)

* Add entropy-based crop strategy to remove least interesting edges.
  [#295](https://github.com/lovell/sharp/issues/295)
  [@rightaway](https://github.com/rightaway)

* Expose density metadata; set density of images from vector input.
  [#338](https://github.com/lovell/sharp/issues/338)
  [@lookfirst](https://github.com/lookfirst)

* Emit post-processing 'info' event for Stream output.
  [#367](https://github.com/lovell/sharp/issues/367)
  [@salzhrani](https://github.com/salzhrani)

* Ensure output image EXIF Orientation values are within 1-8 range.
  [#385](https://github.com/lovell/sharp/pull/385)
  [@jtobinisaniceguy](https://github.com/jtobinisaniceguy)

* Ensure ratios are not swapped when rotating 90/270 and ignoring aspect.
  [#387](https://github.com/lovell/sharp/issues/387)
  [@kleisauke](https://github.com/kleisauke)

* Remove deprecated style of calling extract API. Breaks calls using positional arguments.
  [#276](https://github.com/lovell/sharp/issues/276)

### v0.13 - "*mind*"

Requires libvips v8.2.2

#### v0.13.1 - 27<sup>th</sup> February 2016

* Fix embedding onto transparent backgrounds; regression introduced in v0.13.0.
  [#366](https://github.com/lovell/sharp/issues/366)
  [@diegocsandrim](https://github.com/diegocsandrim)

#### v0.13.0 - 15<sup>th</sup> February 2016

* Improve vector image support by allowing control of density/DPI.
  Switch pre-built libs from Imagemagick to Graphicsmagick.
  [#110](https://github.com/lovell/sharp/issues/110)
  [@bradisbell](https://github.com/bradisbell)

* Add support for raw, uncompressed pixel Buffer/Stream input.
  [#220](https://github.com/lovell/sharp/issues/220)
  [@mikemorris](https://github.com/mikemorris)

* Switch from libvips' C to C++ bindings, requires upgrade to v8.2.2.
  [#299](https://github.com/lovell/sharp/issues/299)

* Control number of open files in libvips' cache; breaks existing `cache` behaviour.
  [#315](https://github.com/lovell/sharp/issues/315)
  [@impomezia](https://github.com/impomezia)

* Ensure 16-bit input images can be normalised and embedded onto transparent backgrounds.
  [#339](https://github.com/lovell/sharp/issues/339)
  [#340](https://github.com/lovell/sharp/issues/340)
  [@janaz](https://github.com/janaz)

* Ensure selected format takes precedence over any unknown output filename extension.
  [#344](https://github.com/lovell/sharp/issues/344)
  [@ubaltaci](https://github.com/ubaltaci)

* Add support for libvips' PBM, PGM, PPM and FITS image format loaders.
  [#347](https://github.com/lovell/sharp/issues/347)
  [@oaleynik](https://github.com/oaleynik)

* Ensure default crop gravity is center/centre.
  [#351](https://github.com/lovell/sharp/pull/351)
  [@joelmukuthu](https://github.com/joelmukuthu)

* Improve support for musl libc systems e.g. Alpine Linux.
  [#354](https://github.com/lovell/sharp/issues/354)
  [#359](https://github.com/lovell/sharp/pull/359)
  [@download13](https://github.com/download13)
  [@wjordan](https://github.com/wjordan)

* Small optimisation when reducing by an integral factor to favour shrink over affine.

* Add support for gamma correction of images with an alpha channel.

### v0.12 - "*look*"

Requires libvips v8.2.0

#### v0.12.2 - 16<sup>th</sup> January 2016

* Upgrade libvips to v8.2.0 for improved vips_shrink.

* Add pre-compiled libvips for ARMv6+ CPUs.

* Ensure 16-bit input images work with embed option.
  [#325](https://github.com/lovell/sharp/issues/325)
  [@janaz](https://github.com/janaz)

* Allow compilation with gmake to provide FreeBSD support.
  [#326](https://github.com/lovell/sharp/issues/326)
  [@c0decafe](https://github.com/c0decafe)

* Attempt to remove temporary file after installation.
  [#331](https://github.com/lovell/sharp/issues/331)
  [@dtoubelis](https://github.com/dtoubelis)

#### v0.12.1 - 12<sup>th</sup> December 2015

* Allow use of SIMD vector instructions (via liborc) to be toggled on/off.
  [#172](https://github.com/lovell/sharp/issues/172)
  [@bkw](https://github.com/bkw)
  [@puzrin](https://github.com/puzrin)

* Ensure embedded ICC profiles output with perceptual intent.
  [#321](https://github.com/lovell/sharp/issues/321)
  [@vlapo](https://github.com/vlapo)

* Use the NPM-configured HTTPS proxy, if any, for binary downloads.

#### v0.12.0 - 23<sup>rd</sup> November 2015

* Bundle pre-compiled libvips and its dependencies for 64-bit Linux and Windows.
  [#42](https://github.com/lovell/sharp/issues/42)

* Take advantage of libvips v8.1.0+ features.
  [#152](https://github.com/lovell/sharp/issues/152)

* Add support for 64-bit Windows. Drop support for 32-bit Windows.
  [#224](https://github.com/lovell/sharp/issues/224)
  [@sabrehagen](https://github.com/sabrehagen)

* Switch default interpolator to bicubic.
  [#289](https://github.com/lovell/sharp/issues/289)
  [@mahnunchik](https://github.com/mahnunchik)

* Pre-extract rotatation should not swap width/height.
  [#296](https://github.com/lovell/sharp/issues/296)
  [@asilvas](https://github.com/asilvas)

* Ensure 16-bit+alpha input images are (un)premultiplied correctly.
  [#301](https://github.com/lovell/sharp/issues/301)
  [@izaakschroeder](https://github.com/izaakschroeder)

* Add `threshold` operation.
  [#303](https://github.com/lovell/sharp/pull/303)
  [@dacarley](https://github.com/dacarley)

* Add `negate` operation.
  [#306](https://github.com/lovell/sharp/pull/306)
  [@dacarley](https://github.com/dacarley)

* Support `options` Object with existing `extract` operation.
  [#309](https://github.com/lovell/sharp/pull/309)
  [@papandreou](https://github.com/papandreou)

### v0.11 - "*knife*"

#### v0.11.4 - 5<sup>th</sup> November 2015

* Add corners, e.g. `northeast`, to existing `gravity` option.
  [#291](https://github.com/lovell/sharp/pull/291)
  [@brandonaaron](https://github.com/brandonaaron)

* Ensure correct auto-rotation for EXIF Orientation values 2 and 4.
  [#288](https://github.com/lovell/sharp/pull/288)
  [@brandonaaron](https://github.com/brandonaaron)

* Make static linking possible via `--runtime_link` install option.
  [#287](https://github.com/lovell/sharp/pull/287)
  [@vlapo](https://github.com/vlapo)

#### v0.11.3 - 8<sup>th</sup> September 2015

* Intrepret blurSigma, sharpenFlat, and sharpenJagged as double precision.
  [#263](https://github.com/lovell/sharp/pull/263)
  [@chrisriley](https://github.com/chrisriley)

#### v0.11.2 - 28<sup>th</sup> August 2015

* Allow crop gravity to be provided as a String.
  [#255](https://github.com/lovell/sharp/pull/255)
  [@papandreou](https://github.com/papandreou)
* Add support for io.js v3 and Node v4.
  [#246](https://github.com/lovell/sharp/issues/246)

#### v0.11.1 - 12<sup>th</sup> August 2015

* Silence MSVC warning: "C4530: C++ exception handler used, but unwind semantics are not enabled".
  [#244](https://github.com/lovell/sharp/pull/244)
  [@TheThing](https://github.com/TheThing)

* Suppress gamma correction for input image with alpha transparency.
  [#249](https://github.com/lovell/sharp/issues/249)
  [@compeak](https://github.com/compeak)

#### v0.11.0 - 15<sup>th</sup> July 2015

* Allow alpha transparency compositing via new `overlayWith` method.
  [#97](https://github.com/lovell/sharp/issues/97)
  [@gasi](https://github.com/gasi)

* Expose raw ICC profile data as a Buffer when using `metadata`.
  [#129](https://github.com/lovell/sharp/issues/129)
  [@homerjam](https://github.com/homerjam)

* Allow image header updates via a parameter passed to existing `withMetadata` method.
  Provide initial support for EXIF `Orientation` tag,
  which if present is now removed when using `rotate`, `flip` or `flop`.
  [#189](https://github.com/lovell/sharp/issues/189)
  [@h2non](https://github.com/h2non)

* Tighten constructor parameter checks.
  [#221](https://github.com/lovell/sharp/issues/221)
  [@mikemorris](https://github.com/mikemorris)

* Allow one input Stream to be shared with two or more output Streams via new `clone` method.
  [#235](https://github.com/lovell/sharp/issues/235)
  [@jaubourg](https://github.com/jaubourg)

* Use `round` instead of `floor` when auto-scaling dimensions to avoid floating-point rounding errors.
  [#238](https://github.com/lovell/sharp/issues/238)
  [@richardadjogah](https://github.com/richardadjogah)

### v0.10 - "*judgment*"

#### v0.10.1 - 1<sup>st</sup> June 2015

* Allow embed of image with alpha transparency onto non-transparent background.
  [#204](https://github.com/lovell/sharp/issues/204)
  [@mikemliu](https://github.com/mikemliu)

* Include C standard library for `atoi` as Xcode 6.3 appears to no longer do this.
  [#228](https://github.com/lovell/sharp/issues/228)
  [@doggan](https://github.com/doggan)

#### v0.10.0 - 23<sup>rd</sup> April 2015

* Add support for Windows (x86).
  [#19](https://github.com/lovell/sharp/issues/19)
  [@DullReferenceException](https://github.com/DullReferenceException)
  [@itsananderson](https://github.com/itsananderson)

* Add support for Openslide input and DeepZoom output.
  [#146](https://github.com/lovell/sharp/issues/146)
  [@mvictoras](https://github.com/mvictoras)

* Allow arbitrary aspect ratios when resizing images via new `ignoreAspectRatio` method.
  [#192](https://github.com/lovell/sharp/issues/192)
  [@skedastik](https://github.com/skedastik)

* Enhance output image contrast by stretching its luminance to cover the full dynamic range via new `normalize` method.
  [#194](https://github.com/lovell/sharp/issues/194)
  [@bkw](https://github.com/bkw)
  [@codingforce](https://github.com/codingforce)
