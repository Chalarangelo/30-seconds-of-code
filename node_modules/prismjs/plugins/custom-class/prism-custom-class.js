(function(){

if (
	(typeof self === 'undefined' || !self.Prism) &&
	(typeof global === 'undefined' || !global.Prism)
) {
	return;
}

/**
 * @callback ClassMapper
 * @param {string} className
 * @param {string} language
 * @returns {string}
 */
/**
 * @typedef CustomClassOptions
 * @property {ClassMapper} classMap
 * @property {string} prefixString
 */

/** @type {ClassMapper} */
var defaultClassMap = function (className) { return className; };

/** @type {CustomClassOptions} */
var options = {
	classMap: defaultClassMap,
	prefixString: ''
};

Prism.plugins.customClass = {
	/**
	 * Maps all class names using the given object or map function.
	 *
	 * This does not affect the prefix.
	 *
	 * @param {Object<string, string> | ClassMapper} classMap
	 */
	map: function map(classMap) {
		if (typeof classMap === 'function') {
			options.classMap = classMap;
		} else {
			options.classMap = function (className) {
				return classMap[className] || className;
			};
		}
	},
	/**
	 * Adds the given prefix to all class names.
	 *
	 * @param {string} string
	 */
	prefix: function prefix(string) {
		options.prefixString = string;
	}
}

Prism.hooks.add('wrap', function (env) {
	if (options.classMap === defaultClassMap && !options.prefixString) {
		return;
	}

	env.classes = env.classes.map(function (c) {
		return options.prefixString + options.classMap(c, env.language);
	});
});

})();
