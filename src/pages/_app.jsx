/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import ContextWrapper from 'state/ContextWrapper';
import 'styles/index.scss';
const App = ({ Component, pageProps }) => {
  return (
    <ContextWrapper>
      <Component {...pageProps} />
    </ContextWrapper>
  );
};

export default App;
