/**
 * @fileoverview Rule to flag use constant conditions
 * @author Christian Schulz <http://rndm.de>
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const EQUALITY_OPERATORS = ["===", "!==", "==", "!="];
const RELATIONAL_OPERATORS = [">", "<", ">=", "<=", "in", "instanceof"];

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow constant expressions in conditions",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-constant-condition"
        },

        schema: [
            {
                type: "object",
                properties: {
                    checkLoops: {
                        type: "boolean",
                        default: true
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            unexpected: "Unexpected constant condition."
        }
    },

    create(context) {
        const options = context.options[0] || {},
            checkLoops = options.checkLoops !== false,
            loopSetStack = [];

        let loopsInCurrentScope = new Set();

        //--------------------------------------------------------------------------
        // Helpers
        //--------------------------------------------------------------------------


        /**
         * Checks if a branch node of LogicalExpression short circuits the whole condition
         * @param {ASTNode} node The branch of main condition which needs to be checked
         * @param {string} operator The operator of the main LogicalExpression.
         * @returns {boolean} true when condition short circuits whole condition
         */
        function isLogicalIdentity(node, operator) {
            switch (node.type) {
                case "Literal":
                    return (operator === "||" && node.value === true) ||
                           (operator === "&&" && node.value === false);

                case "UnaryExpression":
                    return (operator === "&&" && node.operator === "void");

                case "LogicalExpression":
                    return isLogicalIdentity(node.left, node.operator) ||
                             isLogicalIdentity(node.right, node.operator);

                // no default
            }
            return false;
        }

        /**
         * Checks if a node has a constant truthiness value.
         * @param {ASTNode} node The AST node to check.
         * @param {boolean} inBooleanPosition `false` if checking branch of a condition.
         *  `true` in all other cases
         * @returns {Bool} true when node's truthiness is constant
         * @private
         */
        function isConstant(node, inBooleanPosition) {
            switch (node.type) {
                case "Literal":
                case "ArrowFunctionExpression":
                case "FunctionExpression":
                case "ObjectExpression":
                case "ArrayExpression":
                    return true;

                case "UnaryExpression":
                    if (node.operator === "void") {
                        return true;
                    }

                    return (node.operator === "typeof" && inBooleanPosition) ||
                        isConstant(node.argument, true);

                case "BinaryExpression":
                    return isConstant(node.left, false) &&
                            isConstant(node.right, false) &&
                            node.operator !== "in";

                case "LogicalExpression": {
                    const isLeftConstant = isConstant(node.left, inBooleanPosition);
                    const isRightConstant = isConstant(node.right, inBooleanPosition);
                    const isLeftShortCircuit = (isLeftConstant && isLogicalIdentity(node.left, node.operator));
                    const isRightShortCircuit = (isRightConstant && isLogicalIdentity(node.right, node.operator));

                    return (isLeftConstant && isRightConstant) ||
                        (

                            // in the case of an "OR", we need to know if the right constant value is truthy
                            node.operator === "||" &&
                            isRightConstant &&
                            node.right.value &&
                            (
                                !node.parent ||
                                node.parent.type !== "BinaryExpression" ||
                                !(EQUALITY_OPERATORS.includes(node.parent.operator) || RELATIONAL_OPERATORS.includes(node.parent.operator))
                            )
                        ) ||
                        isLeftShortCircuit ||
                        isRightShortCircuit;
                }

                case "AssignmentExpression":
                    return (node.operator === "=") && isConstant(node.right, inBooleanPosition);

                case "SequenceExpression":
                    return isConstant(node.expressions[node.expressions.length - 1], inBooleanPosition);

                // no default
            }
            return false;
        }

        /**
         * Tracks when the given node contains a constant condition.
         * @param {ASTNode} node The AST node to check.
         * @returns {void}
         * @private
         */
        function trackConstantConditionLoop(node) {
            if (node.test && isConstant(node.test, true)) {
                loopsInCurrentScope.add(node);
            }
        }

        /**
         * Reports when the set contains the given constant condition node
         * @param {ASTNode} node The AST node to check.
         * @returns {void}
         * @private
         */
        function checkConstantConditionLoopInSet(node) {
            if (loopsInCurrentScope.has(node)) {
                loopsInCurrentScope.delete(node);
                context.report({ node: node.test, messageId: "unexpected" });
            }
        }

        /**
         * Reports when the given node contains a constant condition.
         * @param {ASTNode} node The AST node to check.
         * @returns {void}
         * @private
         */
        function reportIfConstant(node) {
            if (node.test && isConstant(node.test, true)) {
                context.report({ node: node.test, messageId: "unexpected" });
            }
        }

        /**
         * Stores current set of constant loops in loopSetStack temporarily
         * and uses a new set to track constant loops
         * @returns {void}
         * @private
         */
        function enterFunction() {
            loopSetStack.push(loopsInCurrentScope);
            loopsInCurrentScope = new Set();
        }

        /**
         * Reports when the set still contains stored constant conditions
         * @returns {void}
         * @private
         */
        function exitFunction() {
            loopsInCurrentScope = loopSetStack.pop();
        }

        /**
         * Checks node when checkLoops option is enabled
         * @param {ASTNode} node The AST node to check.
         * @returns {void}
         * @private
         */
        function checkLoop(node) {
            if (checkLoops) {
                trackConstantConditionLoop(node);
            }
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            ConditionalExpression: reportIfConstant,
            IfStatement: reportIfConstant,
            WhileStatement: checkLoop,
            "WhileStatement:exit": checkConstantConditionLoopInSet,
            DoWhileStatement: checkLoop,
            "DoWhileStatement:exit": checkConstantConditionLoopInSet,
            ForStatement: checkLoop,
            "ForStatement > .test": node => checkLoop(node.parent),
            "ForStatement:exit": checkConstantConditionLoopInSet,
            FunctionDeclaration: enterFunction,
            "FunctionDeclaration:exit": exitFunction,
            FunctionExpression: enterFunction,
            "FunctionExpression:exit": exitFunction,
            YieldExpression: () => loopsInCurrentScope.clear()
        };

    }
};
