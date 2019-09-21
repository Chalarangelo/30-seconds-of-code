import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withTests } from '@storybook/addon-jest';
import { withKnobs } from '@storybook/addon-knobs';

import contexts from './contexts';
import viewports from './viewports';
import results from './jest-test-results.json';
import 'index.scss';

addDecorator(withContexts(contexts));

addDecorator(withKnobs);
addDecorator(withTests({ results }));
addParameters({
  viewport: {
    viewports: viewports
  }
});

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);

