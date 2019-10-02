import React from 'react';
import PropTypes from 'prop-types';
import { trimWhiteSpace } from 'functions/utils';
import _ from 'lang';
const _l = _('en');

const Search = ({
  defaultValue,
  setSearchQuery,
  className = '',
  id = '',
}) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setSearchQuery && setSearchQuery(value);
  }, [value]);

  return (
    <input
      defaultValue={ defaultValue }
      className={ trimWhiteSpace`search-box ${className}` }
      type='search'
      id={ id }
      placeholder={ _l('Search...') }
      aria-label={ _l('Search snippets') }
      onKeyUp={ e => {
        setValue(e.target.value);
      } }
    />
  );
};

Search.propTypes = {
  /** Initial value for the search bar */
  defaultValue: PropTypes.string,
  /** Callback function that handles search bar value changes  */
  setSearchQuery: PropTypes.func.isRequired,
  /** Additional classname(s) for the search bar */
  className: PropTypes.string,
  /** Element id */
  id: PropTypes.string,
};

export default Search;
