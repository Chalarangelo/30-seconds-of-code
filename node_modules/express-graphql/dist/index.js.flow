/**
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 *  @flow strict
 */

import accepts from 'accepts';
import {
  Source,
  validateSchema,
  parse,
  validate,
  execute,
  formatError,
  getOperationAST,
  specifiedRules,
} from 'graphql';
import httpError from 'http-errors';
import url from 'url';

import { parseBody } from './parseBody';
import { renderGraphiQL } from './renderGraphiQL';

import type {
  DocumentNode,
  GraphQLError,
  GraphQLSchema,
  GraphQLFieldResolver,
  ValidationContext,
  ASTVisitor,
} from 'graphql';
import type { $Request, $Response } from 'express';

/**
 * Used to configure the graphqlHTTP middleware by providing a schema
 * and other configuration options.
 *
 * Options can be provided as an Object, a Promise for an Object, or a Function
 * that returns an Object or a Promise for an Object.
 */
export type Options =
  | ((
      request: $Request,
      response: $Response,
      params?: GraphQLParams,
    ) => OptionsResult)
  | OptionsResult;
export type OptionsResult = OptionsData | Promise<OptionsData>;
export type OptionsData = {
  /**
   * A GraphQL schema from graphql-js.
   */
  schema: GraphQLSchema,

  /**
   * A value to pass as the context to this middleware.
   */
  context?: ?mixed,

  /**
   * An object to pass as the rootValue to the graphql() function.
   */
  rootValue?: ?mixed,

  /**
   * A boolean to configure whether the output should be pretty-printed.
   */
  pretty?: ?boolean,

  /**
   * An optional function which will be used to format any errors produced by
   * fulfilling a GraphQL operation. If no function is provided, GraphQL's
   * default spec-compliant `formatError` function will be used.
   */
  formatError?: ?(error: GraphQLError) => mixed,

  /**
   * An optional array of validation rules that will be applied on the document
   * in additional to those defined by the GraphQL spec.
   */
  validationRules?: ?Array<(ValidationContext) => ASTVisitor>,

  /**
   * An optional function for adding additional metadata to the GraphQL response
   * as a key-value object. The result will be added to "extensions" field in
   * the resulting JSON. This is often a useful place to add development time
   * info such as the runtime of a query or the amount of resources consumed.
   *
   * Information about the request is provided to be used.
   *
   * This function may be async.
   */
  extensions?: ?(info: RequestInfo) => { [key: string]: mixed },

  /**
   * A boolean to optionally enable GraphiQL mode.
   */
  graphiql?: ?boolean,

  /**
   * A resolver function to use when one is not provided by the schema.
   * If not provided, the default field resolver is used (which looks for a
   * value or method on the source value with the field's name).
   */
  fieldResolver?: ?GraphQLFieldResolver<any, any>,
};

/**
 * All information about a GraphQL request.
 */
export type RequestInfo = {
  /**
   * The parsed GraphQL document.
   */
  document: ?DocumentNode,

  /**
   * The variable values used at runtime.
   */
  variables: ?{ [name: string]: mixed },

  /**
   * The (optional) operation name requested.
   */
  operationName: ?string,

  /**
   * The result of executing the operation.
   */
  result: ?mixed,

  /**
   * A value to pass as the context to the graphql() function.
   */
  context?: ?mixed,
};

type Middleware = (request: $Request, response: $Response) => Promise<void>;

/**
 * Middleware for express; takes an options object or function as input to
 * configure behavior, and returns an express middleware.
 */
