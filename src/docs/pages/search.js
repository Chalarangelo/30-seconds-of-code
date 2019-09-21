import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage, pushNewQuery } from '../state/app';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import Search from '../components/Search';
import SnippetCard from '../components/SnippetCard';

// ===================================================
// Search page
// ===================================================
const SearchPage = props => {
  const snippets = props.data.allSnippet.edges;

  const [searchQuery, setSearchQuery] = React.useState(props.searchQuery);
  const [searchResults, setSearchResults] = React.useState(snippets);

  React.useEffect(() => {
    props.dispatch(pushNewQuery(searchQuery));
    let q = searchQuery.toLowerCase();
    let results = snippets;
    if (q.trim().length)
      results = snippets.filter(
        ({ node }) =>
          node.tags.all.filter(t => t.indexOf(q) !== -1).length ||
          node.title.toLowerCase().indexOf(q) !== -1,
      );
    setSearchResults(results);
  }, [searchQuery]);

  React.useEffect(() => {
    props.dispatch(pushNewPage('Search', '/search'));
  }, []);

  return (
    <>
      <Meta title='Search' />
      <Shell withIcon={false} isSearch>
        <Search
          setSearchQuery={setSearchQuery}
          defaultValue={props.searchQuery}
        />
        <p className='light-sub'>Click on a snippet card to view the snippet.</p>
        {/* Display page background or results depending on state */}
        {searchQuery.length === 0 ? (
          <>
            <div className='page-graphic search-empty'>
              <p className='empty-page-text search-page-text'>
                Start typing a keyword to see matching snippets.
              </p>
            </div>
          </>
        ) : searchResults.length === 0 ? (
          <>
            <div className='page-graphic search-no-results'>
              <p className='empty-page-text'>
                <strong>No results found</strong>
                <br />
              </p>
              <p className='empty-page-subtext'>
                We couldn't find any results for the keyword{' '}
                <strong>{searchQuery}</strong>.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className='page-sub-title'>Search results</h2>
            {searchResults.map(({node}) => (
              <SnippetCard
                key={`snippet_${node.id}`}
                short
                snippetData={{
                  title: node.title,
                  html: node.html.text,
                  tags: node.tags.all,
                  id: node.id
                }}
                isDarkMode={props.isDarkMode}
              />
            ))}
          </>
        )}
      </Shell>
    </>
  );
};

export default connect(
  state => ({
    isDarkMode: state.app.isDarkMode,
    lastPageTitle: state.app.lastPageTitle,
    lastPageUrl: state.app.lastPageUrl,
    searchQuery: state.app.searchQuery,
  }),
  null,
)(SearchPage);

export const searchPageQuery = graphql`
  query searchSnippetList {
    allSnippet {
      edges {
        node {
          title
          html {
            text
          }
          tags {
            all
          }
          id
        }
      }
    }
  }
`;
