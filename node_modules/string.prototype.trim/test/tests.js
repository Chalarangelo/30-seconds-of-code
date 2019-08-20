'use strict';

module.exports = function (trim, t) {
	t.test('normal cases', function (st) {
		st.equal(trim(' \t\na \t\n'), 'a', 'strips whitespace off left and right sides');
		st.equal(trim('a'), 'a', 'noop when no whitespace');

		var allWhitespaceChars = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
		st.equal(trim(allWhitespaceChars + 'a' + allWhitespaceChars), 'a', 'all expected whitespace chars are trimmed');

		st.end();
	});

	// see https://codeblog.jonskeet.uk/2014/12/01/when-is-an-identifier-not-an-identifier-attack-of-the-mongolian-vowel-separator/
	var mongolianVowelSeparator = '\u180E';
	t.test('unicode >= 4 && < 6.3', { skip: !(/^\s$/).test(mongolianVowelSeparator) }, function (st) {
		st.equal(trim(mongolianVowelSeparator + 'a' + mongolianVowelSeparator), 'a', 'mongolian vowel separator is whitespace');
		st.end();
	});

	t.test('zero-width spaces', function (st) {
		var zeroWidth = '\u200b';
		st.equal(trim(zeroWidth), zeroWidth, 'zero width space does not trim');
		st.end();
	});
};
