'use strict';

var Iconv = require('../lib/iconv-loader');
var encoding = require('../lib/encoding');

exports['General tests'] = {

    'Iconv is available': function (test) {
        test.ok(Iconv);
        test.done();
    },

    'From UTF-8 to Latin_1 with Iconv': function (test) {
        var input = 'ÕÄÖÜ',
            expected = new Buffer([0xd5, 0xc4, 0xd6, 0xdc]);
        test.deepEqual(encoding.convert(input, 'latin1'), expected);
        test.done();
    },

    'From Latin_1 to UTF-8 with Iconv': function (test) {
        var input = new Buffer([0xd5, 0xc4, 0xd6, 0xdc]),
            expected = 'ÕÄÖÜ';
        test.deepEqual(encoding.convert(input, 'utf-8', 'latin1').toString(), expected);
        test.done();
    },

    'From UTF-8 to UTF-8 with Iconv': function (test) {
        var input = 'ÕÄÖÜ',
            expected = new Buffer('ÕÄÖÜ');
        test.deepEqual(encoding.convert(input, 'utf-8', 'utf-8'), expected);
        test.done();
    },

    'From Latin_13 to Latin_15 with Iconv': function (test) {
        var input = new Buffer([0xd5, 0xc4, 0xd6, 0xdc, 0xd0]),
            expected = new Buffer([0xd5, 0xc4, 0xd6, 0xdc, 0xA6]);
        test.deepEqual(encoding.convert(input, 'latin_15', 'latin13'), expected);
        test.done();
    },

    'From ISO-2022-JP to UTF-8 with Iconv': function (test) {
        var input = new Buffer('GyRCM1g5OzU7PVEwdzgmPSQ4IUYkMnFKczlwGyhC', 'base64'),
            expected = new Buffer('5a2m5qCh5oqA6KGT5ZOh56CU5L+u5qSc6KiO5Lya5aCx5ZGK', 'base64');
        test.deepEqual(encoding.convert(input, 'utf-8', 'ISO-2022-JP'), expected);
        test.done();
    },

    'From UTF-8 to Latin_1 with iconv-lite': function (test) {
        var input = 'ÕÄÖÜ',
            expected = new Buffer([0xd5, 0xc4, 0xd6, 0xdc]);
        test.deepEqual(encoding.convert(input, 'latin1', false, true), expected);
        test.done();
    },

    'From Latin_1 to UTF-8 with iconv-lite': function (test) {
        var input = new Buffer([0xd5, 0xc4, 0xd6, 0xdc]),
            expected = 'ÕÄÖÜ';
        test.deepEqual(encoding.convert(input, 'utf-8', 'latin1', true).toString(), expected);
        test.done();
    },

    'From UTF-8 to UTF-8 with iconv-lite': function (test) {
        var input = 'ÕÄÖÜ',
            expected = new Buffer('ÕÄÖÜ');
        test.deepEqual(encoding.convert(input, 'utf-8', 'utf-8', true), expected);
        test.done();
    },

    'From Latin_13 to Latin_15 with iconv-lite': function (test) {
        var input = new Buffer([0xd5, 0xc4, 0xd6, 0xdc, 0xd0]),
            expected = new Buffer([0xd5, 0xc4, 0xd6, 0xdc, 0xA6]);
        test.deepEqual(encoding.convert(input, 'latin_15', 'latin13', true), expected);
        test.done();
    }
};
