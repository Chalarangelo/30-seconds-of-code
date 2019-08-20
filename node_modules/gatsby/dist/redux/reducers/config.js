"use strict";

const chalk = require(`chalk`);

const {
  gatsbyConfigSchema
} = require(`../../joi-schemas/joi`);

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `SET_SITE_CONFIG`:
      {
        // Validate the config.
        const result = gatsbyConfigSchema.validate(action.payload || {});
        const normalizedPayload = result.value; // TODO use Redux for capturing errors from different
        // parts of Gatsby so a) can capture richer errors and b) be
        // more flexible how to display them.

        if (result.error) {
          console.log(chalk.blue.bgYellow(`The site's gatsby-config.js failed validation`));
          console.log(chalk.bold.red(result.error));

          if (normalizedPayload.linkPrefix) {
            console.log(`"linkPrefix" should be changed to "pathPrefix"`);
          }

          throw new Error(`The site's gatsby-config.js failed validation`);
        }

        return normalizedPayload;
      }

    default:
      return state;
  }
};
//# sourceMappingURL=config.js.map