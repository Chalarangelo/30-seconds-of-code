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
  const snippet = props.data.snippet;

  return (
    <>
      <Meta title={snippet.title} description={snippet.text.short} />
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
            title: snippet.title,
            html: snippet.html.full,
            codeHtml: snippet.html.code,
            exampleHtml: snippet.html.example,
            textHtml: snippet.html.text,
            code: snippet.code.src,
            tags: snippet.tags.all,
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
  query SnippetBySlug($slug: String!) {
    logo: file(absolutePath: { regex: "/logo_reverse_md.png/" }) {
      id
      childImageSharp {
        fixed(height: 45, width: 45) {
          src
        }
      }
    }
    snippet (slug: {eq: $slug }) {
      title
      html {
        full
        code
        example
        text
      }
      code {
        src
      }
      tags {
        all
      }
      title
      text {
        short
      }
    }
  }
`;
