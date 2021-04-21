/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import ContextWrapper from 'state/ContextWrapper';
import 'styles/index.scss';
const sendPageView = () => {
  const pagePath = location
    ? location.pathname + location.search + location.hash
    : undefined;
  // eslint-disable-next-line camelcase
  window.gtag(`event`, `page_view`, { page_path: pagePath });
};

const App = ({ Component, pageProps }) => {
  const router = useRouter();

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
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
};

export default App;
