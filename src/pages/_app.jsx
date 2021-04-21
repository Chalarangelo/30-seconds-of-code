/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ContextWrapper from 'state/ContextWrapper';
import 'styles/index.scss';

export const findClosestAnchor = node => {
  // eslint-disable-next-line semi-spacing
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.nodeName.toLowerCase() === `a`) return n;
  return null;
};

const sendPageView = () => {
  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined;
  // eslint-disable-next-line camelcase
  window.gtag(`event`, `page_view`, { page_path: pagePath });
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  const routeLinkClick = e => {
    // User is forcing navigation
    if (e.button !== 0 || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey)
      return;

    // Handled elsewhere
    if (e.defaultPrevented) return;

    const origin = window.location;
    const destination = findClosestAnchor(e.target);

    // No anchor found
    if (!destination) return;

    // Download link
    if (destination.hasAttribute('download')) return;

    // Target is not equivalent to self
    if (
      destination.hasAttribute('target') &&
      !['_self', '', null, undefined].includes(destination.target)
    )
      return;

    // Different protocol or origin
    if (
      origin.protocol !== destination.protocol ||
      origin.host !== destination.host
    )
      return;

    // Links pointed at file extensions (other than .htm/html extensions).
    if (destination.pathname.search(/^.*\.((?!htm)[a-z0-9]{1,5})$/i) !== -1)
      return;

    // Hash
    if (destination.hash !== '' && destination.pathname === origin.pathname)
      return;

    // Handle link
    e.preventDefault();
    const url = `${destination.pathname}${destination.search}${destination.hash}`;
    if (process.env.NODE_ENV === `development`)
      console.log(`Routing ${url} through routeLinkClick...`);
    router.push(url);
  };

  useEffect(() => {
    const handleRouteChange = () => {
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
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('click', routeLinkClick);
    return () => window.removeEventListener('click', routeLinkClick);
  }, [pageProps]);

  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
};

export default App;
