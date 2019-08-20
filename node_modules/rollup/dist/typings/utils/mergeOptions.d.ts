import { Deprecation } from './deprecateOptions';
import { WarningHandler } from '../rollup/index';
export declare type GenericConfigObject = {
    [key: string]: any;
};
export declare const commandAliases: {
    [key: string]: string;
};
export default function mergeOptions({config, command: rawCommandOptions, deprecateConfig, defaultOnWarnHandler}: {
    config: GenericConfigObject;
    command?: GenericConfigObject;
    deprecateConfig?: GenericConfigObject;
    defaultOnWarnHandler?: WarningHandler;
}): {
    inputOptions: any;
    outputOptions: any;
    deprecations: Deprecation[];
    optionError: string | null;
};
