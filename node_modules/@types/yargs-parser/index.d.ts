// Type definitions for yargs-parser 13.0
// Project: https://github.com/yargs/yargs-parser#readme
// Definitions by: Miles Johnson <https://github.com/milesj>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

declare namespace yargsParser {
    interface Arguments {
        /** Non-option arguments */
        _: string[];
        /** The script name or node command */
        $0: string;
        /** All remaining options */
        [argName: string]: any;
    }

    interface DetailedArguments {
        /** An object representing the parsed value of `args` */
        argv: Arguments;
        /** Populated with an error object if an exception occurred during parsing. */
        error: Error | null;
        /** The inferred list of aliases built by combining lists in opts.alias. */
        aliases: { [alias: string]: string[] };
        /** Any new aliases added via camel-case expansion. */
        newAliases: { [alias: string]: boolean };
        /** The configuration loaded from the yargs stanza in package.json. */
        configuration: Configuration;
    }

    interface Configuration {
        /** Should variables prefixed with --no be treated as negations? Default is `true` */
        'boolean-negation': boolean;
        /** Should hyphenated arguments be expanded into camel-case aliases? Default is `true` */
        'camel-case-expansion': boolean;
        /** Should arrays be combined when provided by both command line arguments and a configuration file. Default is `false`  */
        'combine-arrays': boolean;
        /** Should keys that contain . be treated as objects? Default is `true` */
        'dot-notation': boolean;
        /** Should arguments be coerced into an array when duplicated. Default is `true` */
        'duplicate-arguments-array': boolean;
        /** Should array arguments be coerced into a single array when duplicated. Default is `true` */
        'flatten-duplicate-arrays': boolean;
        /** Should parsing stop at the first text argument? This is similar to how e.g. ssh parses its command line. Default is `false` */
        'halt-at-non-option': boolean;
        /** The prefix to use for negated boolean variables. Default is `'no-'` */
        'negation-prefix': string;
        /** Should keys that look like numbers be treated as such? Default is `true` */
        'parse-numbers': boolean;
        /** Should unparsed flags be stored in -- or _. Default is `false` */
        'populate--': boolean;
        /** Should a placeholder be added for keys not set via the corresponding CLI argument? Default is `false` */
        'set-placeholder-key': boolean;
        /** Should a group of short-options be treated as boolean flags? Default is `true` */
        'short-option-groups': boolean;
    }

    interface Options {
        /** An object representing the set of aliases for a key: `{ alias: { foo: ['f']} }`. */
        alias?: { [key: string]: string | string[] };
        /**
         * Indicate that keys should be parsed as an array: `{ array: ['foo', 'bar'] }`.
         * Indicate that keys should be parsed as an array and coerced to booleans / numbers:
         * { array: [ { key: 'foo', boolean: true }, {key: 'bar', number: true} ] }`.
         */
        array?: string[] | Array<{ key: string; boolean?: boolean, number?: boolean }>;
        /** Arguments should be parsed as booleans: `{ boolean: ['x', 'y'] }`. */
        boolean?: string[];
        /** Indicate a key that represents a path to a configuration file (this file will be loaded and parsed). */
        config?: string | string[] | { [key: string]: boolean };
        /** Provide configuration options to the yargs-parser. */
        configuration?: Partial<Configuration>;
        /**
         * Provide a custom synchronous function that returns a coerced value from the argument provided (or throws an error), e.g.
         * `{ coerce: { foo: function (arg) { return modifiedArg } } }`.
         */
        coerce?: { [key: string]: (arg: any) => any };
        /** Indicate a key that should be used as a counter, e.g., `-vvv = {v: 3}`. */
        count?: string[];
        /** Provide default values for keys: `{ default: { x: 33, y: 'hello world!' } }`. */
        default?: { [key: string]: any };
        /** Environment variables (`process.env`) with the prefix provided should be parsed. */
        envPrefix?: string;
        /** Specify that a key requires n arguments: `{ narg: {x: 2} }`. */
        narg?: { [key: string]: number };
        /** `path.normalize()` will be applied to values set to this key. */
        normalize?: string[];
        /** Keys should be treated as strings (even if they resemble a number `-x 33`). */
        string?: string[];
        /** Keys should be treated as numbers. */
        number?: string[];
    }

    interface Parser {
        (argv: string | string[], opts?: Options): Arguments;
        detailed(argv: string | string[], opts?: Options): DetailedArguments;
    }
}

declare var yargsParser: yargsParser.Parser;
export = yargsParser;
