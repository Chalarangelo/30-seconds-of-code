import { useEffect } from 'react';
import { startIndexFetch, finishIndexFetch } from 'state/search';
import { transformSnippetIndex } from 'functions/utils';

const useFetchSearchIndex = dispatch => useEffect(() => {
  if(typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    dispatch(startIndexFetch());
    fetch('/page-data/search_index/page-data.json')
      .then(response => response.json())
      .then(json => {
        const searchIndex = transformSnippetIndex(json.result.pageContext.searchIndex.edges);
        dispatch(finishIndexFetch(searchIndex));
      });
  }
}, []);

export default useFetchSearchIndex;
