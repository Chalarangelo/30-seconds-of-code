'use strict';

const assert = require('assert');
const unit = require('../util/unit');

describe('unit', function () {
  it('unit', function () {
    assert.deepEqual(unit('.23rem'), {
      number: '.23',
      unit: 'rem',
    });

    assert.deepEqual(unit('.2.3rem'), {
      number: '.2',
      unit: '.3rem',
    });

    assert.deepEqual(unit('2.'), {
      number: '2.',
      unit: '',
    });

    assert.deepEqual(unit('+2.'), {
      number: '+2.',
      unit: '',
    });

    assert.deepEqual(unit('+-2.'), false);

    assert.deepEqual(unit('.'), false);

    assert.deepEqual(unit('.rem'), false);
  });
});