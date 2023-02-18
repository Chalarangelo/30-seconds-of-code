import FixtureFactory from '@fixture-factory/fixture-factory';
import { texts } from 'test/fixtures/strings';

const factory = new FixtureFactory();

factory.sequence('shortText', function* () {
  while (true)
    yield texts.short[Math.floor(Math.random() * texts.short.length)];
});

factory.sequence('longText', function* () {
  while (true) yield texts.long[Math.floor(Math.random() * texts.long.length)];
});

factory.sequence('word', function* () {
  while (true)
    yield texts.words[Math.floor(Math.random() * texts.words.length)];
});

factory.sequence('words', function* () {
  while (true) {
    const tokenNumber = 1 + Math.floor(Math.random() * 4);
    yield Array.from(
      { length: tokenNumber },
      () => texts.words[Math.floor(Math.random() * texts.words.length)]
    );
  }
});

factory.sequence('language', function* () {
  while (true)
    yield ['React', 'CSS', 'JavaScript', 'Dart', 'PHP'][
      Math.floor(Math.random() * 5)
    ];
});

factory.sequence('title', function* () {
  while (true)
    yield texts.titles[Math.floor(Math.random() * texts.titles.length)];
});

factory.sequence('url', function* () {
  while (true)
    yield `/${factory.nextFrom('word')}/s/${factory
      .nextFrom('words')
      .join('-')}`;
});

factory
  .define('Snippet', () => ({
    title: '',
    tags: '',
    icon: '',
    description: '<p></p>',
    cover: 'static/assets/blog_images/an-image.jpg',
    url: '',
    searchTokens: '',
  }))
  .trait('title', () => ({ title: factory.nextFrom('word') }))
  .trait('tags', () => ({
    tags: `${factory.nextFrom('language')}, ${factory.nextFrom('word')}`,
  }))
  .trait('icon', () => ({ icon: factory.nextFrom('language').toLowerCase() }))
  .trait('description', () => ({
    description: `<p>${factory.nextFrom('shortText')}</p>`,
  }))
  .trait('url', () => ({ url: factory.nextFrom('url') }))
  .trait('searchTokens', () => ({
    searchTokens: factory.nextFrom('words').join(' '),
  }))
  // Search
  .trait('search result', () => ({ score: Math.random() }));

factory.alias(
  'PreviewSnippet',
  'Snippet',
  'title',
  'tags',
  'icon',
  'description',
  'url',
  'searchTokens'
);

factory.alias('SearchResultSnippet', 'PreviewSnippet', 'search result');

factory.alias(
  'PreviewBlogSnippet',
  'Snippet',
  'title',
  'tags',
  'description',
  'url',
  'searchTokens'
);

