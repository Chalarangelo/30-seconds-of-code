import fs from 'fs-extra';
import path from 'path';
import settings from 'settings/global';

const literals = {
  title: 'FAQ',
  subtitle: 'Frequently asked questions and answers',
  pageDescription: `Frequently asked questions and answers about ${settings.websiteName}.`,
  cards: [
    {
      title: 'What does OSCC mean?',
      html: 'oscc.html',
    },
    {
      title: 'I found a bug, typo or omission. Where can I report it?',
      html: 'bugs.html',
    },
    {
      title: 'Who can contribute to 30 seconds of code?',
      html: 'contributors.html',
    },
    {
      title: 'I have a snippet idea. Where can I contribute?',
      html: 'contributing.html',
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
