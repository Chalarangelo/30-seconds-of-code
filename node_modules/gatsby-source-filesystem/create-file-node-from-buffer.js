"use strict";

const fs = require(`fs-extra`);

const path = require(`path`);

const fileType = require(`file-type`);

const {
  createFileNode
} = require(`./create-file-node`);

const {
  createFilePath
} = require(`./utils`);

const {
  createContentDigest
} = require(`gatsby-core-utils`);

const cacheId = hash => `create-file-node-from-buffer-${hash}`;
/********************
 * Type Definitions *
 ********************/

/**
 * @typedef {Redux}
 * @see [Redux Docs]{@link https://redux.js.org/api-reference}
 */

/**
 * @typedef {GatsbyCache}
 * @see gatsby/packages/gatsby/utils/cache.js
 */

/**
 * @typedef {CreateFileNodeFromBufferPayload}
 * @typedef {Object}
 * @description Create File Node From Buffer Payload
 *
 * @param  {Buffer} options.buffer
 * @param  {String} options.hash
 * @param  {Redux} options.store
 * @param  {GatsbyCache} options.cache
 * @param  {Function} options.createNode
 */


const CACHE_DIR = `.cache`;
const FS_PLUGIN_DIR = `gatsby-source-filesystem`;
/**
 * writeBuffer
 * --
 * Write the contents of `buffer` to `filename`
 *
 *
 * @param {String} filename
 * @param {Buffer} buffer
 * @returns {Promise<void>}
 */

const writeBuffer = (filename, buffer) => new Promise((resolve, reject) => {
  fs.writeFile(filename, buffer, err => err ? reject(err) : resolve());
});
/**
 * processBufferNode
 * --
 * Write the buffer contents out to disk and return the fileNode
 *
 * @param {CreateFileNodeFromBufferPayload} options
 * @return {Promise<Object>} Resolves with the fileNode
 */


async function processBufferNode({
  buffer,
  hash,
  store,
  cache,
  createNode,
  parentNodeId,
  createNodeId,
  ext,
  name
}) {
  // Ensure our cache directory exists.
  const pluginCacheDir = path.join(store.getState().program.directory, CACHE_DIR, FS_PLUGIN_DIR);
  await fs.ensureDir(pluginCacheDir); // See if there's a cache file for this buffer's contents from
  // a previous run

  let filename = await cache.get(cacheId(hash));

  if (!filename) {
    // If the user did not provide an extension and we couldn't get
    // one from remote file, try and guess one
    if (typeof ext === `undefined`) {
      const filetype = fileType(buffer);
      ext = filetype ? `.${filetype.ext}` : `.bin`;
    }

    await fs.ensureDir(path.join(pluginCacheDir, hash));
    filename = createFilePath(path.join(pluginCacheDir, hash), name, ext); // Cache the buffer contents

    await writeBuffer(filename, buffer); // Save the cache file path for future use

    await cache.set(cacheId(hash), filename);
  } // Create the file node.


  const fileNode = await createFileNode(filename, createNodeId, {});
  fileNode.internal.description = `File "Buffer<${hash}>"`;
  fileNode.hash = hash;
  fileNode.parent = parentNodeId; // Override the default plugin as gatsby-source-filesystem needs to
  // be the owner of File nodes or there'll be conflicts if any other
  // File nodes are created through normal usages of
  // gatsby-source-filesystem.

  await createNode(fileNode, {
    name: `gatsby-source-filesystem`
  });
  return fileNode;
}
/**
 * Index of promises resolving to File node from buffer cache
 */


const processingCache = {};
/***************
 * Entry Point *
 ***************/

/**
 * createFileNodeFromBuffer
 * --
 *
 * Cache a buffer's contents to disk
 * First checks cache to ensure duplicate buffers aren't processed
 *
 * @param {CreateFileNodeFromBufferPayload} options
 * @return {Promise<Object>}                  Returns the created node
 */

module.exports = ({
  buffer,
  hash,
  store,
  cache,
  createNode,
  parentNodeId = null,
  createNodeId,
  ext,
  name = hash
}) => {
  // validation of the input
  // without this it's notoriously easy to pass in the wrong `createNodeId`
  // see gatsbyjs/gatsby#6643
  if (typeof createNodeId !== `function`) {
    throw new Error(`createNodeId must be a function, was ${typeof createNodeId}`);
  }

  if (typeof createNode !== `function`) {
    throw new Error(`createNode must be a function, was ${typeof createNode}`);
  }

  if (typeof store !== `object`) {
    throw new Error(`store must be the redux store, was ${typeof store}`);
  }

  if (typeof cache !== `object`) {
    throw new Error(`cache must be the Gatsby cache, was ${typeof cache}`);
  }

  if (!buffer) {
    return Promise.reject(`bad buffer: ${buffer}`);
  }

  if (!hash) {
    hash = createContentDigest(buffer);
  } // Check if we already requested node for this remote file
  // and return stored promise if we did.


  if (processingCache[hash]) {
    return processingCache[hash];
  }

  const bufferCachePromise = processBufferNode({
    buffer,
    hash,
    store,
    cache,
    createNode,
    parentNodeId,
    createNodeId,
    ext,
    name
  });
  processingCache[hash] = bufferCachePromise;
  return processingCache[hash];
};