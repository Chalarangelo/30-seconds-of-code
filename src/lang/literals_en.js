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
  'Copy to clipboard': 'Copy to clipboard',
  'Examples': 'Examples',
  'Back to': pageTitle => `Back to ${capitalize(pageTitle, true)}`,
  'Browser support': 'Browser support',
  'Edit on CodePen': 'Edit on CodePen',
  'Preview': 'Preview',
  'About us': 'About us',
  'Read more about us...': 'Read more about us...',
  'Start typing a keyword to see matching snippets or ': 'Start typing a keyword to see matching snippets or ',
  'click to view the whole list': 'click to view the whole list',
  '.': '.',
  'Click on a snippet card to view the snippet': 'Click on a snippet card to view the snippet',
  'Start typing a keyword to see matching snippets.': 'Start typing a keyword to see matching snippets.',
};

export default literals;
