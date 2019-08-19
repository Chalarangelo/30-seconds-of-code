import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage, pushNewQuery } from '../state/app';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import Search from '../components/Search';
import SnippetCard from '../components/SnippetCard';

import { getRawCodeBlocks as getCodeBlocks } from '../util';

// ===================================================
// Search page
// ===================================================
const SearchPage = props => {
  const snippets = props.data.snippetDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.html,
    tags: snippet.attributes.tags,
    text: snippet.attributes.text,
    id: snippet.id,
    code: getCodeBlocks(
      props.data.allMarkdownRemark.edges.find(
        v => v.node.frontmatter.title === snippet.title,
      ).node.rawMarkdownBody,
    ).code,
  }));

  const [searchQuery, setSearchQuery] = React.useState(props.searchQuery);
  const [searchResults, setSearchResults] = React.useState(snippets);

  React.useEffect(() => {
    props.dispatch(pushNewQuery(searchQuery));
    let q = searchQuery.toLowerCase();
    let results = snippets;
    if (q.trim().length)
      results = snippets.filter(
        v =>
          v.tags.filter(t => t.indexOf(q) !== -1).length ||
          v.title.toLowerCase().indexOf(q) !== -1,
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
        <p className='light-sub'>Click on a snippet's name to view its code.</p>
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
            {searchResults.map(snippet => (
              <SnippetCard
                key={`snippet_${snippet.id}`}
                short
                snippetData={snippet}
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
    snippetDataJson(meta: { type: { eq: "snippetListingArray" }, scope: {eq: "./snippets"} }) {
      data {
        id
        title
        attributes {
          tags
          text
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          html
          rawMarkdownBody
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
