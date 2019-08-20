"use strict";

const Redux = require(`redux`);

const _ = require(`lodash`);

const mitt = require(`mitt`);

const thunk = require(`redux-thunk`).default;

const reducers = require(`./reducers`);

const {
  writeToCache,
  readFromCache
} = require(`./persist`); // Create event emitter for actions


const emitter = mitt(); // Read old node data from cache.

const readState = () => {
  try {
    const state = readFromCache();

    if (state.nodes) {
      // re-create nodesByType
      state.nodesByType = new Map();
      state.nodes.forEach(node => {
        const {
          type
        } = node.internal;

        if (!state.nodesByType.has(type)) {
          state.nodesByType.set(type, new Map());
        }

        state.nodesByType.get(type).set(node.id, node);
      });
    } // jsonDataPaths was removed in the per-page-manifest
    // changes. Explicitly delete it here to cover case where user
    // runs gatsby the first time after upgrading.


    delete state[`jsonDataPaths`];
    return state;
  } catch (e) {// ignore errors.
  }

  return {};
};
/**
 * Redux middleware handling array of actions
 */


const multi = ({
  dispatch
}) => next => action => Array.isArray(action) ? action.filter(Boolean).map(dispatch) : next(action);

const configureStore = initialState => Redux.createStore(Redux.combineReducers(Object.assign({}, reducers)), initialState, Redux.applyMiddleware(thunk, multi));

const store = configureStore(readState()); // Persist state.

const saveState = () => {
  const state = store.getState();

  const pickedState = _.pick(state, [`nodes`, `status`, `componentDataDependencies`, `components`, `staticQueryComponents`, `webpackCompilationHash`]);

  return writeToCache(pickedState);
};

store.subscribe(() => {
  const lastAction = store.getState().lastAction;
  emitter.emit(lastAction.type, lastAction);
});
module.exports = {
  emitter,
  store,
  configureStore,
  readState,
  saveState
};
//# sourceMappingURL=index.js.map