/**
 * When called, allows modifying the default webpack config using webpack-merge.
 */
const onCreateWebpackConfig = ({ actions, stage }) => {
  // If production JavaScript build, turn off source maps, otherwise use defaults
  const devtool = stage === 'develop'
    ? 'cheap-module-source-map'
    : stage === 'build-javascript'
      ? false
      : 'source-map';
  actions.setWebpackConfig({
    devtool,
  });
};

export default onCreateWebpackConfig;