module.exports = graphqlHTTP;
function graphqlHTTP(options: Options): Middleware {
  if (!options) {
    throw new Error('GraphQL middleware requires options.');
  }

  return function graphqlMiddleware(request: $Request, response: $Response) {
    // Higher scoped variables are referred to at various stages in the
    // asynchronous state machine below.
    let context;
    let params;
    let pretty;
    let formatErrorFn;
    let extensionsFn;
    let showGraphiQL;
    let query;

    let documentAST;
    let variables;
    let operationName;

    // Promises are used as a mechanism for capturing any thrown errors during
    // the asynchronous process below.

    // Parse the Request to get GraphQL request parameters.
    return getGraphQLParams(request)
      .then(
        graphQLParams => {
          params = graphQLParams;
          // Then, resolve the Options to get OptionsData.
          return resolveOptions(params);
        },
        error => {
          // When we failed to parse the GraphQL parameters, we still need to get
          // the options object, so make an options call to resolve just that.
          const dummyParams = {
            query: null,
            variables: null,
            operationName: null,
            raw: null,
          };
          return resolveOptions(dummyParams).then(() => Promise.reject(error));
        },
      )
      .then(optionsData => {
        // Assert that schema is required.
        if (!optionsData.schema) {
          throw new Error('GraphQL middleware options must contain a schema.');
        }

        // Collect information from the options data object.
        const schema = optionsData.schema;
        const rootValue = optionsData.rootValue;
        const fieldResolver = optionsData.fieldResolver;
        const graphiql = optionsData.graphiql;

        context = optionsData.context || request;

        let validationRules = specifiedRules;
        if (optionsData.validationRules) {
          validationRules = validationRules.concat(optionsData.validationRules);
        }

        // GraphQL HTTP only supports GET and POST methods.
        if (request.method !== 'GET' && request.method !== 'POST') {
          response.setHeader('Allow', 'GET, POST');
          throw httpError(405, 'GraphQL only supports GET and POST requests.');
        }

        // Get GraphQL params from the request and POST body data.
        query = params.query;
        variables = params.variables;
        operationName = params.operationName;
        showGraphiQL = graphiql && canDisplayGraphiQL(request, params);

        // If there is no query, but GraphiQL will be displayed, do not produce
        // a result, otherwise return a 400: Bad Request.
        if (!query) {
          if (showGraphiQL) {
            return null;
          }
          throw httpError(400, 'Must provide query string.');
        }

        // Validate Schema
        const schemaValidationErrors = validateSchema(schema);
        if (schemaValidationErrors.length > 0) {
          // Return 500: Internal Server Error if invalid schema.
          response.statusCode = 500;
          return { errors: schemaValidationErrors };
        }

        //  GraphQL source.
        const source = new Source(query, 'GraphQL request');

        // Parse source to AST, reporting any syntax error.
        try {
          documentAST = parse(source);
        } catch (syntaxError) {
          // Return 400: Bad Request if any syntax errors errors exist.
          response.statusCode = 400;
          return { errors: [syntaxError] };
        }

        // Validate AST, reporting any errors.
        const validationErrors = validate(schema, documentAST, validationRules);
        if (validationErrors.length > 0) {
          // Return 400: Bad Request if any validation errors exist.
          response.statusCode = 400;
          return { errors: validationErrors };
        }

        // Only query operations are allowed on GET requests.
        if (request.method === 'GET') {
          // Determine if this GET request will perform a non-query.
          const operationAST = getOperationAST(documentAST, operationName);
          if (operationAST && operationAST.operation !== 'query') {
            // If GraphiQL can be shown, do not perform this query, but
            // provide it to GraphiQL so that the requester may perform it
            // themselves if desired.
            if (showGraphiQL) {
              return null;
            }

            // Otherwise, report a 405: Method Not Allowed error.
            response.setHeader('Allow', 'POST');
            throw httpError(
              405,
              `Can only perform a ${operationAST.operation} operation ` +
                'from a POST request.',
            );
          }
        }
        // Perform the execution, reporting any errors creating the context.
        try {
          return execute(
            schema,
            documentAST,
            rootValue,
            context,
            variables,
            operationName,
            fieldResolver,
          );
        } catch (contextError) {
          // Return 400: Bad Request if any execution context errors exist.
          response.statusCode = 400;
          return { errors: [contextError] };
        }
      })
      .then(result => {
        // Collect and apply any metadata extensions if a function was provided.
        // http://facebook.github.io/graphql/#sec-Response-Format
        if (result && extensionsFn) {
          return Promise.resolve(
            extensionsFn({
              document: documentAST,
              variables,
              operationName,
              result,
              context,
            }),
          ).then(extensions => {
            if (extensions && typeof extensions === 'object') {
              (result: any).extensions = extensions;
            }
            return result;
          });
        }
        return result;
      })
      .catch(error => {
        // If an error was caught, report the httpError status, or 500.
        response.statusCode = error.status || 500;
        return { errors: [error] };
      })
      .then(result => {
        // If no data was included in the result, that indicates a runtime query
        // error, indicate as such with a generic status code.
        // Note: Information about the error itself will still be contained in
        // the resulting JSON payload.
        // http://facebook.github.io/graphql/#sec-Data
        if (response.statusCode === 200 && result && !result.data) {
          response.statusCode = 500;
        }
        // Format any encountered errors.
        if (result && result.errors) {
          (result: any).errors = result.errors.map(
            formatErrorFn || formatError,
          );
        }

        // If allowed to show GraphiQL, present it instead of JSON.
        if (showGraphiQL) {
          const payload = renderGraphiQL({
            query,
            variables,
            operationName,
            result,
          });
          return sendResponse(response, 'text/html', payload);
        }

        // At this point, result is guaranteed to exist, as the only scenario
        // where it will not is when showGraphiQL is true.
        if (!result) {
          throw httpError(500, 'Internal Error');
        }

        // If "pretty" JSON isn't requested, and the server provides a
        // response.json method (express), use that directly.
        // Otherwise use the simplified sendResponse method.
        if (!pretty && typeof response.json === 'function') {
          response.json(result);
        } else {
          const payload = JSON.stringify(result, null, pretty ? 2 : 0);
          sendResponse(response, 'application/json', payload);
        }
      });

    function resolveOptions(requestParams) {
      return Promise.resolve(
        typeof options === 'function'
          ? options(request, response, requestParams)
          : options,
      ).then(optionsData => {
        // Assert that optionsData is in fact an Object.
        if (!optionsData || typeof optionsData !== 'object') {
          throw new Error(
            'GraphQL middleware option function must return an options object ' +
              'or a promise which will be resolved to an options object.',
          );
        }

        formatErrorFn = optionsData.formatError;
        extensionsFn = optionsData.extensions;
        pretty = optionsData.pretty;
        return optionsData;
      });
    }
  };
}

