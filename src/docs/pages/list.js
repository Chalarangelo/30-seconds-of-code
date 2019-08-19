import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';
import { capitalize } from '../util';
import config from '../../../config';

import Shell from '../components/Shell';
import Meta from '../components/Meta';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import SnippetCard from '../components/SnippetCard';

import { getRawCodeBlocks as getCodeBlocks } from '../util';
import SimpleCard from '../components/SimpleCard';

// ===================================================
// Snippet list page
// ===================================================
const ListPage = props => {
  console.log(props);
  const snippets = props.data.snippetDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.html,
    tags: snippet.attributes.tags,
    text: snippet.attributes.text,
    id: snippet.id,
    archived: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.fileAbsolutePath.indexOf(config.snippetArchivePath) !== -1,
    code: getCodeBlocks(
      props.data.allMarkdownRemark.edges.find(
        v => v.node.frontmatter.title === snippet.title,
      ).node.rawMarkdownBody,
    ).code,
  }));
  const archivedSnippets = props.data.snippetsArchiveDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.html,
    tags: snippet.attributes.tags,
    text: snippet.attributes.text,
    id: snippet.id,
    archived: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.fileAbsolutePath.indexOf(config.snippetArchivePath) !== -1,
    code: getCodeBlocks(
      props.data.allMarkdownRemark.edges.find(
        v => v.node.frontmatter.title === snippet.title,
      ).node.rawMarkdownBody,
    ).code,
  }));
  console.log(snippets);
  console.log(archivedSnippets);
  const tags = snippets.reduce((acc, snippet) => {
    if (!snippet.tags) return acc;
    const primaryTag = snippet.tags[0];
    if (!acc.includes(primaryTag)) acc.push(primaryTag);
    return acc;
  }, []);
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
          Click on a snippet’s name to view its code or a tag name to view all
          snippets in that category.
        </p>
        {tags.sort((a,b) => a.localeCompare(b)).map(tag => (
          <>
            <h3 className='tag-title' key={`tag_title_${tag}`}>
              <AniLink
                key={`tag_link_${tag}`}
                paintDrip
                to={`/tag/${tag}`}
                hex={props.isDarkMode ? '#434E76' : '#FFFFFF'}
              >
                {capitalize(tag)}
              </AniLink>
            </h3>
            {snippets
              .filter(snippet => !snippet.archived)
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
        <h3 className='tag-title'><AniLink
          paintDrip
          to={`/archive`}
          hex={props.isDarkMode ? '#434E76' : '#FFFFFF'}
        >
          Archived snippets
        </AniLink></h3>
        {archivedSnippets
          .filter(snippet => snippet.archived)
          .map(snippet => (
            <SnippetCard
              key={`a_snippet_${snippet.id}`}
              short
              archived
              snippetData={snippet}
              isDarkMode={props.isDarkMode}
            />
          ))}
        <br/>
        {staticPages.map(page => (
          <SimpleCard 
            title={(
              <AniLink
                paintDrip
                to={`/${page.url}`}
                hex={props.isDarkMode ? '#434E76' : '#FFFFFF'}
              >
                {page.title}
              </AniLink>
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
    snippetsArchiveDataJson : snippetDataJson(meta: { type: { eq: "snippetListingArray" }, scope: {eq: "./snippets_archive"} }) {
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
          fileAbsolutePath
        }
      }
    }
  }
`;
