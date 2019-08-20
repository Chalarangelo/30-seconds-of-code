"use strict";

const v8 = require(`v8`);

const fs = require(`fs-extra`);

const stringify = require(`json-stringify-safe`);

const objectToMap = obj => {
  const map = new Map();
  Object.keys(obj).forEach(key => {
    map.set(key, obj[key]);
  });
  return map;
};

const mapToObject = map => {
  const obj = {};

  for (let [key, value] of map) {
    obj[key] = value;
  }

  return obj;
};

const jsonStringify = contents => {
  contents.staticQueryComponents = mapToObject(contents.staticQueryComponents);
  contents.components = mapToObject(contents.components);
  contents.nodes = contents.nodes ? mapToObject(contents.nodes) : {};
  return stringify(contents, null, 2);
};

const jsonParse = buffer => {
  const parsed = JSON.parse(buffer.toString(`utf8`));
  parsed.staticQueryComponents = objectToMap(parsed.staticQueryComponents);
  parsed.components = objectToMap(parsed.components);
  parsed.nodes = objectToMap(parsed.nodes || {});
  return parsed;
};

const useV8 = Boolean(v8.serialize);
const [serialize, deserialize, file] = useV8 ? [v8.serialize, v8.deserialize, `${process.cwd()}/.cache/redux.state`] : [jsonStringify, jsonParse, `${process.cwd()}/.cache/redux-state.json`];

const readFromCache = () => deserialize(fs.readFileSync(file));

const writeToCache = contents => {
  fs.writeFileSync(file, serialize(contents));
};

module.exports = {
  readFromCache,
  writeToCache
};
//# sourceMappingURL=persist.js.map