export type GraphQLParams = {
  query: ?string,
  variables: ?{ [name: string]: mixed },
  operationName: ?string,
  raw: ?boolean,
};

/**
 * Provided a "Request" provided by express or connect (typically a node style
 * HTTPClientRequest), Promise the GraphQL request parameters.
 */
module.exports.getGraphQLParams = getGraphQLParams;
function getGraphQLParams(request: $Request): Promise<GraphQLParams> {
  return parseBody(request).then(bodyData => {
    const urlData = (request.url && url.parse(request.url, true).query) || {};
    return parseGraphQLParams(urlData, bodyData);
  });
}

/**
 * Helper function to get the GraphQL params from the request.
 */
function parseGraphQLParams(
  urlData: { [param: string]: mixed },
  bodyData: { [param: string]: mixed },
): GraphQLParams {
  // GraphQL Query string.
  let query = urlData.query || bodyData.query;
  if (typeof query !== 'string') {
    query = null;
  }

  // Parse the variables if needed.
  let variables = urlData.variables || bodyData.variables;
  if (variables && typeof variables === 'string') {
    try {
      variables = JSON.parse(variables);
    } catch (error) {
      throw httpError(400, 'Variables are invalid JSON.');
    }
  } else if (typeof variables !== 'object') {
    variables = null;
  }

  // Name of GraphQL operation to execute.
  let operationName = urlData.operationName || bodyData.operationName;
  if (typeof operationName !== 'string') {
    operationName = null;
  }

  const raw = urlData.raw !== undefined || bodyData.raw !== undefined;

  return { query, variables, operationName, raw };
}

/**
 * Helper function to determine if GraphiQL can be displayed.
 */
function canDisplayGraphiQL(request: $Request, params: GraphQLParams): boolean {
  // If `raw` exists, GraphiQL mode is not enabled.
  // Allowed to show GraphiQL if not requested as raw and this request
  // prefers HTML over JSON.
  return !params.raw && accepts(request).types(['json', 'html']) === 'html';
}

/**
 * Helper function for sending a response using only the core Node server APIs.
 */
function sendResponse(response: $Response, type: string, data: string): void {
  const chunk = new Buffer(data, 'utf8');
  response.setHeader('Content-Type', type + '; charset=utf-8');
  response.setHeader('Content-Length', String(chunk.length));
  response.end(chunk);
}
