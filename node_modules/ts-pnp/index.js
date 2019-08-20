let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

function resolveModuleName(request, issuer, compilerOptions, moduleResolutionHost, parentResolver) {
  const topLevelLocation = pnp.getPackageInformation(pnp.topLevel).packageLocation;

  const [, prefix = ``, packageName = ``, rest] = request.match(/^(!(?:.*!)+)?((?!\.{0,2}\/)(?:@[^\/]+\/)?[^\/]+)?(.*)/);

  let failedLookupLocations = [];

  // First we try the resolution on "@types/package-name" starting from the project root
  if (packageName) {
    const typesPackagePath = `@types/${packageName.replace(/\//g, `__`)}${rest}`;

    let unqualified;
    try {
      unqualified = pnp.resolveToUnqualified(typesPackagePath, `${topLevelLocation}/`, {considerBuiltins: false});
    } catch (error) {}

    if (unqualified) {
      // TypeScript checks whether the directory of the candidate is a directory
      // which may cause issues w/ zip loading (since the zip archive is still
      // reported as a file). To workaround this we add a trailing slash, which
      // causes TypeScript to assume the parent is a directory.
      if (moduleResolutionHost.directoryExists && moduleResolutionHost.directoryExists(unqualified))
        unqualified += `/`;

      const finalResolution = parentResolver(unqualified, issuer, compilerOptions, moduleResolutionHost);

      if (finalResolution.resolvedModule || finalResolution.resolvedTypeReferenceDirective) {
        return finalResolution;
      } else {
        failedLookupLocations = failedLookupLocations.concat(finalResolution.failedLookupLocations);
      }
    }
  }

  // Then we try on "package-name", this time starting from the package that makes the request
  if (true) {
    const regularPackagePath = `${packageName || ``}${rest}`;

    let unqualified;
    try {
      unqualified = pnp.resolveToUnqualified(regularPackagePath, issuer, {considerBuiltins: false});
    } catch (error) {}

    if (unqualified) {
      // TypeScript checks whether the directory of the candidate is a directory
      // which may cause issues w/ zip loading (since the zip archive is still
      // reported as a file). To workaround this we add a trailing slash, which
      // causes TypeScript to assume the parent is a directory.
      if (moduleResolutionHost.directoryExists && moduleResolutionHost.directoryExists(unqualified))
        unqualified += `/`;

      const finalResolution = parentResolver(unqualified, issuer, compilerOptions, moduleResolutionHost);

      if (finalResolution.resolvedModule || finalResolution.resolvedTypeReferenceDirective) {
        return finalResolution;
      } else {
        failedLookupLocations = failedLookupLocations.concat(finalResolution.failedLookupLocations);
      }
    }
  }

  return {
    resolvedModule: undefined,
    resolvedTypeReferenceDirective: undefined,
    failedLookupLocations,
  };
}

module.exports.resolveModuleName = pnp
  ? resolveModuleName
  : (moduleName, containingFile, compilerOptions, compilerHost, resolveModuleName) =>
      resolveModuleName(moduleName, containingFile, compilerOptions, compilerHost);
