export const internalLink = {
  url: 'internal-page',
  internal: true,
};

export const internalLinkWithAttributes = {
  url: 'internal-page',
  internal: true,
  rel: 'nofollow',
  target: '_blank',
};

export const externalLink = {
  url: 'https://google.com',
  internal: false,
};

export const externalLinkWithAttributes = {
  url: 'https://google.com',
  internal: false,
  rel: 'noopener noreferrer',
  target: '_blank',
};
