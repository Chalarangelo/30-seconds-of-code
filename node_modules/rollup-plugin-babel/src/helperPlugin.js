import { HELPERS } from './constants.js';
import { addNamed } from '@babel/helper-module-imports';

export default function importHelperPlugin() {
	return {
		pre(file) {
			const cachedHelpers = {};
			file.set('helperGenerator', name => {
				if (!file.availableHelper(name)) {
					return;
				}

				if (cachedHelpers[name]) {
					return cachedHelpers[name];
				}

				return (cachedHelpers[name] = addNamed(file.path, name, HELPERS));
			});
		},
	};
}
