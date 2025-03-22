const settings = {
  website: {
    name: '30 seconds of code',
    shortName: '30s',
    url: 'https://www.30secondsofcode.org',
    description: 'Coding articles to level up your development skills',
    seoDescription({ snippetCount, websiteName }) {
      return `Browse ${snippetCount} coding articles to level up your coding skills on ${websiteName}.`;
    },
  },
  owner: {
    name: 'Angelos Chalaris',
    url: 'https://chalarangelo.me',
  },
  repository: {
    url: 'https://github.com/Chalarangelo/30-seconds-of-code',
    snippetPrefix:
      'https://github.com/Chalarangelo/30-seconds-of-code/blob/master/content/snippets',
  },
  license: {
    url: 'https://creativecommons.org/licenses/by/4.0/',
  },
  manifest: {
    cacheKey: '30swp20231218115417',
  },
  presentation: {
    cardsPerPage: 24,
    collectionCardsPerPage: 12,
    collectionPreviewTag: 'Collection',
    articlePreviewTag: 'Article',
  },
  home: {
    cover: 'work-sunrise',
    newSnippetCards: 6,
    topSnippetCards: 6,
    topCollectionChips: 7,
  },
  collections: {
    mainCollectionId: 'snippets',
    updateLogsCollectionId: 'update-logs',
    collectionsCollectionId: 'collections',
    updateLogTag: 'updatelog',
  },
  paths: {
    snippetCoverDirectory: 'content/assets/cover/',
    collectionCoverDirectory: 'content/assets/splash/',
    contentJSON: './.content/content.json',
    redirectsYAML: 'content/redirects.yaml',
    pagePerformanceCSV: 'imported/Pages.csv',
    out: {
      // This has to be the deepest nested path (snippet), so all other paths are included
      pages: '.content/pages/[lang]/s',
      home: '.content/pages/index.json',
      collections: '.content/pages/[lang]/[...listing].json',
      snippets: '.content/pages/[lang]/s/[snippet].json',
      redirects: 'public/_redirects',
      sitemap: 'public/sitemap.xml',
      feed: 'public/feed.xml',
      timestamp: 'src/astro/timestamp.js',
    },
    snippetsGlob: 'content/snippets/**/*.md',
    snippetsPrefix: 'content/snippets/',
    snippetsSuffix: '.md',
    languagesGlob: 'content/languages/*.yaml',
  },
  pages: {
    urls: {
      home: '/',
      about: '/about',
    },
  },
  // Tag formatting
  tags: {
    css: 'CSS',
    javascript: 'JavaScript',
    node: 'Node.js',
    php: 'PHP',
    seo: 'SEO',
    vscode: 'Visual Studio Code',
    html: 'HTML',
    webdev: 'Web development',
    http: 'HTTP',
    updatelog: 'Update Log',
  },
  breadcrumbs: {
    home: {
      url: '/',
      name: 'Home',
    },
  },
  sublinks: {
    moreCollections: {
      title: 'More',
      url: '/collections/p/1',
      icon: 'arrow-right',
      selected: false,
    },
    parentTitle: 'All',
  },
  covers: {
    originalExtension: {
      snippet: '.jpg',
      collection: '.png',
    },
    extension: '.webp',
    prefix: {
      snippet: '/assets/cover/',
      collection: '/assets/splash/',
    },
    suffix: {
      home: '-400',
      snippet: '-400',
      snippetFull: '-800',
      collection: '-600',
    },
    size: {
      snippet: ['400w', '800w'],
      snippetFull: ['800w', '400w', '1200w'],
      collection: ['600w', '400w'],
    },
  },
  recommendations: {
    // Language
    languageScoreLimit: 45.0,
    fullLanguageScore: 45.0,
    // Primary Tag
    primaryTagScoreLimit: 15.0,
    fullPrimaryTagScore: 15.0,
    // Rounded up to 8 instead of 7.5
    halfPrimaryTagScore: 8.0,
    // Recommendation tokens
    recTokenScoreLimit: 40.0,
    // Total
    // Language + Primary Tag + Search Tokens
    totalScoreLimit: 100.0,
    // Total without language
    // Primary Tag + Search Tokens / Total
    scoreLimitWithoutLanguage: 0.55,
    // Total without language and primary tag
    // Search Tokens / Total
    scoreLimitWithoutLanguageAndPrimaryTag: 0.4,
    recommendationCount: 4,
  },
};

export default settings;
