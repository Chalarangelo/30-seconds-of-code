import { capitalize } from 'functions/utils';
import config from '../../config';

const literals = {
  'cta.': ctaId => {
    switch (ctaId) {
    case 'github':
      return 'Star it on GitHub';
    case 'twitter':
      return 'Follow on Twitter';
    default:
      return '';
    }
  },
  // Site metadata
  'site.title': config.name,
  'site.description': config.description,
  'site.author': config.author,
  // Site metadata description generation
  'site.pageDescription': (pageData = { pageType: ''}) => {
    const defaultDescription = `Find ${config.description.toLowerCase()} on ${config.name}.`;
    switch (pageData.pageType) {
    case 'listing':
      switch (pageData.listingType) {
      case 'language':
        return `Browse ${pageData.snippetCount} ${pageData.listingLanguage} code snippets for all your development needs on ${config.name}.`;
      case 'tag':
        return `Browse ${pageData.snippetCount} ${pageData.listingLanguage} ${capitalize(pageData.listingTag)} code snippets for all your development needs on ${config.name}.`;
      case 'main':
        return `Browse ${pageData.snippetCount} ${config.description.toLowerCase()} on ${config.name}.`;
      default:
        return defaultDescription;
      }
    case 'search':
      return `Search for answers to your development problems among ${pageData.snippetCount} code snippets on ${config.name}.`;
    case 'snippet':
      return `Learn how to code a ${pageData.snippetName} snippet in ${pageData.snippetLanguage} on ${config.name}.`;
    case 'home':
    default:
      return defaultDescription;
    }
  },
  // Site navigation
  'footer.about': 'About',
  'footer.github': 'GitHub',
  'footer.twitter': 'Twitter',
  'footer.cookies': 'Cookies',
  'footer.discord': 'Discord',
  // Literals
  'Expertise': level => `${level}`,
  'Search snippets': 'Search snippets',
  'Search...': 'Search...',
  'Search': 'Search',
  'Search results for': keyphrase => `Search results for ${keyphrase}`,
  'Search results': 'Search results',
  'Click to view more snippets': 'Click to view more snippets',
  'Copy to clipboard': 'Copy to clipboard',
  'Examples': 'Examples',
  'Browser support': 'Browser support',
  'Edit on CodePen': 'Edit on CodePen',
  'Preview': 'Preview',
  '.': '.',
  ', ': ', ',
  ' & ': ' & ',
  'Start typing a keyphrase to see matching snippets.': 'Start typing a keyphrase to see matching snippets.',
  'Logo': 'Logo',
  '...': '...',
  '404': '404',
  'Page not found': 'Page not found',
  'Seems like you have reached a page that does not exist.': 'Seems like you have reached a page that does not exist.',
  'Go home': 'Go home',
  'Home': 'Home',
  'Website, name & logo © 2017-2020 ': 'Website, name & logo © 2017-2020 ',
  '30-seconds': '30-seconds',
  'Individual snippets licensed under ': 'Individual snippets licensed under ',
  'CC0-1.0': 'CC0-1.0',
  'Powered by ': 'This site is powered by ',
  'GitHub': 'GitHub',
  'View on GitHub': 'View on GitHub',
  'Travis CI': 'Travis CI',
  'Gatsby': 'Gatsby',
  'Netlify': 'Netlify',
  'Our website uses tools such as cookies to provide a high quality personalized experience and gather anonymized data for statistical analisis of the website\'s traffic.': `${config.name} uses cookies to provide a high quality user experience and gather anonymized data for statistical analysis of the website's traffic.`,
  'By clicking "Accept" you accept their installation.': 'By clicking "Accept" you accept their installation.',
  'Accept': 'Accept',
  'Decline': 'Decline',
  'You can learn more by reading our ': ' You can learn more by reading our ',
  'cookie policy': 'cookie policy',
  'Recommended snippets': 'Recommended snippets',
  'Like 30 seconds of code?': 'Like 30 seconds of code?',
  'We couldn\'t find any results for the keyphrase ': 'We couldn\'t find any results for the keyphrase ',
  'Blog': 'Blog',
};

export default literals;
