import { ExpressionEntity, SomeReturnExpressionCallback } from './nodes/shared/Expression';
import CallOptions from './CallOptions';
import { LiteralValueTypes } from './nodes/Literal';
import ExecutionPathOptions from './ExecutionPathOptions';
export interface UnknownKey {
    type: 'UNKNOWN_KEY';
}
export declare type ObjectPathKey = string | UnknownKey;
export declare type ObjectPath = ObjectPathKey[];
export declare function isUnknownKey(key: ObjectPathKey): key is UnknownKey;
export declare const UNKNOWN_KEY: UnknownKey;
export declare type PathCallback = (path: ObjectPath, expression: ExpressionEntity) => void;
export declare type PathPredicate = (path: ObjectPath, expression: ExpressionEntity) => boolean;
export interface MemberDescription {
    returns: ExpressionEntity;
    callsArgs: number[] | null;
}
export interface MemberDescriptions {
    [key: string]: MemberDescription;
}
export declare const UNKNOWN_VALUE: {
    toString: () => string;
};
export declare const UNKNOWN_EXPRESSION: ExpressionEntity;
export declare const UNKNOWN_ARRAY_EXPRESSION: ExpressionEntity;
export declare const UNKNOWN_OBJECT_EXPRESSION: ExpressionEntity;
export declare const objectMembers: MemberDescriptions;
export declare const arrayMembers: MemberDescriptions;
export declare function getLiteralMembersForValue<T = LiteralValueTypes>(value: T): any;
export declare function hasMemberEffectWhenCalled(members: MemberDescriptions, memberName: ObjectPathKey, callOptions: CallOptions, options: ExecutionPathOptions): boolean;
export declare function someMemberReturnExpressionWhenCalled(members: MemberDescriptions, memberName: ObjectPathKey, callOptions: CallOptions, predicateFunction: SomeReturnExpressionCallback, options: ExecutionPathOptions): boolean;
