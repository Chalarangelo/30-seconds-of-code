import { Tester } from './types';
export declare function equals(a: unknown, b: unknown, customTesters?: Array<Tester>, strictCheck?: boolean): boolean;
export declare function isA(typeName: string, value: unknown): boolean;
export declare function fnNameFor(func: Function): string;
export declare function isUndefined(obj: any): boolean;
export declare function hasProperty(obj: object | null, property: string): boolean;
export declare function isImmutableUnorderedKeyed(maybeKeyed: any): boolean;
export declare function isImmutableUnorderedSet(maybeSet: any): boolean;
//# sourceMappingURL=jasmineUtils.d.ts.map