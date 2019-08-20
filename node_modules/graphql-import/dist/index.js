"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var graphql_1 = require("graphql");
var lodash_1 = require("lodash");
var path = require("path");
var resolveFrom = require("resolve-from");
var definition_1 = require("./definition");
var rootFields = ['Query', 'Mutation', 'Subscription'];
var read = function (schema, schemas) {
    if (isFile(schema)) {
        return fs.readFileSync(schema, { encoding: 'utf8' });
    }
    return schemas ? schemas[schema] : schema;
};
var isFile = function (f) { return f.endsWith('.graphql'); };
/**
 * Parse a single import line and extract imported types and schema filename
 *
 * @param importLine Import line
 * @returns Processed import line
 */
function parseImportLine(importLine) {
    // Apply regex to import line
    var matches = importLine.match(/^import (\*|(.*)) from ('|")(.*)('|");?$/);
    if (!matches || matches.length !== 6 || !matches[4]) {
        throw new Error("Too few regex matches: " + matches);
    }
    // Extract matches into named variables
    var wildcard = matches[1], importsString = matches[2], from = matches[4];
    // Extract imported types
    var imports = wildcard === '*' ? ['*'] : importsString.split(',').map(function (d) { return d.trim(); });
    // Return information about the import line
    return { imports: imports, from: from };
}
exports.parseImportLine = parseImportLine;
/**
 * Parse a schema and analyze all import lines
 *
 * @param sdl Schema to parse
 * @returns Array with collection of imports per import line (file)
 */
function parseSDL(sdl) {
    return sdl
        .split('\n')
        .map(function (l) { return l.trim(); })
        .filter(function (l) { return l.startsWith('# import ') || l.startsWith('#import '); })
        .map(function (l) { return l.replace('#', '').trim(); })
        .map(parseImportLine);
}
exports.parseSDL = parseSDL;
/**
 * Main entry point. Recursively process all import statement in a schema
 *
 * @param filePath File path to the initial schema file
 * @returns Single bundled schema with all imported types
 */
function importSchema(schema, schemas) {
    var sdl = read(schema, schemas) || schema;
    var document = getDocumentFromSDL(sdl);
    // Recursively process the imports, starting by importing all types from the initial schema
    var _a = collectDefinitions(['*'], sdl, schema, schemas), allDefinitions = _a.allDefinitions, typeDefinitions = _a.typeDefinitions;
    // Post processing of the final schema (missing types, unused types, etc.)
    // Query, Mutation and Subscription should be merged
    // And should always be in the first set, to make sure they
    // are not filtered out.
    var firstTypes = lodash_1.flatten(typeDefinitions).filter(function (d) {
        return lodash_1.includes(rootFields, d.name.value);
    });
    var otherFirstTypes = typeDefinitions[0].filter(function (d) { return !lodash_1.includes(rootFields, d.name.value); });
    var firstSet = firstTypes.concat(otherFirstTypes);
    var processedTypeNames = [];
    var mergedFirstTypes = [];
    var _loop_1 = function (type) {
        if (!lodash_1.includes(processedTypeNames, type.name.value)) {
            processedTypeNames.push(type.name.value);
            mergedFirstTypes.push(type);
        }
        else {
            var existingType = mergedFirstTypes.find(function (t) { return t.name.value === type.name.value; });
            existingType.fields = existingType.fields.concat(type.fields);
        }
    };
    for (var _i = 0, firstSet_1 = firstSet; _i < firstSet_1.length; _i++) {
        var type = firstSet_1[_i];
        _loop_1(type);
    }
    document = __assign({}, document, { definitions: definition_1.completeDefinitionPool(lodash_1.flatten(allDefinitions), firstSet, lodash_1.flatten(typeDefinitions)) });
    // Return the schema as string
    return graphql_1.print(document);
}
exports.importSchema = importSchema;
/**
 * Parses a schema into a graphql DocumentNode.
 * If the schema is empty a DocumentNode with empty definitions will be created.
 *
 * @param sdl Schema to parse
 * @returns A graphql DocumentNode with definitions of the parsed sdl.
 */
function getDocumentFromSDL(sdl) {
    if (isEmptySDL(sdl)) {
        return {
            kind: graphql_1.Kind.DOCUMENT,
            definitions: [],
        };
    }
    else {
        return graphql_1.parse(sdl, { noLocation: true });
    }
}
/**
 * Check if a schema contains any type definitions at all.
 *
 * @param sdl Schema to parse
 * @returns True if SDL only contains comments and/or whitespaces
 */
function isEmptySDL(sdl) {
    return (sdl
        .split('\n')
        .map(function (l) { return l.trim(); })
        .filter(function (l) { return !(l.length === 0 || l.startsWith('#')); }).length === 0);
}
/**
 * Resolve the path of an import.
 * First it will try to find a file relative from the file the import is in, if that fails it will try to resolve it as a module so imports from packages work correctly.
 *
 * @param filePath Path the import was made from
 * @param importFrom Path given for the import
 * @returns Full resolved path to a file
 */
function resolveModuleFilePath(filePath, importFrom) {
    var dirname = path.dirname(filePath);
    if (isFile(filePath) && isFile(importFrom)) {
        try {
            return fs.realpathSync(path.join(dirname, importFrom));
        }
        catch (e) {
            if (e.code === 'ENOENT') {
                return resolveFrom(dirname, importFrom);
            }
        }
    }
    return importFrom;
}
/**
 * Recursively process all schema files. Keeps track of both the filtered
 * type definitions, and all type definitions, because they might be needed
 * in post-processing (to add missing types)
 *
 * @param imports Types specified in the import statement
 * @param sdl Current schema
 * @param filePath File location for current schema
 * @param Tracking of processed schemas (for circular dependencies)
 * @param Tracking of imported type definitions per schema
 * @param Tracking of all type definitions per schema
 * @returns Both the collection of all type definitions, and the collection of imported type definitions
 */
function collectDefinitions(imports, sdl, filePath, schemas, processedFiles, typeDefinitions, allDefinitions) {
    if (processedFiles === void 0) { processedFiles = new Map(); }
    if (typeDefinitions === void 0) { typeDefinitions = []; }
    if (allDefinitions === void 0) { allDefinitions = []; }
    var key = isFile(filePath) ? path.resolve(filePath) : filePath;
    // Get TypeDefinitionNodes from current schema
    var document = getDocumentFromSDL(sdl);
    // Add all definitions to running total
    allDefinitions.push(filterTypeDefinitions(document.definitions));
    // Filter TypeDefinitionNodes by type and defined imports
    var currentTypeDefinitions = filterImportedDefinitions(imports, document.definitions, allDefinitions);
    // Add typedefinitions to running total
    typeDefinitions.push(currentTypeDefinitions);
    // Read imports from current file
    var rawModules = parseSDL(sdl);
    // Process each file (recursively)
    rawModules.forEach(function (m) {
        // If it was not yet processed (in case of circular dependencies)
        var moduleFilePath = resolveModuleFilePath(filePath, m.from);
        var processedFile = processedFiles.get(key);
        if (!processedFile || !processedFile.find(function (rModule) { return lodash_1.isEqual(rModule, m); })) {
            // Mark this specific import line as processed for this file (for cicular dependency cases)
            processedFiles.set(key, processedFile ? processedFile.concat(m) : [m]);
            collectDefinitions(m.imports, read(moduleFilePath, schemas), moduleFilePath, schemas, processedFiles, typeDefinitions, allDefinitions);
        }
    });
    // Return the maps of type definitions from each file
    return { allDefinitions: allDefinitions, typeDefinitions: typeDefinitions };
}
/**
 * Filter the types loaded from a schema, first by relevant types,
 * then by the types specified in the import statement.
 *
 * @param imports Types specified in the import statement
 * @param typeDefinitions All definitions from a schema
 * @returns Filtered collection of type definitions
 */
function filterImportedDefinitions(imports, typeDefinitions, allDefinitions) {
    // This should do something smart with fields
    if (allDefinitions === void 0) { allDefinitions = []; }
    var filteredDefinitions = filterTypeDefinitions(typeDefinitions);
    if (lodash_1.includes(imports, '*')) {
        if (imports.length === 1 &&
            imports[0] === '*' &&
            allDefinitions.length > 1) {
            var previousTypeDefinitions_1 = lodash_1.keyBy(lodash_1.flatten(allDefinitions.slice(0, allDefinitions.length - 1)).filter(function (def) { return !lodash_1.includes(rootFields, def.name.value); }), function (def) { return def.name.value; });
            return typeDefinitions.filter(function (typeDef) {
                return typeDef.kind === 'ObjectTypeDefinition' &&
                    previousTypeDefinitions_1[typeDef.name.value];
            });
        }
        return filteredDefinitions;
    }
    else {
        var result = filteredDefinitions.filter(function (d) {
            return lodash_1.includes(imports.map(function (i) { return i.split('.')[0]; }), d.name.value);
        });
        var fieldImports = imports.filter(function (i) { return i.split('.').length > 1; });
        var groupedFieldImports = lodash_1.groupBy(fieldImports, function (x) { return x.split('.')[0]; });
        var _loop_2 = function (rootType) {
            var fields = groupedFieldImports[rootType].map(function (x) { return x.split('.')[1]; });
            filteredDefinitions.find(function (def) { return def.name.value === rootType; }).fields = filteredDefinitions.find(function (def) { return def.name.value === rootType; }).fields.filter(function (f) { return lodash_1.includes(fields, f.name.value) || lodash_1.includes(fields, '*'); });
        };
        for (var rootType in groupedFieldImports) {
            _loop_2(rootType);
        }
        return result;
    }
}
/**
 * Filter relevant definitions from schema
 *
 * @param definitions All definitions from a schema
 * @returns Relevant type definitions
 */
function filterTypeDefinitions(definitions) {
    var validKinds = [
        'DirectiveDefinition',
        'ScalarTypeDefinition',
        'ObjectTypeDefinition',
        'InterfaceTypeDefinition',
        'EnumTypeDefinition',
        'UnionTypeDefinition',
        'InputObjectTypeDefinition',
    ];
    return definitions
        .filter(function (d) { return lodash_1.includes(validKinds, d.kind); })
        .map(function (d) { return d; });
}
//# sourceMappingURL=index.js.map