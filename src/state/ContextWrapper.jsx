import React from 'react';
import { ShellProvider } from './shell';
import { SearchProvider } from './search';

/**
 * Shell wrapper for React components.
 * @param {*} children - The children to be wrapped.
 */
const ContextWrapper = ({ children }) => (
  <ShellProvider>
    <SearchProvider>{children}</SearchProvider>
  </ShellProvider>
);

export default ContextWrapper;
