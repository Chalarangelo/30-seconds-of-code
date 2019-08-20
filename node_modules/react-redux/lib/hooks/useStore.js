"use strict";

exports.__esModule = true;
exports.useStore = useStore;

var _useReduxContext2 = require("./useReduxContext");

/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */
function useStore() {
  var _useReduxContext = (0, _useReduxContext2.useReduxContext)(),
      store = _useReduxContext.store;

  return store;
}