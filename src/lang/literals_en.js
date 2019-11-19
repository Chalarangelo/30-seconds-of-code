import { capitalize } from 'functions/utils';
import config from '../../config';

const multiline = {
  'About us': `30 seconds provides high-quality learning resources for developers of all skill levels in the form of snippet collections in various programming languages since its inception in 2017. Today, 30 seconds consists of a community of over 250 contributors and more than 10 maintainers, dedicated to creating the best short-form learning resources for software developers. Our goal is to make software development more accessible and help the open-source community grow by helping people learn to code for free.`,
  'License.code': `In order for the code provided via the 30 seconds projects to be as accessible and useful as possible, all of the snippets in these collections are licensed under the CC0-1.0 License meaning they are absolutely free to use in any project you like. If you like what we do, you can always credit us, but that is not mandatory.`,
  'License.logo': `Logos, names and trademarks are not to be used without the explicit consent of the maintainers or owners of the 30 seconds GitHub organization. The only exception to this is the usage of the 30-seconds-of- name in open source projects, licensed under the CC0-1.0 License and hosted on GitHub, if their README and website clearly state that they are unofficial projects and in no way affiliated with the organization.`,
  'Who we are': `The 30 seconds movement and, to some extent, the associated GitHub organization consists of all the people who have invested time and ideas to be part of this amazing community. Meanwhile, these fine folks are currently responsible for maintaining the codebases and dealing with organizational matters:`,
};

const literals = {
  'codelang.': lang => lang,
  'codelang_tag.': (lang, tag) => `${lang} ${capitalize(tag)}`,
  'tag.': tag => `${capitalize(tag)}`,
  'snippetCount.': count => `${count} snippets`,
  // Multiline literals
  'm': key => multiline[key],
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
    case 'home':
    default:
      return defaultDescription;
    }
  },
  // Site navigation
  'nav.search': 'Search',
  'nav.list': 'List',
  'nav.github': 'GitHub',
  'nav.moon': 'Dark mode',
  'nav.sun': 'Light mode',
  'footer.about': 'About',
  'footer.github': 'GitHub',
  'footer.twitter': 'Twitter',
  // Literals
  'Expertise': level => `${capitalize(level, true)}`,
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
  'About': 'About',
  'About us': 'About us',
  'Read more about us...': 'Read more about us...',
  'Start typing a keyphrase to see matching snippets or ': 'Start typing a keyphrase to see matching snippets or ',
  'click to view the whole list': 'click to view the whole list',
  '.': '.',
  ',': ', ',
  ' & ': ' & ',
  'Click on a snippet card to view the snippet': 'Click on a snippet card to view the snippet',
  'Click on a snippet card to view the snippet.': 'Click on a snippet card to view the snippet.',
  'Click on a snippet card to view the snippet or choose a keyword from the above list to only see matching snippets.': 'Click on a snippet card to view the snippet or choose a keyword from the above list to only see matching snippets.',
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
  'Snippet List': 'Snippet List',
  'A few word about us, our goals and our projects.': 'A few word about us, our goals and our projects.',
  'License': 'License',
  'Who we are': 'Who we are',
  'Top collections': 'Top collections',
  'Website, name & logo © 2017-2019 ': 'Website, name & logo © 2017-2019 ',
  '30-seconds': '30-seconds',
  'Individual snippets licensed under ': 'Individual snippets licensed under ',
  'CC0-1.0': 'CC0-1.0',
  'Powered by GitHub, Gatsby, Travis CI & Netlify': 'Powered by GitHub, Gatsby, Travis CI & Netlify',
  'GitHub': 'GitHub',
  'Travis CI': 'Travis CI',
  'Gatsby': 'Gatsby',
  'Netlify': 'Netlify',
};

export default literals;
