import path from 'node:path';
import { globSync } from 'glob';
import fs from 'fs-extra/esm';
import yaml from 'js-yaml';
import frontmatter from 'front-matter';
import { readFile, writeFile } from 'node:fs/promises';

const frontmatterReader = (data, filePath) => {
  const { body, attributes } = frontmatter(data);
  const { language = null, ...restAttributes } = attributes;
  return {
    body,
    ...restAttributes,
    language,
    filePath,
  };
};

const readers = {
  json: data => JSON.parse(data),
  yaml: data => yaml.load(data),
  md: (data, filePath) => frontmatterReader(data, filePath),
};

const writers = {
  json: data => JSON.stringify(data, null, 2),
  yaml: data => yaml.dump(data, { indent: 2 }),
};

const parseFile = (filePath, mode) =>
  readFile(filePath, 'utf8').then(data => readers[mode](data, filePath));

const getMode = (filePath, mode) => {
  if (mode) return mode;
  const ext = path.extname(filePath).slice(1);
  return ext === 'yml' ? 'yaml' : ext;
};

export default class FileHandler {
  static read = (globPattern, mode) => {
    mode = getMode(globPattern, mode);
    const files = globSync(globPattern);

    if (files.length === 0) return null;
    if (files.length === 1) return parseFile(files[0], mode);
    return Promise.all(files.map(file => parseFile(file, mode)));
  };

  static write = (filePath, data, mode) => {
    mode = getMode(filePath, mode);
    fs.ensureDirSync(path.dirname(filePath));
    return writeFile(filePath, writers[mode](data));
  };
}
