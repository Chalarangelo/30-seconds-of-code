(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.createElement) {
		return;
	}

	// The dependencies map is built automatically with gulp
	var lang_dependencies = /*dependencies_placeholder[*/{
		"javascript": "clike",
		"actionscript": "javascript",
		"arduino": "cpp",
		"aspnet": [
			"markup",
			"csharp"
		],
		"bison": "c",
		"c": "clike",
		"csharp": "clike",
		"cpp": "c",
		"coffeescript": "javascript",
		"crystal": "ruby",
		"css-extras": "css",
		"d": "clike",
		"dart": "clike",
		"django": "markup-templating",
		"ejs": [
			"javascript",
			"markup-templating"
		],
		"erb": [
			"ruby",
			"markup-templating"
		],
		"fsharp": "clike",
		"flow": "javascript",
		"glsl": "clike",
		"gml": "clike",
		"go": "clike",
		"groovy": "clike",
		"haml": "ruby",
		"handlebars": "markup-templating",
		"haxe": "clike",
		"java": "clike",
		"javadoc": [
			"markup",
			"java",
			"javadoclike"
		],
		"jolie": "clike",
		"jsdoc": [
			"javascript",
			"javadoclike"
		],
		"js-extras": "javascript",
		"js-templates": "javascript",
		"jsonp": "json",
		"json5": "json",
		"kotlin": "clike",
		"less": "css",
		"lilypond": "scheme",
		"markdown": "markup",
		"markup-templating": "markup",
		"n4js": "javascript",
		"nginx": "clike",
		"objectivec": "c",
		"opencl": "cpp",
		"parser": "markup",
		"php": [
			"clike",
			"markup-templating"
		],
		"phpdoc": [
			"php",
			"javadoclike"
		],
		"php-extras": "php",
		"plsql": "sql",
		"processing": "clike",
		"protobuf": "clike",
		"pug": [
			"markup",
			"javascript"
		],
		"qore": "clike",
		"jsx": [
			"markup",
			"javascript"
		],
		"tsx": [
			"jsx",
			"typescript"
		],
		"reason": "clike",
		"ruby": "clike",
		"sass": "css",
		"scss": "css",
		"scala": "java",
		"shell-session": "bash",
		"smarty": "markup-templating",
		"soy": "markup-templating",
		"swift": "clike",
		"tap": "yaml",
		"textile": "markup",
		"tt2": [
			"clike",
			"markup-templating"
		],
		"twig": "markup",
		"typescript": "javascript",
		"t4-cs": [
			"t4-templating",
			"csharp"
		],
		"t4-vb": [
			"t4-templating",
			"visual-basic"
		],
		"vala": "clike",
		"vbnet": "basic",
		"velocity": "markup",
		"wiki": "markup",
		"xeora": "markup",
		"xquery": "markup"
	}/*]*/;

	var lang_aliases = /*aliases_placeholder[*/{
		"html": "markup",
		"xml": "markup",
		"svg": "markup",
		"mathml": "markup",
		"js": "javascript",
		"adoc": "asciidoc",
		"shell": "bash",
		"rbnf": "bnf",
		"cs": "csharp",
		"dotnet": "csharp",
		"coffee": "coffeescript",
		"jinja2": "django",
		"dns-zone": "dns-zone-file",
		"dockerfile": "docker",
		"gamemakerlanguage": "gml",
		"hs": "haskell",
		"tex": "latex",
		"context": "latex",
		"ly": "lilypond",
		"emacs": "lisp",
		"elisp": "lisp",
		"emacs-lisp": "lisp",
		"md": "markdown",
		"n4jsd": "n4js",
		"objectpascal": "pascal",
		"px": "pcaxis",
		"py": "python",
		"rb": "ruby",
		"ts": "typescript",
		"t4": "t4-cs",
		"vb": "visual-basic",
		"xeoracube": "xeora",
		"yml": "yaml"
	}/*]*/;

	/**
	 * @typedef LangDataItem
	 * @property {{ success?: () => void, error?: () => void }[]} callbacks
	 * @property {boolean} [error]
	 * @property {boolean} [loading]
	 */
	/** @type {Object<string, LangDataItem>} */
	var lang_data = {};

	var ignored_language = 'none';

	var scripts = document.getElementsByTagName('script');
	var script = scripts[scripts.length - 1];
	var languages_path = 'components/';

	var autoloaderFile = /\bplugins\/autoloader\/prism-autoloader\.(?:min\.)js$/i;
	var prismFile = /[\w-]+\.(?:min\.)js$/i;

	if (script.hasAttribute('data-autoloader-path')) {
		// data-autoloader-path is set, so just use it
		languages_path = script.getAttribute('data-autoloader-path').trim().replace(/\/?$/, '/');
	} else {
		var src = script.src;
		if (autoloaderFile.test(src)) {
			// the script is the original autoloader script in the usual Prism project structure
			languages_path = src.replace(autoloaderFile, 'components/');
		} else if (prismFile.test(src)) {
			// the script is part of a bundle like a custom prism.js from the download page
			languages_path = src.replace(prismFile, 'components/');
		}
	}

	var config = Prism.plugins.autoloader = {
		languages_path: languages_path,
		use_minified: true,
		loadLanguages: loadLanguages
	};


	/**
	 * Lazily loads an external script.
	 *
	 * @param {string} src
	 * @param {() => void} [success]
	 * @param {() => void} [error]
	 */
	function addScript(src, success, error) {
		var s = document.createElement('script');
		s.src = src;
		s.async = true;
		s.onload = function () {
			document.body.removeChild(s);
			success && success();
		};
		s.onerror = function () {
			document.body.removeChild(s);
			error && error();
		};
		document.body.appendChild(s);
	}

	/**
	 * Returns the path to a grammar, using the language_path and use_minified config keys.
	 *
	 * @param {string} lang
	 * @returns {string}
	 */
	function getLanguagePath(lang) {
		return config.languages_path +
			'prism-' + lang
			+ (config.use_minified ? '.min' : '') + '.js'
	}

	/**
	 * Tries to load the grammar(s) and once loaded, highlights the given element again.
	 *
	 * @param {string} lang
	 * @param {HTMLElement} elt
	 */
	function registerElement(lang, elt) {
		if (lang in lang_aliases) {
			lang = lang_aliases[lang];
		}

		// Look for additional dependencies defined on the <code> or <pre> tags
		var deps = elt.getAttribute('data-dependencies');
		var parent = elt.parentElement;
		if (!deps && parent && parent.tagName.toLowerCase() === 'pre') {
			deps = parent.getAttribute('data-dependencies');
		}

		if (deps) {
			deps = deps.split(/\s*,\s*/g);
		} else {
			deps = [];
		}

		loadLanguages(deps, function () {
			loadLanguage(lang, function () {
				Prism.highlightElement(elt);
			});
		});
	}

	/**
	 * Loads all given grammars concurrently.
	 *
	 * @param {string[]|string} languages
	 * @param {(languages: string[]) => void} [success]
	 * @param {(language: string) => void} [error] This callback will be invoked on the first language to fail.
	 */
	function loadLanguages(languages, success, error) {
		if (typeof languages === 'string') {
			languages = [languages];
		}

		var total = languages.length;
		var completed = 0;
		var failed = false;

		if (total === 0) {
			if (success) {
				setTimeout(success, 0);
			}
			return;
		}

		function successCallback() {
			if (failed) {
				return;
			}
			completed++;
			if (completed === total) {
				success && success(languages);
			}
		}

		languages.forEach(function (lang) {
			loadLanguage(lang, successCallback, function () {
				if (failed) {
					return;
				}
				failed = true;
				error && error(lang);
			});
		});
	}

	/**
	 * Loads a grammar with its dependencies.
	 *
	 * @param {string} lang
	 * @param {() => void} [success]
	 * @param {() => void} [error]
	 */
	function loadLanguage(lang, success, error) {
		var force = lang.indexOf('!') >= 0;

		lang = lang.replace('!', '');
		lang = lang_aliases[lang] || lang;

		var load = function () {
			var data = lang_data[lang];
			if (!data) {
				data = lang_data[lang] = {
					callbacks: []
				};
			}
			data.callbacks.push({
				success: success,
				error: error
			});

			if (!force && Prism.languages[lang]) {
				languageCallback(lang, "success");
			} else if (!force && data.error) {
				languageCallback(lang, "error");
			} else if (force || !data.loading) {
				data.loading = true;
				var src = getLanguagePath(lang);
				addScript(src, function () {
					data.loading = false;
					languageCallback(lang, "success");

				}, function () {
					data.loading = false;
					data.error = true;
					languageCallback(lang, "error");
				});
			}
		};

		var dependencies = lang_dependencies[lang];
		if (dependencies && dependencies.length) {
			loadLanguages(dependencies, load, error);
		} else {
			load();
		}
	}

	/**
	 * Runs all callbacks of the given type for the given language.
	 *
	 * @param {string} lang
	 * @param {"success" | "error"} type
	 */
	function languageCallback(lang, type) {
		if (lang_data[lang]) {
			var callbacks = lang_data[lang].callbacks;
			for (var i = 0, l = callbacks.length; i < l; i++) {
				var callback = callbacks[i][type];
				if (callback) {
					setTimeout(callback, 0);
				}
			}
			callbacks.length = 0;
		}
	}

	Prism.hooks.add('complete', function (env) {
		if (env.element && env.language && !env.grammar) {
			if (env.language !== ignored_language) {
				registerElement(env.language, env.element);
			}
		}
	});

}());
