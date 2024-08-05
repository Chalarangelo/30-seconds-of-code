const contentDir = 'spec/fixtures/content';
const outputPath = '.content/content_test.json';
const assetPath = `assets`;
const publicPath = `public`;
const collectionGlob = `${contentDir}/collections/**/*.yaml`;
const snippetGlob = `${contentDir}/snippets/**/s/*.md`;
const languageGlob = `${contentDir}/languages/*.yaml`;
const grammarPath = `${contentDir}/grammars.yaml`;
const rankingEnginePath = `${contentDir}/rankingEngine.yaml`;
const hubPath = `${contentDir}/hub.yaml`;
const snippetPrefix = `${contentDir}/snippets/`;

export const config = {
  contentDir,
  outputPath,
  assetPath,
  publicPath,
  collectionGlob,
  snippetGlob,
  languageGlob,
  grammarPath,
  rankingEnginePath,
  hubPath,
  snippetPrefix,
};
