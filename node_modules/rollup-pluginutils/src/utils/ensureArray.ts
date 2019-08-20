export default function ensureArray<T>(thing: Array<T> | T | undefined | null): Array<T> {
	if (Array.isArray(thing)) return thing;
	if (thing == undefined) return [];
	return [thing];
}
