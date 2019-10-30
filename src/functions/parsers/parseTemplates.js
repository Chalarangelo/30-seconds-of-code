const path = require(`path`);

/**
 * Combines the given list of templates into an object.
 */
const parseTemplates = (templates, templatesDir) =>
  templates.reduce((acc, tmpl) => {
    acc[tmpl.name] = path.resolve(`${templatesDir}/${tmpl.path}`);
    return acc;
  }, {});

export default parseTemplates;
