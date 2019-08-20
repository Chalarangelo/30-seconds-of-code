(function (Prism) {

	var codeLines = {
		'code': {
			pattern: /(^(\s*(?:\*\s*)*)).*[^*\s].+$/m,
			lookbehind: true,
			inside: Prism.languages.java,
			alias: 'language-java'
		}
	};

	Prism.languages.javadoc = Prism.languages.extend('javadoclike', {});
	Prism.languages.insertBefore('javadoc', 'keyword', {
		'class-name': [
			{
				pattern: /(@(?:exception|throws|see|link|linkplain|value)\s+(?:[a-z\d]+\.)*)[A-Z](?:\w*[a-z]\w*)?(?:\.[A-Z](?:\w*[a-z]\w*)?)*/,
				lookbehind: true,
				inside: {
					'punctuation': /\./
				}
			},
			{
				// @param <T> the first generic type parameter
				pattern: /(@param\s+)<[A-Z]\w*>/,
				lookbehind: true,
				inside: {
					'punctuation': /[.<>]/
				}
			}
		],
		'namespace': {
			pattern: /(@(?:exception|throws|see|link|linkplain)\s+)(?:[a-z\d]+\.)+/,
			lookbehind: true,
			inside: {
				'punctuation': /\./
			}
		},
		'code-section': [
			{
				pattern: /(\{@code\s+)(?:[^{}]|\{[^{}]*\})+?(?=\s*\})/,
				lookbehind: true,
				inside: codeLines
			},
			{
				pattern: /(<(code|tt)>\s*)[\s\S]+?(?=\s*<\/\2>)/,
				lookbehind: true,
				inside: codeLines
			}
		],
		'tag': Prism.languages.markup.tag,
	});

	Prism.languages.javadoclike.addSupport('java', Prism.languages.javadoc);
}(Prism));
