import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage, pushNewQuery } from '../state/app';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import Search from '../components/Search';
import SnippetCard from '../components/SnippetCard';

// ===================================================
// Home page (splash and search)
// ===================================================
const IndexPage = props => {
  const snippets = props.data.snippetDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.html,
    tags: snippet.attributes.tags,
    id: snippet.id
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
      <Meta meta={[{ name: `google-site-verification`, content: `YX9mF-TxoHZGJ9SZ8XwvWgGR_KTcbH1uHul4iDklyr0`}]}/>
      <Shell withIcon={false} withTitle={false}>
        <img
          src={props.data.file.childImageSharp.original.src}
          alt='Logo'
          className='index-logo'
        />
        <h1 className='index-title'>{props.data.site.siteMetadata.title}</h1>
        <p className='index-sub-title'>
          {props.data.site.siteMetadata.description}
        </p>
        <Search
          setSearchQuery={setSearchQuery}
          defaultValue={props.searchQuery}
        />
        {searchQuery.length === 0 ? (
          <p className='light-sub'>
            Start typing a keyword to see matching snippets.
          </p>
        ) : searchResults.length === 0 ? (
          <p className='light-sub'>
            We couldn't find any results for the keyword{' '}
            <strong>{searchQuery}</strong>.
          </p>
        ) : (
          <>
            <p className='light-sub'>
              Click on a snippet card to view the snippet.
            </p>
            <h2 className='page-sub-title'>Search results</h2>
            {searchResults.map(snippet => (
              <SnippetCard
                short
                key={`snippet_${snippet.id}`}
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
)(IndexPage);

export const indexPageQuery = graphql`
  query snippetList {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    file(relativePath: { eq: "30s-icon.png" }) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    snippetDataJson(meta: { type: { eq: "snippetListingArray" }, scope: {eq: "./snippets"} }) {
      data {
        id
        title
        attributes {
          tags
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
