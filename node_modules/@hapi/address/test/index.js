'use strict';

const Punycode = require('punycode');

const Code = require('code');
const Address = require('..');
const Lab = require('lab');


const internals = {};


const { describe, it } = exports.lab = Lab.script();
const expect = Code.expect;


describe('email', () => {

    describe('analyze()', () => {

        it('identifies error', () => {

            const tests = [
                ['', 'Address must be a non-empty string'],
                ['êjness@iana.org', 'Address contains forbidden Unicode characters', { allowUnicode: false }],
                ['test@test@test', 'Address cannot contain more than one @ character'],
                ['test', 'Address must contain one @ character'],
                ['@example.com', 'Address local part cannot be empty'],
                ['test@', 'Domain cannot be empty'],
                ['1234567890@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz.com', 'Address too long'],
                ['1234567890123456789012345678901234567890123456789012345678901234567890@example.com', 'Address local part too long'],
                ['x..y@example.com', 'Address local part contains empty dot-separated segment'],
                ['x:y@example.com', 'Address local part contains invalid character'],
                ['ê:y@example.com', 'Address local part contains invalid character'],
                ['test@com', 'Domain lacks the minimum required number of segments'],
                ['test@x.no-such-tld', 'Domain uses forbidden TLD'],
                ['test@example..com', 'Domain contains empty dot-separated segment'],
                ['test@1234567890123456789012345678901234567890123456789012345678901234567890.com', 'Domain contains dot-separated segment that is too long'],
                ['test@example+.com', 'Domain contains invalid character', { tlds: false }],
                ['test@example.com_', 'Domain contains invalid tld character', { tlds: false }]
            ];

            for (let i = 0; i < tests.length; ++i) {
                const email = tests[i];
                const output = Address.email.analyze(email[0], email[2]);
                const result = email[1];

                if (!output ||
                    output.error !== result) {

                    console.log(i, email[0]);
                }

                expect(output.error).to.equal(result);
            }
        });

        it('validates options', () => {

            const tests = [
                ['test@example.com', 'Invalid options: tlds must be a boolean or an object', { tlds: 1 }],
                ['test@example.com', 'Invalid options: tlds.allow must be a Set object or true', { tlds: { allow: ['test'] } }],
                ['test@example.com', 'Invalid options: tlds.deny must be a Set object', { tlds: { deny: ['test'] } }],
                ['test@example.com', 'Invalid options: cannot specify both tlds.allow and tlds.deny lists', { tlds: { allow: new Set(), deny: new Set() } }],
                [1, 'Invalid input: value must be a string']
            ];

            for (let i = 0; i < tests.length; ++i) {
                const email = tests[i];
                expect(() => Address.email.analyze(email[0], email[2])).to.throw(email[1]);
            }
        });

        describe('validated TLD', () => {

            it('applies built-in list', () => {

                expect(Address.email.analyze('test@example.com')).to.not.exist();
                expect(Address.email.analyze('test@example.com', { tlds: true })).to.not.exist();
                expect(Address.email.analyze('test@example.com', { tlds: { allow: true } })).to.not.exist();
            });

            it('ignores built-in list', () => {

                expect(Address.email.analyze('test@example.invalid-top', { tlds: false })).to.not.exist();
            });

            it('denies listed tls', () => {

                expect(Address.email.analyze('test@example.com', { tlds: { deny: new Set(['test']) } })).to.not.exist();
                expect(Address.email.analyze('test@example.com', { tlds: { deny: new Set(['com']) } })).to.equal({ error: 'Domain uses forbidden TLD' });
            });
        });
    });

    describe('isValid()', () => {

        it('validates email', () => {

            // Tests adapted from https://github.com/hapijs/isemail
            // Copyright (c) 2008-2019, Eli Skeggs, Dominic Sayers, GlobeSherpa

            const tests = [
                ['\r', false],
                ['test', false],
                ['@', false],
                ['test@', false],
                ['test@io', false],
                ['test@io', true, { minDomainSegments: 1 }],
                ['@io', false],
                ['@iana.org', false],
                ['test@iana.org', true],
                ['test@nominet.org.uk', true],
                ['test@about.museum', true],
                ['a@iana.org', true],
                ['êjness@iana.org', true],
                ['ñoñó1234@iana.org', true],
                ['ñoñó1234@something.com', true],
                ['伊昭傑@郵件.商務', true, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['\ud801\udc37\ud852\udf62@iana.org', true],
                ['test.test@iana.org', true],
                ['.test@iana.org', false],
                ['test.@iana.org', false],
                ['test..iana.org', false],
                ['test_exa-mple.com', false],
                ['!#$%&`*+/=?^`{|}~@iana.org', true],
                ['test\\@test@iana.org', false],
                ['123@iana.org', true],
                ['test@123.com', true],
                ['test@iana.123', false],
                ['test@255.255.255.255', false],
                ['abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm@iana.org', true],
                ['abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklmn@iana.org', false],
                ['\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06@iana.org', false],
                ['test@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm', false],
                ['test@\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06.org', true],
                ['test@abcdefghijklmnopqrstuvwxyzabcdefghijklmno\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06.org', false],
                ['test@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm.com', false],
                ['test@mason-dixon.com', true],
                ['test@-iana.org', false],
                ['test@iana-.com', false],
                ['test@.iana.org', false],
                ['test@iana.org.', false],
                ['test@iana..com', false],
                ['abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmno', false],
                ['abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.\ud83d\ude06\ud83d\ude06\ud83d\ude06\ud83d\ude06', false],
                ['abcdef@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdef.hijklmnopqrstuv', false],
                ['abcdef@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghi.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd\ud83d\ude06', false],
                ['abcdef@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghi.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz\ud83d\ude06', false],
                ['a@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijkl.hijk', false],
                ['a@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijkl.\ud83d\ude06', false],
                ['\"\r', false],
                ['\"test\"@iana.org', false],
                ['\"\"@iana.org', false],
                ['\"\"\"@iana.org', false],
                ['\"\\a\"@iana.org', false],
                ['\"\\\"\"@iana.org', false],
                ['\"\\\"@iana.org', false],
                ['\"\\\\\"@iana.org', false],
                ['test\"@iana.org', false],
                ['\"test@iana.org', false],
                ['\"test\"test@iana.org', false],
                ['test\"text\"@iana.org', false],
                ['\"test\"\"test\"@iana.org', false],
                ['\"test\".\"test\"@iana.org', false],
                ['\"test\\ test\"@iana.org', false],
                ['\"test\".test@iana.org', false],
                ['\"test\u0000\"@iana.org', false],
                ['\"test\\\u0000\"@iana.org', false],
                ['\"test\r\n test\"@iana.org', false],
                ['\"abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefghj\"@iana.org', false],
                ['\"abcdefghijklmnopqrstuvwxyz abcdefghijklmnopqrstuvwxyz abcdefg\\h\"@iana.org', false],
                ['test@[255.255.255.255]', false],
                ['test@a[255.255.255.255]', false],
                ['test@[255.255.255]', false],
                ['test@[255.255.255.255.255]', false],
                ['test@[255.255.255.256]', false],
                ['test@[1111:2222:3333:4444:5555:6666:7777:8888]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:7777]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:7777:8888]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:7777:8888:9999]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:7777:888G]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666::8888]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555::8888]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666::7777:8888]', false],
                ['test@[IPv6::3333:4444:5555:6666:7777:8888]', false],
                ['test@[IPv6:::3333:4444:5555:6666:7777:8888]', false],
                ['test@[IPv6:1111::4444:5555::8888]', false],
                ['test@[IPv6:::]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:255.255.255.255]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:255.255.255.255]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666:7777:255.255.255.255]', false],
                ['test@[IPv6:1111:2222:3333:4444::255.255.255.255]', false],
                ['test@[IPv6:1111:2222:3333:4444:5555:6666::255.255.255.255]', false],
                ['test@[IPv6:1111:2222:3333:4444:::255.255.255.255]', false],
                ['test@[IPv6::255.255.255.255]', false],
                ['test@[255.255.255.255].local', false],
                ['test@local.[255.255.255.255]', false],
                ['test@local.[255.255.255.255].local', false],
                ['test@local.(comment)[255.255.255.255].local', false],
                ['test@local. [255.255.255.255].local', false],
                ['test@local.[255.255.255.255](comment).local', false],
                ['test@local.[255.255.255.255] .local', false],
                [' test @iana.org', false],
                ['test@ iana .com', false],
                ['test . test@iana.org', false],
                ['\r\n test@iana.org', false],
                ['\r\n \r\n test@iana.org', false],
                ['(\r', false],
                ['(comment)test@iana.org', false],
                ['((comment)test@iana.org', false],
                ['(comment(comment))test@iana.org', false],
                ['test@(comment)iana.org', false],
                ['test(comment)@iana.org', false],
                ['test(comment)test@iana.org', false],
                ['test@(comment)[255.255.255.255]', false],
                ['(comment)abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghiklm@iana.org', false],
                ['test@(comment)abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.com', false],
                ['(comment)test@abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefg.abcdefghijklmnopqrstuvwxyzabcdefghijk.abcdefghijklmnopqrst', false],
                ['test@iana.org\n', false],
                ['xn--test@iana.org', true],
                ['test@iana.org-', false],
                ['\"test@iana.org', false],
                ['(test@iana.org', false],
                ['test@(iana.org', false],
                ['test@[1.2.3.4', false],
                ['\"test\\\"@iana.org', false],
                ['(comment\\)test@iana.org', false],
                ['test@iana.org(comment\\)', false],
                ['test@iana.org(comment\\', false],
                ['test@[RFC-5322-domain-literal]', false],
                ['test@[RFC-5322-郵件ñó-domain-literal]', false],
                ['test@[RFC-5322]-domain-literal]', false],
                ['test@[RFC-5322].domain-literal]', false],
                ['test@[RFC-5322-[domain-literal]', false],
                ['test@[', false],
                ['test@[\u0007]', false],
                ['test@[RFC-5322-\\\u0007-domain-literal]', false],
                ['test@[RFC-5322-\\\t-domain-literal]', false],
                ['test@[RFC-5322-\\]-domain-literal]', false],
                ['test@[RFC-5322-\\郵-no-domain-literal]', false],
                ['test@[RFC-5322--domain-literal]', false],
                ['test@[RFC-5322-domain-literal\\]', false],
                ['test@[RFC-5322-domain-literal\\', false],
                ['test@[RFC 5322 domain literal]', false],
                ['test@[RFC-5322-domain-literal] (comment)', false],
                ['@iana.org', false],
                ['test@.org', false],
                ['\"\"@iana.org', false],
                ['\"\"@iana.org', false],
                ['\"\\\"@iana.org', false],
                ['()test@iana.org', false],
                ['()test@iana.org', false],
                ['test@iana.org\r', false],
                ['\rtest@iana.org', false],
                ['\"\rtest\"@iana.org', false],
                ['(\r)test@iana.org', false],
                ['test@iana.org(\r)', false],
                ['test@<iana>.org', false],
                ['\ntest@iana.org', false],
                ['\"\n\"@iana.org', false],
                ['\"\\\n\"@iana.org', false],
                ['(\n)test@iana.org', false],
                ['\u0007@iana.org', false],
                ['test@\u0007.org', false],
                ['\"\u0007\"@iana.org', false],
                ['\"\\\u0007\"@iana.org', false],
                ['(\u0007)test@iana.org', false],
                ['\r\ntest@iana.org', false],
                ['\r\n \r\ntest@iana.org', false],
                [' \r\ntest@iana.org', false],
                [' \r\n test@iana.org', false],
                [' \r\n \r\ntest@iana.org', false],
                [' \r\n\r\ntest@iana.org', false],
                [' \r\n\r\n test@iana.org', false],
                ['test@iana.org\r\n ', false],
                ['test@iana.org\r\n \r\n ', false],
                ['test@iana.org\r\n', false],
                ['test@iana.org \r', false],
                ['test@iana.org\r\n \r\n', false],
                ['test@iana.org \r\n', false],
                ['test@iana.org \r\n ', false],
                ['test@iana.org \r\n \r\n', false],
                ['test@iana.org \r\n\r\n', false],
                ['test@iana.org \r\n\r\n ', false],
                ['test@iana. org', false],
                ['test@[\r', false],
                ['test@[\r\n', false],
                [' test@iana.org', false],
                ['test@iana.org ', false],
                ['test@[IPv6:1::2:]', false],
                ['\"test\\\u0094\"@iana.org', false],
                ['test@iana/icann.org', false],
                ['test@iana!icann.org', false],
                ['test@iana?icann.org', false],
                ['test@iana^icann.org', false],
                ['test@iana{icann}.org', false],
                ['test.(comment)test@iana.org', false],
                ['test@iana.(comment)org', false],
                ['test@iana(comment)iana.org', false],
                ['(comment\r\n comment)test@iana.org', false],
                ['test@org', true, { minDomainSegments: 1 }],
                ['test\ud800@invalid', false],
                ['\"\ud800\"@invalid', false],
                ['\"\\\ud800\"@invalid', false],
                ['(\ud800)thing@invalid', false],
                ['\"\\\ud800\"@invalid', false],
                ['test@\ud800\udfffñoñó郵件ñoñó郵件.郵件ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.noñó郵件.商務', true, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['test@\ud800\udfffñoñó郵件ñoñó郵件.郵件ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.noñó郵件ñoñó郵.商務', false, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['test@\ud800\udfffñoñó郵件ñoñó郵件.郵件ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.ñoñó郵件ñoñó郵件.oñó郵件ñoñó郵件ñoñó郵件.商務', false, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['test@ñoñoñó郵件\ud83d\ude06ñoñ.oñó郵件\uc138ñoñ.oñó郵件\u0644\u4eec\u010dñoñoñó郵件\u05dcño.ñoñó郵件\u092f\u672cñoñoñó郵件\uc138añoñ.oñó郵件\ud83d\ude06bc\uc138郵\ud83d\ude06ño.ñoñó郵件ñoñoñó郵件\ud83d\ude06ñoñoñó郵件\uc138ñoñ.oñó郵件\u0644\u4eecñoñoñó.郵件\ud83d\ude06ñoñoñó郵件郵\uc138ñoñoñó郵件\u0644\u4eecñoñoñó郵件.\ud83d\ude06ñoñoñó郵件郵\uc138\u0644\u4eec.郵件\ud83d\ude06ñoñoñó郵.件郵\uc138\u4eec\ud83d\ude06ñoñoñó件郵\uc138ñoñoñó郵件', false, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['test@ñoñó郵件ñoñó郵件ñoñó郵件ñoñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件ñoñó郵件.商務', false, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['\ud83d\ude06ñoñó郵件ñoñó郵件ñoñó\ud83d\ude06郵件ñoñoñó郵@\ud83d\ude06郵件ñoñó郵件ñoñó.\ud83d\ude06郵件ñoñó郵件ñoñó.\ud83d\ude06郵件ñoñó郵件ñoñó.郵件ñoñó郵件ñoñó\ud83d\ude06.郵件ñoñó郵件ñoñó.郵件ñoñó郵件.ñoñó郵件ñoñó.郵件ñoñó郵件.\ud83d\ude06郵件ñoñó郵件ñoñó.\ud83d\ude06郵件ñoñó郵件ñoñó.\ud83d\ude06商務.郵件ñoñó郵件ñoñó郵件.\ud83d\ude06商務.\ud83d\ude06商務.\ud83d\ude06商務', false, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['test@[\0', false],
                ['(\0)test@example.com', false],
                ['shouldbe@invalid', false],
                ['shouldbe@INVALID', false],
                ['shouldbe@example.com', true],
                ['shouldbe@example.COM', true],
                ['apple-touch-icon-60x60@2x.png', false],
                ['shouldbe@XN--UNUP4Y', true, { minDomainSegments: 1 }],
                ['shouldbe@xn--unup4y', true, { minDomainSegments: 1 }],
                ['shouldbe@\u6e38\u620f', true, { minDomainSegments: 1 }]
            ];

            for (let i = 0; i < tests.length; ++i) {
                const email = tests[i];
                const valid = Address.email.isValid(email[0], email[2]);
                const result = email[1];

                if (valid !== result) {
                    const outcome = Address.email.analyze(email[0], email[2]);
                    if (outcome) {
                        console.log(i, email[0], outcome.error);
                    }
                    else {
                        console.log(i, email[0]);
                    }
                }

                expect(valid).to.equal(result);
            }
        });
    });
});

describe('domain', () => {

    describe('analyze()', () => {

        it('identifies error', () => {

            const tests = [
                ['', 'Domain must be a non-empty string'],
                ['êiana.org', 'Domain contains forbidden Unicode characters', { allowUnicode: false }],
                ['abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz.com', 'Domain too long'],
                ['com', 'Domain lacks the minimum required number of segments'],
                ['x.no-such-tld', 'Domain uses forbidden TLD'],
                ['example..com', 'Domain contains empty dot-separated segment'],
                ['1234567890123456789012345678901234567890123456789012345678901234567890.com', 'Domain contains dot-separated segment that is too long'],
                ['example+.com', 'Domain contains invalid character', { tlds: false }],
                ['example.com_', 'Domain contains invalid tld character', { tlds: false }]
            ];

            for (let i = 0; i < tests.length; ++i) {
                const domain = tests[i];
                const output = Address.domain.analyze(domain[0], domain[2]);
                const result = domain[1];

                if (!output ||
                    output.error !== result) {

                    console.log(i, domain[0]);
                }

                expect(output.error).to.equal(result);
            }
        });
    });

    describe('isValid()', () => {

        it('validates domain', () => {

            const tests = [
                ['\r', false],
                ['test', false],
                ['@', false],
                ['iana.org', true],
                ['nominet.org.uk', true],
                ['about.museum', true],
                ['x.商務', true, { tlds: { allow: new Set([Punycode.toASCII('商務')]) } }],
                ['iana.123', false],
                ['255.255.255.255', false],
                ['XN--UNUP4Y', true, { minDomainSegments: 1 }]
            ];

            for (let i = 0; i < tests.length; ++i) {
                const domain = tests[i];
                const valid = Address.domain.isValid(domain[0], domain[2]);
                const result = domain[1];

                if (valid !== result) {
                    const outcome = Address.domain.analyze(domain[0], domain[2]);
                    if (outcome) {
                        console.log(i, domain[0], outcome.error);
                    }
                    else {
                        console.log(i, domain[0]);
                    }
                }

                expect(valid).to.equal(result);
            }
        });
    });
});
