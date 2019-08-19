import React from 'react';
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { pushNewPage } from '../state/app';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SimpleCard from '../components/SimpleCard';

// ===================================================
// Individual snippet category/tag page
// ===================================================
const GlossaryPage = props => {
  const posts = props.data.snippetDataJson.data;
  console.log(posts);

  React.useEffect(() => {
    props.dispatch(pushNewPage('Glossary', props.path));
  }, []);

  return (
    <>
      <Meta title='Glossary' />
      <Shell>
        <h2 className='page-title'>Glossary</h2>
        <p className='page-sub-title'>Developers use a lot of terminology daily. Every once in a while, you might find a term you do not know. We know how frustrating that can get, so we provide you with a handy glossary of frequently used web development terms.</p>
        {posts &&
          posts.map(term => (
            <SimpleCard title={term.title}>
              <p>{term.attributes.text}</p>
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
)(GlossaryPage);

export const archivePageQuery = graphql`
  query GlossaryPage {
    snippetDataJson(meta: {type: {eq: "glossaryTermArray"}}) {
      data {
        attributes {
          text
        }
        title
        id
      }
    }
  }
`;
