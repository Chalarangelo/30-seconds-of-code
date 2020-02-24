import { capitalize } from 'functions/utils';
import config from '../../config';

const literals = {
  'codelang.': lang => lang,
  'codelang_tag.': (lang, tag) => `${lang} ${capitalize(tag)}`,
  'tag.': tag => `${capitalize(tag)}`,
  'snippetCount.': count => `${count} snippets`,
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
    case 'about':
      return `Learn more about the team behind ${config.name}.`;
    case 'cookies':
      return `Read about the cookie policy of ${config.name}.`;
    case 'settings':
      return `Customize your ${config.name} experience.`;
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
  'orders.popularity': 'Popularity',
  'orders.alphabetical': 'Alphabetical',
  'orders.expertise': 'Expertise',
  'settings.dark_mode': 'Dark mode',
  'settings.github_links': 'GitHub links',
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
  'About': 'About',
  'Settings': 'Settings',
  'About us': 'About us',
  '.': '.',
  ', ': ', ',
  ' & ': ' & ',
  'Start typing a keyphrase to see matching snippets.': 'Start typing a keyphrase to see matching snippets.',
  'Logo': 'Logo',
  'Previous': 'Previous',
  'Next': 'Next',
  '...': '...',
  '404': '404',
  'Page not found': 'Page not found',
  'Seems like you have reached a page that does not exist.': 'Seems like you have reached a page that does not exist.',
  'Go home': 'Go home',
  'Home': 'Home',
  'Snippet List': 'Snippet List',
  'A few word about us, our goals and our projects.': 'A few word about us, our goals and our projects.',
  'License': 'License',
  'Who we are': 'Who we are',
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
  'Cookie policy': 'Cookie policy',
  'Understand how we use cookies.': 'Understand how we use cookies.',
  'What are cookies': 'What are cookies',
  'How we use cookies': 'How we use cookies',
  'Disabling cookies': 'Disabling cookies',
  'The cookies we set': 'The cookies we set',
  'Site preference cookies': 'Site preference cookies',
  'Third party cookies': 'Third party cookies',
  'For more information on Google Analytics cookies, see the official Google Analytics page.': 'For more information on Google Analytics cookies, see the official Google Analytics page.',
  'More information': 'More information',
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
