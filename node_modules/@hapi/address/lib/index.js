'use strict';

const Punycode = require('punycode');

const Abnf = require('./abnf');
const Tlds = require('./tlds');


const internals = {
    nonAsciiRx: /[^\x00-\x7f]/,
    minDomainSegments: 2,
    defaultTlds: { allow: Tlds, deny: null }
};


module.exports = {
    email: {
        analyze: function (email, options) {

            return internals.email(email, options);
        },
        isValid: function (email, options) {

            return !internals.email(email, options);
        }
    },
    domain: {
        analyze: function (domain, options = {}) {

            internals.options(domain, options);

            if (!domain) {
                return internals.error('Domain must be a non-empty string');
            }

            if (domain.length > 256) {
                return internals.error('Domain too long');
            }

            const ascii = !internals.nonAsciiRx.test(domain);
            if (!ascii) {
                if (options.allowUnicode === false) {                                           // Defaults to true
                    return internals.error('Domain contains forbidden Unicode characters');
                }

                const normalized = domain.normalize('NFC');
                domain = Punycode.toASCII(normalized);
            }

            return internals.domain(domain, options);
        },
        isValid: function (domain, options) {

            return !module.exports.domain.analyze(domain, options);
        }
    }
};


internals.email = function (email, options = {}) {

    internals.options(email, options);

    if (!email) {
        return internals.error('Address must be a non-empty string');
    }

    // Unicode

    const ascii = !internals.nonAsciiRx.test(email);
    if (!ascii) {
        if (options.allowUnicode === false) {                                                   // Defaults to true
            return internals.error('Address contains forbidden Unicode characters');
        }

        const normalized = email.normalize('NFC');
        email = Punycode.toASCII(normalized);
    }

    // Basic structure

    const parts = email.split('@');
    if (parts.length !== 2) {
        return internals.error(parts.length > 2 ? 'Address cannot contain more than one @ character' : 'Address must contain one @ character');
    }

    const local = parts[0];
    const domain = parts[1];

    if (!local) {
        return internals.error('Address local part cannot be empty');
    }

    if (!domain) {
        return internals.error('Domain cannot be empty');
    }

    if (email.length > 254) {                                                   // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
        return internals.error('Address too long');
    }

    if (Buffer.byteLength(local, 'utf-8') > 64) {                               // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1
        return internals.error('Address local part too long');
    }

    // Validate parts

    return internals.local(local, ascii) || internals.domain(domain, options);
};


internals.options = function (value, options) {

    // Options validation

    if (options.tlds &&
        options.tlds !== true) {

        if (typeof options.tlds !== 'object') {
            throw new Error('Invalid options: tlds must be a boolean or an object');
        }

        if (options.tlds.allow !== undefined &&
            options.tlds.allow !== true &&
            options.tlds.allow instanceof Set === false) {

            throw new Error('Invalid options: tlds.allow must be a Set object or true');
        }

        if (options.tlds.deny) {
            if (options.tlds.deny instanceof Set === false) {
                throw new Error('Invalid options: tlds.deny must be a Set object');
            }

            if (options.tlds.allow instanceof Set) {
                throw new Error('Invalid options: cannot specify both tlds.allow and tlds.deny lists');
            }
        }
    }

    // Input validation

    if (typeof value !== 'string') {
        throw new Error('Invalid input: value must be a string');
    }
};


internals.local = function (local, ascii) {

    const segments = local.split('.');
    for (const segment of segments) {
        if (!segment.length) {
            return internals.error('Address local part contains empty dot-separated segment');
        }

        if (ascii) {
            if (!Abnf.atextRx.test(segment)) {
                return internals.error('Address local part contains invalid character');
            }
        }
        else {
            for (const char of segment) {
                const binary = Buffer.from(char).toString('binary');
                if (!Abnf.atomRx.test(binary)) {
                    return internals.error('Address local part contains invalid character');
                }
            }
        }
    }
};


internals.tldSegmentRx = /^[a-zA-Z](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/;


internals.domainSegmentRx = /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/;


internals.domain = function (domain, options) {

    // https://tools.ietf.org/html/rfc1035 section 2.3.1

    const minDomainSegments = (options.minDomainSegments || internals.minDomainSegments);

    const segments = domain.split('.');
    if (segments.length < minDomainSegments) {
        return internals.error('Domain lacks the minimum required number of segments');
    }

    const tlds = internals.tlds(options);
    if (tlds) {
        const tld = segments[segments.length - 1].toLowerCase();
        if (tlds.deny && tlds.deny.has(tld) ||
            tlds.allow && !tlds.allow.has(tld)) {

            return internals.error('Domain uses forbidden TLD');
        }
    }

    for (let i = 0; i < segments.length; ++i) {
        const segment = segments[i];

        if (!segment.length) {
            return internals.error('Domain contains empty dot-separated segment');
        }

        if (segment.length > 63) {
            return internals.error('Domain contains dot-separated segment that is too long');
        }

        if (i < segments.length - 1) {
            if (!internals.domainSegmentRx.test(segment)) {
                return internals.error('Domain contains invalid character');
            }
        }
        else {
            if (!internals.tldSegmentRx.test(segment)) {
                return internals.error('Domain contains invalid tld character');
            }
        }
    }
};


internals.tlds = function (options) {

    if (options.tlds === false) {                // Defaults to true
        return null;
    }

    if (!options.tlds ||
        options.tlds === true) {

        return internals.defaultTlds;
    }

    return {
        allow: options.tlds.allow === true ? null : options.tlds.allow || Tlds,
        deny: options.tlds.deny || null
    };
};


internals.error = function (reason) {

    return { error: reason };
};
