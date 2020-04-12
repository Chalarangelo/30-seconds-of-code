const path = require(`path`);

/**
 * Combines the given list of templates into an object.
 * @param {array} templates - An array of templates.
 * @param {string} templatesDir - The path to the template directory.
 */
const parseTemplates = (templates, templatesDir) =>
  templates.reduce((acc, tmpl) => {
    acc[tmpl.name] = path.resolve(`${templatesDir}/${tmpl.path}`);
    return acc;
  }, {});

export default parseTemplates;
