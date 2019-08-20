export default function toDottedObject(
  obj: object,
  target?: object,
  path?: string[]
): { [dottedPath: string]: any };
