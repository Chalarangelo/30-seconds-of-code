declare function realpath(filepath: string): string;
declare namespace realpath {
  var sync: typeof realpathSync;
}
declare function realpathSync(filepath: string): string;
export = realpath;
