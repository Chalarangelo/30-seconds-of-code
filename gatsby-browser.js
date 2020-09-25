/*
  Gatsby Browser API
*/
let locationScrollTops = [];

const sendPageView = () => {
  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined;
  window.gtag(`event`, `page_view`, { page_path: pagePath });
};

const onPreRouteUpdate = ({ location, prevLocation }) => {
  try {
    let scrollTop = document.querySelector('.content').scrollTop;
    locationScrollTops[prevLocation.pathname] = scrollTop;
  } catch (e) { return; }
};

const onRouteUpdate = ({ location, prevLocation }) => {
  try {
    if (locationScrollTops[location.pathname] && prevLocation.includes('/s/'))
      document.querySelector('.content').scrollTop = locationScrollTops[location.pathname];
    else if(location.pathname.match(/\/[ape]\/\d+/) && prevLocation.pathname.match(/\/[ape]\/\d+/))
      document.querySelector('.content').scrollTop = 0;

  } catch (e) { return; }

  if (process.env.NODE_ENV === `production` && typeof gtag === `function`) {
    if (`requestAnimationFrame` in window) {
      requestAnimationFrame(() => {
        requestAnimationFrame(sendPageView);
      });
    } else {
      // simulate 2 requestAnimationFrame calls
      setTimeout(sendPageView, 32);
    }
  }
};

const onServiceWorkerUpdateReady = () => window.location.reload(true);

export { default as wrapRootElement } from 'state/ReduxWrapper';
export { onPreRouteUpdate, onRouteUpdate, onServiceWorkerUpdateReady };
