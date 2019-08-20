"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePluginObject = validatePluginObject;

var _optionAssertions = require("./option-assertions");

const VALIDATORS = {
  name: _optionAssertions.assertString,
  manipulateOptions: _optionAssertions.assertFunction,
  pre: _optionAssertions.assertFunction,
  post: _optionAssertions.assertFunction,
  inherits: _optionAssertions.assertFunction,
  visitor: assertVisitorMap,
  parserOverride: _optionAssertions.assertFunction,
  generatorOverride: _optionAssertions.assertFunction
};

function assertVisitorMap(key, value) {
  const obj = (0, _optionAssertions.assertObject)(key, value);

  if (obj) {
    Object.keys(obj).forEach(prop => assertVisitorHandler(prop, obj[prop]));

    if (obj.enter || obj.exit) {
      throw new Error(`.${key} cannot contain catch-all "enter" or "exit" handlers. Please target individual nodes.`);
    }
  }

  return obj;
}

function assertVisitorHandler(key, value) {
  if (value && typeof value === "object") {
    Object.keys(value).forEach(handler => {
      if (handler !== "enter" && handler !== "exit") {
        throw new Error(`.visitor["${key}"] may only have .enter and/or .exit handlers.`);
      }
    });
  } else if (typeof value !== "function") {
    throw new Error(`.visitor["${key}"] must be a function`);
  }

  return value;
}

function validatePluginObject(obj) {
  Object.keys(obj).forEach(key => {
    const validator = VALIDATORS[key];
    if (validator) validator(key, obj[key]);else throw new Error(`.${key} is not a valid Plugin property`);
  });
  return obj;
}