import cookieLiterals from 'lang/cookies_en';

const createCookiePage = (cookiePage, createPage, context) => {
  createPage({
    path: '/cookies',
    component: cookiePage,
    context: {
      ...context,
      stringLiterals: cookieLiterals,
    },
  });
};

export default createCookiePage;
