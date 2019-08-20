"use strict";

const actions = {};
/**
 * Create a dependency between a page and data. Probably for
 * internal use only.
 * @param {Object} $0
 * @param {string} $0.path the path to the page
 * @param {string} $0.nodeId A node ID
 * @param {string} $0.connection A connection type
 * @private
 */

actions.createPageDependency = ({
  path,
  nodeId,
  connection
}, plugin = ``) => {
  return {
    type: `CREATE_COMPONENT_DEPENDENCY`,
    plugin,
    payload: {
      path,
      nodeId,
      connection
    }
  };
};
/**
 * Delete dependencies between an array of pages and data. Probably for
 * internal use only. Used when deleting pages.
 * @param {Array} paths the paths to delete.
 * @private
 */


actions.deleteComponentsDependencies = paths => {
  return {
    type: `DELETE_COMPONENTS_DEPENDENCIES`,
    payload: {
      paths
    }
  };
};
/**
 * When the query watcher extracts a GraphQL query, it calls
 * this to store the query with its component.
 * @private
 */


actions.replaceComponentQuery = ({
  query,
  componentPath
}) => {
  return {
    type: `REPLACE_COMPONENT_QUERY`,
    payload: {
      query,
      componentPath
    }
  };
};
/**
 * When the query watcher extracts a "static" GraphQL query from <StaticQuery>
 * components, it calls this to store the query with its component.
 * @private
 */


actions.replaceStaticQuery = (args, plugin = null) => {
  return {
    type: `REPLACE_STATIC_QUERY`,
    plugin,
    payload: args
  };
};
/**
 *
 * Report that a query has been extracted from a component. Used by
 * query-compiler.js.
 *
 * @param {Object} $0
 * @param {componentPath} $0.componentPath The path to the component that just had
 * its query read.
 * @param {query} $0.query The GraphQL query that was extracted from the component.
 * @private
 */


actions.queryExtracted = ({
  componentPath,
  query
}, plugin, traceId) => {
  return {
    type: `QUERY_EXTRACTED`,
    plugin,
    traceId,
    payload: {
      componentPath,
      query
    }
  };
};
/**
 *
 * Report that the Relay Compiler found a graphql error when attempting to extract a query
 *
 * @param {Object} $0
 * @param {componentPath} $0.componentPath The path to the component that just had
 * its query read.
 * @param {error} $0.error The GraphQL query that was extracted from the component.
 * @private
 */


actions.queryExtractionGraphQLError = ({
  componentPath,
  error
}, plugin, traceId) => {
  return {
    type: `QUERY_EXTRACTION_GRAPHQL_ERROR`,
    plugin,
    traceId,
    payload: {
      componentPath,
      error
    }
  };
};
/**
 *
 * Report that babel was able to extract the graphql query.
 * Indicates that the file is free of JS errors.
 *
 * @param {Object} $0
 * @param {componentPath} $0.componentPath The path to the component that just had
 * its query read.
 * @private
 */


actions.queryExtractedBabelSuccess = ({
  componentPath
}, plugin, traceId) => {
  return {
    type: `QUERY_EXTRACTION_BABEL_SUCCESS`,
    plugin,
    traceId,
    payload: {
      componentPath
    }
  };
};
/**
 *
 * Report that the Relay Compiler found a babel error when attempting to extract a query
 *
 * @param {Object} $0
 * @param {componentPath} $0.componentPath The path to the component that just had
 * its query read.
 * @param {error} $0.error The Babel error object
 * @private
 */


actions.queryExtractionBabelError = ({
  componentPath,
  error
}, plugin, traceId) => {
  return {
    type: `QUERY_EXTRACTION_BABEL_ERROR`,
    plugin,
    traceId,
    payload: {
      componentPath,
      error
    }
  };
};
/**
 * Set overall program status e.g. `BOOTSTRAPING` or `BOOTSTRAP_FINISHED`.
 *
 * @param {string} Program status
 * @private
 */


actions.setProgramStatus = (status, plugin, traceId) => {
  return {
    type: `SET_PROGRAM_STATUS`,
    plugin,
    traceId,
    payload: status
  };
};
/**
 * Broadcast that a page's query was run.
 *
 * @param {string} Path to the page component that changed.
 * @private
 */


actions.pageQueryRun = ({
  path,
  componentPath,
  isPage
}, plugin, traceId) => {
  return {
    type: `PAGE_QUERY_RUN`,
    plugin,
    traceId,
    payload: {
      path,
      componentPath,
      isPage
    }
  };
};

module.exports = {
  actions
};
//# sourceMappingURL=internal.js.map