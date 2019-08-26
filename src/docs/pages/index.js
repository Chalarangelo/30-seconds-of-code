import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';
import { capitalize } from '../util';

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
  const snippets = props.data.snippetDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(
      v => v.node.frontmatter.title === snippet.title,
    ).node.html,
    tags: snippet.attributes.tags,
    text: snippet.attributes.text,
    id: snippet.id,
    code: snippet.attributes.codeBlocks,
    supportPercentage: snippet.attributes.browserSupport.supportPercentage,
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
    props.dispatch(pushNewPage('Snippet List', '/'));
  }, []);

  return (
    <>
      <Meta 
        title='Snippet List' 
        meta={[{ name: `google-site-verification`, content: `YX9mF-TxoHZGJ9SZ8XwvWgGR_KTcbH1uHul4iDklyr0` }]}
      />
      <Shell withIcon={false} withTitle={false} isList>
        <div className='splash'>
          <div className='splash-container'>
            <img className='splash-leaves' id='splash-leaves-1' src={props.data.leaves1.childImageSharp.original.src} alt='splash-leaves-1' />
            <img className='splash-leaves' id='splash-leaves-2' src={props.data.leaves2.childImageSharp.original.src} />
            <img id='splash-blob' src={props.data.blob.childImageSharp.original.src} alt='splash-blob' />
            <div className='splash-content'>
              <img
                src={props.data.file.childImageSharp.original.src} alt='Logo' className='splash-logo'
              />
              <h1 className='splash-title'
                dangerouslySetInnerHTML={{
                  __html: `${props.data.site.siteMetadata.title.replace('CSS', '<strong>CSS</strong>')}`
                }}
              />
              <p className='splash-sub-title'>
                {props.data.site.siteMetadata.description}
              </p>
            </div>
          </div>
        </div>
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
    leaves1 : file(relativePath: { eq: "leaves1.png" }) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    leaves2 : file(relativePath: { eq: "leaves2.png" }) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    blob : file(relativePath: { eq: "blob.png" }) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    snippetDataJson(meta: { type: { eq: "snippetArray" } }) {
      data {
        id
        title
        attributes {
          tags
          text
          codeBlocks {
            html
            css
            js
            scopedCss
          }
          browserSupport {
            supportPercentage
          }
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
