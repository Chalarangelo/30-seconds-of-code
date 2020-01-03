import { useEffect } from 'react';
import { startIndexFetch, finishIndexFetch } from 'state/search';

/* istanbul ignore next */
const useFetchSearchIndex = dispatch => useEffect(() => {
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
