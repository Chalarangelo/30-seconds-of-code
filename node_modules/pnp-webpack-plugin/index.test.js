const path = require(`path`);
let PnpWebpackPlugin = require(`./index`);

function makeResolver(resolverPlugins, options = {}) {
  const {
    NodeJsInputFileSystem,
    CachedInputFileSystem,
    ResolverFactory
  } = require('enhanced-resolve');

  const resolver = ResolverFactory.createResolver({
    fileSystem: new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000),
    extensions: ['.js', '.json'],
    ... options,
  });

  for (const {apply} of resolverPlugins)
    apply(resolver);

  return resolver;
}

function makeRequest(resolver, request, issuer) {
  return new Promise((resolve, reject) => {
    resolver.resolve({}, issuer, request, {}, (err, filepath) => {
      if (err) {
        reject(err);
      } else {
        resolve(filepath);
      }
    });
  });
}

describe(`Regular Plugin`, () => {
  it(`should correctly resolve a relative require`, async () => {
    const resolver = makeResolver([PnpWebpackPlugin]);
    const resolution = await makeRequest(resolver, `./index.js`, __dirname);

    expect(resolution).toEqual(path.normalize(`${__dirname}/index.js`));
  });

  it(`shouldn't prevent the 'extensions' option from working`, async () => {
    const resolver = makeResolver([PnpWebpackPlugin]);
    const resolution = await makeRequest(resolver, `./index`, __dirname);

    expect(resolution).toEqual(path.normalize(`${__dirname}/index.js`));
  });

  it(`shouldn't prevent the 'alias' option from working`, async () => {
    const resolver = makeResolver([PnpWebpackPlugin], {alias: {[`foo`]: `./fixtures/index.js`}});
    const resolution = await makeRequest(resolver, `foo`, __dirname);

    expect(resolution).toEqual(path.normalize(`${__dirname}/fixtures/index.js`));
  });

  it(`shouldn't prevent the 'modules' option from working`, async () => {
    const resolver = makeResolver([PnpWebpackPlugin], {modules: [`./fixtures`]});
    const resolution = await makeRequest(resolver, `file`, __dirname);

    expect(resolution).toEqual(path.normalize(`${__dirname}/fixtures/file.js`));
  });
});
