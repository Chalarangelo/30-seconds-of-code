export declare function resolveRefString(str: string, values?: object): string;
export declare function resolveEnvsInValues<T extends {
    [key: string]: any;
}>(config: T, env: {
    [name: string]: string | undefined;
}): T;
export declare function getUsedEnvs(config: any): {
    [name: string]: string;
};
