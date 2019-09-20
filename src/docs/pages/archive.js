import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard'

// ===================================================
// Individual snippet category/tag page
// ===================================================
const ArchivePage = props => {
  const snippets = props.data.allSnippet.edges;

  React.useEffect(() => {
    props.dispatch(pushNewPage('Archived', props.path));
  }, []);

  return (
    <>
      <Meta title='Archived snippets' />
      <Shell>
        <h2 className='page-title'>Archived snippets</h2>
        <p className='page-sub-title'>These snippets, while useful and interesting, didn't quite make it into the repository due to either having very specific use-cases or being outdated. However we felt like they might still be useful to some readers, so here they are.</p>
        <p className='light-sub'>Click on a snippet card to view the snippet.</p>
        {snippets &&
          snippets.map(({ node }) => (
            <SnippetCard
              key={`snippet_${node.id}`}
              short
              archived
              snippetData={{
                title: node.title,
                html: node.html.text,
                tags: node.tags.all,
                id: node.id
              }}
              isDarkMode={props.isDarkMode}
            />
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
)(ArchivePage);

export const archivePageQuery = graphql`
  query archiveListing {
    allSnippet(filter: {archived: {eq: true}}) {
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
  }
`;
