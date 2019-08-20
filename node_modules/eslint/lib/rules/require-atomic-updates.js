/**
 * @fileoverview disallow assignments that can lead to race conditions due to usage of `await` or `yield`
 * @author Teddy Katz
 */
"use strict";

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow assignments that can lead to race conditions due to usage of `await` or `yield`",
            category: "Possible Errors",
            recommended: false,
            url: "https://eslint.org/docs/rules/require-atomic-updates"
        },

        fixable: null,
        schema: [],

        messages: {
            nonAtomicUpdate: "Possible race condition: `{{value}}` might be reassigned based on an outdated value of `{{value}}`."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const identifierToSurroundingFunctionMap = new WeakMap();
        const expressionsByCodePathSegment = new Map();

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        const resolvedVariableCache = new WeakMap();

        /**
         * Gets the variable scope around this variable reference
         * @param {ASTNode} identifier An `Identifier` AST node
         * @returns {Scope|null} An escope Scope
         */
        function getScope(identifier) {
            for (let currentNode = identifier; currentNode; currentNode = currentNode.parent) {
                const scope = sourceCode.scopeManager.acquire(currentNode, true);

                if (scope) {
                    return scope;
                }
            }
            return null;
        }

        /**
         * Resolves a given identifier to a given scope
         * @param {ASTNode} identifier An `Identifier` AST node
         * @param {Scope} scope An escope Scope
         * @returns {Variable|null} An escope Variable corresponding to the given identifier
         */
        function resolveVariableInScope(identifier, scope) {
            return scope.variables.find(variable => variable.name === identifier.name) ||
                (scope.upper ? resolveVariableInScope(identifier, scope.upper) : null);
        }

        /**
         * Resolves an identifier to a variable
         * @param {ASTNode} identifier An identifier node
         * @returns {Variable|null} The escope Variable that uses this identifier
         */
        function resolveVariable(identifier) {
            if (!resolvedVariableCache.has(identifier)) {
                const surroundingScope = getScope(identifier);

                if (surroundingScope) {
                    resolvedVariableCache.set(identifier, resolveVariableInScope(identifier, surroundingScope));
                } else {
                    resolvedVariableCache.set(identifier, null);
                }
            }

            return resolvedVariableCache.get(identifier);
        }

        /**
         * Checks if an expression is a variable that can only be observed within the given function.
         * @param {ASTNode} expression The expression to check
         * @param {ASTNode} surroundingFunction The function node
         * @returns {boolean} `true` if the expression is a variable which is local to the given function, and is never
         * referenced in a closure.
         */
        function isLocalVariableWithoutEscape(expression, surroundingFunction) {
            if (expression.type !== "Identifier") {
                return false;
            }

            const variable = resolveVariable(expression);

            if (!variable) {
                return false;
            }

            return variable.references.every(reference => identifierToSurroundingFunctionMap.get(reference.identifier) === surroundingFunction) &&
                variable.defs.every(def => identifierToSurroundingFunctionMap.get(def.name) === surroundingFunction);
        }

        /**
         * Reports an AssignmentExpression node that has a non-atomic update
         * @param {ASTNode} assignmentExpression The assignment that is potentially unsafe
         * @returns {void}
         */
        function reportAssignment(assignmentExpression) {
            context.report({
                node: assignmentExpression,
                messageId: "nonAtomicUpdate",
                data: {
                    value: sourceCode.getText(assignmentExpression.left)
                }
            });
        }

        const alreadyReportedAssignments = new WeakSet();

        class AssignmentTrackerState {
            constructor({ openAssignmentsWithoutReads = new Set(), openAssignmentsWithReads = new Set() } = {}) {
                this.openAssignmentsWithoutReads = openAssignmentsWithoutReads;
                this.openAssignmentsWithReads = openAssignmentsWithReads;
            }

            copy() {
                return new AssignmentTrackerState({
                    openAssignmentsWithoutReads: new Set(this.openAssignmentsWithoutReads),
                    openAssignmentsWithReads: new Set(this.openAssignmentsWithReads)
                });
            }

            merge(other) {
                const initialAssignmentsWithoutReadsCount = this.openAssignmentsWithoutReads.size;
                const initialAssignmentsWithReadsCount = this.openAssignmentsWithReads.size;

                other.openAssignmentsWithoutReads.forEach(assignment => this.openAssignmentsWithoutReads.add(assignment));
                other.openAssignmentsWithReads.forEach(assignment => this.openAssignmentsWithReads.add(assignment));

                return this.openAssignmentsWithoutReads.size > initialAssignmentsWithoutReadsCount ||
                    this.openAssignmentsWithReads.size > initialAssignmentsWithReadsCount;
            }

            enterAssignment(assignmentExpression) {
                (assignmentExpression.operator === "=" ? this.openAssignmentsWithoutReads : this.openAssignmentsWithReads).add(assignmentExpression);
            }

            exitAssignment(assignmentExpression) {
                this.openAssignmentsWithoutReads.delete(assignmentExpression);
                this.openAssignmentsWithReads.delete(assignmentExpression);
            }

            exitAwaitOrYield(node, surroundingFunction) {
                return [...this.openAssignmentsWithReads]
                    .filter(assignment => !isLocalVariableWithoutEscape(assignment.left, surroundingFunction))
                    .forEach(assignment => {
                        if (!alreadyReportedAssignments.has(assignment)) {
                            reportAssignment(assignment);
                            alreadyReportedAssignments.add(assignment);
                        }
                    });
            }

            exitIdentifierOrMemberExpression(node) {
                [...this.openAssignmentsWithoutReads]
                    .filter(assignment => (
                        assignment.left !== node &&
                        assignment.left.type === node.type &&
                        astUtils.equalTokens(assignment.left, node, sourceCode)
                    ))
                    .forEach(assignment => {
                        this.openAssignmentsWithoutReads.delete(assignment);
                        this.openAssignmentsWithReads.add(assignment);
                    });
            }
        }

        /**
         * If the control flow graph of a function enters an assignment expression, then does the
         * both of the following steps in order (possibly with other steps in between) before exiting the
         * assignment expression, then the assignment might be using an outdated value.
         * 1. Enters a read of the variable or property assigned in the expression (not necessary if operator assignment is used)
         * 2. Exits an `await` or `yield` expression
         *
         * This function checks for the outdated values and reports them.
         * @param {CodePathSegment} codePathSegment The current code path segment to traverse
         * @param {ASTNode} surroundingFunction The function node containing the code path segment
         * @returns {void}
         */
        function findOutdatedReads(
            codePathSegment,
            surroundingFunction,
            {
                stateBySegmentStart = new WeakMap(),
                stateBySegmentEnd = new WeakMap()
            } = {}
        ) {
            if (!stateBySegmentStart.has(codePathSegment)) {
                stateBySegmentStart.set(codePathSegment, new AssignmentTrackerState());
            }

            const currentState = stateBySegmentStart.get(codePathSegment).copy();

            expressionsByCodePathSegment.get(codePathSegment).forEach(({ entering, node }) => {
                if (node.type === "AssignmentExpression") {
                    if (entering) {
                        currentState.enterAssignment(node);
                    } else {
                        currentState.exitAssignment(node);
                    }
                } else if (!entering && (node.type === "AwaitExpression" || node.type === "YieldExpression")) {
                    currentState.exitAwaitOrYield(node, surroundingFunction);
                } else if (!entering && (node.type === "Identifier" || node.type === "MemberExpression")) {
                    currentState.exitIdentifierOrMemberExpression(node);
                }
            });

            stateBySegmentEnd.set(codePathSegment, currentState);

            codePathSegment.nextSegments.forEach(nextSegment => {
                if (stateBySegmentStart.has(nextSegment)) {
                    if (!stateBySegmentStart.get(nextSegment).merge(currentState)) {

                        /*
                         * This segment has already been processed with the given set of inputs;
                         * no need to do it again. After no new state is available to process
                         * for any control flow segment in the graph, the analysis reaches a fixpoint and
                         * traversal stops.
                         */
                        return;
                    }
                } else {
                    stateBySegmentStart.set(nextSegment, currentState.copy());
                }
                findOutdatedReads(
                    nextSegment,
                    surroundingFunction,
                    { stateBySegmentStart, stateBySegmentEnd }
                );
            });
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        const currentCodePathSegmentStack = [];
        let currentCodePathSegment = null;
        const functionStack = [];

        return {
            onCodePathStart() {
                currentCodePathSegmentStack.push(currentCodePathSegment);
            },

            onCodePathEnd(codePath, node) {
                currentCodePathSegment = currentCodePathSegmentStack.pop();

                if (astUtils.isFunction(node) && (node.async || node.generator)) {
                    findOutdatedReads(codePath.initialSegment, node);
                }
            },

            onCodePathSegmentStart(segment) {
                currentCodePathSegment = segment;
                expressionsByCodePathSegment.set(segment, []);
            },

            "AssignmentExpression, Identifier, MemberExpression, AwaitExpression, YieldExpression"(node) {
                expressionsByCodePathSegment.get(currentCodePathSegment).push({ entering: true, node });
            },

            "AssignmentExpression, Identifier, MemberExpression, AwaitExpression, YieldExpression:exit"(node) {
                expressionsByCodePathSegment.get(currentCodePathSegment).push({ entering: false, node });
            },

            ":function"(node) {
                functionStack.push(node);
            },

            ":function:exit"() {
                functionStack.pop();
            },

            Identifier(node) {
                if (functionStack.length) {
                    identifierToSurroundingFunctionMap.set(node, functionStack[functionStack.length - 1]);
                }
            }
        };
    }
};
