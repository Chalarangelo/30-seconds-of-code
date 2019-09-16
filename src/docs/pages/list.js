import React from 'react';
import { graphql, Link } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';
import { capitalize } from '../util';
import config from '../../../config';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import SnippetCard from '../components/SnippetCard';

import SimpleCard from '../components/SimpleCard';

// ===================================================
// Snippet list page
// ===================================================
const ListPage = props => {
  const snippets = props.data.allSnippet.edges;
  const archivedSnippets = props.data.allArchivedSnippet.edges;

  const tags = [...new Set(
    snippets.map(snippet => (snippet.node.tags || { primary: null }).primary)
  )]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  
  const staticPages = [
    {
      url: 'beginner',
      title: 'Beginner snippets',
      description: 'Snippets aimed towards individuals at the start of their web developer journey.',
    },
    {
      url: 'glossary',
      title: 'Glossary',
      description: 'A handy glossary of web development terminology.',
    },
    {
      url: 'about',
      title: 'About',
      description: 'A few word about us, our goals and our projects.',
    },
  ];

  React.useEffect(() => {
    props.dispatch(pushNewPage('Snippet List', '/list'));
  }, []);

  return (
    <>
      <Meta title='Snippet List' />
      <Shell withIcon={true} isList>
        <h2 className='page-title'>Snippet List</h2>
        <p className='light-sub'>
          Click on a snippet card to view the snippet or a tag name to view all
          snippets in that category.
        </p>
        {tags.sort((a,b) => a.localeCompare(b)).map(tag => (
          <>
            <h3 className='tag-title' key={`tag_title_${tag}`}>
              <Link
                key={`tag_link_${tag}`}
                to={`/tag/${tag}`}
              >
                {capitalize(tag)}
              </Link>
            </h3>
            {snippets
              .filter(({node}) => node.tags.primary === tag)
              .map(({node}) => (
                <SnippetCard
                  key={`snippet_${node.id}`}
                  short
                  snippetData={{
                    title: node.title,
                    html: node.html.text,
                    tags: node.tags.all,
                    id: node.id
                  }}
                />
              ))}
          </>
        ))}
        <h3 className='tag-title'><Link
          to={`/archive`}
        >
          Archived snippets
        </Link></h3>
        {archivedSnippets
          .map(({node}) => (
            <SnippetCard
              key={`a_snippet_${node.id}`}
              short
              archived
              snippetData={{
                title: node.title,
                html: node.html.text,
                tags: node.tags.all,
                id: node.id
              }}
            />
          ))}
        <br/>
        {staticPages.map(page => (
          <Link
            to={`/${page.url}`}
            className='clickable-card-wrapper'
          >
            <SimpleCard title={page.title}>
              <p>{page.description}</p>
            </SimpleCard>
          </Link>
        ))}
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
)(ListPage);

export const listPageQuery = graphql`
  query snippetListing {
    allSnippet(filter: {archived: {eq: false}}) {
      edges {
        node {
          title
          html {
            text
          }
          tags {
            all
            primary
          }
          id
        }
      }
    }
    allArchivedSnippet: allSnippet(filter: {archived: {eq: true}}) {
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
