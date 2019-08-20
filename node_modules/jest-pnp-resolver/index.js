
let pnp;

try {
  pnp = require(`pnpapi`);
} catch (error) {
  // not in PnP; not a problem
}

let defaultResolver;

function requireDefaultResolver() {
  if (!defaultResolver) {
    try {
      defaultResolver = require(`jest-resolve/build/defaultResolver`).default;
    } catch (error) {
      defaultResolver = require(`jest-resolve/build/default_resolver`).default;
    }
  }

  return defaultResolver;
}

module.exports = (request, options) => {
  const {basedir, defaultResolver, extensions} = options;

  if (pnp) {
    const resolution = pnp.resolveRequest(request, `${basedir}/`, {extensions});

    // When the request is a native module, Jest expects to get the string back unmodified, but pnp returns null instead.
    if (resolution === null)
      return request;

    return resolution;
  } else {
    if (!defaultResolver)
      defaultResolver = requireDefaultResolver();

    return defaultResolver(request, options);
  }
};
