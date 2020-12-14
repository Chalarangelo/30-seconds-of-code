export const rawConfigs = {
  blog: {
    name: '30 seconds Blog',
    dirName: '30blog',
    repoUrl: 'https://github.com/30-seconds/30-seconds-blog',
    snippetPath: 'blog_posts',
    slug: 'blog',
    isBlog: true,
    featured: 1,
    theme: {
      backColor: '#1f253d',
      foreColor: '#edf0fc',
      iconName: 'blog',
    },
    biasPenaltyMultiplier: 1,
    images: {
      name: 'blog_images',
      path: 'blog_images',
    },
    cardTemplate: 'BlogSnippetCard',
  },
  css: {
    name: '30 seconds of CSS',
    dirName: '30css',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-css',
    snippetPath: 'snippets',
    language: {
      short: 'css',
      long: 'CSS',
    },
    secondLanguage: {
      short: 'html',
      long: 'HTML',
    },
    optionalLanguage: {
      short: 'js',
      long: 'JavaScript',
    },
    slug: 'css',
    featured: 3,
    theme: {
      backColor: '#3f4de4',
      foreColor: '#ffffff',
      iconName: 'css',
    },
    biasPenaltyMultiplier: 1.05,
    cardTemplate: 'CssSnippetCard',
  },
  react: {
    name: '30 seconds of React',
    dirName: '30react',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-react',
    snippetPath: 'snippets',
    language: {
      short: 'jsx',
      long: 'React',
    },
    optionalLanguage: {
      short: 'css',
      long: 'CSS',
    },
    slug: 'react',
    featured: 4,
    theme: {
      backColor: '#282c34',
      foreColor: '#61dafb',
      iconName: 'react',
    },
    biasPenaltyMultiplier: 1.25,
  },
  dart: {
    name: '30 seconds of Dart',
    dirName: '30dart',
    repoUrl: 'https://github.com/30-seconds/30-seconds-of-dart',
    snippetPath: 'snippets',
    language: {
      short: 'dart',
      long: 'Dart',
    },
    slug: 'dart',
    featured: -1,
    theme: {
      backColor: '#1b2634',
      foreColor: '#ffffff',
      iconName: 'dart',
    },
    biasPenaltyMultiplier: 1.3,
  },
};
