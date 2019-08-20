'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGraphiQL = renderGraphiQL;


// Current latest version of GraphiQL.
var GRAPHIQL_VERSION = '0.12.0';

// Ensures string values are safe to be used within a <script> tag.
/**
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *   strict
 */

function safeSerialize(data) {
  return data ? JSON.stringify(data).replace(/\//g, '\\/') : 'undefined';
}

/**
 * When express-graphql receives a request which does not Accept JSON, but does
 * Accept HTML, it may present GraphiQL, the in-browser GraphQL explorer IDE.
 *
 * When shown, it will be pre-populated with the result of having executed the
 * requested query.
 */
function renderGraphiQL(data) {
  var queryString = data.query;
  var variablesString = data.variables ? JSON.stringify(data.variables, null, 2) : null;
  var resultString = data.result ? JSON.stringify(data.result, null, 2) : null;
  var operationName = data.operationName;

  return '<!--\nThe request to this GraphQL server provided the header "Accept: text/html"\nand as a result has been presented GraphiQL - an in-browser IDE for\nexploring GraphQL.\n\nIf you wish to receive JSON, provide the header "Accept: application/json" or\nadd "&raw" to the end of the URL within a browser.\n-->\n<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8" />\n  <title>GraphiQL</title>\n  <meta name="robots" content="noindex" />\n  <meta name="referrer" content="origin" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <style>\n    body {\n      margin: 0;\n      overflow: hidden;\n    }\n    #graphiql {\n      height: 100vh;\n    }\n  </style>\n  <link href="//cdn.jsdelivr.net/npm/graphiql@' + GRAPHIQL_VERSION + '/graphiql.css" rel="stylesheet" />\n  <script src="//cdn.jsdelivr.net/es6-promise/4.0.5/es6-promise.auto.min.js"></script>\n  <script src="//cdn.jsdelivr.net/fetch/0.9.0/fetch.min.js"></script>\n  <script src="//cdn.jsdelivr.net/react/15.4.2/react.min.js"></script>\n  <script src="//cdn.jsdelivr.net/react/15.4.2/react-dom.min.js"></script>\n  <script src="//cdn.jsdelivr.net/npm/graphiql@' + GRAPHIQL_VERSION + '/graphiql.min.js"></script>\n</head>\n<body>\n  <div id="graphiql">Loading...</div>\n  <script>\n    // Collect the URL parameters\n    var parameters = {};\n    window.location.search.substr(1).split(\'&\').forEach(function (entry) {\n      var eq = entry.indexOf(\'=\');\n      if (eq >= 0) {\n        parameters[decodeURIComponent(entry.slice(0, eq))] =\n          decodeURIComponent(entry.slice(eq + 1));\n      }\n    });\n\n    // Produce a Location query string from a parameter object.\n    function locationQuery(params) {\n      return \'?\' + Object.keys(params).filter(function (key) {\n        return Boolean(params[key]);\n      }).map(function (key) {\n        return encodeURIComponent(key) + \'=\' +\n          encodeURIComponent(params[key]);\n      }).join(\'&\');\n    }\n\n    // Derive a fetch URL from the current URL, sans the GraphQL parameters.\n    var graphqlParamNames = {\n      query: true,\n      variables: true,\n      operationName: true\n    };\n\n    var otherParams = {};\n    for (var k in parameters) {\n      if (parameters.hasOwnProperty(k) && graphqlParamNames[k] !== true) {\n        otherParams[k] = parameters[k];\n      }\n    }\n    var fetchURL = locationQuery(otherParams);\n\n    // Defines a GraphQL fetcher using the fetch API.\n    function graphQLFetcher(graphQLParams) {\n      return fetch(fetchURL, {\n        method: \'post\',\n        headers: {\n          \'Accept\': \'application/json\',\n          \'Content-Type\': \'application/json\'\n        },\n        body: JSON.stringify(graphQLParams),\n        credentials: \'include\',\n      }).then(function (response) {\n        return response.json();\n      });\n    }\n\n    // When the query and variables string is edited, update the URL bar so\n    // that it can be easily shared.\n    function onEditQuery(newQuery) {\n      parameters.query = newQuery;\n      updateURL();\n    }\n\n    function onEditVariables(newVariables) {\n      parameters.variables = newVariables;\n      updateURL();\n    }\n\n    function onEditOperationName(newOperationName) {\n      parameters.operationName = newOperationName;\n      updateURL();\n    }\n\n    function updateURL() {\n      history.replaceState(null, null, locationQuery(parameters));\n    }\n\n    // Render <GraphiQL /> into the body.\n    ReactDOM.render(\n      React.createElement(GraphiQL, {\n        fetcher: graphQLFetcher,\n        onEditQuery: onEditQuery,\n        onEditVariables: onEditVariables,\n        onEditOperationName: onEditOperationName,\n        query: ' + safeSerialize(queryString) + ',\n        response: ' + safeSerialize(resultString) + ',\n        variables: ' + safeSerialize(variablesString) + ',\n        operationName: ' + safeSerialize(operationName) + ',\n      }),\n      document.getElementById(\'graphiql\')\n    );\n  </script>\n</body>\n</html>';
}