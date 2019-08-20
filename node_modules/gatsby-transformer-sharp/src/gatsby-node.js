const fs = require(`fs-extra`)

exports.onCreateNode = require(`./on-node-create`)
exports.setFieldsOnGraphQLNodeType = require(`./extend-node-type`)

exports.onPreExtractQueries = async ({ store, getNodesByType }) => {
  const program = store.getState().program

  // Check if there are any ImageSharp nodes. If so add fragments for ImageSharp.
  // The fragment will cause an error if there are no ImageSharp nodes.
  if (getNodesByType(`ImageSharp`).length == 0) {
    return
  }

  // We have ImageSharp nodes so let's add our fragments to .cache/fragments.
  await fs.copy(
    require.resolve(`gatsby-transformer-sharp/src/fragments.js`),
    `${program.directory}/.cache/fragments/image-sharp-fragments.js`
  )
}

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions

  if (createTypes) {
    createTypes(`
      type ImageSharp implements Node @infer @childOf(types: ["File"]) {
        id: ID!
      }
    `)
  }
}
