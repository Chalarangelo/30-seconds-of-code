/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
declare type Global = NodeJS.Global;
declare namespace JestMock {
    type ModuleMocker = ModuleMockerClass;
    type MockFunctionMetadataType = 'object' | 'array' | 'regexp' | 'function' | 'constant' | 'collection' | 'null' | 'undefined';
    type MockFunctionMetadata<T, Y extends Array<unknown>, Type = MockFunctionMetadataType> = {
        ref?: number;
        members?: Record<string, MockFunctionMetadata<T, Y>>;
        mockImpl?: (...args: Y) => T;
        name?: string;
        refID?: number;
        type?: Type;
        value?: T;
        length?: number;
    };
}
/**
 * Possible types of a MockFunctionResult.
 * 'return': The call completed by returning normally.
 * 'throw': The call completed by throwing a value.
 * 'incomplete': The call has not completed yet. This is possible if you read
 *               the  mock function result from within the mock function itself
 *               (or a function called by the mock function).
 */
declare type MockFunctionResultType = 'return' | 'throw' | 'incomplete';
/**
 * Represents the result of a single call to a mock function.
 */
declare type MockFunctionResult = {
    /**
     * Indicates how the call completed.
     */
    type: MockFunctionResultType;
    /**
     * The value that was either thrown or returned by the function.
     * Undefined when type === 'incomplete'.
     */
    value: unknown;
};
declare type MockFunctionState<T, Y extends Array<unknown>> = {
    calls: Array<Y>;
    instances: Array<T>;
    invocationCallOrder: Array<number>;
    /**
     * List of results of calls to the mock function.
     */
    results: Array<MockFunctionResult>;
};
declare type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: Array<any>) => any ? never : K;
}[keyof T] & string;
declare type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: Array<any>) => any ? K : never;
}[keyof T] & string;
interface Mock<T, Y extends Array<unknown> = Array<unknown>> extends Function, MockInstance<T, Y> {
    new (...args: Y): T;
    (...args: Y): T;
}
interface SpyInstance<T, Y extends Array<unknown>> extends MockInstance<T, Y> {
}
interface MockInstance<T, Y extends Array<unknown>> {
    _isMockFunction: true;
    _protoImpl: Function;
    getMockName(): string;
    getMockImplementation(): Function | undefined;
    mock: MockFunctionState<T, Y>;
    mockClear(): this;
    mockReset(): this;
    mockRestore(): void;
    mockImplementation(fn: (...args: Y) => T): this;
    mockImplementation(fn: () => Promise<T>): this;
    mockImplementationOnce(fn: (...args: Y) => T): this;
    mockImplementationOnce(fn: () => Promise<T>): this;
    mockName(name: string): this;
    mockReturnThis(): this;
    mockReturnValue(value: T): this;
    mockReturnValueOnce(value: T): this;
    mockResolvedValue(value: T): this;
    mockResolvedValueOnce(value: T): this;
    mockRejectedValue(value: T): this;
    mockRejectedValueOnce(value: T): this;
}
declare class ModuleMockerClass {
    private _environmentGlobal;
    private _mockState;
    private _mockConfigRegistry;
    private _spyState;
    private _invocationCallCounter;
    ModuleMocker: typeof ModuleMockerClass;
    /**
     * @see README.md
     * @param global Global object of the test environment, used to create
     * mocks
     */
    constructor(global: Global);
    private _getSlots;
    private _ensureMockConfig;
    private _ensureMockState;
    private _defaultMockConfig;
    private _defaultMockState;
    private _makeComponent;
    private _createMockFunction;
    private _generateMock;
    /**
     * @see README.md
     * @param _metadata Metadata for the mock in the schema returned by the
     * getMetadata method of this module.
     */
    generateFromMetadata<T, Y extends Array<unknown>>(_metadata: JestMock.MockFunctionMetadata<T, Y>): Mock<T, Y>;
    /**
     * @see README.md
     * @param component The component for which to retrieve metadata.
     */
    getMetadata<T, Y extends Array<unknown>>(component: T, _refs?: Map<T, number>): JestMock.MockFunctionMetadata<T, Y> | null;
    isMockFunction<T>(fn: any): fn is Mock<T>;
    fn<T, Y extends Array<unknown>>(implementation?: (...args: Y) => T): Mock<T, Y>;
    spyOn<T extends {}, M extends NonFunctionPropertyNames<T>>(object: T, methodName: M, accessType: 'get'): SpyInstance<T[M], []>;
    spyOn<T extends {}, M extends NonFunctionPropertyNames<T>>(object: T, methodName: M, accessType: 'set'): SpyInstance<void, [T[M]]>;
    spyOn<T extends {}, M extends FunctionPropertyNames<T>>(object: T, methodName: M): T[M] extends (...args: Array<any>) => any ? SpyInstance<ReturnType<T[M]>, Parameters<T[M]>> : never;
    private _spyOnProperty;
    clearAllMocks(): void;
    resetAllMocks(): void;
    restoreAllMocks(): void;
    private _typeOf;
}
declare const JestMock: ModuleMockerClass;
export = JestMock;
//# sourceMappingURL=index.d.ts.map