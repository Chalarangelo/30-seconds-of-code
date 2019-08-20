"use strict";

/* eslint-disable no-unused-vars */

/** */
const GatsbyReporter = {
  /**
   * @callback GatsbyReporterFn
   * @param {string} message Message to display
   * @returns {void}
   */

  /**
   * @callback GatsbyReporterFnWithError
   * @param {string} message Message to display
   * @param {Error}[error] Optional error object
   * @returns {void}
   */

  /**
   * @type {GatsbyReporterFn}
   * @example
   * reporter.info(`text`)
   */
  info: true,

  /**
   * @type {GatsbyReporterFn}
   * @example
   * reporter.warn(`text`)
   */
  warn: true,

  /**
   * @type {GatsbyReporterFnWithError}
   * @example
   * reporter.error(`text`, new Error('something'))
   */
  error: true,

  /**
   * @type {GatsbyReporterFnWithError}
   * @example
   * reporter.panic(`text`, new Error('something'))
   */
  panic: true,

  /**
   * @type {GatsbyReporterFnWithError}
   * @example
   * reporter.panicOnBuild(`text`, new Error('something'))
   */
  panicOnBuild: true
};
/** */

const GatsbyCache = {
  /**
   * Retrieve cached value
   * @param {string} key Cache key
   * @returns {Promise<any>} Promise resolving to cached value
   * @example
   * const value = await cache.get(`unique-key`)
   */
  get: true,

  /**
   * Cache value
   * @param {string} key Cache key
   * @param {any} value Value to be cached
   * @returns {Promise<any>} Promise resolving to cached value
   * @example
   * await cache.set(`unique-key`, value)
   */
  set: true
};
/** */

const GatsbyTracing = {
  /**
   * Global tracer instance. Check
   * [opentracing Tracer documentation](https://opentracing-javascript.surge.sh/classes/tracer.html)
   * for more details.
   * @type {Opentracing.Tracer}
   */
  tracer: true,

  /**
   * Tracer span representing API run. Check
   * [opentracing Span documentation](https://opentracing-javascript.surge.sh/classes/span.html)
   * for more details.
   * @type {Opentracing.Span}
   */
  parentSpan: true,

  /**
   * @callback GatsbyTracing.StartSpan
   * @param {string} spanName name of the span
   * @returns {Opentracing.Span}
   */

  /**
   * Start a tracing span. The span will be created as a child of the currently
   * running API span. This is a convenience wrapper for
   * ```js
   * tracing.tracer.startSpan(`span-name`, { childOf: tracing.parentSpan}).
   * ```
   * @type {GatsbyTracing.StartSpan}
   * @example
   * exports.sourceNodes = async ({ actions, tracing }) => {
   *   const span = tracing.startSpan(`foo`)
   *
   *   // Perform any span operations. E.g add a tag to your span
   *   span.setTag(`bar`, `baz`)
   *
   *   // Rest of your plugin code
   *
   *   span.finish()
   * }
   */
  startSpan: true
};
/** */

