import { capitalize } from 'functions/utils';

export default {
  // Site metadata - TODO: Use config
  'site.title': '30 seconds of code',
  'site.description': 'Curated collection of code snippets you can understand in 30 seconds or less.',
  'site.author': '30-seconds',
  // Literals
  'Expertise': level => `Expertise: ${capitalize(level, true)}`,
  'Search snippets': 'Search snippets',
  'Search...': 'Search...',
  'Copy to clipboard': 'Copy to clipboard',
  'Examples': 'Examples',
};
