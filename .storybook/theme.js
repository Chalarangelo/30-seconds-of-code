import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorSecondary: '#3B3EFC',

  // UI
  appBg: '#FFFFFF',
  appContentBg: 'transparent',
  appBorderColor: '#E4E6EC',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Noto Sans", "Open Sans", Helvetica, sans-serif',
  fontCode: '"Roboto Mono", Menlo, Consolas, monospace',

  // Text colors
  textColor: '#404454',
  textInverseColor: '#ABAFBF',

  // Toolbar default and active colors
  barTextColor: '#666E8F',
  barSelectedColor: '#404454',
  barBg: '#F5F6FA',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#E4E6EC',
  inputTextColor: '#0D0E17',
  inputBorderRadius: 4,

  brandTitle: '30 seconds',
  brandUrl: 'https://www.30secondsofcode.org/',
  brandImage: 'https://raw.githubusercontent.com/30-seconds/30-seconds-of-code/master/logo.png',
});