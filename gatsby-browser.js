/* eslint-disable */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

let locationScrollTops = [];

const onPreRouteUpdate = ({ location, prevLocation }) => {
  try {
    let scrollTop = document.querySelector('.content').scrollTop;
    locationScrollTops[prevLocation.pathname] = scrollTop;
  } catch (e) { return; }
};

const onRouteUpdate = ({ location, prevLocation }) => {
  try {
    if (locationScrollTops[location.pathname])
      document.querySelector('.content').scrollTop = locationScrollTops[location.pathname];

  } catch (e) { return; }
};

export { default as wrapRootElement } from 'state/ReduxWrapper';
export { onPreRouteUpdate, onRouteUpdate };
