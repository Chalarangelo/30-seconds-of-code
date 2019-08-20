/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Jasmine } from '../types';
import JsApiReporter from './JsApiReporter';
declare const _default: {
    create: (createOptions: Record<string, any>) => Jasmine;
    interface: (jasmine: Jasmine, env: any) => {
        describe(description: string, specDefinitions: Function): any;
        xdescribe(description: string, specDefinitions: Function): any;
        fdescribe(description: string, specDefinitions: Function): any;
        it(): any;
        xit(): any;
        fit(): any;
        beforeEach(): any;
        afterEach(): any;
        beforeAll(): any;
        afterAll(): any;
        pending(): any;
        fail(): any;
        spyOn(obj: Record<string, any>, methodName: string, accessType?: string | undefined): any;
        jsApiReporter: JsApiReporter;
        jasmine: Jasmine;
    };
};
export = _default;
//# sourceMappingURL=jasmineLight.d.ts.map