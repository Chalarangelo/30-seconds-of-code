import fs from 'fs-extra';
import recommendationEngine from 'engines/recommendationEngine';

const postProcess = (allData, allSnippetData, parentLog) => {
  const boundLog = parentLog.rebind('postProcess');

  return allData.map(async({ snippetsPath, data }) => {
    const {
      contentPath: contentOutDir,
    } = global._yild_instance.config.paths;
    boundLog(`Post-processing snippets for ${snippetsPath}`, 'info');

    for (let snippet of data.data) {
      const recommendedSnippets = recommendationEngine(allSnippetData, snippet)
        .map(({
          id, title, expertise, tags, language,
          icon, html, slug, searchTokens,
          recommendationRanking,
        }) => ({
          id, title, expertise, icon, slug, searchTokens,
          recommendationRanking: +recommendationRanking,
          html: {
            description: html.description,
          },
          tags: {
            primary: tags.primary,
          },
          language: {
            short: language.short,
            long: language.long,
          },
        }));

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