factory
  .define('CompleteSnippet', () => ({
    id: '',
    title: '',
    icon: '',
    description: '',
    url: '',
    searchTokens: '',
    slug: '',
    firstSeen: '2018-07-14T07:59:56.000Z',
    lastUpdated: '2019-08-13T07:29:12.000Z',
    tags: {
      all: [],
    },
    fullDescription: '<p></p>',
    cover: 'static/assets/blog_images/an-image.jpg',
    codeBlocks: [],
    actionType: 'copy',
    code: {
      src: '',
      example: '',
      style: null,
    },
  }))
  .trait('core attributes', type => {
    const title = factory.nextFrom('word');
    const lang = type === 'Blog' ? 'blog' : factory.nextFrom('language');
    const tags = [lang, factory.nextFrom('words')].join(', ');
    const author = {
      name: 'OSCC',
      profile: '/faq',
    };

    return {
      id: `30${lang.toLowerCase()}/snippets/${title}`,
      title,
      description: factory.nextFrom('shortText'),
      url: `https://github.com/30-seconds/30-seconds-of-${lang.toLowerCase()}/blob/master/snippets/${title}.md`,
      slug: `/${lang.toLowerCase()}/s/${title}`,
      icon: lang.toLowerCase(),
      actionType: type === 'css' || type === 'react' ? 'codepen' : 'copy',
      tags,
      author,
    };
  })
  .trait('content', type => {
    const types = ['keyword', 'function', 'variable'];
    const codeText = factory.nextFrom('shortText');
    const exampleText = factory.nextFrom('shortText');
    const code = {
      language:
        type === 'react'
          ? { long: 'React', short: 'jsx' }
          : { long: 'JavaScript', short: 'js' },
      htmlContent: codeText
        .split(' ')
        .map(w => {
          const tokenType = types[Math.floor(Math.random() * 3)];
          return `<span class="token ${tokenType}">${w}</span>`;
        })
        .join(' '),
    };

    const example = {
      language: { short: type === 'react' ? 'jsx' : 'js', long: 'Example' },
      htmlContent: exampleText
        .split(' ')
        .map(w => {
          const tokenType = types[Math.floor(Math.random() * 3)];
          return `<span class="token ${tokenType}">${w}</span>`;
        })
        .join(' '),
    };

    const styleText = type === 'react' ? factory.nextFrom('shortText') : null;
    const style =
      type === 'react'
        ? {
            language: { short: 'css', long: 'CSS' },
            htmlContent: styleText
              .split(' ')
              .map(w => {
                const tokenType = types[Math.floor(Math.random() * 3)];
                return `<span class="token ${tokenType}">${w}</span>`;
              })
              .join(' '),
          }
        : null;

    return {
      description: `<p>${factory.nextFrom('shortText')}</p>`,
      fullDescription: `<p>${factory.nextFrom('shortText')}</p>`,
      codeBlocks: [style, code, example].filter(Boolean),
      code: {
        src: codeText,
        example: exampleText,
        style: styleText,
      },
    };
  })
  .trait('css content', withJs => {
    const types = ['keyword', 'function', 'variable'];
    const htmlText = factory.nextFrom('shortText');
    const cssText = factory.nextFrom('shortText');
    const html = htmlText
      .split(' ')
      .map(w => {
        const tokenType = types[Math.floor(Math.random() * 3)];
        return `<span class="token ${tokenType}">${w}</span>`;
      })
      .join(' ');

    const css = cssText
      .split(' ')
      .map(w => {
        const tokenType = types[Math.floor(Math.random() * 3)];
        return `<span class="token ${tokenType}">${w}</span>`;
      })
      .join(' ');

    const jsText = withJs ? factory.nextFrom('shortText') : '';
    const js = withJs
      ? jsText
          .split(' ')
          .map(w => {
            const tokenType = types[Math.floor(Math.random() * 3)];
            return `<span class="token ${tokenType}">${w}</span>`;
          })
          .join(' ')
      : '';

    return {
      description: `<p>${factory.nextFrom('shortText')}</p>`,
      fullDescription: `<p>${factory.nextFrom('longText')}</p>`,
      codeBlocks: [
        {
          language: { short: 'html', long: 'HTML' },
          htmlContent: html,
        },
        {
          language: { short: 'css', long: 'CSS' },
          htmlContent: css,
        },
        {
          language: { short: 'js', long: 'JavaScript' },
          htmlContent: js,
        },
      ].filter(Boolean),
      code: {
        html: htmlText,
        css: cssText,
        js: jsText,
        scopedCss: cssText,
      },
    };
  })
  .trait('searchTokens', () => ({
    searchTokens: factory.nextFrom('words').join(' '),
  }))
  // Blog
  .trait('blog', () => ({
    author: {
      name: 'Angelos Chalaris',
      profile: 'https://twitter.com/chalarangelo',
    },
  }))
  // Search
  .trait('search result', () => ({ score: Math.random() }));

factory.alias(
  'FullSnippet',
  'CompleteSnippet',
  ['core attributes', 'regular'],
  ['content', 'regular'],
  'searchTokens'
);

factory.alias(
  'FullReactSnippet',
  'CompleteSnippet',
  ['core attributes', 'react'],
  ['content', 'react'],
  'searchTokens'
);

factory
  .alias(
    'FullCssSnippet',
    'CompleteSnippet',
    ['core attributes', 'css'],
    'css content',
    'searchTokens'
  )
  .trait('with js', [['css content', true]]);

factory.alias(
  'FullBlogSnippet',
  'CompleteSnippet',
  ['core attributes', 'blog'],
  'blog',
  ['content', 'blog'],
  'searchTokens'
);

export default factory.package();
