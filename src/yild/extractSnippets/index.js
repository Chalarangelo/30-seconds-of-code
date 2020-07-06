import fs from 'fs-extra';
import { initAction, loadContentConfigs } from '../core';
import extract from './extract';
import postProcess from './postProcess';

const extractSnippets = async() => {
  const [boundLog, , inPath, outPath] = initAction('extractSnippets', [
    ['paths', 'rawContentPath'], ['paths', 'contentPath'],
  ]);

  boundLog('Extracting snippets from config...', 'info');
  const configs = loadContentConfigs(inPath, boundLog);
  const langData = configs
    .filter(cfg =>
      cfg.language && cfg.language.long &&
      cfg.theme && cfg.theme.iconName
    )
    .map(cfg => ({
      language: cfg.language.long.toLowerCase(),
      icon: cfg.theme.iconName,
    }));
  boundLog(`Processed data for ${langData.length} languages`, 'success');

  boundLog('Extracting snippet data', 'info');
  fs.ensureDirSync(outPath);
  let allData = [];
  await Promise
    .all(extract(configs, langData, boundLog))
    .then(res => { allData = res; });
  const allSnippetData = allData.reduce((acc, r) => [...acc, ...r.data.data], []);
  boundLog(`Extracted data for ${allSnippetData.length} snippets`, 'success');

  boundLog('Post-processing snippet data', 'info');
  await Promise
    .all(postProcess(allData, allSnippetData, boundLog));
  boundLog('Snippet post-processing complete', 'success');

  return;
};

export default extractSnippets;
