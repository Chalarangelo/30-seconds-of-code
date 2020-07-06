import fs from 'fs-extra';
import recommendationEngine from 'engines/recommendationEngine';

const postProcess = (allData, allSnippetData, parentLog) => {
  const boundLog = parentLog.rebind('postProcess');

  return allData.map(({ outputFile, data }) => new Promise((resolve, reject) => {
    boundLog(`Post-processing snippets for ${outputFile}`, 'info');
    const outputData = {
      data: data.data.map(snippet => {
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
        return {
          ...snippet,
          recommendedSnippets,
        };
      }),
      meta: data.meta,
    };
    fs.writeFile(
      outputFile,
      JSON.stringify(outputData, null, 2),
      err => {
        if (err) {
          boundLog(`Encountered an error while writing ${outputFile}`, 'error');
          boundLog(`${err}`, 'error');
          reject(err);
        } else {
          boundLog(`Finished writing ${outputFile}`, 'success');
          resolve();
        }
      }
    );
  }));
};

export default postProcess;
