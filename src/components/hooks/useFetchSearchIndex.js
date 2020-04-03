import { useEffect } from 'react';
import { startIndexFetch, finishIndexFetch } from 'state/search';

/**
 * A hook that fetches the search index asynchronously.
 */
const useFetchSearchIndex = dispatch => useEffect(() => {
  /* istanbul ignore next */
  if(typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    dispatch(startIndexFetch());
    fetch('/page-data/search_index/page-data.json')
      .then(response => response.json())
      .then(json => {
        dispatch(finishIndexFetch(json.result.pageContext.searchIndex));
      });
  }
}, []);

export default useFetchSearchIndex;
