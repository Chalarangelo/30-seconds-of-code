import React from 'react';
import { ShellProvider } from './shell';
import { NavigationProvider } from './navigation';
import { SearchProvider } from './search';

/**
 * Shell wrapper for React components.
 * @param {*} element - The element to be wrapped.
 */
const ContextWrapper = ({ element }) => (
  <ShellProvider>
    <NavigationProvider>
      <SearchProvider>{element}</SearchProvider>
    </NavigationProvider>
  </ShellProvider>
);

export default ContextWrapper;
