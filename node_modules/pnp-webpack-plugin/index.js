const path = require(`path`);
const {resolveModuleName} = require(`ts-pnp`);

let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

function nothing() {
  // ¯\_(ツ)_/¯
}

function getModuleLocator(module) {
  const moduleLocation = typeof module === `string`
    ? module
    : module.filename;

  if (!moduleLocation)
    throw new Error(`The specified module doesn't seem to exist on the filesystem`);

  const moduleLocator = pnp.findPackageLocator(moduleLocation);

  if (!moduleLocator)
    throw new Error(`the specified module doesn't seem to be part of the dependency tree`);

  return moduleLocator;
}

function getDependencyLocator(sourceLocator, name) {
  const {packageDependencies} = pnp.getPackageInformation(sourceLocator);
  const reference = packageDependencies.get(name);

  return {name, reference};
}

function getSourceLocation(sourceLocator) {
  if (!sourceLocator)
    return null;

  const sourceInformation = pnp.getPackageInformation(sourceLocator);

  if (!sourceInformation)
    throw new Error(`Couldn't find the package to use as resolution source`);

  if (!sourceInformation.packageLocation)
    throw new Error(`The package to use as resolution source seem to not have been installed - maybe it's a devDependency not installed in prod?`);

  return sourceInformation.packageLocation.replace(/\/?$/, `/`);
}

function makeResolver(sourceLocator, filter) {
  const sourceLocation = getSourceLocation(sourceLocator);

  return resolver => {
    const BACKWARD_PATH = /^\.\.([\\\/]|$)/;

    const resolvedHook = resolver.ensureHook(`resolve`);

    // Prevents the SymlinkPlugin from kicking in. We need the symlinks to be preserved because that's how we deal with peer dependencies ambiguities.
    resolver.getHook(`file`).intercept({
      register: tapInfo => {
        return tapInfo.name !== `SymlinkPlugin` ? tapInfo : Object.assign({}, tapInfo, {fn: (request, resolveContext, callback) => {
          callback();
        }});
      }
    });

    // Register a plugin that will resolve bare imports into the package location on the filesystem before leaving the rest of the resolution to Webpack
    resolver.getHook(`before-module`).tapAsync(`PnpResolver`, (requestContext, resolveContext, callback) => {
      let request = requestContext.request;
      let issuer = requestContext.context.issuer;

      // When using require.context, issuer seems to be false (cf https://github.com/webpack/webpack-dev-server/blob/d0725c98fb752d8c0b1e8c9067e526e22b5f5134/client-src/default/index.js#L94)
      if (!issuer) {
        issuer = `${requestContext.path}/`;
      // We only support issuer when they're absolute paths. I'm not sure the opposite can ever happen, but better check here.
      } else if (!path.isAbsolute(issuer)) {
        throw new Error(`Cannot successfully resolve this dependency - issuer not supported (${issuer})`);
      }

      if (filter) {
        const relative = path.relative(filter, issuer);
        if (path.isAbsolute(relative) || BACKWARD_PATH.test(relative)) {
          return callback(null);
        }
      }

      let resolutionIssuer = sourceLocation || issuer;
      let resolution;

      try {
        resolution = pnp.resolveToUnqualified(request, resolutionIssuer, {considerBuiltins: false});
      } catch (error) {
        return callback(error);
      }

      resolver.doResolve(
        resolvedHook,
        Object.assign({}, requestContext, {
          request: resolution,
        }),
        null,
        resolveContext,
        callback
      );
    });
  };
}

module.exports = pnp ? {
  apply: makeResolver(null),
} : {
  apply: nothing,
};

module.exports.makePlugin = (locator, filter) => pnp ? {
  apply: makeResolver(locator, filter),
} : {
  apply: nothing,
};

module.exports.moduleLoader = module => pnp ? {
  apply: makeResolver(getModuleLocator(module)),
} : {
  apply: nothing,
};

module.exports.topLevelLoader = pnp ? {
  apply: makeResolver(pnp.topLevel),
} : {
  apply: nothing,
};

module.exports.bind = (filter, module, dependency) => pnp ? {
  apply: makeResolver(dependency ? getDependencyLocator(getModuleLocator(module), dependency) : getModuleLocator(module), filter),
} : {
  apply: nothing,
};

module.exports.tsLoaderOptions = (options = {}) => pnp ? Object.assign({}, options, {
  resolveModuleName: resolveModuleName,
  resolveTypeReferenceDirective: resolveModuleName,
}) : options;

module.exports.forkTsCheckerOptions = (options = {}) => pnp ? Object.assign({}, options, {
  resolveModuleNameModule: require.resolve(`./ts`),
  resolveTypeReferenceDirectiveModule: require.resolve(`./ts`),
}) : options;
