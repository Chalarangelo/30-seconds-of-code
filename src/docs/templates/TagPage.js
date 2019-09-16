import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard';

import { capitalize, getRawCodeBlocks as getCodeBlocks } from '../util';

// ===================================================
// Individual snippet category/tag page
// ===================================================
const TagRoute = props => {
  const tag = props.pageContext.tag;
  const snippets = props.pageContext.snippets;

  React.useEffect(() => {
    props.dispatch(pushNewPage(capitalize(tag), props.path));
  }, []);

  return (
    <>
      <Meta title={capitalize(tag)} />
      <Shell>
        <h2 className='page-title'>{capitalize(tag)}</h2>
        <p className='light-sub'>Click on a snippet card to view the snippet.</p>
        {snippets &&
          snippets.map(snippet => (
            <SnippetCard
              key={`snippet_${snippet.id}`}
              short
              snippetData={{
                title: snippet.title,
                html: snippet.html,
                tags: snippet.tags,
                id: snippet.id,
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
)(TagRoute);
