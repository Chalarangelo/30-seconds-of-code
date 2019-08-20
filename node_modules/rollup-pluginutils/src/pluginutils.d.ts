import { Node } from 'estree-walker';

export interface AttachedScope {
	parent?: AttachedScope;
	isBlockScope: boolean;
	declarations: { [key: string]: boolean };
	addDeclaration(node: Node, isBlockDeclaration: boolean, isVar: boolean): void;
	contains(name: string): boolean;
}

export interface DataToEsmOptions {
	compact?: boolean;
	indent?: string;
	namedExports?: boolean;
	objectShorthand?: boolean;
	preferConst?: boolean;
}

export type AddExtension = (filename: string, ext?: string) => string;
export const addExtension: AddExtension;

export type AttachScopes = (ast: Node, propertyName?: string) => AttachedScope;
export const attachScopes: AttachScopes;

export type CreateFilter = (
	include?: Array<string | RegExp> | string | RegExp | null,
	exclude?: Array<string | RegExp> | string | RegExp | null,
	options?: { resolve?: string | false | null }
) => (id: string | any) => boolean;
export const createFilter: CreateFilter;

export type MakeLegalIdentifier = (str: string) => string;
export const makeLegalIdentifier: MakeLegalIdentifier;

export type DataToEsm = (data: any, options?: DataToEsmOptions) => string;
export const dataToEsm: DataToEsm;

export type ExtractAssignedNames = (param: Node) => Array<string>;
export const extractAssignedNames: ExtractAssignedNames;
