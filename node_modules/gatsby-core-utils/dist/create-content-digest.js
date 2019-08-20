"use strict";

const crypto = require(`crypto`);
/**
 * @type {import('../index').createContentDigest}
 */


const createContentDigest = input => {
  const content = typeof input !== `string` ? JSON.stringify(input) : input;
  return crypto.createHash(`md5`).update(content).digest(`hex`);
};

module.exports = createContentDigest;