'use strict';

const assert = require('assert');
const isColorStop = require('..');

describe('is-color-stop', function () {
  it('isColorStop', function () {
    assert.ok(isColorStop('yellow'));
    assert.ok(isColorStop('yellow', '12px'));
    assert.ok(!isColorStop('yellow', 'px'));
    assert.ok(isColorStop('yellow', 'calc(100%)'));
  });

  it('isColor', function () {
    assert.ok(isColorStop.isColor('rgb(255, 255, 255)'));
  });

  it('isRGB', function () {
    assert.ok(isColorStop.isRGB('rgb(255, 255, 255)'));
  });

  it('isRGBA', function () {
    assert.ok(isColorStop.isRGBA('rgba(255, 255, 255, .9)'));
  });

  it('isHSL', function () {
    assert.ok(isColorStop.isHSL('hsl(123, 45%, 67%)'));
  });

  it('isHSLA', function () {
    assert.ok(isColorStop.isHSLA('hsla(123, 45%, 67%, .9)'));
  });

  it('isHex', function () {
    assert.ok(isColorStop.isHex('#123456'));
  });

  it('isCSSColorName', function () {
    assert.ok(isColorStop.isCSSColorName('yellow'));
  });

  it('isTransparent', function () {
    assert.ok(isColorStop.isTransparent('transparent'));
  });
  
  it('isCSSLengthUnit', function () {
    assert.ok(isColorStop.isCSSLengthUnit('px'));
  });
});
