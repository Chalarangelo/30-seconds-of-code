const Promise = require(`bluebird`)
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require(`gatsby/graphql`)
const {
  queueImageResizing,
  base64,
  fluid,
  fixed,
  traceSVG,
} = require(`gatsby-plugin-sharp`)

const sharp = require(`./safe-sharp`)
const fs = require(`fs`)
const fsExtra = require(`fs-extra`)
const imageSize = require(`probe-image-size`)
const path = require(`path`)

const DEFAULT_PNG_COMPRESSION_SPEED = 4

const {
  ImageFormatType,
  ImageCropFocusType,
  DuotoneGradientType,
  PotraceType,
  ImageFitType,
} = require(`./types`)

function toArray(buf) {
  var arr = new Array(buf.length)

  for (var i = 0; i < buf.length; i++) {
    arr[i] = buf[i]
  }

  return arr
}

const getTracedSVG = async ({ file, image, fieldArgs, cache, reporter }) =>
  traceSVG({
    file,
    args: { ...fieldArgs.traceSVG },
    fileArgs: fieldArgs,
    cache,
    reporter,
  })

const fixedNodeType = ({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter,
  name,
  cache,
}) => {
  return {
    type: new GraphQLObjectType({
      name: name,
      fields: {
        base64: { type: GraphQLString },
        tracedSVG: {
          type: GraphQLString,
          resolve: parent =>
            getTracedSVG({
              ...parent,
              cache,
              reporter,
            }),
        },
        aspectRatio: { type: GraphQLFloat },
        width: { type: GraphQLFloat },
        height: { type: GraphQLFloat },
        src: { type: GraphQLString },
        srcSet: { type: GraphQLString },
        srcWebp: {
          type: GraphQLString,
          resolve: ({ file, image, fieldArgs }) => {
            // If the file is already in webp format or should explicitly
            // be converted to webp, we do not create additional webp files
            if (file.extension === `webp` || fieldArgs.toFormat === `webp`) {
              return null
            }
            const args = { ...fieldArgs, pathPrefix, toFormat: `webp` }
            return Promise.resolve(
              fixed({
                file,
                args,
                reporter,
                cache,
              })
            ).then(({ src }) => src)
          },
        },
        srcSetWebp: {
          type: GraphQLString,
          resolve: ({ file, image, fieldArgs }) => {
            if (file.extension === `webp` || fieldArgs.toFormat === `webp`) {
              return null
            }
            const args = { ...fieldArgs, pathPrefix, toFormat: `webp` }
            return Promise.resolve(
              fixed({
                file,
                args,
                reporter,
                cache,
              })
            ).then(({ srcSet }) => srcSet)
          },
        },
        originalName: { type: GraphQLString },
      },
    }),
    args: {
      width: {
        type: GraphQLInt,
      },
      height: {
        type: GraphQLInt,
      },
      base64Width: {
        type: GraphQLInt,
      },
      jpegProgressive: {
        type: GraphQLBoolean,
        defaultValue: true,
      },
      pngCompressionSpeed: {
        type: GraphQLInt,
        defaultValue: DEFAULT_PNG_COMPRESSION_SPEED,
      },
      grayscale: {
        type: GraphQLBoolean,
        defaultValue: false,
      },
      duotone: {
        type: DuotoneGradientType,
        defaultValue: false,
      },
      traceSVG: {
        type: PotraceType,
        defaultValue: false,
      },
      quality: {
        type: GraphQLInt,
      },
      toFormat: {
        type: ImageFormatType,
        defaultValue: ``,
      },
      toFormatBase64: {
        type: ImageFormatType,
        defaultValue: ``,
      },
      cropFocus: {
        type: ImageCropFocusType,
        defaultValue: sharp.strategy.attention,
      },
      fit: {
        type: ImageFitType,
        defaultValue: sharp.fit.cover,
      },
      background: {
        type: GraphQLString,
        defaultValue: `rgba(0,0,0,1)`,
      },
      rotate: {
        type: GraphQLInt,
        defaultValue: 0,
      },
      trim: {
        type: GraphQLFloat,
        defaultValue: false,
      },
    },
    resolve: (image, fieldArgs, context) => {
      const file = getNodeAndSavePathDependency(image.parent, context.path)
      const args = { ...fieldArgs, pathPrefix }
      return Promise.resolve(
        fixed({
          file,
          args,
          reporter,
          cache,
        })
      ).then(o =>
        Object.assign({}, o, {
          fieldArgs: args,
          image,
          file,
        })
      )
    },
  }
}

