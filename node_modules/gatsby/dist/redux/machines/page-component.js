"use strict";

const {
  Machine,
  actions: {
    assign
  }
} = require(`xstate`);

module.exports = Machine({
  id: `pageComponents`,
  initial: `inactive`,
  context: {
    isInBootstrap: true,
    componentPath: ``,
    query: ``
  },
  on: {
    BOOTSTRAP_FINISHED: {
      actions: `setBootstrapFinished`
    },
    DELETE_PAGE: {
      actions: `deletePage`
    },
    NEW_PAGE_CREATED: {
      actions: `setPage`
    },
    PAGE_CONTEXT_MODIFIED: {
      actions: `rerunPageQuery`
    },
    QUERY_EXTRACTION_GRAPHQL_ERROR: `queryExtractionGraphQLError`,
    QUERY_EXTRACTION_BABEL_ERROR: `queryExtractionBabelError`
  },
  states: {
    inactive: {
      on: {
        // Transient transition
        // Will transition to either 'inactiveWhileBootstrapping' or idle
        // immediately upon entering 'inactive' state if the condition is met.
        "": [{
          target: `inactiveWhileBootstrapping`,
          cond: `isBootstrapping`
        }, {
          target: `idle`,
          cond: `isNotBootstrapping`
        }]
      }
    },
    inactiveWhileBootstrapping: {
      on: {
        BOOTSTRAP_FINISHED: {
          target: `idle`,
          actions: `setBootstrapFinished`
        },
        QUERY_CHANGED: `runningPageQueries`
      }
    },
    queryExtractionGraphQLError: {
      on: {
        QUERY_DID_NOT_CHANGE: `idle`,
        QUERY_CHANGED: `runningPageQueries`
      }
    },
    queryExtractionBabelError: {
      on: {
        QUERY_EXTRACTION_BABEL_SUCCESS: `idle`
      }
    },
    runningPageQueries: {
      onEntry: [`setQuery`, `runPageComponentQueries`],
      on: {
        QUERIES_COMPLETE: `idle`
      }
    },
    idle: {
      on: {
        QUERY_CHANGED: `runningPageQueries`
      }
    }
  }
}, {
  guards: {
    isBootstrapping: context => context.isInBootstrap,
    isNotBootstrapping: context => !context.isInBootstrap
  },
  actions: {
    rerunPageQuery: (_ctx, event) => {
      const queryUtil = require(`../../query`); // Wait a bit as calling this function immediately triggers
      // an Action call which Redux squawks about.


      setTimeout(() => {
        queryUtil.enqueueExtractedQueryId(event.path);
      }, 0);
    },
    runPageComponentQueries: (context, event) => {
      const queryUtil = require(`../../query`); // Wait a bit as calling this function immediately triggers
      // an Action call which Redux squawks about.


      setTimeout(() => {
        queryUtil.enqueueExtractedPageComponent(context.componentPath);
      }, 0);
    },
    setQuery: assign({
      query: (ctx, event) => {
        if (typeof event.query !== `undefined` || event.query !== null) {
          return event.query;
        } else {
          return ctx.query;
        }
      }
    }),
    setPage: assign({
      pages: (ctx, event) => {
        if (event.path) {
          const queryUtil = require(`../../query`); // Wait a bit as calling this function immediately triggers
          // an Action call which Redux squawks about.


          setTimeout(() => {
            if (!ctx.isInBootstrap) {
              queryUtil.enqueueExtractedQueryId(event.path);
              queryUtil.runQueuedQueries(event.path);
            }
          }, 0);
          ctx.pages.add(event.path);
          return ctx.pages;
        } else {
          return ctx.pages;
        }
      }
    }),
    deletePage: assign({
      pages: (ctx, event) => {
        ctx.pages.delete(event.page.path);
        return ctx.pages;
      }
    }),
    setBootstrapFinished: assign({
      isInBootstrap: false
    })
  }
});
//# sourceMappingURL=page-component.js.map