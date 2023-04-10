// Titles
const pageTitleBase = 'txt-200 fs-x2 f-alt f-strong mx-3.5 lh-normal';

const pageTitles = {
  pageTitle: `${pageTitleBase} my-0`,
  staticPageTitle: `${pageTitleBase} mt-4 mb-0`,
  recommendationsTitle: `${pageTitleBase} mt-8 mb-0 pt-4`,
  listingTitle: `${pageTitleBase} my-0 f-center md:f-left`,
};

// Cards
const cardTitleBase = 'card-title txt-200 fs-lg md:fs-xl f-alt f-ellipsis';

const cards = {
  cardTitle: `${cardTitleBase} mt-0 mx-0 mb-1`,
  secondaryCardTitle: `${cardTitleBase} f-clamp m-0`,
  cardSubtitle: 'inline-block txt-050 fs-xs m-0',
};

export default {
  ...pageTitles,
  ...cards,
};
