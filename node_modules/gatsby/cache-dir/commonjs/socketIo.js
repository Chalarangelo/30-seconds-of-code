"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = socketIo;
exports.getPageData = getPageData;
exports.registerPath = registerPath;
exports.unregisterPath = unregisterPath;
exports.getIsInitialized = exports.getPageQueryData = exports.getStaticQueryData = void 0;

var _errorOverlayHandler = require("./error-overlay-handler");

var _normalizePagePath = _interopRequireDefault(require("./normalize-page-path"));

let socket = null;
let staticQueryData = {};
let pageQueryData = {};
let isInitialized = false;

const getStaticQueryData = () => staticQueryData;

exports.getStaticQueryData = getStaticQueryData;

const getPageQueryData = () => pageQueryData;

exports.getPageQueryData = getPageQueryData;

const getIsInitialized = () => isInitialized;

exports.getIsInitialized = getIsInitialized;

function socketIo() {
  if (process.env.NODE_ENV !== `production`) {
    if (!socket) {
      // Try to initialize web socket if we didn't do it already
      try {
        // eslint-disable-next-line no-undef
        socket = io();

        const didDataChange = (msg, queryData) => {
          const id = msg.type === `staticQueryResult` ? msg.payload.id : (0, _normalizePagePath.default)(msg.payload.id);
          return !(id in queryData) || JSON.stringify(msg.payload.result) !== JSON.stringify(queryData[id]);
        };

        socket.on(`message`, msg => {
          if (msg.type === `staticQueryResult`) {
            if (didDataChange(msg, staticQueryData)) {
              staticQueryData = Object.assign({}, staticQueryData, {
                [msg.payload.id]: msg.payload.result
              });
            }
          } else if (msg.type === `pageQueryResult`) {
            if (didDataChange(msg, pageQueryData)) {
              pageQueryData = Object.assign({}, pageQueryData, {
                [(0, _normalizePagePath.default)(msg.payload.id)]: msg.payload.result
              });
            }
          } else if (msg.type === `overlayError`) {
            if (msg.payload.message) {
              (0, _errorOverlayHandler.reportError)(msg.payload.id, msg.payload.message);
            } else {
              (0, _errorOverlayHandler.clearError)(msg.payload.id);
            }
          }

          if (msg.type && msg.payload) {
            ___emitter.emit(msg.type, msg.payload);
          }
        });
      } catch (err) {
        console.error(`Could not connect to socket.io on dev server.`);
      }
    }

    return socket;
  } else {
    return null;
  }
}

const inFlightGetPageDataPromiseCache = {};

function getPageData(pathname) {
  pathname = (0, _normalizePagePath.default)(pathname);

  if (inFlightGetPageDataPromiseCache[pathname]) {
    return inFlightGetPageDataPromiseCache[pathname];
  } else {
    inFlightGetPageDataPromiseCache[pathname] = new Promise(resolve => {
      if (pageQueryData[pathname]) {
        delete inFlightGetPageDataPromiseCache[pathname];
        resolve(pageQueryData[pathname]);
      } else {
        const onPageDataCallback = msg => {
          if (msg.type === `pageQueryResult` && (0, _normalizePagePath.default)(msg.payload.id) === pathname) {
            socket.off(`message`, onPageDataCallback);
            delete inFlightGetPageDataPromiseCache[pathname];
            resolve(pageQueryData[pathname]);
          }
        };

        socket.on(`message`, onPageDataCallback);
        socket.emit(`getDataForPath`, pathname);
      }
    });
  }

  return inFlightGetPageDataPromiseCache[pathname];
} // Tell websocket-manager.js the new path we're on.
// This will help the backend prioritize queries for this
// path.


function registerPath(path) {
  socket.emit(`registerPath`, path);
} // Unregister the former path


function unregisterPath(path) {
  socket.emit(`unregisterPath`, path);
}