/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Suite from './jasmine/Suite';
declare type Options = {
    nodeComplete: (suite: TreeNode) => void;
    nodeStart: (suite: TreeNode) => void;
    queueRunnerFactory: any;
    runnableIds: Array<string>;
    tree: TreeNode;
};
export declare type TreeNode = {
    afterAllFns: Array<any>;
    beforeAllFns: Array<any>;
    disabled?: boolean;
    execute: (onComplete: () => void, enabled: boolean) => void;
    id: string;
    onException: (error: Error) => void;
    sharedUserContext: () => any;
    children?: Array<TreeNode>;
} & Pick<Suite, 'getResult' | 'parentSuite' | 'result'>;
export default function treeProcessor(options: Options): void;
export {};
//# sourceMappingURL=treeProcessor.d.ts.map