export const snippetList = [
  {
    title: 'Using JavaScript generator functions for ranges',
    shortTitle: 'Generator functions for ranges',
    url: '/articles/s/javascript-range-generator',
    description:
      'Learn how to use JavaScript ES6 generators and iterators to iterate over ranges of numbers.',
    tags: 'JavaScript, Function',
    extraContext: 'Jun 12, 2021',
    type: 'snippet',
    cover: 'https://localhost/assets/preview/generator.jpg',
  },
  {
    title: 'Get nested object property from path string',
    shortTitle: 'Get nested object property from path string',
    url: '/js/s/get',
    description:
      'Retrieves a set of properties indicated by the given selectors from an object.',
    tags: 'JavaScript, Object',
    extraContext: 'Oct 19, 2020',
    type: 'snippet',
    cover: 'https://localhost/assets/preview/brown-bird.jpg',
  },
  {
    title: 'K-nearest neighbors',
    shortTitle: 'K-nearest neighbors',
    url: '/js/s/k-nearest-neighbors',
    description:
      'Classifies a data point relative to a labelled data set, using the k-nearest neighbors algorithm.',
    tags: 'JavaScript, Algorithm',
    extraContext: 'Oct 13, 2021',
    type: 'snippet',
    cover: 'https://localhost/assets/preview/building-blocks.jpg',
  },
];

export const previewSnippet = snippetList[0];

export const fullSnippet = {
  title: 'Tip: Customize the names of downloadable files',
  fullDescription:
    '<p>HTML5 introduced a variety of convenient features that many of us use every day. As downloadable links aren\'t something I work with very often, I recently found out that you can use the <code class="notranslate">download</code> attribute on an <code class="notranslate">&lt;a&gt;</code> element for much more than just making it trigger a download. In fact, you can pass it a string value that will act as the name of the downloadable file, effectively allowing you to customize its name:</p>',
  codeBlocks: [
    {
      language: {
        short: 'js',
        long: 'JavaScript',
      },
      htmlContent:
        '<span class="token comment">&lt;!-- The downloaded file will be named \'June-2020.csv\' --&gt;</span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/data/2020/06/report.csv<span class="token punctuation">"</span></span> <span class="token attr-name">download</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>June-2020.csv<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>June 2020<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>',
    },
  ],
  url:
    'https://github.com/30-seconds/30-seconds-blog/blob/master/blog_posts/custom-file-download-names.md',
  slug: '/articles/s/custom-file-download-names',
  date: 'Jun 12, 2021',
  tags: 'Webdev, HTML, Browser',
  author: {
    name: 'Angelos Chalaris',
    intro:
      "I'm Angelos Chalaris, a JavaScript software engineer, based in Athens, Greece. The best snippets from my coding adventures are published here to help others learn to code.",
    twitter: 'https://twitter.com/chalarangelo',
    github: 'https://github.com/Chalarangelo',
  },
  cover: 'https://localhost/assets/cover/hard-disk.jpg',
};
