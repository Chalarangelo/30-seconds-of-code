import { capitalize } from 'functions/utils';
// TODO: Is this the best option available to us path-wise?
import config from '../../config';

const multiline = {
  'About us': `30 seconds provides high-quality learning resources for developers of all skill levels in the form of snippet collections in various programming languages since its inception in 2017. Today, 30 seconds consists of a community of over 250 contributors and more than 10 maintainers, dedicated to creating the best short-form learning resources for software developers. Our goal is to make software development more accessible and help the open-source community grow by helping people learn to code for free.`,
};

const literals = {
  // Multiline literals
  'm': key => multiline[key],
  // Site metadata
  'site.title': config.name,
  'site.description': config.description,
  'site.author': config.author,
  // Site navigation
  'nav.search': 'Search',
  'nav.list': 'List',
  'nav.github': 'GitHub',
  'nav.moon': 'Dark mode',
  'nav.sun': 'Light mode',
  // Literals
  'Expertise': level => `Expertise: ${capitalize(level, true)}`,
  'Search snippets': 'Search snippets',
  'Search...': 'Search...',
  'Search': 'Search',
  'Search results for': keyphrase => `Search results for ${keyphrase}`,
  'Copy to clipboard': 'Copy to clipboard',
  'Examples': 'Examples',
  'Back to': pageTitle => `Back to ${capitalize(pageTitle, true)}`,
  'Browser support': 'Browser support',
  'Edit on CodePen': 'Edit on CodePen',
  'Preview': 'Preview',
  'About us': 'About us',
  'Read more about us...': 'Read more about us...',
  'Start typing a keyphrase to see matching snippets or ': 'Start typing a keyphrase to see matching snippets or ',
  'click to view the whole list': 'click to view the whole list',
  '.': '.',
  'Click on a snippet card to view the snippet': 'Click on a snippet card to view the snippet',
  'Click on a snippet card to view the snippet.': 'Click on a snippet card to view the snippet.',
  'Start typing a keyphrase to see matching snippets.': 'Start typing a keyphrase to see matching snippets.',
  'Switch to dark mode': 'Switch to dark mode',
  'Switch to light mode': 'Switch to light mode',
  'Logo': 'Logo',
  'Previous': 'Previous',
  'Next': 'Next',
  '...': '...',
  '404': '404',
  'Page not found': 'Page not found',
  'Seems like you have reached a page that does not exist.': 'Seems like you have reached a page that does not exist.',
  'Go home': 'Go home',
};

export default literals;
