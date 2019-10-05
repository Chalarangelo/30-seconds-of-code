import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withTests } from '@storybook/addon-jest';
import { withKnobs } from '@storybook/addon-knobs';

import contexts from './contexts';
import viewports from './viewports';
import results from './jest-test-results.json';
import theme from './theme';
import 'index.scss';

addDecorator(withContexts(contexts));
addDecorator(withTests({ results }));
addDecorator(withKnobs);
addParameters({
  viewport: {
    viewports: viewports
  }
});
addParameters({
  options: {
    theme
  },
});

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

// automatically import all files ending in *.stories.js
configure(
  [
    require.context('../src', true, /\.stories\.js$/),
    require.context('../src', true, /\.stories\.jsx$/),
    require.context('../src', true, /\.stories\.mdx$/),
  ], 
  module
);

