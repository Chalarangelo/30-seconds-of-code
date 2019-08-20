'use strict';
const { coerce, lt, lte } = require('semver');
const browserslist = require('browserslist');
const data = require('./data');
const getModulesListForTargetVersion = require('./get-modules-list-for-target-version');
const has = Function.call.bind({}.hasOwnProperty);

const mapping = new Map([
  ['ios_saf', 'ios'],
  ['and_chr', 'chrome'],
  ['and_ff', 'firefox'],
]);

const validTargets = new Set([
  'android',
  'chrome',
  'edge',
  'electron',
  'firefox',
  'ie',
  'ios',
  'node',
  'opera',
  'phantom',
  'safari',
  'samsung',
]);

function coercedLte(a, b) {
  return lte(coerce(a), coerce(b));
}

function coercedLt(a, b) {
  return lt(coerce(a), coerce(b));
}

function normalizeBrowsersList(list) {
  return list.map(it => {
    let [engine, version] = it.split(' ');
    if (mapping.has(engine)) engine = mapping.get(engine);
    else if (engine === 'android' && !coercedLte(version, '4.4.4')) engine = 'chrome';
    return [engine, version];
  }).filter(([engine]) => validTargets.has(engine));
}

function reduceByMinVersion(list) {
  const targets = new Map();
  for (const [engine, version] of list) {
    if (!targets.has(engine) || coercedLte(version, targets.get(engine))) {
      targets.set(engine, version);
    }
  }
  return targets;
}

function checkModule(name, targets) {
  if (!has(data, name)) throw new TypeError(`Incorrect module: ${ name }`);
  const requirements = data[name];
  const result = {
    required: false,
    targets: {},
  };
  for (const [engine, version] of targets) {
    if (!has(requirements, engine) || coercedLt(version, requirements[engine])) {
      result.required = true;
      result.targets[engine] = version;
    }
  }
  return result;
}

function compat({ targets, filter, version }) {
  const list = browserslist(targets);
  const engines = normalizeBrowsersList(list);
  const reducedTargets = reduceByMinVersion(engines);

  const result = {
    list: [],
    targets: {},
  };

  let modules = Array.isArray(filter) ? filter : Object.keys(data);

  if (filter instanceof RegExp) modules = modules.filter(it => filter.test(it));
  else if (typeof filter == 'string') modules = modules.filter(it => it.startsWith(filter));

  if (version) {
    const availableModules = new Set(getModulesListForTargetVersion(version));
    modules = modules.filter(name => availableModules.has(name));
  }

  modules.forEach(key => {
    const check = checkModule(key, reducedTargets);
    if (check.required) {
      result.list.push(key);
      result.targets[key] = check.targets;
    }
  });

  return result;
}

module.exports = compat;
module.exports.compat = compat;
module.exports.getModulesListForTargetVersion = getModulesListForTargetVersion;
