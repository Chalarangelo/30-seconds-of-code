"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createItemFromDescriptor = createItemFromDescriptor;
exports.createConfigItem = createConfigItem;
exports.getItemDescriptor = getItemDescriptor;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

var _configDescriptors = require("./config-descriptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createItemFromDescriptor(desc) {
  return new ConfigItem(desc);
}

function createConfigItem(value, {
  dirname = ".",
  type
} = {}) {
  const descriptor = (0, _configDescriptors.createDescriptor)(value, _path().default.resolve(dirname), {
    type,
    alias: "programmatic item"
  });
  return createItemFromDescriptor(descriptor);
}

function getItemDescriptor(item) {
  if (item instanceof ConfigItem) {
    return item._descriptor;
  }

  return undefined;
}

class ConfigItem {
  constructor(descriptor) {
    this._descriptor = descriptor;
    Object.defineProperty(this, "_descriptor", {
      enumerable: false
    });
    this.value = this._descriptor.value;
    this.options = this._descriptor.options;
    this.dirname = this._descriptor.dirname;
    this.name = this._descriptor.name;
    this.file = this._descriptor.file ? {
      request: this._descriptor.file.request,
      resolved: this._descriptor.file.resolved
    } : undefined;
    Object.freeze(this);
  }

}

Object.freeze(ConfigItem.prototype);