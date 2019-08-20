(function (Prism) {

	var builtinTypes = /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/;

	Prism.languages.protobuf = Prism.languages.extend('clike', {
		'class-name': {
			pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
			lookbehind: true
		},
		'keyword': /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|service|syntax|to)\b/
	});

	Prism.languages.insertBefore('protobuf', 'operator', {
		'map': {
			pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[A-Za-z_]\w*\s*[=;])/,
			alias: 'class-name',
			inside: {
				'punctuation': /[<>.,]/,
				'builtin': builtinTypes
			}
		},
		'builtin': builtinTypes,
		'positional-class-name': {
			pattern: /(?:\b|\B\.)[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s+[A-Za-z_]\w*\s*[=;])/,
			alias: 'class-name',
			inside: {
				'punctuation': /\./
			}
		},
		'annotation': {
			pattern: /(\[\s*)[A-Za-z_]\w*(?=\s*=)/,
			lookbehind: true
		}
	});

}(Prism));
