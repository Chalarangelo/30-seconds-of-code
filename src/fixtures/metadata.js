export const snippetStructuredData = {
  type: 'snippet',
  title: 'my_snippet',
  description: 'A random snippet page',
  slug: '/s/my_snippet/',
  orgLogoSrc: '/org-logo.png',
  firstSeen: '100',
  lastUpdated: '120',
};

export const listingStructuredData = {
  type: 'listing',
  title: 'my_listing',
  slug: '/list/p/1',
  items: [
    {url: '/s/my_snippet1', title: 'my_snippet_1'},
    {url: '/s/my_snippet2', title: 'my_snippet_2'},
  ],
};

export default {
  title: 'my_snippet',
  description: 'A random snippet page',
  meta: [
    {
      name: 'demo-meta',
      content: 'demo-content',
    },
  ],
  logoSrc: '/my-logo.png',
  structuredData: snippetStructuredData,
  breadcrumbsData: [
    {
      url: '/js/p/1',
      name: 'JavaScript Snippets',
    },
    {
      url: '/js/t/array/1',
      name: 'JavaScript Array',
    },
  ],
  canonical: '/s/my_awesome_snippet',
};
