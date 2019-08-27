import React from 'react';
import { graphql, Link } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';
import { capitalize } from '../util';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import SnippetCard from '../components/SnippetCard';

import { getRawCodeBlocks as getCodeBlocks } from '../util';
import SimpleCard from '../components/SimpleCard';

// ===================================================
// Snippet list page
// ===================================================
const ListPage = props => {
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
  const tags = snippets.reduce((acc, snippet) => {
    if (!snippet.tags) return acc;
    const primaryTag = snippet.tags[0];
    if (!acc.includes(primaryTag)) acc.push(primaryTag);
    return acc;
  }, []);
  const staticPages = [
    {
      url: 'about',
      title: 'About',
      description: 'A few word about us, our goals and our projects.'
    }
  ];

  React.useEffect(() => {
    props.dispatch(pushNewPage('Snippet List', '/list'));
  }, []);

  return (
    <>
      <Meta title='Snippet List' />
      <Shell withIcon={false} isList>
        <h2 className='page-title'>Snippet List</h2>
        <p className='light-sub'>
          Click on a snippet’s name to view its code or a tag name to view all
          snippets in that category.
        </p>
        {tags.map(tag => (
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
              .filter(snippet => snippet.tags[0] === tag)
              .map(snippet => (
                <SnippetCard
                  key={`snippet_${snippet.id}`}
                  short
                  snippetData={snippet}
                  isDarkMode={props.isDarkMode}
                />
              ))}
          </>
        ))}
        <br/>
        {staticPages.map(page => (
          <SimpleCard 
            title={(
              <Link
                to={`/${page.url}`}
              >
                {page.title}
              </Link>
            )}
          >
            <p>{page.description}</p>
          </SimpleCard>
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
    snippetDataJson(meta: { type: { eq: "snippetListingArray" } }) {
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
