"use strict";

let created404 = false;

exports.onCreatePage = ({
  page,
  store,
  actions
}) => {
  // Copy /404/ to /404.html as many static site hosts expect
  // site 404 pages to be named this.
  // https://www.gatsbyjs.org/docs/add-404-page/
  if (!created404 && /^\/?404\/?$/.test(page.path)) {
    actions.createPage(Object.assign({}, page, {
      path: `/404.html`
    }));
    created404 = true;
  }
};
//# sourceMappingURL=gatsby-node.js.map