import { capitalize } from 'functions/utils';
import config from '../../config';

const multiline = {
  'About us': `30 seconds provides high-quality learning resources for developers of all skill levels in the form of snippet collections in various programming languages since its inception in 2017. Today, 30 seconds consists of a community of over 250 contributors and more than 10 maintainers, dedicated to creating the best short-form learning resources for software developers. Our goal is to make software development more accessible and help the open-source community grow by helping people learn to code for free.`,
  'License.code': `In order for the code provided via the 30 seconds projects to be as accessible and useful as possible, all of the snippets in these collections are licensed under the CC0-1.0 License meaning they are absolutely free to use in any project you like. If you like what we do, you can always credit us, but that is not mandatory.`,
  'License.logo': `Logos, names and trademarks are not to be used without the explicit consent of the maintainers or owners of the 30 seconds GitHub organization. The only exception to this is the usage of the 30-seconds-of- name in open source projects, licensed under the CC0-1.0 License and hosted on GitHub, if their README and website clearly state that they are unofficial projects and in no way affiliated with the organization.`,
  'Who we are': `The 30 seconds movement and, to some extent, the associated GitHub organization consists of all the people who have invested time and ideas to be part of this amazing community. Meanwhile, these fine folks are currently responsible for maintaining the codebases and dealing with organizational matters:`,
  'What are cookies': 'As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or "break" certain elements of the sites functionality',
  'How we use cookies': 'We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.',
  'Disabling cookies': 'You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.',
  'Site preference cookies': 'In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.',
  'Third party cookies': 'In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.',
  'Google Analytics cookies': 'This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.',
  'More information': 'Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren\'t sure whether you need or not it\'s usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. However if you are still looking for more information then you can contact us via email at 30secondsofcode@gmail.org.',
};

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
    case 'cookies':
      return `Read about the cookie policy of ${config.name}.`;
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
  'footer.cookies': 'Cookies',
  'footer.discord': 'Discord',
  // Literals
  'Expertise': level => `${level}`,
  'Search snippets': 'Search snippets',
  'Search...': 'Search...',
  'Search': 'Search',
  'Search results for': keyphrase => `Search results for ${keyphrase}`,
  'Search results': 'Search results',
  'Click to view more results': 'Click to view more results',
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
  ', ': ', ',
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
  'Home': 'Home',
  'Snippet List': 'Snippet List',
  'A few word about us, our goals and our projects.': 'A few word about us, our goals and our projects.',
  'License': 'License',
  'Who we are': 'Who we are',
  'Top collections': 'Top collections',
  'Website, name & logo © 2017-2019 ': 'Website, name & logo © 2017-2019 ',
  '30-seconds': '30-seconds',
  'Individual snippets licensed under ': 'Individual snippets licensed under ',
  'CC0-1.0': 'CC0-1.0',
  'Powered by ': 'This site is powered by ',
  'GitHub': 'GitHub',
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
};

export default literals;
