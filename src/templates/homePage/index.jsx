import React from 'react';
import { connect } from 'react-redux';
import Meta from 'atoms/meta';
import Shell from 'organisms/shell';
import { Anchor } from 'atoms/anchor';
import Search from 'atoms/search';
import SimpleCard from 'molecules/simpleCard';
import PropTypes from 'prop-types';
import _ from 'lang';
const _l = _('en');

const HomePage = ({
  pageContext: {
    logoSrc,
  },
  searchIndex,
  searchQuery,
}) => {
  return (
    <>
      <Meta
        logoSrc={ logoSrc }
        meta={ [{ name: `google-site-verification`, content: `YX9mF-TxoHZGJ9SZ8XwvWgGR_KTcbH1uHul4iDklyr0`}] }
      />
      <Shell
        logoSrc={ logoSrc }
        isSearch={ false }
        isList={ false }
        withIcon={ false }
        withTitle={ false }
      >
        <h1 className='home-title'>
          <img
            src={ logoSrc }
            alt={ _l('Logo') }
            className='home-logo'
          />
          <span className='home-title-text'>
            { _l('site.title') }
          </span>
        </h1>
        <p className='home-sub-title'>
          { _l('site.description') }
        </p>
        <Search />
        <p className='home-light-sub'>
          { _l('Start typing a keyword to see matching snippets or ') }
          <Anchor
            link={ {
              internal: true,
              url: '/list',
            } }
          >
            { _l('click to view the whole list') }
          </Anchor>
          { _l('.') }
        </p>
        <SimpleCard title={ _l('About us') }>
          <p
            style={ {textAlign: 'justify'} }
          >
            { _l`m${'About us'}` }
            <br /><br />
            <Anchor
              link={ {
                internal: true,
                url: '/about',
              } }
            >
              { _l('Read more about us...') }
            </Anchor>
          </p>
        </SimpleCard>
      </Shell>
    </>
  );
};

HomePage.propTypes = {
  /** pageContext is passed from Gatsby to the page */
  pageContext: PropTypes.shape({
    /** URI for the logo image */
    logoSrc: PropTypes.string.isRequired,
  }),
};

export default connect(
  state => ({
    searchIndex: state.search.searchIndex,
    searchQuery: state.search.searchQuery,
  }),
  null
)(HomePage);
