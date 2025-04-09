import MarkdownParser from '#src/lib/contentUtils/markdownParser/markdownParser.js';
import Ranker from '#src/lib/contentUtils/ranker.js';
import FileHandler from '#src/lib/contentUtils/fileHandler.js';
import PrismHighlighter from '#src/lib/contentUtils/markdownParser/codeHighlighters/prism.js';
import ShikiHighlighter from '#src/lib/contentUtils/markdownParser/codeHighlighters/shiki.js';
import {
  grammarPath,
  rankingEnginePath,
  hubPath,
  languageGlob,
  snippetGlob,
  collectionGlob,
} from '#src/lib/contentUtils/config.js';
import { extractLanguageData } from '#src/lib/contentUtils/modelWorkers/language.js';
import { extractSnippetData } from '#src/lib/contentUtils/modelWorkers/snippet.js';
import { extractCollectionData } from '#src/lib/contentUtils/modelWorkers/collection.js';
import { extractCollectionSnippetData } from '#src/lib/contentUtils/modelWorkers/collectionSnippet.js';

export const extractData = async (highlighter = 'shiki') => {
  const languages = await extractLanguageData(languageGlob);
  const grammars = await FileHandler.read(grammarPath);
  const hub = await FileHandler.read(hubPath);
  const keywordData = await FileHandler.read(rankingEnginePath);

  const codeHighlighter =
    highlighter === 'shiki' ? ShikiHighlighter : PrismHighlighter;
  codeHighlighter.setup(grammars);

  MarkdownParser.setupProcessors({ languages, grammars, codeHighlighter });
  Ranker.keywordScores = keywordData;

  const snippets = await extractSnippetData(snippetGlob, languages);
  const collections = await extractCollectionData(collectionGlob, hub);
  const collectionSnippets = extractCollectionSnippetData(
    collections,
    snippets
  );

  return { collections, snippets, languages, collectionSnippets, hub };
};
