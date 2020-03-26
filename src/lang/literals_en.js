import config from '../../config';

const literals = {
  // Site metadata
  'site.title': config.name,
  'site.description': config.description,
  'site.author': config.author,
  // Literals
  'Expertise': level => `${level}`,
  'Click to view more snippets': 'Click to view more snippets',
  'Logo': 'Logo',
  '...': '...',
  'Home': 'Home',
  'Our website uses tools such as cookies to provide a high quality personalized experience and gather anonymized data for statistical analisis of the website\'s traffic.': `${config.name} uses cookies to provide a high quality user experience and gather anonymized data for statistical analysis of the website's traffic.`,
  'By clicking "Accept" you accept their installation.': 'By clicking "Accept" you accept their installation.',
  'Accept': 'Accept',
  'Decline': 'Decline',
  'You can learn more by reading our ': ' You can learn more by reading our ',
  'cookie policy': 'cookie policy',
  'Recommended snippets': 'Recommended snippets',
  'Blog': 'Blog',
};

export default literals;
