/**
 * Responsible for creating static pages (about, cookies, search, settings etc).
 * @param {*} component - Static page template to be used.
 * @param {*} createPage - Page creation method from gatsby.
 * @param {*} context - Context to be passed to the page.
 * @param {*} path - Page URL.
 */
const createStaticPage = (component, createPage, context, path) => {
  createPage({ path, component, context });
};

export default createStaticPage;
