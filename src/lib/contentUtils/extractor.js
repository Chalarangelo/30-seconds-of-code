import { MarkdownParser } from './markdownParser/markdownParser.js';
import { Ranker } from './ranker.js';
import { FileHandler } from './fileHandler.js';
import {
  grammarPath,
  rankingEnginePath,
  hubPath,
  languageGlob,
  snippetGlob,
  collectionGlob,
} from './config.js';
import { extractLanguageData } from './modelWorkers/language.js';
import { extractSnippetData } from './modelWorkers/snippet.js';
import { extractCollectionData } from './modelWorkers/collection.js';
import { extractCollectionSnippetData } from './modelWorkers/collectionSnippet.js';

export const extractData = async () => {
  const languages = await extractLanguageData(languageGlob);
  const grammars = await FileHandler.read(grammarPath);
  const hub = await FileHandler.read(hubPath);
  const keywordData = await FileHandler.read(rankingEnginePath);

  MarkdownParser.setupProcessors({ languages, grammars });
  Ranker.keywordScores = keywordData;

  const snippets = await extractSnippetData(snippetGlob, languages);
  const collections = await extractCollectionData(collectionGlob, hub);
  const collectionSnippets = extractCollectionSnippetData(
    collections,
    snippets
  );

  return { collections, snippets, languages, collectionSnippets, hub };
};
