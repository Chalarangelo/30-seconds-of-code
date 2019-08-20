export type ObjMap<T> = { [key: string]: T };
export type Thunk<T> = (() => T) | T;
export type MaybePromise<T> = Promise<T> | T;

export type DirectiveArgs = { [key: string]: any };
export type ExtensionsDirective = {
  name: string;
  args: DirectiveArgs;
};
export type Extensions = {
  [key: string]: any;
  directives?: ExtensionsDirective[];
};
