import chokidar from 'chokidar';
import paths from 'settings/paths';
import fs from 'fs-extra';
import { Snippet } from 'blocks/entities/snippet';
import { SnippetContext } from 'blocks/adapters/snippetContext';
import { TextParser } from 'blocks/parsers/text';
import { SnippetSerializer } from 'blocks/serializers/snippet';
import { Path } from 'blocks/utilities/path';

const watchFiles = (contentDir, templates, { actions, store }) => {
  const { createPage, deletePage } = actions;
  const deletePageIfExists = slug => {
    const page = store.getState().pages.get(slug);
    if (page) deletePage({ path: page.path, component: page.component });
  };
  const watcher = chokidar.watch(`${contentDir}/**/*.md`, {
    ignored: `${contentDir}/**/README.md`,
    persistent: true,
  });
  let isReady = false;

  const updateSnippet = path => {
    const config = Path.findContentConfigFromRawSnippet(path);
    TextParser.fromPath(path, {
      withMetadata: true,
    }).then(async data => {
      const snippet = new Snippet(data, config);
      await SnippetSerializer.serializeSnippet(snippet);
      createPage({
        path: snippet.slug.startsWith('/') ? snippet.slug : `/${snippet.slug}`,
        component: templates['SnippetPage'],
        context: {
          snippet: new SnippetContext(snippet).toObject({
            withVscodeUrl: true,
          }),
          cardTemplate: config.cardTemplate,
          breadcrumbs: snippet.breadcrumbs,
          pageDescription: snippet.seoDescription,
        },
      });
    });
  };
  const deleteSnippet = path => {
    const slug = Path.findSlugFromRawSnippet(path);
    fs.removeSync(slug);
    deletePageIfExists(slug);
  };

  watcher
    .on('ready', () => {
      isReady = true;
    })
    .on('add', path => {
      if (isReady) updateSnippet(path);
    })
    .on('change', path => {
      if (isReady) updateSnippet(path);
    })
    .on('unlink', path => {
      if (isReady) deleteSnippet(path);
    });

  return watcher;
};

/**
 * Tell plugins to add pages.
 * Takes a list of requirable objects and a templates object.
 * Creates pages by running createPage for each ne.
 */
const createPagesStatefully = (templates, requirables) => ({
  actions,
  store,
}) => {
  const { createPage } = actions;

  // First pass, create pages for files.
  requirables.forEach(req => {
    let context = { ...req.context };
    if (process.env.NODE_ENV === 'development' && req.context.snippet)
      context.snippet.vscodeUrl = req.vscodeUrl;
    createPage({
      path: req.relRoute,
      component: templates[req.template],
      context,
    });
  });

  const mainListing = requirables.find(req => req.context.isMainListing);
  createPage({
    path: '/',
    component: templates[mainListing.template],
    context: mainListing.context,
  });

  if (process.env.NODE_ENV === 'development') {
    watchFiles(paths.rawContentPath, templates, { actions, store });
    createPage({
      path: '/developer',
      component: templates['DeveloperPage'],
      context: {
        configs: process.configs.map(cfg => ({
          name: cfg.name,
          sourceDir: cfg.sourceDir,
          slugPrefix: cfg.slugPrefix,
        })),
      },
    });
  }
};

export default createPagesStatefully;
