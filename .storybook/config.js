import { configure } from '@storybook/react';
import { addDecorator, addParameters } from '@storybook/react';
import { withContexts } from '@storybook/addon-contexts/react';
import { withKnobs } from '@storybook/addon-knobs';

import contexts from './contexts';
import viewports from './viewports';
import 'index.scss';

addDecorator(withKnobs);
addDecorator(withContexts(contexts));
addParameters({
  viewport: {
    viewports: viewports
  }
});

// automatically import all files ending in *.stories.js
configure(require.context('../src', true, /\.stories\.js$/), module);

