import React from 'react';
import { graphql, Link } from 'gatsby';
import { connect } from 'react-redux';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard';
import BackArrowIcon from '../components/SVGs/BackArrowIcon';

// ===================================================
// Individual snippet page template
// ===================================================
const SnippetPage = props => {
  const post = props.data.markdownRemark;
  const postData = props.data.snippetDataJson.data.find(
    v => v.title === post.frontmatter.title,
  );

  return (
    <>
      <Meta title={post.frontmatter.title} description={post.excerpt} />
      <Shell>
        <Link
          className='link-back'
          to={`${props.lastPageUrl}`}
        >
          <BackArrowIcon />
          &nbsp;&nbsp;Back to {props.lastPageTitle}
        </Link>
        <SnippetCard
          snippetData={{
            id: postData.id,
            title: postData.title,
            html: post.html,
            code: postData.attributes.codeBlocks,
            tags: postData.attributes.tags,
            supportPercentage: postData.attributes.browserSupport.supportPercentage
          }}
          isDarkMode={props.isDarkMode}
        />
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
)(SnippetPage);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    logo: file(absolutePath: { regex: "/logo_reverse_md.png/" }) {
      id
      childImageSharp {
        fixed(height: 45, width: 45) {
          src
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
    snippetDataJson(meta: { type: { eq: "snippetArray" } }) {
      data {
        title
        id
        attributes {
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
          tags
        }
      }
    }
  }
`;
