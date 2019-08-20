/* @noflow */
const report = require('../dist');
/* eslint-disable flowtype/require-return-type */
const someList = ['bananas', 'tulips', 'eggs', 'bamischijf'];

report.info('My grocery list');
report.list('dunno', someList);

const hints = {
  bananas: 'for baking',
  tulips: 'because it makes you happy',
  eggs: 'not the cheap ones though',
  bamischijf: 'if they have it',
};

report.info('The same list with hints');
report.list('dunno', someList, hints);
