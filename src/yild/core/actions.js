import prepareAssets from '../prepareAssets';
import extractSnippets from '../extractSnippets';
import serveSnippets from '../serveSnippets';
import updateContent from '../updateContent';
import makeIcons from '../makeIcons';

// Keep this in a variable to allow for help to run the way it should.
export const helpFlag = /^-{0,2}h(elp)?$/gi;

/**
 * Actions object for yild.
 */
const actions = {
  // Do not remove to show up in the "man" page of the tool.
  'help': {
    description: 'display this text and exit',
    process: () => {},
    step: -1,
    matcher: helpFlag,
  },
  'assets': {
    description: 'preprocess assets from the provided config paths',
    process: prepareAssets,
    step: 1,
    matcher: /^-{0,2}a(ssets)?$/gi,
  },
  'extract': {
    description: 'extract snippets from the provided config paths',
    process: extractSnippets,
    step: 1,
    matcher: /^-{0,2}e(xtract)?$/gi,
  },
  'update': {
    description: 'fetch content sources from the respective repos',
    process: updateContent,
    step: 0,
    matcher: /^-{0,2}u(pdate)?$/gi,
  },
  'icons': {
    description: 'generate an icon font from the provided SVGs',
    process: makeIcons,
    step: 0,
    matcher: /^-{0,2}i(cons)?$/gi,
  },
  'serve': {
    description: 'serve snippets from the generated JSON files',
    process: serveSnippets,
    step: 2,
    matcher: /^-{0,2}s(erve)?$/gi,
  },
};

export default actions;
