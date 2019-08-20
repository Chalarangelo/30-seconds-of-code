"use strict";

var _graphql = require("graphql");

module.exports = schema => {
  return {
    useEslintrc: false,
    baseConfig: {
      globals: {
        graphql: true,
        __PATH_PREFIX__: true,
        __BASE_PATH__: true // this will rarely, if ever, be used by consumers

      },
      extends: `react-app`,
      plugins: [`graphql`],
      rules: {
        "import/no-webpack-loader-syntax": [0],
        "graphql/template-strings": [`error`, {
          env: `relay`,
          schemaString: (0, _graphql.printSchema)(schema, {
            commentDescriptions: true
          }),
          tagName: `graphql`
        }]
      }
    }
  };
};
//# sourceMappingURL=eslint-config.js.map