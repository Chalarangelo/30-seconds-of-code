import OptimizeCssAssetsPlugin from '../src/';

describe('plugin test', () => {
  it('does not throw when called', () => {
    expect(() => {
      new OptimizeCssAssetsPlugin();
    }).not.toThrow();
  });

  it('can override default parameters', () => {
    const assetNameRegExp = /\.optimize\.css$/
    const cssProcessor = {};
    const cssProcessorOptions = { discardComments: { removeAll: true } };
    const canPrint = false;
    const plugin = new OptimizeCssAssetsPlugin({
      assetNameRegExp,
      cssProcessor,
      cssProcessorOptions,
      canPrint
    });
    expect(plugin.options.assetNameRegExp).toEqual(assetNameRegExp);
    expect(plugin.options.cssProcessor).toEqual(cssProcessor);
    expect(plugin.options.cssProcessorOptions).toEqual(cssProcessorOptions);
    expect(plugin.options.canPrint).toEqual(canPrint);
  });
});
