// Imported from DefinitelyTyped project.
// TypeScript definitions for ansi-colors
// Definitions by: Rogier Schouten <https://github.com/rogierschouten>
// Integrated by: Jordan Mele <https://github.com/Silic0nS0ldier>

interface SymbolsType {
  check: string;
  cross: string;
  info: string;
  line: string;
  pointer: string;
  pointerSmall: string;
  question: string;
  warning: string;
}

type StyleArrayStructure = [number, number];
interface StyleArrayProperties {
  open: string;
  close: string;
  closeRe: string;
}

type StyleType = StyleArrayStructure & StyleArrayProperties;

export interface StyleFunction extends StylesType<StyleFunction> {
  (s: string): string;
}

interface StylesType<T> {
  // modifiers
  reset: T;
  bold: T;
  dim: T;
  italic: T;
  underline: T;
  inverse: T;
  hidden: T;
  strikethrough: T;

  // colors
  black: T;
  red: T;
  green: T;
  yellow: T;
  blue: T;
  magenta: T;
  cyan: T;
  white: T;
  gray: T;
  grey: T;

  // bright colors
  blackBright: T;
  redBright: T;
  greenBright: T;
  yellowBright: T;
  blueBright: T;
  magentaBright: T;
  cyanBright: T;
  whiteBright: T;

  // background colors
  bgBlack: T;
  bgRed: T;
  bgGreen: T;
  bgYellow: T;
  bgBlue: T;
  bgMagenta: T;
  bgCyan: T;
  bgWhite: T;

  // bright background colors
  bgBlackBright: T;
  bgRedBright: T;
  bgGreenBright: T;
  bgYellowBright: T;
  bgBlueBright: T;
  bgMagentaBright: T;
  bgCyanBright: T;
  bgWhiteBright: T;
}

// modifiers
export const reset: StyleFunction;
export const bold: StyleFunction;
export const dim: StyleFunction;
export const italic: StyleFunction;
export const underline: StyleFunction;
export const inverse: StyleFunction;
export const hidden: StyleFunction;
export const strikethrough: StyleFunction;

// colors
export const black: StyleFunction;
export const red: StyleFunction;
export const green: StyleFunction;
export const yellow: StyleFunction;
export const blue: StyleFunction;
export const magenta: StyleFunction;
export const cyan: StyleFunction;
export const white: StyleFunction;
export const gray: StyleFunction;
export const grey: StyleFunction;

// bright colors
export const blackBright: StyleFunction;
export const redBright: StyleFunction;
export const greenBright: StyleFunction;
export const yellowBright: StyleFunction;
export const blueBright: StyleFunction;
export const magentaBright: StyleFunction;
export const cyanBright: StyleFunction;
export const whiteBright: StyleFunction;

// background colors
export const bgBlack: StyleFunction;
export const bgRed: StyleFunction;
export const bgGreen: StyleFunction;
export const bgYellow: StyleFunction;
export const bgBlue: StyleFunction;
export const bgMagenta: StyleFunction;
export const bgCyan: StyleFunction;
export const bgWhite: StyleFunction;

// bright background colors
export const bgBlackBright: StyleFunction;
export const bgRedBright: StyleFunction;
export const bgGreenBright: StyleFunction;
export const bgYellowBright: StyleFunction;
export const bgBlueBright: StyleFunction;
export const bgMagentaBright: StyleFunction;
export const bgCyanBright: StyleFunction;
export const bgWhiteBright: StyleFunction;

export let enabled: boolean;
export let visible: boolean;
export const ansiRegex: RegExp;

/**
 * Remove styles from string
 */
export function stripColor(s: string): string;

/**
 * Remove styles from string
 */
export function strip(s: string): string;

/**
 * Remove styles from string
 */
export function unstyle(s: string): string;

export const styles: StylesType<StyleType>;
export const symbols: SymbolsType;

/**
 * Outputs a string with check-symbol as prefix
 */
export function ok(...args: string[]): string;
