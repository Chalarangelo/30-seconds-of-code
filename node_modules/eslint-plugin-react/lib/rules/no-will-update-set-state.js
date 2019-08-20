/**
 * @fileoverview Prevent usage of setState in componentWillUpdate
 * @author Yannick Croissant
 */

'use strict';

const makeNoMethodSetStateRule = require('../util/makeNoMethodSetStateRule');
const versionUtil = require('../util/version');

module.exports = makeNoMethodSetStateRule(
  'componentWillUpdate',
  context => versionUtil.testReactVersion(context, '16.3.0')
);
