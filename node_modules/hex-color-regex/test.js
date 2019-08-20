/*!
 * hex-color-regex <https://github.com/regexps/hex-color-regex>
 *
 * Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var hexColorRegex = require('./index')

var sixDigits = {
  pass: [
    '#afebe3',
    '#AFEBE3',
    '#3cb371',
    '#3CB371',
    '#556b2f',
    '#556B2F',
    '#708090',
    '#7b68ee',
    '#7B68EE',
    '#eeeeee',
    '#ffffff',
    '#123fff}',
    '#111111'
  ],
  fail: [
    'afebe3',
    'AFEBE3',
    '3cb371',
    'ABC371',
    '556b2f',
    '5A6B2F',
    '708090',
    '7b68ee',
    '7B68EE',
    'eeeeee',
    'ffffff',
    '111111',
    'afebef',
    '3c537f',
    '556B2f',
    '708135',
    'EE3EF1',
    '7f68ZY',
    '#7f68ZY',
    '#7z68ZY',
    '#GR68',
    '#Z68',
    '#666EFR'
  ]
}

var threeDigits = {
  pass: [
    '#afe',
    '#AF3',
    '#3cb',
    '#3CB',
    '#b2f',
    '#5B2',
    '#708',
    '#68e',
    '#7AF',
    '#777',
    '#FFF',
    '#fff',
    '#f3f}',
    '#111'
  ],
  fail: [
    'fff',
    '4zy',
    '4g1',
    '111',
    'Ge3',
    'zY1',
    '#ggg',
    '#4zy',
    '#4g1',
    '#Ge3',
    '#zY1'
  ]
}

var fourDigits = {
  pass: ['#afe0', '#AF31', '#3cba', '#3CBA', '#b2ff', '#5B2F'],
  fail: ['afe0', 'AF31', '#3cbg', '#3CBy', '#b2fz']
}

var eightDigits = {
  pass: ['#afebe300', '#AFEBE3AA', '#3cb371ff', '#3CB371CC', '#556b2f55'],
  fail: ['afebe300', 'AFEBE3AA', '#3cb371fg', '#3CB371xy', '#556b2fz9']
}

test('hex-color-regex:', function() {
  test('in no strict mode', function() {
    test('six digit hex', function() {
      test('should be `true`', function() {
        sixDigits.pass.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
        test('when `foo #ae3f4c bar` value', function() {
          test.equal(hexColorRegex().test('foo #ae3f4c bar'), true)
        })
      })
      test('should be `false`', function() {
        sixDigits.fail.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('three digit hex', function() {
      test('should be `true`', function() {
        threeDigits.pass.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
        test('when `foo #e4f bar` value', function() {
          test.equal(hexColorRegex().test('foo #e4f bar'), true)
        })
      })
      test('should be `false`', function() {
        threeDigits.fail.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('eight digit alpha channel hex', function() {
      test('should be `true`', function() {
        eightDigits.pass.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
        test('when `foo #ae3f4c bar` value', function() {
          test.equal(hexColorRegex().test('foo #ae3f4c00 bar'), true)
        })
      })
      test('should be `false`', function() {
        eightDigits.fail.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('four digit alpha channel hex', function() {
      test('should be `true`', function() {
        fourDigits.pass.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), true)
          })
        })
        test('when `foo #ae3f4c bar` value', function() {
          test.equal(hexColorRegex().test('foo #ae3f bar'), true)
        })
      })
      test('should be `false`', function() {
        fourDigits.fail.forEach(function(hex) {
          test('when `' + hex + '` value', function() {
            test.equal(hexColorRegex().test(hex), false)
          })
        })
      })
    })
    test('using regex().exec(hex)', function() {
      sixDigits.pass.forEach(function(hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function() {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
      test('should match `#ae3f4c` when `foo #ae3f4c bar` string', function() {
        var actual = hexColorRegex().exec('foo #ae3f4c bar')[0]
        var expected = '#ae3f4c'

        test.equal(actual, expected)
      })
      threeDigits.pass.forEach(function(hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function() {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
      test('should match `#e7f` when `foo #e7f bar` string', function() {
        var actual = hexColorRegex().exec('foo #e7f bar')[0]
        var expected = '#e7f'

        test.equal(actual, expected)
      })
      eightDigits.pass.forEach(function(hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function() {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
      test('should match `#ae3f4c00` when `foo #ae3f4c00 bar` string', function() {
        var actual = hexColorRegex().exec('foo #ae3f4c00 bar')[0]
        var expected = '#ae3f4c00'

        test.equal(actual, expected)
      })
      fourDigits.pass.forEach(function(hex) {
        var hexed = hex.replace('}', '')
        test('should match `' + hexed + '` when `' + hex + '` hex', function() {
          var actual = hexColorRegex().exec(hex)[0]
          var expected = hexed

          test.equal(actual, expected)
        })
      })
      test('should match `#e7f0` when `foo #e7f0 bar` string', function() {
        var actual = hexColorRegex().exec('foo #e7f0 bar')[0]
        var expected = '#e7f0'

        test.equal(actual, expected)
      })
    })
  })
  test('in strict mode', function() {
    test('six digit hex `#123fff}` should return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('#123fff}'), false)
    })
    test('string contain six digit hex `foo #ae3f4c bar` return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('foo #ae3f4c bar'), false)
    })
    test('three digit hex `#f3f}` should return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('#f3f}'), false)
    })
    test('string contain three digit hex `foo #e7f bar` return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('foo #e7f bar'), false)
    })
    test('eight digit alpha channel hex `#123fff00}` should return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('#123fff00}'), false)
    })
    test('string contain eight digit alpha channel hex `foo #ae3f4cff bar` return false', function() {
      test.equal(
        hexColorRegex({ strict: true }).test('foo #ae3f4cff bar'),
        false
      )
    })
    test('four digit alpha channel hex `#f3f0}` should return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('#f3f0}'), false)
    })
    test('string contain four digit alpha channel hex `foo #e7ff bar` return false', function() {
      test.equal(hexColorRegex({ strict: true }).test('foo #e7ff bar'), false)
    })
    test('should not match when `foo #ae3f4c bar` string', function() {
      var actual = hexColorRegex({ strict: true }).exec('foo #ae3f4c bar')
      var expected = null

      test.equal(actual, expected)
    })
    test('should not match when `foo #e7f bar` string', function() {
      var actual = hexColorRegex({ strict: true }).exec('foo #e7f bar')
      var expected = null

      test.equal(actual, expected)
    })
    test('should not match when `foo #ae3f4cff bar` string', function() {
      var actual = hexColorRegex({ strict: true }).exec('foo #ae3f4cff bar')
      var expected = null

      test.equal(actual, expected)
    })
    test('should not match when `foo #e7ff bar` string', function() {
      var actual = hexColorRegex({ strict: true }).exec('foo #e7ff bar')
      var expected = null

      test.equal(actual, expected)
    })
  })
})
