import fs from 'fs-extra';
import { initAction, loadContentConfigs } from '../core';
import extract from './extract';
import postProcess from './postProcess';
import literals from 'lang/en';

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

  // TODO: Temporary, let's move this after the next restructure
  [
    {
      slug: '/404',
      context: {},
      template: 'NotFoundPage',
      priority: 0.0,
    },
    {
      slug: '/about',
      context: {stringLiterals: literals.about},
      template: 'StaticPage',
      priority: 0.25,
    },
    {
      slug: '/cookies',
      context: {stringLiterals: literals.cookies},
      template: 'StaticPage',
      priority: 0.25,
    },
    {
      slug: '/settings',
      context: {stringLiterals: literals.settings},
      template: 'SettingsPage',
      priority: 0.01,
    },
  ].forEach(p => {
    const outDir = `${outPath}${p.slug}`;
    fs.ensureDirSync(outDir);
    fs.writeFileSync(
      `${outDir}/index.json`,
      JSON.stringify({
        template: p.template,
        fullRoute: `https://30secondsofcode.org${p.slug}`,
        relRoute: p.slug,
        priority: p.priority,
      }, null, 2)
    );
    fs.writeFileSync(`${outDir}/context.json`, JSON.stringify(p.context, null, 2));
  });

  return;
};

export default extractSnippets;
