# gatsby-plugin-sharp

Exposes several image processing functions built on the
[Sharp image processing library](https://github.com/lovell/sharp). This is a
low-level helper plugin generally used by other Gatsby plugins. You generally
shouldn't be using this directly but might find it helpful if doing very custom
image processing.

It aims to provide excellent out-of-the box settings for processing common web
image formats.

For JPEGs it generates progressive images with a default quality level of 50.

For PNGs it uses [pngquant](https://github.com/pornel/pngquant) to compress
images. By default it uses a quality setting of [50-75]. The `pngCompressionSpeed`
value is a speed/quality trade-off from 1 (brute-force) to 10 (fastest). Speed
10 has 5% lower quality, but is 8 times faster than the default (4). In most
cases you should stick with the default, but if you have very large numbers
of PNGs then it can significantly reduce build times.

## Install

`npm install --save gatsby-plugin-sharp`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      useMozJpeg: false,
      stripMetadata: true,
      defaultQuality: 75,
    },
  },
]
```

## Methods

### resize

#### Parameters

- `width` (int, default: 400)
- `height` (int)
- `quality` (int, default: 50)
- `jpegProgressive` (bool, default: true)
- `pngCompressionLevel` (int, default: 9)
- `base64`(bool, default: false)

#### Returns

- `src` (string)
- `width` (int)
- `height` (int)
- `aspectRatio` (float)

### fixed

Automatically create sizes for different resolutions — we do 1x, 1.5x, and 2x.

#### Parameters

- `width` (int, default: 400)
- `height` (int)
- `quality` (int, default: 50)

#### Returns

- `base64` (string)
- `aspectRatio` (float)
- `width` (float)
- `height` (float)
- `src` (string)
- `srcSet` (string)

### fluid

Create fluid sizes (in width) for the image. If the max width of the container for the
rendered markdown file is 800px, the sizes would then be: 200px, 400px, 800px, 1200px,
1600px – enough to provide close to the optimal image size for every device
size / screen resolution.

If you want more control over which sizes are output you can use the `srcSetBreakpoints`
parameter. For example, if you want images that are 200, 340, 520, and 890 wide you
can add `srcSetBreakpoints: [ 200, 340, 520, 890 ]` as a parameter. You will also get
`maxWidth` as a breakpoint (which is 800 by default), so you will actually get
`[ 200, 340, 520, 800, 890 ]` as breakpoints.

On top of that, `fluid` returns everything else (namely aspectRatio and
a base64 image to use as a placeholder) you need to implement the "blur up"
technique popularized by Medium and Facebook (and also available as a Gatsby
plugin for Markdown content as gatsby-remark-images).

When both a `maxWidth` and `maxHeight` are provided, sharp will use `COVER` as a fit strategy by default. This might not be ideal so you can now choose between `COVER`, `CONTAIN` and `FILL` as a fit strategy. To see them in action the [CSS property object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) comes close to its implementation.

#### Note

fit strategies `CONTAIN` and `FILL` will not work when `cropFocus` is assigned to [sharp.strategy][6]. The `cropFocus` option cannot be `ENTROPY` or `ATTENTION`

#### Parameters

- `maxWidth` (int, default: 800)
- `maxHeight` (int)
- `quality` (int, default: 50)
- `srcSetBreakpoints` (array of int, default: [])
- `fit` (string, default: '[sharp.fit.cover][6]')
- `background` (string, default: 'rgba(0,0,0,1)')
- [deprecated] `sizeByPixelDensity` (bool, default: false)
  - Pixel density is only used in vector images, which Gatsby’s implementation of Sharp doesn’t support. This option is currently a no-op and will be removed in the next major version of Gatsby.

#### Returns

- `base64` (string)
- `aspectRatio` (float)
- `src` (string)
- `srcSet` (string)
- `srcSetType` (string)
- `sizes` (string)
- `originalImg` (string)

### Shared Options

In addition to their individual parameters, all methods above share the
following:

- `grayscale` (bool, default: false)
- `duotone` (bool|obj, default: false)
- `toFormat` (string, default: '')
- `cropFocus` (string, default: '[sharp.strategy.attention][6]')
- `pngCompressionSpeed` (int, default: 4)

#### toFormat

Convert the source image to one of the following available options: `NO_CHANGE`,
`JPG`, `PNG`, `WEBP`.

#### cropFocus

Change the cropping focus. Available options: `CENTER`, `NORTH`, `NORTHEAST`,
`EAST`, `SOUTHEAST`, `SOUTH`, `SOUTHWEST`, `WEST`, `NORTHWEST`, `ENTROPY`,
`ATTENTION`. See Sharp's [crop][6].

#### rotate

Rotate the image (after cropping). See Sharp's [rotate][7].

#### grayscale

Uses Sharp's [greyscale][8] to convert the source image to 8-bit greyscale, 256
shades of grey, e.g.

```javascript
allImageSharp {
  edges {
    node {
      ... on ImageSharp {
        resize(width: 150, height: 150, grayscale: true) {
          src
        }
      }
    }
  }
}
```

#### duotone

Applys a "duotone" effect (see [I][1], [II][2], [III][3]) to the source image if
given two hex colors `shadow` and `highlight` defining start and end color of
the duotone gradient, e.g.

```javascript
fixed(
  width: 800,
  duotone: {
    highlight: "#f00e2e",
    shadow: "#192550"
  }
) {
  src
  srcSet
  base64
}
```

the source image colors will be converted to match a gradient color chosen based
on each pixel's [relative luminance][4].\
Logic is borrowed from [react-duotone][5].

You can pass a third optional parameter, `opacity`:

```javascript
fluid(
  width: 800,
  duotone: {
    highlight: "#f00e2e",
    shadow: "#192550",
    opacity: 50
  }
) {
  src
  srcSet
  base64
}
```

If set, a semi-transparent version of duotone'd image will be composited over
the original image, allowing the original image and its colors to partially
"shine through". _Heads up_: If the original image contains an alpha channel it
will be [flattened][15] before creating the composite.

This works by adding an alpha channel to the duotone'd image - then we let Sharp
do its magic via
[`overlayWith`](http://sharp.pixelplumbing.com/en/stable/api-composite/#overlaywith);
quoting the Sharp documentation:

> If the overlay image contains an alpha channel then composition with
> <a href="https://en.wikipedia.org/wiki/Alpha_compositing">premultiplication</a>
> will occur.

#### tracedSVG

Generates a traced SVG of the image (see [the original GitHub issue][9]) and
returns the SVG as "[optimized URL-encoded][10]" `data:` URI. It it used in
[gatsby-image](/packages/gatsby-image/) to provide an
alternative to the default inline base64 placeholder image.

Uses [node-potrace][11] and [SVGO][12] under the hood. Default settings for
node-potrace:

```javascript
  {
    color: `lightgray`,
    optTolerance: 0.4,
    turdSize: 100,
    turnPolicy: TURNPOLICY_MAJORITY,
  }
