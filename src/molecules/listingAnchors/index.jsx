import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkPropType } from 'typedefs';
import { AnchorButton } from 'atoms/button';
import PageSubtitle from 'atoms/pageSubtitle';
import { trimWhiteSpace } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

/**
 * Renders the set of buttons that link to other listing pages.
 * Used in Listing pages and Home page.
 * Depends on Button and PageSubtitle atoms.
 */
const ListingAnchors = ({
  items,
  isCompact = false,
  ...rest
}) =>
  isCompact ?
    <>
      <div
        className={ trimWhiteSpace`listing-anchors compact ${items.length > 4 ? 'with-scrollbar' : ''}` }
        { ...rest }
      >
        { items.map(item =>
          <AnchorButton
            key={ item.link.url }
            style={ item.style }
            link={ item.link }
          >
            { item.name }
          </AnchorButton>
        ) }
      </div>
    </>
    :
    <>
      <PageSubtitle isLight className='listing-anchors-title'>
        { _l('Top collections') }
      </PageSubtitle>
      <div
        className={ trimWhiteSpace`listing-anchors ${items.length > 4 ? 'with-scrollbar' : ''}` }
        { ...rest }
      >
        { items.map(item =>
          <AnchorButton
            key={ item.link.url }
            style={ item.style }
            link={ item.link }
          >
            { item.name }
            <span className='count'>
              { item.count }
            </span>
          </AnchorButton>
        ) }
      </div>
    </>;

ListingAnchors.propTypes = {
  /** Items that compose the listing anchors */
  items: PropTypes.arrayOf(PropTypes.shape({
    link: LinkPropType.isRequired,
    name: PropTypes.string,
  })).isRequired,
  /** Compact or large listing anchors */
  isCompact: PropTypes.bool,
  /** Any other props to be passed to the component */
  rest: PropTypes.any,
};

export default ListingAnchors;
