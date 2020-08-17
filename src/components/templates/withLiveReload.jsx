/* eslint-disable react/prop-types */
/* istanbul ignore next */
import React, { useState } from 'react';
import { useInterval } from 'components/hooks';

const withLiveReload = (WrappedComponent, url, isListing, props) => {
  const [fetchedData, setFetchedData] = useState({});
  useInterval(() => {
    fetch(`http://127.0.0.1:7000${url}`)
      .then(res => res.json())
      .then(data => setFetchedData(data));
  }, 5000);

  const _props = Object.keys(fetchedData).length
    ? isListing ? {
      ...props,
      pageContext: {
        ...props.pageContext,
        snippetList: {
          ...props.pageContext.snippetList,
          ...fetchedData,
        },
      },
    } : {
      ...props,
      pageContext: {
        ...props.pageContext,
        snippet: {
          ...props.pageContext.snippet,
          ...fetchedData,
        },
      },
    } : props;

  return <WrappedComponent { ..._props } />;
};

export default withLiveReload;
