/**
 * convert an object into its 2D array equivalent to be turned
 * into an ES6 map
 *
 * @param {object} obj - any object type that works with Object.keys()
 * @returns {Map<TODO, TODO>} an ES6 Map of KV pairs
 */
module.exports = function objectToMap(obj) {
	return new Map(
		Object.keys(obj).map(key => {
			/** @type {[string, string]} */
			const pair = [key, obj[key]];
			return pair;
		})
	);
};
