import glob from 'glob';
import path from 'path';

/**
 * Combines the given data JSONs, using the data files
 * of the content, returning an array of objects from the files.
 * @param {string} contentDir - The path to the content directory.
 */
export const parseRequirables = contentDir =>
  glob.sync(`${contentDir}/**/index.json`).map(file =>
    glob.sync(`${file.slice(0, file.lastIndexOf('/'))}/!(index).json`)
      .reduce((acc, dataFile) => {
        acc.context = { ...acc.context, ...require(path.resolve(dataFile)) };
        return acc;
      }, { ...require(path.resolve(file)), context: {} }));

/**
 * Combines the given list of templates into an object.
 * @param {array} templates - An array of templates.
 * @param {string} templatesDir - The path to the template directory.
 */
export const parseTemplates = (templates, templatesDir) =>
  templates.reduce((acc, tmpl) => {
    acc[tmpl.name] = path.resolve(`${templatesDir}/${tmpl.path}`);
    return acc;
  }, {});

/* istanbul ignore next */
/**
 * Returns an object containing templates and requirables created by
 * combining the given template and content parameters.
 * @param {array} templates - An array of templates.
 * @param {string} templatesDir - The path to the template directory.
 * @param {string} contentDir - The path to the content directory.
 */
const parseRequirements = (templates, templatesDir, contentDir) => ({
  templates: parseTemplates(templates, templatesDir),
  requirables: parseRequirables(contentDir),
});

export default parseRequirements;
