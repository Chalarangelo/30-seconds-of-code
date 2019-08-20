/**
 * Utility functions & helpers
 * @flow
 */

const withPrefix = (prefix: string, text: string) => prefix + ' ' + text;

const surround = (prefix: string, text: string) => prefix + text + prefix;

export { withPrefix, surround };
