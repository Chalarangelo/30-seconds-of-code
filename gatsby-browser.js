/*
  Gatsby Browser API
*/
const sendPageView = () => {
  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined;
  window.gtag(`event`, `page_view`, { page_path: pagePath });
};

const onRouteUpdate = () => {
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

export { default as wrapRootElement } from 'state/ReduxWrapper';
export { onRouteUpdate };
