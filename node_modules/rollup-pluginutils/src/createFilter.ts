import mm from 'micromatch';
import { resolve, sep } from 'path';
import { CreateFilter } from './pluginutils';
import ensureArray from './utils/ensureArray';

function getMatcherString(id: string, resolutionBase: string | false | null | undefined) {
	if (resolutionBase === false) {
		return id;
	}
	return resolve(...(typeof resolutionBase === 'string' ? [resolutionBase, id] : [id]));
}

const createFilter: CreateFilter = function createFilter(include?, exclude?, options?) {
	const resolutionBase = options && options.resolve;

	const getMatcher = (id: string | RegExp) => {
		return id instanceof RegExp
			? id
			: {
					test: mm.matcher(
						getMatcherString(id, resolutionBase)
							.split(sep)
							.join('/'),
						{ dot: true }
					)
			  };
	};

	const includeMatchers = ensureArray(include).map(getMatcher);
	const excludeMatchers = ensureArray(exclude).map(getMatcher);

	return function(id: string | any): boolean {
		if (typeof id !== 'string') return false;
		if (/\0/.test(id)) return false;

		id = id.split(sep).join('/');

		for (let i = 0; i < excludeMatchers.length; ++i) {
			const matcher = excludeMatchers[i];
			if (matcher.test(id)) return false;
		}

		for (let i = 0; i < includeMatchers.length; ++i) {
			const matcher = includeMatchers[i];
			if (matcher.test(id)) return true;
		}

		return !includeMatchers.length;
	};
};

export { createFilter as default };
