import { Argv } from '.';

export = Yargs;

declare function Yargs(
    processArgs?: ReadonlyArray<string>,
    cwd?: string,
    parentRequire?: NodeRequireFunction,
): Argv;
