import util from 'util';
import fs from 'fs-extra';
import handlebars from 'handlebars';
import { parseRequirements } from 'build/requirements';
import { Logger } from 'build/utilities/logger';

const writeFile = util.promisify(fs.writeFile);

export const generateSitemap = async () => {
  const boundLog = Logger.bind('generateSitemap');
  const { sitemapTemplatePath } = global.settings.sitemap;
  const { xmlPath } = global.settings.paths;
  const template = handlebars.compile(
    fs.readFileSync(sitemapTemplatePath, 'utf-8')
  );
  const requirables = parseRequirements().requirables;
  boundLog(`Generating sitemap for ${requirables.length} routes`, 'info');

  const sitemap = template({
    nodes: [
      { fullRoute: global.yild.mainConfig.websiteUrl, priority: 1.0 },
      ...requirables.filter(n => !n.relRoute.endsWith('404')),
    ],
  });

  await writeFile(`${xmlPath}/sitemap.xml`, sitemap);

  boundLog('Generating sitemap complete', 'success');
};
