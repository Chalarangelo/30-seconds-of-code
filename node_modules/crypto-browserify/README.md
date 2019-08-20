# crypto-browserify

A port of node's `crypto` module to the browser.

[![Build Status](https://travis-ci.org/crypto-browserify/crypto-browserify.svg?branch=master)](https://travis-ci.org/crypto-browserify/crypto-browserify)
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
[![Sauce Test Status](https://saucelabs.com/browser-matrix/crypto-browserify.svg)](https://saucelabs.com/u/crypto-browserify)

The goal of this module is to reimplement node's crypto module,
in pure javascript so that it can run in the browser.

Here is the subset that is currently implemented:

* createHash (sha1, sha224, sha256, sha384, sha512, md5, rmd160)
* createHmac (sha1, sha224, sha256, sha384, sha512, md5, rmd160)
* pbkdf2
* pbkdf2Sync
* randomBytes
* pseudoRandomBytes
* createCipher (aes)
* createDecipher (aes)
* createDiffieHellman
* createSign (rsa, ecdsa)
* createVerify (rsa, ecdsa)
* createECDH (secp256k1)
* publicEncrypt/privateDecrypt (rsa)
* privateEncrypt/publicDecrypt (rsa)

## todo

these features from node's `crypto` are still unimplemented.

* createCredentials

## contributions

If you are interested in writing a feature, please implement as a new module,
which will be incorporated into crypto-browserify as a dependency.

All deps must be compatible with node's crypto
(generate example inputs and outputs with node,
and save base64 strings inside JSON, so that tests can run in the browser.
see [sha.js](https://github.com/dominictarr/sha.js)

Crypto is _extra serious_ so please do not hesitate to review the code,
and post comments if you do.

## License

MIT
