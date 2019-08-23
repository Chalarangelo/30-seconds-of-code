import React from 'react';

// ===================================================
// Simple, stateful search component
// ===================================================
const Search = ({ defaultValue = '', setSearchQuery, className = '' }) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  return (
    <input
      defaultValue={defaultValue}
      className='search-box'
      type='search'
      id='searchInput'
      placeholder='Search...'
      aria-label='Snippet search'
      onKeyUp={e => {
        setValue(e.target.value);
      }}
    />
  );
};

export default Search;
