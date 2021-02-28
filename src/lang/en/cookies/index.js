import fs from 'fs-extra';
import path from 'path';
import settings from 'settings/global';

const literals = {
  title: 'Cookie policy',
  subtitle: 'Understand how we use cookies.',
  pageDescription: `Read about the cookie policy of ${settings.websiteName}.`,
  cards: [
    {
      title: 'What are cookies',
      html: 'whatAreCookies.html',
    },
    {
      title: 'How we use cookies',
      html: 'howWeUseCookies.html',
    },
    {
      title: 'Disabling cookies',
      html: 'disablingCookies.html',
    },
    {
      title: 'The cookies we set',
      html: 'theCookiesWeSet.html',
    },
    {
      title: 'More information',
      html: 'moreInformation.html',
    },
  ],
  cookieSettingCard: {
    title: 'Cookie preferences',
    text:
      'You can update your cookie preferences using the toggle button below.',
    toggleText: 'Accept cookies',
  },
};

literals.cards.forEach(({ html }, i) => {
  literals.cards[i].html = fs.readFileSync(
    path.resolve(__dirname, html),
    'utf8'
  );
});

export default literals;
