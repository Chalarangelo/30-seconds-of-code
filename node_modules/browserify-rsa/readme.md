browserify-rsa
====
[![Build Status](https://travis-ci.org/crypto-browserify/browserify-rsa.svg)](https://travis-ci.org/crypto-browserify/browserify-rsa)

RSA private decryption/signing using chinese remainder and blinding.

API
====

Give it a message as a buffer and a private key (as decoded by https://www.npmjs.com/package/parse-asn1) and it returns encrypted data as a buffer.
