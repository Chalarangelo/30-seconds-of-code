import { extname } from 'path';
import { AddExtension } from './pluginutils';

const addExtension: AddExtension = function addExtension(filename, ext = '.js') {
	if (!extname(filename)) filename += ext;
	return filename;
};

export { addExtension as default };
