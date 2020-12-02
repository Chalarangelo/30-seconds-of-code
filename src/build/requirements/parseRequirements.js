import path from 'path';
import paths from 'config/paths';
import { JSONParser } from 'build/parsers/json';

/* istanbul ignore next */
const isDevelopment = process.env.NODE_ENV.toLowerCase() === 'development';

/**
 * Combines the given data JSONs, using the data files
 * of the content, returning an array of objects from the files.
 * @param {string} contentDir - The path to the content directory.
 */
export const parseRequirables = contentDir =>
  JSONParser.fromGlob(`${contentDir}/**/index.json`, { withNames: true }).map(
    ([file, data]) =>
      JSONParser.fromGlob(
        `${file.slice(0, file.lastIndexOf('/'))}/!(index).json`,
        {
          reduced: true,
          reducer: (acc, dataFile) => {
            acc.context = {
              ...acc.context,
              ...require(path.resolve(dataFile)),
            };
            return acc;
          },
          initialValue: data,
        }
      )
  );

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
  templates: parseTemplates(paths.templates, paths.templatesPath),
  requirables: parseRequirables(paths.contentPath),
});

export default parseRequirements;
