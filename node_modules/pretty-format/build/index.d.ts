/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import * as PrettyFormat from './types';
/**
 * Returns a presentation string of your `val` object
 * @param val any potential JavaScript object
 * @param options Custom settings
 */
declare function prettyFormat(val: any, options?: PrettyFormat.OptionsReceived): string;
declare namespace prettyFormat {
    var plugins: {
        AsymmetricMatcher: PrettyFormat.NewPlugin;
        ConvertAnsi: PrettyFormat.NewPlugin;
        DOMCollection: PrettyFormat.NewPlugin;
        DOMElement: PrettyFormat.NewPlugin;
        Immutable: PrettyFormat.NewPlugin;
        ReactElement: PrettyFormat.NewPlugin;
        ReactTestComponent: PrettyFormat.NewPlugin;
    };
}
declare namespace prettyFormat {
    type Colors = PrettyFormat.Colors;
    type Config = PrettyFormat.Config;
    type Options = PrettyFormat.Options;
    type OptionsReceived = PrettyFormat.OptionsReceived;
    type NewPlugin = PrettyFormat.NewPlugin;
    type Plugin = PrettyFormat.Plugin;
    type Plugins = PrettyFormat.Plugins;
    type Refs = PrettyFormat.Refs;
    type Theme = PrettyFormat.Theme;
}
export = prettyFormat;
//# sourceMappingURL=index.d.ts.map