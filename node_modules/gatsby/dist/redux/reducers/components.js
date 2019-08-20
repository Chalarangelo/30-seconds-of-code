"use strict";

const normalize = require(`normalize-path`);

const {
  interpret
} = require(`xstate`);

const componentMachine = require(`../machines/page-component`);

const services = new Map();
let programStatus = `BOOTSTRAPPING`;

module.exports = (state = new Map(), action) => {
  switch (action.type) {
    case `DELETE_CACHE`:
      return new Map();

    case `SET_PROGRAM_STATUS`:
      programStatus = action.payload;

      if (programStatus === `BOOTSTRAP_QUERY_RUNNING_FINISHED`) {
        services.forEach(s => s.send(`BOOTSTRAP_FINISHED`));
      }

      return state;

    case `CREATE_PAGE`:
      {
        action.payload.componentPath = normalize(action.payload.component); // Create XState service.

        let service;

        if (!services.has(action.payload.componentPath)) {
          var _state$get;

          const machine = componentMachine.withContext({
            componentPath: action.payload.componentPath,
            query: ((_state$get = state.get(action.payload.componentPath)) === null || _state$get === void 0 ? void 0 : _state$get.query) || ``,
            pages: new Set([action.payload.path]),
            isInBootstrap: programStatus === `BOOTSTRAPPING`
          });
          service = interpret(machine).start(); // .onTransition(nextState => {
          // console.log(
          // `component machine value`,
          // _.pick(nextState, [`value`, `context`, `event`])
          // )
          // })
          // .start()

          services.set(action.payload.componentPath, service);
        } else {
          service = services.get(action.payload.componentPath);

          if (!service.state.context.pages.has(action.payload.path)) {
            service.send({
              type: `NEW_PAGE_CREATED`,
              path: action.payload.path
            });
          } else if (action.contextModified) {
            service.send({
              type: `PAGE_CONTEXT_MODIFIED`,
              path: action.payload.path
            });
          }
        }

        state.set(action.payload.componentPath, Object.assign({
          query: ``
        }, service.state.context));
        return state;
      }

    case `QUERY_EXTRACTED`:
      {
        action.payload.componentPath = normalize(action.payload.componentPath);
        const service = services.get(action.payload.componentPath);

        if (service.state.value === `queryExtractionBabelError`) {
          // Do nothing until the babel error is fixed.
          return state;
        } // Check if the query has changed or not.


        if (service.state.context.query === action.payload.query) {
          service.send(`QUERY_DID_NOT_CHANGE`);
        } else {
          service.send({
            type: `QUERY_CHANGED`,
            query: action.payload.query
          });
        }

        state.set(action.payload.componentPath, Object.assign({}, service.state.context));
        return state;
      }

    case `QUERY_EXTRACTION_BABEL_SUCCESS`:
    case `QUERY_EXTRACTION_BABEL_ERROR`:
    case `QUERY_EXTRACTION_GRAPHQL_ERROR`:
      {
        let servicesToSendEventTo;

        if (typeof action.payload.componentPath !== `string` && action.type === `QUERY_EXTRACTION_GRAPHQL_ERROR`) {
          // if this is globabl query extraction error, send it to all page component services
          servicesToSendEventTo = services;
        } else {
          action.payload.componentPath = normalize(action.payload.componentPath);
          servicesToSendEventTo = [services.get(action.payload.componentPath)].filter(Boolean);
        }

        servicesToSendEventTo.forEach(service => service.send(Object.assign({
          type: action.type
        }, action.payload)));
        return state;
      }

    case `PAGE_QUERY_RUN`:
      {
        if (action.payload.isPage) {
          action.payload.componentPath = normalize(action.payload.componentPath);
          const service = services.get(action.payload.componentPath); // TODO we want to keep track of whether there's any outstanding queries still
          // running as this will mark queries as complete immediately even though
          // a page component could have thousands of pages will processing.
          // This can be done once we start modeling Pages as well.

          service.send({
            type: `QUERIES_COMPLETE`
          });
        }

        return state;
      }

    case `REMOVE_TEMPLATE_COMPONENT`:
      {
        action.payload.componentPath = normalize(action.payload.componentPath);
        state.delete(action.payload.componentPath);
        return state;
      }

    case `DELETE_PAGE`:
      {
        const service = services.get(normalize(action.payload.component));
        service.send({
          type: `DELETE_PAGE`,
          page: action.payload
        });
        return state;
      }
  }

  return state;
};
//# sourceMappingURL=components.js.map