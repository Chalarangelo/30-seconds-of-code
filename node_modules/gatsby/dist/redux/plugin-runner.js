"use strict";

// Invoke plugins for certain actions.
const {
  emitter
} = require(`./index`);

const apiRunnerNode = require(`../utils/api-runner-node`);

emitter.on(`CREATE_PAGE`, action => {
  const page = action.payload;
  apiRunnerNode(`onCreatePage`, {
    page,
    traceId: action.traceId,
    parentSpan: action.parentSpan
  }, action.plugin.name);
});
//# sourceMappingURL=plugin-runner.js.map