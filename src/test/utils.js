/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';

import { ShellProvider } from 'state/shell';
import { SearchProvider } from 'state/search';

const ContextWrapper = ({ children, initialState = {} }) => (
  <ShellProvider initialState={initialState.shell}>
    <SearchProvider initialState={initialState.search}>
      {children}
    </SearchProvider>
  </ShellProvider>
);

export const renderWithContext = (
  ui,
  { initialState = {}, ...renderOptions } = {},
  renderer = render
) => {
  const Wrapper = ({ children }) => (
    <ContextWrapper initialState={initialState}>{children}</ContextWrapper>
  );
  const utils = renderer(ui, { wrapper: Wrapper, ...renderOptions });
  return {
    ...utils,
  };
};

export const renderConnected = renderWithContext;
