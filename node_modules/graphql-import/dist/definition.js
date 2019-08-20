"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var builtinTypes = ['String', 'Float', 'Int', 'Boolean', 'ID'];
var builtinDirectives = ['deprecated', 'skip', 'include'];
/**
 * Post processing of all imported type definitions. Loops over each of the
 * imported type definitions, and processes it using collectNewTypeDefinitions.
 *
 * @param allDefinitions All definitions from all schemas
 * @param definitionPool Current definitions (from first schema)
 * @param newTypeDefinitions All imported definitions
 * @returns Final collection of type definitions for the resulting schema
 */
function completeDefinitionPool(allDefinitions, definitionPool, newTypeDefinitions) {
    var visitedDefinitions = {};
    while (newTypeDefinitions.length > 0) {
        var schemaMap = lodash_1.keyBy(allDefinitions, function (d) { return d.name.value; });
        var newDefinition = newTypeDefinitions.shift();
        if (visitedDefinitions[newDefinition.name.value]) {
            continue;
        }
        var collectedTypedDefinitions = collectNewTypeDefinitions(allDefinitions, definitionPool, newDefinition, schemaMap);
        newTypeDefinitions.push.apply(newTypeDefinitions, collectedTypedDefinitions);
        definitionPool.push.apply(definitionPool, collectedTypedDefinitions);
        visitedDefinitions[newDefinition.name.value] = true;
    }
    return lodash_1.uniqBy(definitionPool, 'name.value');
}
exports.completeDefinitionPool = completeDefinitionPool;
/**
 * Processes a single type definition, and performs a number of checks:
 * - Add missing interface implementations
 * - Add missing referenced types
 * - Remove unused type definitions
 *
 * @param allDefinitions All definitions from all schemas
 * (only used to find missing interface implementations)
 * @param definitionPool Resulting definitions
 * @param newDefinition All imported definitions
 * @param schemaMap Map of all definitions for easy lookup
 * @returns All relevant type definitions to add to the final schema
 */
function collectNewTypeDefinitions(allDefinitions, definitionPool, newDefinition, schemaMap) {
    var newTypeDefinitions = [];
    if (newDefinition.kind !== 'DirectiveDefinition') {
        newDefinition.directives.forEach(collectDirective);
    }
    if (newDefinition.kind === 'InputObjectTypeDefinition') {
        newDefinition.fields.forEach(collectNode);
    }
    if (newDefinition.kind === 'InterfaceTypeDefinition') {
        var interfaceName_1 = newDefinition.name.value;
        newDefinition.fields.forEach(collectNode);
        var interfaceImplementations = allDefinitions.filter(function (d) {
            return d.kind === 'ObjectTypeDefinition' &&
                d.interfaces.some(function (i) { return i.name.value === interfaceName_1; });
        });
        newTypeDefinitions.push.apply(newTypeDefinitions, interfaceImplementations);
    }
    if (newDefinition.kind === 'UnionTypeDefinition') {
        newDefinition.types.forEach(function (type) {
            if (!definitionPool.some(function (d) { return d.name.value === type.name.value; })) {
                var typeName = type.name.value;
                var typeMatch = schemaMap[typeName];
                if (!typeMatch) {
                    throw new Error("Couldn't find type " + typeName + " in any of the schemas.");
                }
                newTypeDefinitions.push(schemaMap[type.name.value]);
            }
        });
    }
    if (newDefinition.kind === 'ObjectTypeDefinition') {
        // collect missing interfaces
        newDefinition.interfaces.forEach(function (int) {
            if (!definitionPool.some(function (d) { return d.name.value === int.name.value; })) {
                var interfaceName = int.name.value;
                var interfaceMatch = schemaMap[interfaceName];
                if (!interfaceMatch) {
                    throw new Error("Couldn't find interface " + interfaceName + " in any of the schemas.");
                }
                newTypeDefinitions.push(schemaMap[int.name.value]);
            }
        });
        // iterate over all fields
        newDefinition.fields.forEach(function (field) {
            collectNode(field);
            // collect missing argument input types
            field.arguments.forEach(collectNode);
        });
    }
    return newTypeDefinitions;
    function collectNode(node) {
        var nodeType = getNamedType(node.type);
        var nodeTypeName = nodeType.name.value;
        // collect missing argument input types
        if (!definitionPool.some(function (d) { return d.name.value === nodeTypeName; }) &&
            !lodash_1.includes(builtinTypes, nodeTypeName)) {
            var argTypeMatch = schemaMap[nodeTypeName];
            if (!argTypeMatch) {
                throw new Error("Field " + node.name.value + ": Couldn't find type " + nodeTypeName + " in any of the schemas.");
            }
            newTypeDefinitions.push(argTypeMatch);
        }
        node.directives.forEach(collectDirective);
    }
    function collectDirective(directive) {
        var directiveName = directive.name.value;
        if (!definitionPool.some(function (d) { return d.name.value === directiveName; }) &&
            !lodash_1.includes(builtinDirectives, directiveName)) {
            var directive_1 = schemaMap[directiveName];
            if (!directive_1) {
                throw new Error("Directive " + directiveName + ": Couldn't find type " + directiveName + " in any of the schemas.");
            }
            directive_1.arguments.forEach(collectNode);
            newTypeDefinitions.push(directive_1);
        }
    }
}
/**
 * Nested visitor for a type node to get to the final NamedType
 *
 * @param {TypeNode} type Type node to get NamedTypeNode for
 * @returns {NamedTypeNode} The found NamedTypeNode
 */
function getNamedType(type) {
    if (type.kind === 'NamedType') {
        return type;
    }
    else {
        return getNamedType(type.type);
    }
}
//# sourceMappingURL=definition.js.map