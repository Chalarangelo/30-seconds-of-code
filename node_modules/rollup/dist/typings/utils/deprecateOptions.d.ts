import { GenericConfigObject } from './mergeOptions';
export declare type Deprecation = {
    old: string;
    new: string;
};
export default function deprecateOptions(options: GenericConfigObject, deprecateConfig: GenericConfigObject): Deprecation[];
