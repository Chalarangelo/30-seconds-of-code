"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;

var _Provider = _interopRequireDefault(require("./components/Provider"));

exports.Provider = _Provider["default"];

var _connectAdvanced = _interopRequireDefault(require("./components/connectAdvanced"));

exports.connectAdvanced = _connectAdvanced["default"];

var _Context = require("./components/Context");

exports.ReactReduxContext = _Context.ReactReduxContext;

var _connect = _interopRequireDefault(require("./connect/connect"));

exports.connect = _connect["default"];

var _useDispatch = require("./hooks/useDispatch");

exports.useDispatch = _useDispatch.useDispatch;

var _useSelector = require("./hooks/useSelector");

exports.useSelector = _useSelector.useSelector;

var _useStore = require("./hooks/useStore");

exports.useStore = _useStore.useStore;

var _batch = require("./utils/batch");

var _reactBatchedUpdates = require("./utils/reactBatchedUpdates");

exports.batch = _reactBatchedUpdates.unstable_batchedUpdates;

var _shallowEqual = _interopRequireDefault(require("./utils/shallowEqual"));

exports.shallowEqual = _shallowEqual["default"];
(0, _batch.setBatch)(_reactBatchedUpdates.unstable_batchedUpdates);