const fluidNodeType = ({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter,
  name,
  cache,
}) => {
  return {
    type: new GraphQLObjectType({
      name: name,
      fields: {
        base64: { type: GraphQLString },
        tracedSVG: {
          type: GraphQLString,
          resolve: parent =>
            getTracedSVG({
              ...parent,
              cache,
              reporter,
            }),
        },
        aspectRatio: { type: GraphQLFloat },
        src: { type: GraphQLString },
        srcSet: { type: GraphQLString },
        srcWebp: {
          type: GraphQLString,
          resolve: ({ file, image, fieldArgs }) => {
            if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
              return null
            }
            const args = { ...fieldArgs, pathPrefix, toFormat: `webp` }
            return Promise.resolve(
              fluid({
                file,
                args,
                reporter,
                cache,
              })
            ).then(({ src }) => src)
          },
        },
        srcSetWebp: {
          type: GraphQLString,
          resolve: ({ file, image, fieldArgs }) => {
            if (image.extension === `webp` || fieldArgs.toFormat === `webp`) {
              return null
            }
            const args = { ...fieldArgs, pathPrefix, toFormat: `webp` }
            return Promise.resolve(
              fluid({
                file,
                args,
                reporter,
                cache,
              })
            ).then(({ srcSet }) => srcSet)
          },
        },
        sizes: { type: GraphQLString },
        originalImg: { type: GraphQLString },
        originalName: { type: GraphQLString },
        presentationWidth: { type: GraphQLInt },
        presentationHeight: { type: GraphQLInt },
      },
    }),
    args: {
      maxWidth: {
        type: GraphQLInt,
      },
      maxHeight: {
        type: GraphQLInt,
      },
      base64Width: {
        type: GraphQLInt,
      },
      grayscale: {
        type: GraphQLBoolean,
        defaultValue: false,
      },
      jpegProgressive: {
        type: GraphQLBoolean,
        defaultValue: true,
      },
      pngCompressionSpeed: {
        type: GraphQLInt,
        defaultValue: DEFAULT_PNG_COMPRESSION_SPEED,
      },
      duotone: {
        type: DuotoneGradientType,
        defaultValue: false,
      },
      traceSVG: {
        type: PotraceType,
        defaultValue: false,
      },
      quality: {
        type: GraphQLInt,
      },
      toFormat: {
        type: ImageFormatType,
        defaultValue: ``,
      },
      toFormatBase64: {
        type: ImageFormatType,
        defaultValue: ``,
      },
      cropFocus: {
        type: ImageCropFocusType,
        defaultValue: sharp.strategy.attention,
      },
      fit: {
        type: ImageFitType,
        defaultValue: sharp.fit.cover,
      },
      background: {
        type: GraphQLString,
        defaultValue: `rgba(0,0,0,1)`,
      },
      rotate: {
        type: GraphQLInt,
        defaultValue: 0,
      },
      trim: {
        type: GraphQLFloat,
        defaultValue: false,
      },
      sizes: {
        type: GraphQLString,
        defaultValue: ``,
      },
      srcSetBreakpoints: {
        type: GraphQLList(GraphQLInt),
        defaultValue: [],
        description: `A list of image widths to be generated. Example: [ 200, 340, 520, 890 ]`,
      },
    },
    resolve: (image, fieldArgs, context) => {
      const file = getNodeAndSavePathDependency(image.parent, context.path)
      const args = { ...fieldArgs, pathPrefix }
      return Promise.resolve(
        fluid({
          file,
          args,
          reporter,
          cache,
        })
      ).then(o =>
        Object.assign({}, o, {
          fieldArgs: args,
          image,
          file,
        })
      )
    },
  }
}

