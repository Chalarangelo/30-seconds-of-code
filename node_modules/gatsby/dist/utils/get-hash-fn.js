"use strict";

const createHash = require(`crypto`).createHash;

const getHashFn = ({
  hashFunction = `md5`,
  hashDigest = `hex`,
  hashDigestBits = 48,
  cache = new Set()
}) => input => {
  const hash = createHash(hashFunction);
  hash.update(input);
  const digest = hash.digest(hashDigest);
  const partialDigest = digest.substr(0, hashDigestBits / 4);
  const output = parseInt(partialDigest, 16); // guard against collisions

  if (cache.has(output)) {
    throw Error(`Hash collision at f(${input}) = ${output}`);
  }

  cache.add(output);
  return output;
};

module.exports = getHashFn;
//# sourceMappingURL=get-hash-fn.js.map