/* eslint-env jest */
/* eslint global-require: 0 */

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import plugin from '../src';

const rules = fs.readdirSync(path.resolve(__dirname, '../src/rules/'))
  .map(f => path.basename(f, '.js'));

describe('all rule files should be exported by the plugin', () => {
  rules.forEach((ruleName) => {
    it(`should export ${ruleName}`, () => {
      assert.equal(
        plugin.rules[ruleName],
        require(path.join('../src/rules', ruleName)) // eslint-disable-line
      );
    });
  });
});

describe('configurations', () => {
  it('should export a \'recommended\' configuration', () => {
    assert(plugin.configs.recommended);
  });
});

describe('schemas', () => {
  rules.forEach((ruleName) => {
    it(`${ruleName} should export a schema with type object`, () => {
      const rule = require(path.join('../src/rules', ruleName)); // eslint-disable-line
      const schema = rule.meta && rule.meta.schema && rule.meta.schema[0];
      const { type } = schema;

      assert.deepEqual(type, 'object');
    });
  });
});