module.exports = ({
  type,
  pathPrefix,
  getNodeAndSavePathDependency,
  reporter,
  cache,
}) => {
  if (type.name !== `ImageSharp`) {
    return {}
  }

  const nodeOptions = {
    type,
    pathPrefix,
    getNodeAndSavePathDependency,
    reporter,
    cache,
  }

  // TODO: Remove resolutionsNode and sizesNode for Gatsby v3
  const fixedNode = fixedNodeType({ name: `ImageSharpFixed`, ...nodeOptions })
  const resolutionsNode = fixedNodeType({
    name: `ImageSharpResolutions`,
    ...nodeOptions,
  })
  resolutionsNode.deprecationReason = `Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link`

  const fluidNode = fluidNodeType({ name: `ImageSharpFluid`, ...nodeOptions })
  const sizesNode = fluidNodeType({ name: `ImageSharpSizes`, ...nodeOptions })
  sizesNode.deprecationReason = `Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link`

  return {
    fixed: fixedNode,
    resolutions: resolutionsNode,
    fluid: fluidNode,
    sizes: sizesNode,
    original: {
      type: new GraphQLObjectType({
        name: `ImageSharpOriginal`,
        fields: {
          width: { type: GraphQLFloat },
          height: { type: GraphQLFloat },
          src: { type: GraphQLString },
        },
      }),
      args: {},
      async resolve(image, fieldArgs, context) {
        const details = getNodeAndSavePathDependency(image.parent, context.path)
        const dimensions = imageSize.sync(
          toArray(fs.readFileSync(details.absolutePath))
        )
        const imageName = `${details.name}-${image.internal.contentDigest}${
          details.ext
        }`
        const publicPath = path.join(
          process.cwd(),
          `public`,
          `static`,
          imageName
        )

        if (!fsExtra.existsSync(publicPath)) {
          fsExtra.copy(details.absolutePath, publicPath, err => {
            if (err) {
              console.error(
                `error copying file from ${
                  details.absolutePath
                } to ${publicPath}`,
                err
              )
            }
          })
        }

        return {
          width: dimensions.width,
          height: dimensions.height,
          src: `${pathPrefix}/static/${imageName}`,
        }
      },
    },
    resize: {
      type: new GraphQLObjectType({
        name: `ImageSharpResize`,
        fields: {
          src: { type: GraphQLString },
          tracedSVG: {
            type: GraphQLString,
            resolve: parent =>
              getTracedSVG({
                ...parent,
                cache,
                reporter,
              }),
          },
          width: { type: GraphQLInt },
          height: { type: GraphQLInt },
          aspectRatio: { type: GraphQLFloat },
          originalName: { type: GraphQLString },
        },
      }),
      args: {
        width: {
          type: GraphQLInt,
        },
        height: {
          type: GraphQLInt,
        },
        quality: {
          type: GraphQLInt,
        },
        jpegProgressive: {
          type: GraphQLBoolean,
          defaultValue: true,
        },
        pngCompressionLevel: {
          type: GraphQLInt,
          defaultValue: 9,
        },
        pngCompressionSpeed: {
          type: GraphQLInt,
          defaultValue: DEFAULT_PNG_COMPRESSION_SPEED,
        },
        grayscale: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
        duotone: {
          type: DuotoneGradientType,
          defaultValue: false,
        },
        base64: {
          type: GraphQLBoolean,
          defaultValue: false,
        },
        traceSVG: {
          type: PotraceType,
          defaultValue: false,
        },
        toFormat: {
          type: ImageFormatType,
          defaultValue: ``,
        },
        cropFocus: {
          type: ImageCropFocusType,
          defaultValue: sharp.strategy.attention,
        },
        fit: {
          type: ImageFitType,
          defaultValue: sharp.fit.cover,
        },
        background: {
          type: GraphQLString,
          defaultValue: `rgba(0,0,0,1)`,
        },
        rotate: {
          type: GraphQLInt,
          defaultValue: 0,
        },
        trim: {
          type: GraphQLFloat,
          defaultValue: 0,
        },
      },
      resolve: (image, fieldArgs, context) => {
        const file = getNodeAndSavePathDependency(image.parent, context.path)
        const args = { ...fieldArgs, pathPrefix }
        return new Promise(resolve => {
          if (fieldArgs.base64) {
            resolve(
              base64({
                file,
                cache,
              })
            )
          } else {
            const o = queueImageResizing({
              file,
              args,
            })
            resolve(
              Object.assign({}, o, {
                image,
                file,
                fieldArgs: args,
              })
            )
          }
        })
      },
    },
  }
}
