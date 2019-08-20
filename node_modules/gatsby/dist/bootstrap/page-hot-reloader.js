"use strict";

const {
  emitter,
  store
} = require(`../redux`);

const apiRunnerNode = require(`../utils/api-runner-node`);

const {
  boundActionCreators
} = require(`../redux/actions`);

const {
  deletePage,
  deleteComponentsDependencies
} = boundActionCreators;
let pagesDirty = false;
let graphql;
emitter.on(`CREATE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true;
  }
});
emitter.on(`DELETE_NODE`, action => {
  if (action.payload.internal.type !== `SitePage`) {
    pagesDirty = true; // Make a fake API call to trigger `API_RUNNING_QUEUE_EMPTY` being called.
    // We don't want to call runCreatePages here as there might be work in
    // progress. So this is a safe way to make sure runCreatePages gets called
    // at a safe time.

    apiRunnerNode(`FAKE_API_CALL`);
  }
});
emitter.on(`API_RUNNING_QUEUE_EMPTY`, () => {
  if (pagesDirty) {
    runCreatePages();
  }
});

const runCreatePages = async () => {
  pagesDirty = false;
  const timestamp = Date.now();
  await apiRunnerNode(`createPages`, {
    graphql,
    traceId: `createPages`,
    waitForCascadingActions: true
  }); // Delete pages that weren't updated when running createPages.

  Array.from(store.getState().pages.values()).forEach(page => {
    if (!page.isCreatedByStatefulCreatePages && page.updatedAt < timestamp && page.path !== `/404.html`) {
      deleteComponentsDependencies([page.path]);
      deletePage(page);
    }
  });
  emitter.emit(`CREATE_PAGE_END`);
};

module.exports = graphqlRunner => {
  graphql = graphqlRunner;
};
//# sourceMappingURL=page-hot-reloader.js.map