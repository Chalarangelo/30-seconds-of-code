interface Options {
  exitCode: number;
  message: (version: string) => string;
}

declare function pleaseUpgradeNode(
  pkg: Record<string, unknown>,
  opts?: Partial<Options>
): void;

export = pleaseUpgradeNode;
