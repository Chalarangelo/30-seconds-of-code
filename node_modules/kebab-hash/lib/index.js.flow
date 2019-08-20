// @flow
import { createHash } from "crypto";
import kebabCase from "lodash.kebabcase";

// Given a string `input` get the first `length` characters of the md5 hash of
// the `input` string. This effectively creates a "short" hash for a given
// input.
const shortHash = (input: string, length: number = 3): string =>
  createHash(`md5`)
    .update(input)
    .digest(`hex`)
    .substr(0, length);

// Given `input` return the kebab case version with a short has appended.
const kebabHash = (path: string, hashLength: number = 3): string =>
  `${kebabCase(path)}-${shortHash(path, hashLength)}`;

export default kebabHash;
