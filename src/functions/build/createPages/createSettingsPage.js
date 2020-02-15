const createSettingsPage = (settingsPage, createPage, context) => {
  createPage({
    path: '/settings',
    component: settingsPage,
    context: {
      ...context,
    },
  });
};

export default createSettingsPage;
