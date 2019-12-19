/**
 * When called, allows modifying the default webpack config using webpack-merge.
 * Removes sourcemaps from production builds.
 */
const onCreateWebpackConfig = ({ actions, stage }) => {
  // If production JavaScript and CSS build
  if (stage === 'build-javascript') {
    // Turn off source maps
    actions.setWebpackConfig({
      devtool: false,
    });
  }
};

export default onCreateWebpackConfig;
