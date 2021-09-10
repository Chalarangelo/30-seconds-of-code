import glob from 'glob';
import path from 'path';
import { readFile } from 'fs/promises';

const readJSON = file =>
  new Promise(res => readFile(file).then(d => res(JSON.parse(d))));

const readNamedJSON = file =>
  new Promise(res => readFile(file).then(d => res([file, JSON.parse(d)])));

/**
 * Get the props for a static page (e.g. '/about').
 * @param {string} name - Path/name of the page.
 */
export const getStaticPageProps = async name => {
  const files = glob
    .sync(`.content/${name}/!(index).json`)
    .map(x => path.resolve(x));

  const jsonData = await Promise.all(files.map(readJSON));
  const pageData = jsonData.reduce((acc, data) => {
    return { ...data, ...acc };
  }, {});

  return {
    props: {
      ...pageData,
    },
  };
};

/**
 * Get the props for a dynamic page (e.g. a snippet or listing page).
 * @param {string} name - Path/name of the page.
 */
export const getDynamicPageProps = async name => {
  const files = glob.sync(`.content/${name}/*.json`).map(x => path.resolve(x));

  const jsonData = await Promise.all(files.map(readNamedJSON));
  const pageData = jsonData.reduce(
    (acc, [fileName, data]) => {
      if (fileName.endsWith('index.json')) return { ...data, ...acc };
      else return { ...acc, context: { ...acc.context, ...data } };
    },
    { context: {} }
  );

  return {
    props: {
      ...pageData.context,
    },
  };
};

/**
 * Get the raw path strings for a page template (e.g. 'ListingPage').
 * @param {string} template - Name of the template.
 */
export const getPageTypePaths = async template => {
  const pages = glob.sync('.content/**/index.json').map(x => path.resolve(x));
  const pageDatas = await Promise.all(pages.map(readJSON));
  return pageDatas.filter(p => p.template === template);
};
