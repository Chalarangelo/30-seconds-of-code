'use strict';
const concat = require('../utils').concat;

function isRelative (module) {
  return module.startsWith('./') || module.startsWith('../');
}

function formatFileList (files) {
  const length = files.length;
  if (!length) return '';
  return ` in ${files[0]}${files[1] ? `, ${files[1]}` : ''}${length > 2 ? ` and ${length - 2} other${length === 3 ? '' : 's'}` : ''}`;
}

function formatGroup (group) {
  const files = group.errors.map(e => e.file).filter(Boolean);
  return `* ${group.module}${formatFileList(files)}`;
}


function forgetToInstall (missingDependencies) {
  const moduleNames = missingDependencies.map(missingDependency => missingDependency.module);

  if (missingDependencies.length === 1) {
    return `To install it, you can run: npm install --save ${moduleNames.join(' ')}`;
  }

  return `To install them, you can run: npm install --save ${moduleNames.join(' ')}`;
}

function dependenciesNotFound (dependencies) {
  if (dependencies.length === 0) return;

  return concat(
    dependencies.length === 1 ? 'This dependency was not found:' : 'These dependencies were not found:',
    '',
    dependencies.map(formatGroup),
    '',
    forgetToInstall(dependencies)
  );
}

function relativeModulesNotFound (modules) {
  if (modules.length === 0) return;

  return concat(
    modules.length === 1 ? 'This relative module was not found:' : 'These relative modules were not found:',
    '',
    modules.map(formatGroup)
  );
}

function groupModules (errors) {
  const missingModule = new Map();

  errors.forEach((error) => {
    if (!missingModule.has(error.module)) {
      missingModule.set(error.module, [])
    }
    missingModule.get(error.module).push(error);
  });

  return Array.from(missingModule.keys()).map(module => ({
    module: module,
    relative: isRelative(module),
    errors: missingModule.get(module),
  }));
}

function formatErrors (errors) {
  if (errors.length === 0) {
    return [];
  }

  const groups = groupModules(errors);

  const dependencies = groups.filter(group => !group.relative);
  const relativeModules = groups.filter(group => group.relative);

  return concat(
    dependenciesNotFound(dependencies),
    dependencies.length && relativeModules.length ? ['', ''] : null,
    relativeModulesNotFound(relativeModules)
  );
}

function format (errors) {
  return formatErrors(errors.filter((e) => (
    e.type === 'module-not-found'
  )));
}

module.exports = format;