const GatsbyNodeHelpers = {
  /**
   * Key-value store used to persist results of time/memory/cpu intensive
   * tasks. All functions are async and return promises.
   * @type {GatsbyCache}
   */
  cache: true,

  /**
   * Get cache instance by name - this should only be used by plugins that
   * accept subplugins.
   * @param {string} id Test
   * @returns {GatsbyCache} See [`cache`](#cache) section for reference.
   */
  getCache: true,

  /**
   * Create a stable content digest from a string or object, you can use the
   * result of this function to set the `internal.contentDigest` field
   * on nodes. Gatsby uses the value of this field to invalidate stale data
   * when your content changes.
   * @param {(string|object)} input
   * @returns {string} Hash string
   * @example
   * const node = {
   *   ...nodeData,
   *   internal: {
   *     type: `TypeOfNode`,
   *     contentDigest: createContentDigest(nodeData)
   *   }
   * }
   */
  createContentDigest: true,

  /**
   * Collection of functions used to programmatically modify Gatsby’s internal state.
   *
   * See [`actions`](/docs/actions/) reference.
   * @type {Actions}
   * @deprecated Will be removed in gatsby 3.0. Use [actions](#actions)
   * instead.
   */
  boundActionCreators: true,

  /**
   * Collection of functions used to programmatically modify Gatsby’s internal state.
   *
   * See [`actions`](/docs/actions/) reference.
   * @type {Actions}
   */
  actions: true,

  /**
   * Get content for a node from the plugin that created it.
   * @param {Node} node
   * @returns {Promise<string>}
   * @example
   * module.exports = async function onCreateNode(
   *   { node, loadNodeContent, actions, createNodeId }
   * ) {
   *   if (node.internal.mediaType === 'text/markdown') {
   *     const { createNode, createParentChildLink } = actions
   *     const textContent = await loadNodeContent(node)
   *     // process textContent and create child nodes
   *   }
   * }
   */
  loadNodeContent: true,

  /**
   * Internal redux state used for application state. Do not use, unless you
   * absolutely must. Store is considered a private API and can change with
   * any version.
   * @type {Redux.Store}
   */
  store: true,

  /**
   * Internal event emitter / listener.  Do not use, unless you absolutely
   * must. Emitter is considered a private API and can change with any version.
   * @type {Emitter}
   */
  emitter: true,

  /**
   * Get array of all nodes.
   * @returns {Node[]} Array of nodes.
   * @example
   * const allNodes = getNodes()
   */
  getNodes: true,

  /**
   * Get single node by given ID.
   * Don't use this in graphql resolvers - see
   * [`getNodeAndSavePathDependency`](#getNodeAndSavePathDependency).
   * @param {string} ID id of the node.
   * @returns {Node} Single node instance.
   * @example
   * const node = getNode(id)
   */
  getNode: true,

  /**
   * Get array of nodes of given type.
   * @param {string} Type of nodes
   * @returns {Node[]} Array of nodes.
   * @example
   * const markdownNodes = getNodesByType(`MarkdownRemark`)
   */
  getNodesByType: true,

  /**
   * Compares `contentDigest` of cached node with passed value
   * to determine if node has changed.
   *
   * @param {string} id of node
   * @param {string} contentDigest of node
   * @returns {boolean}
   * @deprecated This check is done internally in Gatsby and it's not necessary to use it in plugins. Will be removed in gatsby 3.0.
   */
  hasNodeChanged: true,

  /**
   * Set of utilities to output information to user
   * @type {GatsbyReporter}
   */
  reporter: true,

  /**
   * Get single node by given ID and create dependency for given path.
   * This should be used instead of `getNode` in graphql resolvers to enable
   * tracking dependencies for query results. If it's not used Gatsby will
   * not rerun query if node changes leading to stale query results. See
   * [Page -> Node Dependency Tracking](/docs/page-node-dependencies/)
   * for more details.
   * @param {string} ID id of the node.
   * @param {string} path of the node.
   * @returns {Node} Single node instance.
   */
  getNodeAndSavePathDependency: true,

  /**
   * Utility function useful to generate globally unique and stable node IDs.
   * It will generate different IDs for different plugins if they use same
   * input.
   *
   * @param {string} input
   * @returns {string} UUIDv5 ID string
   * @example
   * const node = {
   *   id: createNodeId(`${backendData.type}${backendData.id}`),
   *   ...restOfNodeData
   * }
   */
  createNodeId: true,

  /**
   * Set of utilities that allow adding more detailed tracing for plugins.
   * Check
   * [Performance tracing](https://www.gatsbyjs.org/docs/performance-tracing)
   * page for more details.
   * @type {GatsbyTracing}
   */
  tracing: true,

  /**
   * Use to prefix resources URLs. `pathPrefix` will be either empty string or
   * path that starts with slash and doesn't end with slash. Check
   * [Adding a Path Prefix](https://www.gatsbyjs.org/docs/path-prefix/)
   * page for details about path prefixing.
   * @type {string}
   */
  pathPrefix: true
};
module.exports = GatsbyNodeHelpers;
//# sourceMappingURL=api-node-helpers-docs.js.map