```

All [node-potrace `Potrace` parameters][13] are exposed and can be set via the
`traceSVG` argument:

```javascript
fixed(
  traceSVG: {
    color: "#f00e2e"
    turnPolicy: TURNPOLICY_MINORITY
    blackOnWhite: false
  }
) {
  src
  srcSet
  tracedSVG
}
```

### Setting a default quality

You can pass a default image quality to `sharp` by setting the `defaultQuality` option.

### Using MozJPEG

You can opt-in to use [MozJPEG][16] for jpeg-encoding. MozJPEG provides even
better image compression than the default encoder used in `gatsby-plugin-sharp`.
However, when using MozJPEG the build time of your Gatsby project will increase
significantly.

To enable MozJPEG, you can set the `useMozJpeg` plugin option to `true` in
`gatsby-config.js`.

For backwards compatible reasons, if `useMozJpeg` is not defined in the plugin
options, the [environment variable](/docs/environment-variables/#environment-variables)
`GATSBY_JPEG_ENCODER` acts as a fallback if set to `MOZJPEG`:

```shell
GATSBY_JPEG_ENCODER=MOZJPEG
```

### EXIF and ICC metadata

By default, `gatsby-plugin-sharp` strips all EXIF, ICC and other metadata
present in your source file. This is the recommended default as it leads to
smaller file sizes.

However, in situations where you wish to preserve EXIF metadata or ICC profiles
(example: you are building a photography portfolio and wish to conserve
the color profile or the copyright information of the photos you've exported
from Adobe Lightroom or Phase One's Capture One), you can set the `stripMetadata`
plugin option to `false` in `gatsby-config.js`.

It is important to note that if `stripMetadata` is set to `false`, **all**
metadata information will be preserved from the source image, including but not
limited to the latitude/longitude information of where the picture was taken
(if present). If you wish to strip this information from the source file, you
can either leave `stripMetadata` to its default of `true`, or manually
pre-process your images with a tool such as [ExifTool][17].

## Troubleshooting

### Incompatible library version: sharp.node requires version X or later, but Z provides version Y

This means that there are multiple incompatible versions of the `sharp` package installed in `node_modules`. The complete error typically looks like this:

```
Something went wrong installing the "sharp" module

