"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;
exports._removeFromScope = _removeFromScope;
exports._callRemovalHooks = _callRemovalHooks;
exports._remove = _remove;
exports._markRemoved = _markRemoved;
exports._assertUnremoved = _assertUnremoved;

var _removalHooks = require("./lib/removal-hooks");

function remove() {
  this._assertUnremoved();

  this.resync();

  this._removeFromScope();

  if (this._callRemovalHooks()) {
    this._markRemoved();

    return;
  }

  this.shareCommentsWithSiblings();

  this._remove();

  this._markRemoved();
}

function _removeFromScope() {
  const bindings = this.getBindingIdentifiers();
  Object.keys(bindings).forEach(name => this.scope.removeBinding(name));
}

function _callRemovalHooks() {
  for (const fn of _removalHooks.hooks) {
    if (fn(this, this.parentPath)) return true;
  }
}

function _remove() {
  if (Array.isArray(this.container)) {
    this.container.splice(this.key, 1);
    this.updateSiblingKeys(this.key, -1);
  } else {
    this._replaceWith(null);
  }
}

function _markRemoved() {
  this.shouldSkip = true;
  this.removed = true;
  this.node = null;
}

function _assertUnremoved() {
  if (this.removed) {
    throw this.buildCodeFrameError("NodePath has been removed so is read-only.");
  }
}