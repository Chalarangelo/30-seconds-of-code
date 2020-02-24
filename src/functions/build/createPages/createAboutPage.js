import aboutLiterals from 'lang/about_en';

const createAboutPage = (aboutPage, createPage, context) => {
  createPage({
    path: '/about',
    component: aboutPage,
    context: {
      ...context,
      stringLiterals: aboutLiterals,
    },
  });
};

export default createAboutPage;
