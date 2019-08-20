// @flow strict

import { type Source } from '../language/source';
import { type Location } from '../language/ast';
import { type SourceLocation, getLocation } from '../language/location';

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
export function printLocation(location: Location): string {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start),
  );
}

/**
 * Render a helpful description of the location in the GraphQL Source document.
 */
export function printSourceLocation(
  source: Source,
  sourceLocation: SourceLocation,
): string {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = whitespace(firstLineColumnOffset) + source.body;

  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;

  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}\n`;

  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];

  // Special case for minified documents
  if (locationLine.length > 120) {
    const sublineIndex = Math.floor(columnNum / 80);
    const sublineColumnNum = columnNum % 80;
    const sublines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      sublines.push(locationLine.slice(i, i + 80));
    }

    return (
      locationStr +
      printPrefixedLines([
        [`${lineNum}`, sublines[0]],
        ...sublines.slice(1, sublineIndex + 1).map(subline => ['', subline]),
        [' ', whitespace(sublineColumnNum - 1) + '^'],
        ['', sublines[sublineIndex + 1]],
      ])
    );
  }

  return (
    locationStr +
    printPrefixedLines([
      // Lines specified like this: ["prefix", "string"],
      [`${lineNum - 1}`, lines[lineIndex - 1]],
      [`${lineNum}`, locationLine],
      ['', whitespace(columnNum - 1) + '^'],
      [`${lineNum + 1}`, lines[lineIndex + 1]],
    ])
  );
}

function printPrefixedLines(lines: $ReadOnlyArray<[string, string]>): string {
  const existingLines = lines.filter(([_, line]) => line !== undefined);

  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines
    .map(([prefix, line]) => lpad(padLen, prefix) + ' | ' + line)
    .join('\n');
}

function whitespace(len: number): string {
  return Array(len + 1).join(' ');
}

function lpad(len: number, str: string): string {
  return whitespace(len - str.length) + str;
}