dlopen(/Users/misiek/dev/gatsby-starter-blog/node_modules/sharp/build/Release/sharp.node, 1): Library not loaded: @rpath/libglib-2.0.dylib
  Referenced from: /Users/misiek/dev/gatsby-starter-blog/node_modules/sharp/build/Release/sharp.node
  Reason: Incompatible library version: sharp.node requires version 6001.0.0 or later, but libglib-2.0.dylib provides version 5801.0.0
```

To fix this, you'll need to update all Gatsby plugins in the current project that depend on the `sharp` package. Here's a list of official plugins that you might need to update in case your projects uses them:

- `gatsby-plugin-sharp`
- `gatsby-plugin-manifest`
- `gatsby-remark-images-contentful`
- `gatsby-source-contentful`
- `gatsby-transformer-sharp`
- `gatsby-transformer-sqip`

To update these packages, run:

```sh
npm install gatsby-plugin-sharp gatsby-plugin-manifest gatsby-remark-images-contentful gatsby-source-contentful gatsby-transformer-sharp gatsby-transformer-sqip
```

If updating these doesn't fix the issue, your project probably uses other plugins from the community that depend on a different version of `sharp`. Try running `npm list sharp` or `yarn why sharp` to see all packages in the current project that use `sharp` and try updating them as well.

[1]: https://alistapart.com/article/finessing-fecolormatrix
[2]: http://blog.72lions.com/blog/2015/7/7/duotone-in-js
[3]: https://ines.io/blog/dynamic-duotone-svg-jade
[4]: https://en.wikipedia.org/wiki/Relative_luminance
[5]: https://github.com/nagelflorian/react-duotone
[6]: http://sharp.pixelplumbing.com/en/stable/api-resize/#crop
[7]: http://sharp.pixelplumbing.com/en/stable/api-operation/#rotate
[8]: http://sharp.pixelplumbing.com/en/stable/api-colour/#greyscale
[9]: https://github.com/gatsbyjs/gatsby/issues/2435
[10]: https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
[11]: https://github.com/tooolbox/node-potrace
[12]: https://github.com/svg/svgo
[13]: https://github.com/tooolbox/node-potrace#parameters
[14]: https://github.com/oliver-moran/jimp
[15]: http://sharp.pixelplumbing.com/en/stable/api-operation/#flatten
[16]: https://github.com/mozilla/mozjpeg
[17]: https://www.sno.phy.queensu.ca/~phil/exiftool/
[18]: https://www.npmjs.com/package/color
