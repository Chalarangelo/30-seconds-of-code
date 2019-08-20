/**
 * @fileoverview Rule to flag adding properties to native object's prototypes.
 * @author David Nelson
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");
const globals = require("globals");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const propertyDefinitionMethods = new Set(["defineProperty", "defineProperties"]);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow extending native types",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-extend-native"
        },

        schema: [
            {
                type: "object",
                properties: {
                    exceptions: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            unexpected: "{{builtin}} prototype is read only, properties should not be added."
        }
    },

    create(context) {

        const config = context.options[0] || {};
        const exceptions = new Set(config.exceptions || []);
        const modifiedBuiltins = new Set(
            Object.keys(globals.builtin)
                .filter(builtin => builtin[0].toUpperCase() === builtin[0])
                .filter(builtin => !exceptions.has(builtin))
        );

        /**
         * Reports a lint error for the given node.
         * @param {ASTNode} node The node to report.
         * @param {string} builtin The name of the native builtin being extended.
         * @returns {void}
         */
        function reportNode(node, builtin) {
            context.report({
                node,
                messageId: "unexpected",
                data: {
                    builtin
                }
            });
        }

        /**
         * Check to see if the `prototype` property of the given object
         * identifier node is being accessed.
         * @param {ASTNode} identifierNode The Identifier representing the object
         * to check.
         * @returns {boolean} True if the identifier is the object of a
         * MemberExpression and its `prototype` property is being accessed,
         * false otherwise.
         */
        function isPrototypePropertyAccessed(identifierNode) {
            return Boolean(
                identifierNode &&
                identifierNode.parent &&
                identifierNode.parent.type === "MemberExpression" &&
                identifierNode.parent.object === identifierNode &&
                astUtils.getStaticPropertyName(identifierNode.parent) === "prototype"
            );
        }

        /**
         * Checks that an identifier is an object of a prototype whose member
         * is being assigned in an AssignmentExpression.
         * Example: Object.prototype.foo = "bar"
         * @param {ASTNode} identifierNode The identifier to check.
         * @returns {boolean} True if the identifier's prototype is modified.
         */
        function isInPrototypePropertyAssignment(identifierNode) {
            return Boolean(
                isPrototypePropertyAccessed(identifierNode) &&
                identifierNode.parent.parent.type === "MemberExpression" &&
                identifierNode.parent.parent.parent.type === "AssignmentExpression" &&
                identifierNode.parent.parent.parent.left === identifierNode.parent.parent
            );
        }

        /**
         * Checks that an identifier is an object of a prototype whose member
         * is being extended via the Object.defineProperty() or
         * Object.defineProperties() methods.
         * Example: Object.defineProperty(Array.prototype, "foo", ...)
         * Example: Object.defineProperties(Array.prototype, ...)
         * @param {ASTNode} identifierNode The identifier to check.
         * @returns {boolean} True if the identifier's prototype is modified.
         */
        function isInDefinePropertyCall(identifierNode) {
            return Boolean(
                isPrototypePropertyAccessed(identifierNode) &&
                identifierNode.parent.parent.type === "CallExpression" &&
                identifierNode.parent.parent.arguments[0] === identifierNode.parent &&
                identifierNode.parent.parent.callee.type === "MemberExpression" &&
                identifierNode.parent.parent.callee.object.type === "Identifier" &&
                identifierNode.parent.parent.callee.object.name === "Object" &&
                identifierNode.parent.parent.callee.property.type === "Identifier" &&
                propertyDefinitionMethods.has(identifierNode.parent.parent.callee.property.name)
            );
        }

        /**
         * Check to see if object prototype access is part of a prototype
         * extension. There are three ways a prototype can be extended:
         * 1. Assignment to prototype property (Object.prototype.foo = 1)
         * 2. Object.defineProperty()/Object.defineProperties() on a prototype
         * If prototype extension is detected, report the AssignmentExpression
         * or CallExpression node.
         * @param {ASTNode} identifierNode The Identifier representing the object
         * which prototype is being accessed and possibly extended.
         * @returns {void}
         */
        function checkAndReportPrototypeExtension(identifierNode) {
            if (isInPrototypePropertyAssignment(identifierNode)) {

                // Identifier --> MemberExpression --> MemberExpression --> AssignmentExpression
                reportNode(identifierNode.parent.parent.parent, identifierNode.name);
            } else if (isInDefinePropertyCall(identifierNode)) {

                // Identifier --> MemberExpression --> CallExpression
                reportNode(identifierNode.parent.parent, identifierNode.name);
            }
        }

        return {

            "Program:exit"() {
                const globalScope = context.getScope();

                modifiedBuiltins.forEach(builtin => {
                    const builtinVar = globalScope.set.get(builtin);

                    if (builtinVar && builtinVar.references) {
                        builtinVar.references
                            .map(ref => ref.identifier)
                            .forEach(checkAndReportPrototypeExtension);
                    }
                });
            }
        };

    }
};
