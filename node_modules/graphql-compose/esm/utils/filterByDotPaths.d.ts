export interface FilterOpts {
  hideFields: { [fieldPath: string]: string };
  hideFieldsNote?: string;
}

export type PathsFilter = string | string[];

export function filterByDotPaths(
  obj: object,
  pathsFilter: PathsFilter | null,
  opts?: FilterOpts
): object;

export function preparePathsFilter(pathsFilter?: PathsFilter | null): string[] | null;

export function isPresentInDotFilter(name: string, pathsFilter: string | string[] | null): boolean;
