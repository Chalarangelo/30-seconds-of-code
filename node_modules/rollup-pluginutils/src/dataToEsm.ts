import makeLegalIdentifier from './makeLegalIdentifier';
import { DataToEsm } from './pluginutils';

export type Indent = string | null | undefined;

function stringify(obj: any): string {
	return (JSON.stringify(obj) || 'undefined').replace(/[\u2028\u2029]/g, char => `\\u${('000' + char.charCodeAt(0).toString(16)).slice(-4)}`);
}

function serializeArray<T>(arr: Array<T>, indent: Indent, baseIndent: string): string {
	let output = '[';
	const separator = indent ? '\n' + baseIndent + indent : '';
	for (let i = 0; i < arr.length; i++) {
		const key = arr[i];
		output += `${i > 0 ? ',' : ''}${separator}${serialize(key, indent, baseIndent + indent)}`;
	}
	return output + `${indent ? '\n' + baseIndent : ''}]`;
}

function serializeObject<T>(obj: { [key: string]: T }, indent: Indent, baseIndent: string): string {
	let output = '{';
	const separator = indent ? '\n' + baseIndent + indent : '';
	const keys = Object.keys(obj);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const stringKey = makeLegalIdentifier(key) === key ? key : stringify(key);
		output += `${i > 0 ? ',' : ''}${separator}${stringKey}:${indent ? ' ' : ''}${serialize(
			obj[key],
			indent,
			baseIndent + indent
		)}`;
	}
	return output + `${indent ? '\n' + baseIndent : ''}}`;
}

function serialize(obj: any, indent: Indent, baseIndent: string): string {
	if (obj === Infinity) return 'Infinity';
	if (obj === -Infinity) return '-Infinity';
	if (obj === 0 && 1/obj === -Infinity) return '-0';
	if (obj instanceof Date) return 'new Date(' + obj.getTime() + ')';
	if (obj instanceof RegExp) return obj.toString();
	if (obj !== obj) return 'NaN';
	if (Array.isArray(obj)) return serializeArray(obj, indent, baseIndent);
	if (obj === null) return 'null';
	if (typeof obj === 'object') return serializeObject(obj, indent, baseIndent);
	return stringify(obj);
}

const dataToEsm: DataToEsm = function dataToEsm(data, options = {}) {
	const t = options.compact ? '' : 'indent' in options ? options.indent : '\t';
	const _ = options.compact ? '' : ' ';
	const n = options.compact ? '' : '\n';
	const declarationType = options.preferConst ? 'const' : 'var';

	if (
		options.namedExports === false ||
		typeof data !== 'object' ||
		Array.isArray(data) ||
		data instanceof Date ||
		data instanceof RegExp ||
		data === null
	) {
		const code = serialize(data, options.compact ? null : t, '');
		const __ = _ || (/^[{[\-\/]/.test(code) ? '' : ' ');
		return `export default${__}${code};`;
	}

	let namedExportCode = '';
	const defaultExportRows = [];
	const dataKeys = Object.keys(data);
	for (let i = 0; i < dataKeys.length; i++) {
		const key = dataKeys[i];
		if (key === makeLegalIdentifier(key)) {
			if (options.objectShorthand) defaultExportRows.push(key);
			else defaultExportRows.push(`${key}:${_}${key}`);
			namedExportCode += `export ${declarationType} ${key}${_}=${_}${serialize(
				data[key],
				options.compact ? null : t,
				''
			)};${n}`;
		} else {
			defaultExportRows.push(
				`${stringify(key)}:${_}${serialize(data[key], options.compact ? null : t, '')}`
			);
		}
	}
	return (
		namedExportCode + `export default${_}{${n}${t}${defaultExportRows.join(`,${n}${t}`)}${n}};${n}`
	);
};

export { dataToEsm as default };
