import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import { hasKeys } from 'utils';
import logger from '../logOutput';
import extract from './extract';
import postProcess from './postProcess';

const extractSnippetData = async(inPath, outPath, boundLog) => {
  boundLog(`Loading individual configuration files in ${path.resolve(inPath, 'configs')}`, 'info');
  let configs = [];
  glob.sync(`${inPath}/configs/*.json`)
    .forEach( file => {
      configs.push(
        require( path.resolve( file ) )
      );
    });
  boundLog(`Loaded ${configs.length} configuration files`, 'success');

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

const extractSnippets = async() => {
  const boundLog = logger.bindProcessLogger('extractSnippets');
  if(typeof global._coeus_instance === 'undefined' || typeof global._coeus_instance.config === 'undefined')
    return logger.log('Fatal error: coeus instance or config not found. Exiting...', 'error');

  const config = global._coeus_instance.config;
  boundLog('Extracting snippets from config...', 'info');

  if (hasKeys(config.paths, ['contentPath', 'rawContentPath']))
    await extractSnippetData(config.paths.rawContentPath, config.paths.contentPath, boundLog);

};

export default extractSnippets;
