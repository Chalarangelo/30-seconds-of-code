import fs from 'fs-extra';
import recommendationEngine from 'engines/recommendationEngine';
import { transformSnippetIndex } from 'build/transformers';

const postProcess = (allData, allSnippetData, parentLog) => {
  const boundLog = parentLog.rebind('postProcess');

  return allData.map(async({ snippetsPath, data }) => {
    const {
      contentPath: contentOutDir,
    } = global._yild_instance.config.paths;
    boundLog(`Post-processing snippets for ${snippetsPath}`, 'info');

    for (let snippet of data.data) {
      const recommendedSnippets = transformSnippetIndex(
        recommendationEngine(allSnippetData, snippet).map(v => ( { node: v }))
      );

      const outDir = `${contentOutDir}/${snippet.slug.slice(1)}`;
      fs.ensureDirSync(outDir);
      await fs.writeFile(
        `${outDir}/recommendations.json`,
        JSON.stringify(recommendedSnippets, null, 2)
      );
    }
  });
};

export default postProcess;
