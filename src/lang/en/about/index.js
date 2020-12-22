import fs from 'fs-extra';
import path from 'path';
import settings from 'settings/global';

const literals = {
  title: 'About',
  subtitle: 'A few word about us, our goals and our projects.',
  pageDescription: `Learn more about the team behind ${settings.websiteName}.`,
  cards: [
    {
      title: 'About us',
      html: 'aboutUs.html',
    },
    {
      title: 'Who we are',
      html: 'whoWeAre.html',
    },
    {
      title: 'License',
      html: 'license.html',
    },
  ],
};

literals.cards.forEach(({ html }, i) => {
  literals.cards[i].html = fs.readFileSync(
    path.resolve(__dirname, html),
    'utf8'
  );
});

export default literals;
