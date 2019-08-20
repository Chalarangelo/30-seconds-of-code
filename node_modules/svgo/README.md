**english** | [русский](https://github.com/svg/svgo/blob/master/README.ru.md)
- - -

<img src="https://svg.github.io/svgo-logo.svg" width="200" height="200" alt="logo"/>

## SVGO [![NPM version](https://badge.fury.io/js/svgo.svg)](https://npmjs.org/package/svgo) [![Build Status](https://secure.travis-ci.org/svg/svgo.svg)](https://travis-ci.org/svg/svgo) [![Coverage Status](https://img.shields.io/coveralls/svg/svgo.svg)](https://coveralls.io/r/svg/svgo?branch=master)

**SVG O**ptimizer is a Nodejs-based tool for optimizing SVG vector graphics files.
![](https://mc.yandex.ru/watch/18431326)

## Why?

SVG files, especially those exported from various editors, usually contain a lot of redundant and useless information. This can include editor metadata, comments, hidden elements, default or non-optimal values and other stuff that can be safely removed or converted without affecting the SVG rendering result.

## What it can do

SVGO has a plugin-based architecture, so almost every optimization is a separate plugin.

Today we have:

| Plugin | Description |
| ------ | ----------- |
| [cleanupAttrs](https://github.com/svg/svgo/blob/master/plugins/cleanupAttrs.js) | cleanup attributes from newlines, trailing, and repeating spaces |
| [inlineStyles](https://github.com/svg/svgo/blob/master/plugins/inlineStyles.js) | move and merge styles from `<style>` elements to element `style` attributes |
| [removeDoctype](https://github.com/svg/svgo/blob/master/plugins/removeDoctype.js) | remove doctype declaration |
| [removeXMLProcInst](https://github.com/svg/svgo/blob/master/plugins/removeXMLProcInst.js) | remove XML processing instructions |
| [removeComments](https://github.com/svg/svgo/blob/master/plugins/removeComments.js) | remove comments |
| [removeMetadata](https://github.com/svg/svgo/blob/master/plugins/removeMetadata.js) | remove `<metadata>` |
| [removeTitle](https://github.com/svg/svgo/blob/master/plugins/removeTitle.js) | remove `<title>` |
| [removeDesc](https://github.com/svg/svgo/blob/master/plugins/removeDesc.js) | remove `<desc>` |
| [removeUselessDefs](https://github.com/svg/svgo/blob/master/plugins/removeUselessDefs.js) | remove elements of `<defs>` without `id` |
| [removeXMLNS](https://github.com/svg/svgo/blob/master/plugins/removeXMLNS.js) | removes `xmlns` attribute (for inline svg, disabled by default) |
| [removeEditorsNSData](https://github.com/svg/svgo/blob/master/plugins/removeEditorsNSData.js) | remove editors namespaces, elements, and attributes |
| [removeEmptyAttrs](https://github.com/svg/svgo/blob/master/plugins/removeEmptyAttrs.js) | remove empty attributes |
| [removeHiddenElems](https://github.com/svg/svgo/blob/master/plugins/removeHiddenElems.js) | remove hidden elements |
| [removeEmptyText](https://github.com/svg/svgo/blob/master/plugins/removeEmptyText.js) | remove empty Text elements |
| [removeEmptyContainers](https://github.com/svg/svgo/blob/master/plugins/removeEmptyContainers.js) | remove empty Container elements |
| [removeViewBox](https://github.com/svg/svgo/blob/master/plugins/removeViewBox.js) | remove `viewBox` attribute when possible |
| [cleanupEnableBackground](https://github.com/svg/svgo/blob/master/plugins/cleanupEnableBackground.js) | remove or cleanup `enable-background` attribute when possible |
| [minifyStyles](https://github.com/svg/svgo/blob/master/plugins/minifyStyles.js) | minify `<style>` elements content with [CSSO](https://github.com/css/csso) |
| [convertStyleToAttrs](https://github.com/svg/svgo/blob/master/plugins/convertStyleToAttrs.js) | convert styles into attributes |
| [convertColors](https://github.com/svg/svgo/blob/master/plugins/convertColors.js) | convert colors (from `rgb()` to `#rrggbb`, from `#rrggbb` to `#rgb`) |
| [convertPathData](https://github.com/svg/svgo/blob/master/plugins/convertPathData.js) | convert Path data to relative or absolute (whichever is shorter), convert one segment to another, trim useless delimiters, smart rounding, and much more |
| [convertTransform](https://github.com/svg/svgo/blob/master/plugins/convertTransform.js) | collapse multiple transforms into one, convert matrices to the short aliases, and much more |
| [removeUnknownsAndDefaults](https://github.com/svg/svgo/blob/master/plugins/removeUnknownsAndDefaults.js) | remove unknown elements content and attributes, remove attrs with default values |
| [removeNonInheritableGroupAttrs](https://github.com/svg/svgo/blob/master/plugins/removeNonInheritableGroupAttrs.js) | remove non-inheritable group's "presentation" attributes |
| [removeUselessStrokeAndFill](https://github.com/svg/svgo/blob/master/plugins/removeUselessStrokeAndFill.js) | remove useless `stroke` and `fill` attrs |
| [removeUnusedNS](https://github.com/svg/svgo/blob/master/plugins/removeUnusedNS.js) | remove unused namespaces declaration |
| [prefixIds](https://github.com/svg/svgo/blob/master/plugins/prefixIds.js) | prefix IDs and classes with the SVG filename or an arbitrary string |
| [cleanupIDs](https://github.com/svg/svgo/blob/master/plugins/cleanupIDs.js) | remove unused and minify used IDs |
| [cleanupNumericValues](https://github.com/svg/svgo/blob/master/plugins/cleanupNumericValues.js) | round numeric values to the fixed precision, remove default `px` units |
| [cleanupListOfValues](https://github.com/svg/svgo/blob/master/plugins/cleanupListOfValues.js) | round numeric values in attributes that take a list of numbers (like `viewBox` or `enable-background`) |
| [moveElemsAttrsToGroup](https://github.com/svg/svgo/blob/master/plugins/moveElemsAttrsToGroup.js) | move elements' attributes to their enclosing group |
| [moveGroupAttrsToElems](https://github.com/svg/svgo/blob/master/plugins/moveGroupAttrsToElems.js) | move some group attributes to the contained elements |
| [collapseGroups](https://github.com/svg/svgo/blob/master/plugins/collapseGroups.js) | collapse useless groups |
| [removeRasterImages](https://github.com/svg/svgo/blob/master/plugins/removeRasterImages.js) | remove raster images (disabled by default) |
| [mergePaths](https://github.com/svg/svgo/blob/master/plugins/mergePaths.js) | merge multiple Paths into one |
| [convertShapeToPath](https://github.com/svg/svgo/blob/master/plugins/convertShapeToPath.js) | convert some basic shapes to `<path>` |
| [convertEllipseToCircle](https://github.com/svg/svgo/blob/master/plugins/convertEllipseToCircle.js) | convert non-eccentric `<ellipse>` to `<circle>` |
| [sortAttrs](https://github.com/svg/svgo/blob/master/plugins/sortAttrs.js) | sort element attributes for epic readability (disabled by default) |
| [sortDefsChildren](https://github.com/svg/svgo/blob/master/plugins/sortDefsChildren.js) | sort children of `<defs>` in order to improve compression |
| [removeDimensions](https://github.com/svg/svgo/blob/master/plugins/removeDimensions.js) | remove `width`/`height` and add `viewBox` if it's missing (opposite to removeViewBox, disable it first) (disabled by default) |
| [removeAttrs](https://github.com/svg/svgo/blob/master/plugins/removeAttrs.js) | remove attributes by pattern (disabled by default) |
| [removeAttributesBySelector](https://github.com/svg/svgo/blob/master/plugins/removeAttributesBySelector.js) | removes attributes of elements that match a css selector (disabled by default) |
| [removeElementsByAttr](https://github.com/svg/svgo/blob/master/plugins/removeElementsByAttr.js) | remove arbitrary elements by ID or className (disabled by default) |
| [addClassesToSVGElement](https://github.com/svg/svgo/blob/master/plugins/addClassesToSVGElement.js) | add classnames to an outer `<svg>` element (disabled by default) |
| [addAttributesToSVGElement](https://github.com/svg/svgo/blob/master/plugins/addAttributesToSVGElement.js) | adds attributes to an outer `<svg>` element (disabled by default) |
| [removeOffCanvasPaths](https://github.com/svg/svgo/blob/master/plugins/removeOffCanvasPaths.js) | removes elements that are drawn outside of the viewbox (disabled by default) |
| [removeStyleElement](https://github.com/svg/svgo/blob/master/plugins/removeStyleElement.js) | remove `<style>` elements (disabled by default) |
| [removeScriptElement](https://github.com/svg/svgo/blob/master/plugins/removeScriptElement.js) | remove `<script>` elements (disabled by default) |
| [reusePaths](https://github.com/svg/svgo/blob/master/plugins/reusePaths.js) | Find duplicated <path> elements and replace them with <use> links (disabled by default) |

Want to know how it works and how to write your own plugin? [Of course you want to](https://github.com/svg/svgo/blob/master/docs/how-it-works/en.md). ([동작방법](https://github.com/svg/svgo/blob/master/docs/how-it-works/ko.md))


## Installation

```sh
$ [sudo] npm install -g svgo
```

## Usage

### <abbr title="Command Line Interface">CLI</abbr>

```
Usage:
  svgo [OPTIONS] [ARGS]

Options:
  -h, --help : Help
  -v, --version : Version
  -i INPUT, --input=INPUT : Input file, "-" for STDIN
  -s STRING, --string=STRING : Input SVG data string
  -f FOLDER, --folder=FOLDER : Input folder, optimize and rewrite all *.svg files
  -o OUTPUT, --output=OUTPUT : Output file or folder (by default the same as the input), "-" for STDOUT
  -p PRECISION, --precision=PRECISION : Set number of digits in the fractional part, overrides plugins params
  --config=CONFIG : Config file or JSON string to extend or replace default
  --disable=PLUGIN : Disable plugin by name, "--disable=PLUGIN1,PLUGIN2" for multiple plugins
  --enable=PLUGIN : Enable plugin by name, "--enable=PLUGIN3,PLUGIN4" for multiple plugins
  --datauri=DATAURI : Output as Data URI string (base64, URI encoded or unencoded)
  --multipass : Pass over SVGs multiple times to ensure all optimizations are applied
  --pretty : Make SVG pretty printed
  --indent=INDENT : Indent number when pretty printing SVGs
  -r, --recursive : Use with '-f'. Optimizes *.svg files in folders recursively.
  -q, --quiet : Only output error messages, not regular status messages
  --show-plugins : Show available plugins and exit

Arguments:
  INPUT : Alias to --input
```

* with files:

    ```sh
    $ svgo test.svg
    ```

    or:

    ```sh
    $ svgo *.svg
    ```

    ```sh
    $ svgo test.svg -o test.min.svg
    ```

    ```sh
    $ svgo test.svg other.svg third.svg
    ```

    ```sh
    $ svgo test.svg other.svg third.svg -o test.min.svg -o other.min.svg -o third.min.svg
    ```

* with STDIN / STDOUT:

    ```sh
    $ cat test.svg | svgo -i - -o - > test.min.svg
    ```

* with folder

    ```sh
    $ svgo -f ../path/to/folder/with/svg/files
    ```

    or:

    ```sh
    $ svgo -f ../path/to/folder/with/svg/files -o ../path/to/folder/with/svg/output
    ```

    ```sh
    $ svgo *.svg -o ../path/to/folder/with/svg/output
    ```

* with strings:

    ```sh
    $ svgo -s '<svg version="1.1">test</svg>' -o test.min.svg
    ```

    or even with Data URI base64:

    ```sh
    $ svgo -s 'data:image/svg+xml;base64,...' -o test.min.svg
    ```

* with SVGZ:

    from `.svgz` to `.svg`:

    ```sh
    $ gunzip -c test.svgz | svgo -i - -o test.min.svg
    ```

    from `.svg` to `.svgz`:

    ```sh
    $ svgo test.svg -o - | gzip -cfq9 > test.svgz
    ```

### Other Ways to Use SVGO

* as a web app – [SVGOMG](https://jakearchibald.github.io/svgomg/)
* as a Nodejs module – [examples](https://github.com/svg/svgo/tree/master/examples)
* as a Grunt task – [grunt-svgmin](https://github.com/sindresorhus/grunt-svgmin)
* as a Gulp task – [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)
* as a Mimosa module – [mimosa-minify-svg](https://github.com/dbashford/mimosa-minify-svg)
* as an OSX Folder Action – [svgo-osx-folder-action](https://github.com/svg/svgo-osx-folder-action)
* as a webpack loader – [image-webpack-loader](https://github.com/tcoopman/image-webpack-loader)
* as a Telegram Bot – [svgo_bot](https://github.com/maksugr/svgo_bot)
* as a PostCSS plugin – [postcss-svgo](https://github.com/ben-eb/postcss-svgo)
* as an Inkscape plugin – [inkscape-svgo](https://github.com/konsumer/inkscape-svgo)
* as a Sketch plugin - [svgo-compressor](https://github.com/BohemianCoding/svgo-compressor)
* as macOS app - [Image Shrinker](https://image-shrinker.com)
* as a Rollup plugin - [rollup-plugin-svgo](https://github.com/porsager/rollup-plugin-svgo)

## Backers

| [<img src="https://sheetjs.com/sketch128.png" width="80">](https://sheetjs.com/) | [<img src="https://rawgithub.com/fontello/fontello/master/fontello-image.svg" width="80">](http://fontello.com/) |
|:-:|:-:|
| [SheetJS LLC](https://sheetjs.com/) | [Fontello](http://fontello.com/) |

## Donations

- PayPal: https://www.paypal.me/deepsweet

## License and Copyright

This software is released under the terms of the [MIT license](https://github.com/svg/svgo/blob/master/LICENSE).

Logo by [Yegor Bolshakov](http://xizzzy.ru/).
