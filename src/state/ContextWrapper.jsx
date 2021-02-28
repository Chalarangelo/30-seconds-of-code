import React from 'react';
import { ShellProvider } from './shell';
import { SearchProvider } from './search';

/**
 * Shell wrapper for React components.
 * @param {*} element - The element to be wrapped.
 */
const ContextWrapper = ({ element }) => (
  <ShellProvider>
    <SearchProvider>{element}</SearchProvider>
  </ShellProvider>
);

export default ContextWrapper;
