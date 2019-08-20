/**
 * @fileoverview Disallow parenthesising higher precedence subexpressions.
 * @author Michael Ficarra
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils.js");

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "disallow unnecessary parentheses",
            category: "Possible Errors",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-extra-parens"
        },

        fixable: "code",

        schema: {
            anyOf: [
                {
                    type: "array",
                    items: [
                        {
                            enum: ["functions"]
                        }
                    ],
                    minItems: 0,
                    maxItems: 1
                },
                {
                    type: "array",
                    items: [
                        {
                            enum: ["all"]
                        },
                        {
                            type: "object",
                            properties: {
                                conditionalAssign: { type: "boolean" },
                                nestedBinaryExpressions: { type: "boolean" },
                                returnAssign: { type: "boolean" },
                                ignoreJSX: { enum: ["none", "all", "single-line", "multi-line"] },
                                enforceForArrowConditionals: { type: "boolean" }
                            },
                            additionalProperties: false
                        }
                    ],
                    minItems: 0,
                    maxItems: 2
                }
            ]
        },

        messages: {
            unexpected: "Unnecessary parentheses around expression."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        const tokensToIgnore = new WeakSet();
        const isParenthesised = astUtils.isParenthesised.bind(astUtils, sourceCode);
        const precedence = astUtils.getPrecedence;
        const ALL_NODES = context.options[0] !== "functions";
        const EXCEPT_COND_ASSIGN = ALL_NODES && context.options[1] && context.options[1].conditionalAssign === false;
        const NESTED_BINARY = ALL_NODES && context.options[1] && context.options[1].nestedBinaryExpressions === false;
        const EXCEPT_RETURN_ASSIGN = ALL_NODES && context.options[1] && context.options[1].returnAssign === false;
        const IGNORE_JSX = ALL_NODES && context.options[1] && context.options[1].ignoreJSX;
        const IGNORE_ARROW_CONDITIONALS = ALL_NODES && context.options[1] &&
            context.options[1].enforceForArrowConditionals === false;

        const PRECEDENCE_OF_ASSIGNMENT_EXPR = precedence({ type: "AssignmentExpression" });
        const PRECEDENCE_OF_UPDATE_EXPR = precedence({ type: "UpdateExpression" });

        /**
         * Determines if this rule should be enforced for a node given the current configuration.
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the rule should be enforced for this node.
         * @private
         */
        function ruleApplies(node) {
            if (node.type === "JSXElement" || node.type === "JSXFragment") {
                const isSingleLine = node.loc.start.line === node.loc.end.line;

                switch (IGNORE_JSX) {

                    // Exclude this JSX element from linting
                    case "all":
                        return false;

                    // Exclude this JSX element if it is multi-line element
                    case "multi-line":
                        return isSingleLine;

                    // Exclude this JSX element if it is single-line element
                    case "single-line":
                        return !isSingleLine;

                    // Nothing special to be done for JSX elements
                    case "none":
                        break;

                    // no default
                }
            }

            return ALL_NODES || node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression";
        }

        /**
         * Determines if a node is surrounded by parentheses twice.
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is doubly parenthesised.
         * @private
         */
        function isParenthesisedTwice(node) {
            const previousToken = sourceCode.getTokenBefore(node, 1),
                nextToken = sourceCode.getTokenAfter(node, 1);

            return isParenthesised(node) && previousToken && nextToken &&
                astUtils.isOpeningParenToken(previousToken) && previousToken.range[1] <= node.range[0] &&
                astUtils.isClosingParenToken(nextToken) && nextToken.range[0] >= node.range[1];
        }

        /**
         * Determines if a node is surrounded by (potentially) invalid parentheses.
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is incorrectly parenthesised.
         * @private
         */
        function hasExcessParens(node) {
            return ruleApplies(node) && isParenthesised(node);
        }

        /**
         * Determines if a node that is expected to be parenthesised is surrounded by
         * (potentially) invalid extra parentheses.
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is has an unexpected extra pair of parentheses.
         * @private
         */
        function hasDoubleExcessParens(node) {
            return ruleApplies(node) && isParenthesisedTwice(node);
        }

        /**
         * Determines if a node test expression is allowed to have a parenthesised assignment
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the assignment can be parenthesised.
         * @private
         */
        function isCondAssignException(node) {
            return EXCEPT_COND_ASSIGN && node.test.type === "AssignmentExpression";
        }

        /**
         * Determines if a node is in a return statement
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is in a return statement.
         * @private
         */
        function isInReturnStatement(node) {
            for (let currentNode = node; currentNode; currentNode = currentNode.parent) {
                if (
                    currentNode.type === "ReturnStatement" ||
                    (currentNode.type === "ArrowFunctionExpression" && currentNode.body.type !== "BlockStatement")
                ) {
                    return true;
                }
            }

            return false;
        }

        /**
         * Determines if a constructor function is newed-up with parens
         * @param {ASTNode} newExpression - The NewExpression node to be checked.
         * @returns {boolean} True if the constructor is called with parens.
         * @private
         */
        function isNewExpressionWithParens(newExpression) {
            const lastToken = sourceCode.getLastToken(newExpression);
            const penultimateToken = sourceCode.getTokenBefore(lastToken);

            return newExpression.arguments.length > 0 || astUtils.isOpeningParenToken(penultimateToken) && astUtils.isClosingParenToken(lastToken);
        }

        /**
         * Determines if a node is or contains an assignment expression
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is or contains an assignment expression.
         * @private
         */
        function containsAssignment(node) {
            if (node.type === "AssignmentExpression") {
                return true;
            }
            if (node.type === "ConditionalExpression" &&
                    (node.consequent.type === "AssignmentExpression" || node.alternate.type === "AssignmentExpression")) {
                return true;
            }
            if ((node.left && node.left.type === "AssignmentExpression") ||
                    (node.right && node.right.type === "AssignmentExpression")) {
                return true;
            }

            return false;
        }

        /**
         * Determines if a node is contained by or is itself a return statement and is allowed to have a parenthesised assignment
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the assignment can be parenthesised.
         * @private
         */
        function isReturnAssignException(node) {
            if (!EXCEPT_RETURN_ASSIGN || !isInReturnStatement(node)) {
                return false;
            }

            if (node.type === "ReturnStatement") {
                return node.argument && containsAssignment(node.argument);
            }
            if (node.type === "ArrowFunctionExpression" && node.body.type !== "BlockStatement") {
                return containsAssignment(node.body);
            }
            return containsAssignment(node);

        }

        /**
         * Determines if a node following a [no LineTerminator here] restriction is
         * surrounded by (potentially) invalid extra parentheses.
         * @param {Token} token - The token preceding the [no LineTerminator here] restriction.
         * @param {ASTNode} node - The node to be checked.
         * @returns {boolean} True if the node is incorrectly parenthesised.
         * @private
         */
        function hasExcessParensNoLineTerminator(token, node) {
            if (token.loc.end.line === node.loc.start.line) {
                return hasExcessParens(node);
            }

            return hasDoubleExcessParens(node);
        }

        /**
         * Determines whether a node should be preceded by an additional space when removing parens
         * @param {ASTNode} node node to evaluate; must be surrounded by parentheses
         * @returns {boolean} `true` if a space should be inserted before the node
         * @private
         */
        function requiresLeadingSpace(node) {
            const leftParenToken = sourceCode.getTokenBefore(node);
            const tokenBeforeLeftParen = sourceCode.getTokenBefore(node, 1);
            const firstToken = sourceCode.getFirstToken(node);

            return tokenBeforeLeftParen &&
                tokenBeforeLeftParen.range[1] === leftParenToken.range[0] &&
                leftParenToken.range[1] === firstToken.range[0] &&
                !astUtils.canTokensBeAdjacent(tokenBeforeLeftParen, firstToken);
        }

        /**
         * Determines whether a node should be followed by an additional space when removing parens
         * @param {ASTNode} node node to evaluate; must be surrounded by parentheses
         * @returns {boolean} `true` if a space should be inserted after the node
         * @private
         */
        function requiresTrailingSpace(node) {
            const nextTwoTokens = sourceCode.getTokensAfter(node, { count: 2 });
            const rightParenToken = nextTwoTokens[0];
            const tokenAfterRightParen = nextTwoTokens[1];
            const tokenBeforeRightParen = sourceCode.getLastToken(node);

            return rightParenToken && tokenAfterRightParen &&
                !sourceCode.isSpaceBetweenTokens(rightParenToken, tokenAfterRightParen) &&
                !astUtils.canTokensBeAdjacent(tokenBeforeRightParen, tokenAfterRightParen);
        }

        /**
         * Determines if a given expression node is an IIFE
         * @param {ASTNode} node The node to check
         * @returns {boolean} `true` if the given node is an IIFE
         */
        function isIIFE(node) {
            return node.type === "CallExpression" && node.callee.type === "FunctionExpression";
        }

        /**
         * Report the node
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function report(node) {
            const leftParenToken = sourceCode.getTokenBefore(node);
            const rightParenToken = sourceCode.getTokenAfter(node);

            if (!isParenthesisedTwice(node)) {
                if (tokensToIgnore.has(sourceCode.getFirstToken(node))) {
                    return;
                }

                if (isIIFE(node) && !isParenthesised(node.callee)) {
                    return;
                }
            }

            context.report({
                node,
                loc: leftParenToken.loc.start,
                messageId: "unexpected",
                fix(fixer) {
                    const parenthesizedSource = sourceCode.text.slice(leftParenToken.range[1], rightParenToken.range[0]);

                    return fixer.replaceTextRange([
                        leftParenToken.range[0],
                        rightParenToken.range[1]
                    ], (requiresLeadingSpace(node) ? " " : "") + parenthesizedSource + (requiresTrailingSpace(node) ? " " : ""));
                }
            });
        }

        /**
         * Evaluate Unary update
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function checkUnaryUpdate(node) {
            if (node.type === "UnaryExpression" && node.argument.type === "BinaryExpression" && node.argument.operator === "**") {
                return;
            }

            if (hasExcessParens(node.argument) && precedence(node.argument) >= precedence(node)) {
                report(node.argument);
            }
        }

        /**
         * Check if a member expression contains a call expression
         * @param {ASTNode} node MemberExpression node to evaluate
         * @returns {boolean} true if found, false if not
         */
        function doesMemberExpressionContainCallExpression(node) {
            let currentNode = node.object;
            let currentNodeType = node.object.type;

            while (currentNodeType === "MemberExpression") {
                currentNode = currentNode.object;
                currentNodeType = currentNode.type;
            }

            return currentNodeType === "CallExpression";
        }

        /**
         * Evaluate a new call
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function checkCallNew(node) {
            const callee = node.callee;

            if (hasExcessParens(callee) && precedence(callee) >= precedence(node)) {
                const hasNewParensException = callee.type === "NewExpression" && !isNewExpressionWithParens(callee);

                if (
                    hasDoubleExcessParens(callee) ||
                    !isIIFE(node) && !hasNewParensException && !(

                        /*
                         * Allow extra parens around a new expression if
                         * there are intervening parentheses.
                         */
                        (callee.type === "MemberExpression" && doesMemberExpressionContainCallExpression(callee))
                    )
                ) {
                    report(node.callee);
                }
            }
            if (node.arguments.length === 1) {
                if (hasDoubleExcessParens(node.arguments[0]) && precedence(node.arguments[0]) >= PRECEDENCE_OF_ASSIGNMENT_EXPR) {
                    report(node.arguments[0]);
                }
            } else {
                node.arguments
                    .filter(arg => hasExcessParens(arg) && precedence(arg) >= PRECEDENCE_OF_ASSIGNMENT_EXPR)
                    .forEach(report);
            }
        }

        /**
         * Evaluate binary logicals
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function checkBinaryLogical(node) {
            const prec = precedence(node);
            const leftPrecedence = precedence(node.left);
            const rightPrecedence = precedence(node.right);
            const isExponentiation = node.operator === "**";
            const shouldSkipLeft = (NESTED_BINARY && (node.left.type === "BinaryExpression" || node.left.type === "LogicalExpression")) ||
              node.left.type === "UnaryExpression" && isExponentiation;
            const shouldSkipRight = NESTED_BINARY && (node.right.type === "BinaryExpression" || node.right.type === "LogicalExpression");

            if (!shouldSkipLeft && hasExcessParens(node.left) && (leftPrecedence > prec || (leftPrecedence === prec && !isExponentiation))) {
                report(node.left);
            }
            if (!shouldSkipRight && hasExcessParens(node.right) && (rightPrecedence > prec || (rightPrecedence === prec && isExponentiation))) {
                report(node.right);
            }
        }

        /**
         * Check the parentheses around the super class of the given class definition.
         * @param {ASTNode} node The node of class declarations to check.
         * @returns {void}
         */
        function checkClass(node) {
            if (!node.superClass) {
                return;
            }

            /*
             * If `node.superClass` is a LeftHandSideExpression, parentheses are extra.
             * Otherwise, parentheses are needed.
             */
            const hasExtraParens = precedence(node.superClass) > PRECEDENCE_OF_UPDATE_EXPR
                ? hasExcessParens(node.superClass)
                : hasDoubleExcessParens(node.superClass);

            if (hasExtraParens) {
                report(node.superClass);
            }
        }

        /**
         * Check the parentheses around the argument of the given spread operator.
         * @param {ASTNode} node The node of spread elements/properties to check.
         * @returns {void}
         */
        function checkSpreadOperator(node) {
            const hasExtraParens = precedence(node.argument) >= PRECEDENCE_OF_ASSIGNMENT_EXPR
                ? hasExcessParens(node.argument)
                : hasDoubleExcessParens(node.argument);

            if (hasExtraParens) {
                report(node.argument);
            }
        }

        /**
         * Checks the parentheses for an ExpressionStatement or ExportDefaultDeclaration
         * @param {ASTNode} node The ExpressionStatement.expression or ExportDefaultDeclaration.declaration node
         * @returns {void}
         */
        function checkExpressionOrExportStatement(node) {
            const firstToken = isParenthesised(node) ? sourceCode.getTokenBefore(node) : sourceCode.getFirstToken(node);
            const secondToken = sourceCode.getTokenAfter(firstToken, astUtils.isNotOpeningParenToken);
            const thirdToken = secondToken ? sourceCode.getTokenAfter(secondToken) : null;
            const tokenAfterClosingParens = secondToken ? sourceCode.getTokenAfter(secondToken, astUtils.isNotClosingParenToken) : null;

            if (
                astUtils.isOpeningParenToken(firstToken) &&
                (
                    astUtils.isOpeningBraceToken(secondToken) ||
                    secondToken.type === "Keyword" && (
                        secondToken.value === "function" ||
                        secondToken.value === "class" ||
                        secondToken.value === "let" &&
                            tokenAfterClosingParens &&
                            (
                                astUtils.isOpeningBracketToken(tokenAfterClosingParens) ||
                                tokenAfterClosingParens.type === "Identifier"
                            )
                    ) ||
                    secondToken && secondToken.type === "Identifier" && secondToken.value === "async" && thirdToken && thirdToken.type === "Keyword" && thirdToken.value === "function"
                )
            ) {
                tokensToIgnore.add(secondToken);
            }

            if (hasExcessParens(node)) {
                report(node);
            }
        }

        return {
            ArrayExpression(node) {
                node.elements
                    .filter(e => e && hasExcessParens(e) && precedence(e) >= PRECEDENCE_OF_ASSIGNMENT_EXPR)
                    .forEach(report);
            },

            ArrowFunctionExpression(node) {
                if (isReturnAssignException(node)) {
                    return;
                }

                if (node.body.type === "ConditionalExpression" &&
                    IGNORE_ARROW_CONDITIONALS &&
                    !isParenthesisedTwice(node.body)
                ) {
                    return;
                }

                if (node.body.type !== "BlockStatement") {
                    const firstBodyToken = sourceCode.getFirstToken(node.body, astUtils.isNotOpeningParenToken);
                    const tokenBeforeFirst = sourceCode.getTokenBefore(firstBodyToken);

                    if (astUtils.isOpeningParenToken(tokenBeforeFirst) && astUtils.isOpeningBraceToken(firstBodyToken)) {
                        tokensToIgnore.add(firstBodyToken);
                    }
                    if (hasExcessParens(node.body) && precedence(node.body) >= PRECEDENCE_OF_ASSIGNMENT_EXPR) {
                        report(node.body);
                    }
                }
            },

            AssignmentExpression(node) {
                if (isReturnAssignException(node)) {
                    return;
                }

                if (hasExcessParens(node.right) && precedence(node.right) >= precedence(node)) {
                    report(node.right);
                }
            },

            BinaryExpression: checkBinaryLogical,
            CallExpression: checkCallNew,

            ConditionalExpression(node) {
                if (isReturnAssignException(node)) {
                    return;
                }

                if (hasExcessParens(node.test) && precedence(node.test) >= precedence({ type: "LogicalExpression", operator: "||" })) {
                    report(node.test);
                }

                if (hasExcessParens(node.consequent) && precedence(node.consequent) >= PRECEDENCE_OF_ASSIGNMENT_EXPR) {
                    report(node.consequent);
                }

                if (hasExcessParens(node.alternate) && precedence(node.alternate) >= PRECEDENCE_OF_ASSIGNMENT_EXPR) {
                    report(node.alternate);
                }
            },

            DoWhileStatement(node) {
                if (hasDoubleExcessParens(node.test) && !isCondAssignException(node)) {
                    report(node.test);
                }
            },

            ExportDefaultDeclaration: node => checkExpressionOrExportStatement(node.declaration),
            ExpressionStatement: node => checkExpressionOrExportStatement(node.expression),

            "ForInStatement, ForOfStatement"(node) {
                if (node.left.type !== "VariableDeclarator") {
                    const firstLeftToken = sourceCode.getFirstToken(node.left, astUtils.isNotOpeningParenToken);

                    if (
                        firstLeftToken.value === "let" && (

                            /*
                             * If `let` is the only thing on the left side of the loop, it's the loop variable: `for ((let) of foo);`
                             * Removing it will cause a syntax error, because it will be parsed as the start of a VariableDeclarator.
                             */
                            (firstLeftToken.range[1] === node.left.range[1] || /*
                             * If `let` is followed by a `[` token, it's a property access on the `let` value: `for ((let[foo]) of bar);`
                             * Removing it will cause the property access to be parsed as a destructuring declaration of `foo` instead.
                             */
                            astUtils.isOpeningBracketToken(
                                sourceCode.getTokenAfter(firstLeftToken, astUtils.isNotClosingParenToken)
                            ))
                        )
                    ) {
                        tokensToIgnore.add(firstLeftToken);
                    }
                }
                if (!(node.type === "ForOfStatement" && node.right.type === "SequenceExpression") && hasExcessParens(node.right)) {
                    report(node.right);
                }
                if (hasExcessParens(node.left)) {
                    report(node.left);
                }
            },

            ForStatement(node) {
                if (node.init && hasExcessParens(node.init)) {
                    report(node.init);
                }

                if (node.test && hasExcessParens(node.test) && !isCondAssignException(node)) {
                    report(node.test);
                }

                if (node.update && hasExcessParens(node.update)) {
                    report(node.update);
                }
            },

            IfStatement(node) {
                if (hasDoubleExcessParens(node.test) && !isCondAssignException(node)) {
                    report(node.test);
                }
            },

            LogicalExpression: checkBinaryLogical,

            MemberExpression(node) {
                const nodeObjHasExcessParens = hasExcessParens(node.object);

                if (
                    nodeObjHasExcessParens &&
                    precedence(node.object) >= precedence(node) &&
                    (
                        node.computed ||
                        !(
                            astUtils.isDecimalInteger(node.object) ||

                            // RegExp literal is allowed to have parens (#1589)
                            (node.object.type === "Literal" && node.object.regex)
                        )
                    )
                ) {
                    report(node.object);
                }

                if (nodeObjHasExcessParens &&
                  node.object.type === "CallExpression" &&
                  node.parent.type !== "NewExpression") {
                    report(node.object);
                }

                if (node.computed && hasExcessParens(node.property)) {
                    report(node.property);
                }
            },

            NewExpression: checkCallNew,

            ObjectExpression(node) {
                node.properties
                    .filter(property => {
                        const value = property.value;

                        return value && hasExcessParens(value) && precedence(value) >= PRECEDENCE_OF_ASSIGNMENT_EXPR;
                    }).forEach(property => report(property.value));
            },

            ReturnStatement(node) {
                const returnToken = sourceCode.getFirstToken(node);

                if (isReturnAssignException(node)) {
                    return;
                }

                if (node.argument &&
                        hasExcessParensNoLineTerminator(returnToken, node.argument) &&

                        // RegExp literal is allowed to have parens (#1589)
                        !(node.argument.type === "Literal" && node.argument.regex)) {
                    report(node.argument);
                }
            },

            SequenceExpression(node) {
                node.expressions
                    .filter(e => hasExcessParens(e) && precedence(e) >= precedence(node))
                    .forEach(report);
            },

            SwitchCase(node) {
                if (node.test && hasExcessParens(node.test)) {
                    report(node.test);
                }
            },

            SwitchStatement(node) {
                if (hasDoubleExcessParens(node.discriminant)) {
                    report(node.discriminant);
                }
            },

            ThrowStatement(node) {
                const throwToken = sourceCode.getFirstToken(node);

                if (hasExcessParensNoLineTerminator(throwToken, node.argument)) {
                    report(node.argument);
                }
            },

            UnaryExpression: checkUnaryUpdate,
            UpdateExpression: checkUnaryUpdate,
            AwaitExpression: checkUnaryUpdate,

            VariableDeclarator(node) {
                if (node.init && hasExcessParens(node.init) &&
                        precedence(node.init) >= PRECEDENCE_OF_ASSIGNMENT_EXPR &&

                        // RegExp literal is allowed to have parens (#1589)
                        !(node.init.type === "Literal" && node.init.regex)) {
                    report(node.init);
                }
            },

            WhileStatement(node) {
                if (hasDoubleExcessParens(node.test) && !isCondAssignException(node)) {
                    report(node.test);
                }
            },

            WithStatement(node) {
                if (hasDoubleExcessParens(node.object)) {
                    report(node.object);
                }
            },

            YieldExpression(node) {
                if (node.argument) {
                    const yieldToken = sourceCode.getFirstToken(node);

                    if ((precedence(node.argument) >= precedence(node) &&
                            hasExcessParensNoLineTerminator(yieldToken, node.argument)) ||
                            hasDoubleExcessParens(node.argument)) {
                        report(node.argument);
                    }
                }
            },

            ClassDeclaration: checkClass,
            ClassExpression: checkClass,

            SpreadElement: checkSpreadOperator,
            SpreadProperty: checkSpreadOperator,
            ExperimentalSpreadProperty: checkSpreadOperator
        };

    }
};
