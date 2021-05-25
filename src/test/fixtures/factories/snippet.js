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

factory.sequence('expertise', function* () {
  while (true)
    yield ['beginner', 'intermediate', 'advanced'][
      Math.floor(Math.random() * 3)
    ];
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
    expertise: 'intermediate',
    primaryTag: '',
    language: '',
    icon: '',
    description: '<p></p>',
    url: '',
    searchTokens: '',
  }))
  .trait('title', () => ({ title: factory.nextFrom('word') }))
  .trait('primaryTag', { primaryTag: factory.nextFrom('word') })
  .trait('language', () => ({ language: factory.nextFrom('language') }))
  .trait('icon', () => ({ icon: factory.nextFrom('language').toLowerCase() }))
  .trait('description', () => ({
    description: `<p>${factory.nextFrom('shortText')}</p>`,
  }))
  .trait('url', () => ({ url: factory.nextFrom('url') }))
  .trait('searchTokens', () => ({
    searchTokens: factory.nextFrom('words').join(' '),
  }))
  // Expertise
  .trait('expertise', () => ({ expertise: factory.nextFrom('expertise') }))
  .trait('beginner', { expertise: 'beginner' })
  .trait('intermediate', { expertise: 'intermediate' })
  .trait('advanced', { expertise: 'advanced' })
  // Blog
  .trait('blog', { expertise: 'blog', icon: 'blog' })
  // Search
  .trait('search result', () => ({ score: Math.random() }));

factory.alias(
  'PreviewSnippet',
  'Snippet',
  'title',
  'primaryTag',
  'language',
  'icon',
  'description',
  'url',
  'searchTokens',
  'expertise'
);

factory.alias('SearchResultSnippet', 'PreviewSnippet', 'search result');

factory.alias(
  'PreviewBlogSnippet',
  'Snippet',
  'title',
  'primaryTag',
  'description',
  'url',
  'searchTokens',
  'blog'
);

factory
  .define('CompleteSnippet', () => ({
    id: '',
    title: '',
    expertise: 'Intermediate',
    icon: '',
    description: '',
    url: '',
    searchTokens: '',
    slug: '',
    firstSeen: '2018-07-14T07:59:56.000Z',
    lastUpdated: '2019-08-13T07:29:12.000Z',
    language: {
      long: '',
      short: '',
      otherLanguages: null,
    },
    tags: {
      primary: '',
      all: [],
    },
    html: {
      code: '',
      example: '',
      style: null,
      description: '<p></p>',
      fullDescription: '<p></p>',
    },
    code: {
      src: '',
      example: '',
      style: null,
    },
  }))
  .trait('core attributes', type => {
    const title = factory.nextFrom('word');
    const lang = type === 'Blog' ? 'blog' : factory.nextFrom('language');
    const tags = factory.nextFrom('words');

    const otherLanguages =
      type === 'react'
        ? [
            {
              short: 'css',
              long: 'CSS',
            },
          ]
        : type === 'css'
        ? [
            {
              short: 'html',
              long: 'HTML',
            },
            {
              short: 'js',
              long: 'JavaScript',
            },
          ]
        : null;

    return {
      id: `30${lang.toLowerCase()}/snippets/${title}`,
      title,
      description: factory.nextFrom('shortText'),
      url: `https://github.com/30-seconds/30-seconds-of-${lang.toLowerCase()}/blob/master/snippets/${title}.md`,
      slug: `/${lang.toLowerCase()}/s/${title}`,
      language:
        type === 'blog'
          ? {
              long: '',
              short: '',
            }
          : {
              long: lang,
              short: lang.toLowerCase(),
              otherLanguages,
            },
      icon: lang.toLowerCase(),
      tags: {
        primary: tags[0],
        all: tags,
      },
    };
  })
  .trait('content', type => {
    const types = ['keyword', 'function', 'variable'];
    const codeText = factory.nextFrom('shortText');
    const exampleText = factory.nextFrom('shortText');
    const code = codeText
      .split(' ')
      .map(w => {
        const tokenType = types[Math.floor(Math.random() * 3)];
        return `<span class="token ${tokenType}">${w}</span>`;
      })
      .join(' ');

    const example = exampleText
      .split(' ')
      .map(w => {
        const tokenType = types[Math.floor(Math.random() * 3)];
        return `<span class="token ${tokenType}">${w}</span>`;
      })
      .join(' ');

    const styleText = type === 'react' ? factory.nextFrom('shortText') : null;
    const style =
      type === 'react'
        ? styleText
            .split(' ')
            .map(w => {
              const tokenType = types[Math.floor(Math.random() * 3)];
              return `<span class="token ${tokenType}">${w}</span>`;
            })
            .join(' ')
        : null;

    return {
      html: {
        code,
        example,
        style,
        description: `<p>${factory.nextFrom('shortText')}</p>`,
        fullDescription: `<p>${factory.nextFrom('longText')}</p>`,
      },
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
      html: {
        html,
        css,
        js,
        description: `<p>${factory.nextFrom('shortText')}</p>`,
        fullDescription: `<p>${factory.nextFrom('longText')}</p>`,
      },
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
  // Expertise
  .trait('expertise', () => ({ expertise: factory.nextFrom('expertise') }))
  .trait('beginner', { expertise: 'Beginner' })
  .trait('intermediate', { expertise: 'Intermediate' })
  .trait('advanced', { expertise: 'Advanced' })
  // Blog
  .trait('blog', () => ({
    authors: [
      {
        name: 'Angelos Chalaris',
        profile: 'https://twitter.com/chalarangelo',
      },
    ],
    cover: 'static/assets/blog_images/an-image.jpg',
    expertise: 'Blog',
  }))
  // Search
  .trait('search result', () => ({ score: Math.random() }));

factory.alias(
  'FullSnippet',
  'CompleteSnippet',
  ['core attributes', 'regular'],
  ['content', 'regular'],
  'expertise',
  'searchTokens'
);

factory.alias(
  'FullReactSnippet',
  'CompleteSnippet',
  ['core attributes', 'react'],
  ['content', 'react'],
  'expertise',
  'searchTokens'
);

factory
  .alias(
    'FullCssSnippet',
    'CompleteSnippet',
    ['core attributes', 'css'],
    'css content',
    'expertise',
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
