"use strict";

const GatsbyThemeComponentShadowingResolverPlugin = require(`.`);

exports.onCreateWebpackConfig = ({
  store,
  stage,
  getConfig,
  rules,
  loaders,
  actions
}, pluginOptions) => {
  const {
    themes,
    flattenedPlugins
  } = store.getState();
  actions.setWebpackConfig({
    resolve: {
      plugins: [new GatsbyThemeComponentShadowingResolverPlugin({
        themes: themes.themes ? themes.themes : flattenedPlugins.map(plugin => {
          return {
            themeDir: plugin.pluginFilepath,
            themeName: plugin.name
          };
        })
      })]
    }
  });
};
//# sourceMappingURL=gatsby-node.js.map