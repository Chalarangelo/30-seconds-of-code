"use strict";

exports.__esModule = true;
exports.publicContext = exports.PublicConsumer = exports.PublicProvider = exports.Consumer = exports.Provider = void 0;

var _react = require("react");

var _createContext = (0, _react.createContext)(),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

exports.Consumer = Consumer;
exports.Provider = Provider;
var publicContext = (0, _react.createContext)();
exports.publicContext = publicContext;
var PublicProvider = publicContext.Provider,
    PublicConsumer = publicContext.Consumer;
exports.PublicConsumer = PublicConsumer;
exports.PublicProvider = PublicProvider;