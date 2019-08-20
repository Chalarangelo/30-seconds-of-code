export type SupportedTypes = Array<string | { [index: string]: any } | number | null | any>;
export type KeyOrValue<T extends SupportedTypes> = T & T[0];

export type ElemMatch<T extends { [index: string]: any[] }> = {
  [P in keyof T]?: SiftQuery<T[P]>;
}

export type Query<T extends SupportedTypes> = {
    $eq?: T[0];
    $ne?: T[0];
    $or?: Array<Partial<T[0]>>;
    $gt?: T[0];
    $gte?: T[0];
    $lt?: T[0];
    $lte?: T[0];
    $mod?: number[];
    $in?: Array<Partial<T[0]>>;
    $nin?: Array<Partial<T[0]>>;
    $not?: SiftQuery<T>;
    $type?: any;
    $all?: Array<Partial<T[0]>>;
    $size?: number;
    $nor?: Array<Partial<T[0]>>;
    $and?: Array<Partial<T[0]>>;
    $regex?: RegExp | string;
    $elemMatch?: ExternalQuery<T>;
    $exists?: boolean;
    $where?: string | WhereFn<T>;
    $options?: "i" | "g" | "m" | "u";
}

export interface InternalQuery<T extends SupportedTypes> extends Query<T> {
}

export type ExternalQuery<T extends SupportedTypes> = ElemMatch<T[0]>;

export type WhereFn<T extends SupportedTypes> = (this: T[0], value: T[0], index: number, array: T) => boolean;

export type FilterFn = <T>(value: T, index?: number, array?: T[]) => boolean;

export type SiftQuery<T extends SupportedTypes> = ExternalQuery<T> & InternalQuery<T>;

export type PluginDefinition<T> = {
    [index: string]: (a: T, b: T) => boolean | number;
}

export type PluginFunction<T> = (sift: Sift) => PluginDefinition<T>;

export type Exec = <T extends SupportedTypes>(array: T) => T;

export interface Sift {
    <T extends SupportedTypes>(query: RegExp, target: T, rawSelector?: any): T;
    <T>(query: SiftQuery<any>, rawSelector: (item: T) => boolean): Exec;
    <T extends SupportedTypes[]>(query: SiftQuery<T>): FilterFn;
    <T extends SupportedTypes>(query: SiftQuery<T>, target: T, rawSelector?: any): T;
    indexOf<T extends SupportedTypes>(query: SiftQuery<T>, target: T, rawSelector?: any): number;
    use<K>(plugin: PluginFunction<K> | PluginDefinition<K>): void;
    compare<T, K>(a: T, b: K): 0 | -1 | 1;
}


declare const Sift: Sift
export default Sift
