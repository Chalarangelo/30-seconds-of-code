'use strict';

const RFC3986 = require('./rfc3986');


const internals = {
    Uri: {
        createUriRegex: function (optionalScheme, allowRelative, relativeOnly, allowQuerySquareBrackets) {

            let scheme = RFC3986.scheme;
            let prefix;

            if (relativeOnly) {
                prefix = '(?:' + RFC3986.relativeRef + ')';
            }
            else {
                // If we were passed a scheme, use it instead of the generic one
                if (optionalScheme) {

                    // Have to put this in a non-capturing group to handle the OR statements
                    scheme = '(?:' + optionalScheme + ')';
                }

                const withScheme = '(?:' + scheme + ':' + RFC3986.hierPart + ')';

                prefix = allowRelative ? '(?:' + withScheme + '|' + RFC3986.relativeRef + ')' : withScheme;
            }

            /**
             * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
             *
             * OR
             *
             * relative-ref = relative-part [ "?" query ] [ "#" fragment ]
             */
            return new RegExp('^' + prefix + '(?:\\?' + (allowQuerySquareBrackets ? RFC3986.queryWithSquareBrackets : RFC3986.query) + ')?' + '(?:#' + RFC3986.fragment + ')?$');
        }
    }
};

module.exports = internals.Uri;
