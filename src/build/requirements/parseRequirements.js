import glob from 'glob';
import path from 'path';
import paths from 'config/paths';

/* istanbul ignore next */
const isDevelopment = process.env.NODE_ENV.toLowerCase() === 'development';

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
 * Returns an object containing templates and requirables.
 */
export const parseRequirements = () => ({
  templates: parseTemplates(
    isDevelopment ? paths.devTemplates : paths.templates,
    paths.templatesPath
  ),
  requirables: parseRequirables(paths.contentPath),
});

export default parseRequirements;
