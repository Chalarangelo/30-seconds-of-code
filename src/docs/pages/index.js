import React from 'react';
import { graphql, Link } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage, pushNewQuery } from '../state/app';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import Search from '../components/Search';
import SnippetCard from '../components/SnippetCard';
import SimpleCard from '../components/SimpleCard';

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
          <>
            <p className='index-light-sub'>
              Start typing a keyword to see matching snippets or <Link to='/list'>click to view the whole list</Link>.
            </p>
            <div className='index-spacer' />
          </>
        ) : searchResults.length === 0 ? (
          <>
            <p className='index-light-sub'>
              We couldn't find any results for the keyword{' '}
              <strong>{searchQuery}</strong>.
            </p>
            <div className='index-spacer' />
          </>
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
        <SimpleCard title='About us'>
          <p style={{ textAlign: 'justify' }}><strong>30 seconds</strong> provides high quality learning resources for beginner and advanced developers in the form of snippet collections in various programming languages, since its inception in 2017. Today, <strong>30 seconds</strong> consists of a community of over 250 contributors and  more than 10 maintainers, dedicated to creating the best short-form learning resources for software developers. Our goal is to lower the barrier of entry to software development and help the open source community grow, by helping people learn to code for free.<br/><br/><Link to='/about'>Read more...</Link></p>
        </SimpleCard>
        <SimpleCard title='Our other projects'>
          <ul>
            {
              [
                { name: '30 seconds of CSS', url: 'https://css.30secondsofcode.org/' },
                { name: '30 seconds of Python', url: 'https://python.30secondsofcode.org/' },
                { name: '30 seconds of React', url: 'https://react.30secondsofcode.org/' },
                { name: '30 seconds of PHP', url: 'https://php.30secondsofcode.org/' },
                { name: '30 seconds of Interviews', url: 'https://30secondsofinterviews.org/' },
                { name: '30 seconds of Knowledge', url: 'https://30secondsofknowledge.org/' },
              ].map(v => (<li><a href={v.url} key={`link_${v.name}`} target='_blank' rel='noopener noreferrer'>{v.name}</a></li>))
            }
          </ul>
        </SimpleCard>
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
