// Titles
const pageTitleBase = 'txt-200 fs-x2 f-alt mx-3.5 lh-normal';

const pageTitles = {
  pageTitle: `${pageTitleBase} my-0`,
  staticPageTitle: `${pageTitleBase} mt-4 mb-0`,
  recommendationsTitle: `${pageTitleBase} mt-8 mb-0 pt-4`,
  listingTitle: `${pageTitleBase} my-0 f-center md:f-left`,
};

// Cards
const cardBase = 'card mt-7 mx-1 mb-4 md:mx-3.5 srfc-01db txt-100 br-lg';
const cardTitleBase = 'txt-200 fs-lg md:fs-xl f-alt f-ellipsis lh-tight';

const cards = {
  snippetCard: `${cardBase} snippet-card g-c2 px-4 pt-6 pb-4 md:px-6 md:pb-6`,
  previewCard: `${cardBase} list-card grid a-center py-5 px-4 md:p-6 relative no-overflow`,
  simpleCard: `${cardBase} px-4 py-6 md:px-6 md:py-8`,
  cardTitle: `${cardTitleBase} mt-0 mx-0 mb-1`,
  secondaryCardTitle: `${cardTitleBase} f-clamp m-0`,
  cardSubtitle: 'inline-block txt-050 fs-xs m-0',
};

const buttonBase = 'btn relative inline-block lh-tight';

// Buttons
const buttons = {
  button: buttonBase,
  simpleButton: `${buttonBase} br-lg my-0 mx-2 py-2.5 px-3.5`,
  iconButton: 'icon icon-btn',
  iconReverseButton: 'icon icon-btn icon-btn-reverse',
  outlineButton: 'outline-btn',
  actionButton: 'action-btn',
  actionLinkButton: 'action-btn action-btn-link',
  chipButton: `${buttonBase} m-0 py-3 px-4 br-md lnk-hover-strong`,
  copyCodeButton:
    'btn action-btn icon-btn icon icon-clipboard absolute br-lg my-0 mx-2 p-2.5 lh-tight flex-none before:fs-sm',
};

export default {
  ...pageTitles,
  ...cards,
  ...buttons,
};
