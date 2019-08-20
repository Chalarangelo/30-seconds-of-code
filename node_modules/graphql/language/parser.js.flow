// @flow strict

import inspect from '../jsutils/inspect';
import defineToJSON from '../jsutils/defineToJSON';
import { Source } from './source';
import { type GraphQLError } from '../error/GraphQLError';
import { syntaxError } from '../error/syntaxError';
import { type TokenKindEnum, TokenKind } from './tokenKind';
import { type Lexer, getTokenDesc, createLexer } from './lexer';
import {
  type Location,
  type Token,
  type NameNode,
  type VariableNode,
  type DocumentNode,
  type DefinitionNode,
  type ExecutableDefinitionNode,
  type OperationDefinitionNode,
  type OperationTypeNode,
  type VariableDefinitionNode,
  type SelectionSetNode,
  type SelectionNode,
  type FieldNode,
  type ArgumentNode,
  type FragmentSpreadNode,
  type InlineFragmentNode,
  type FragmentDefinitionNode,
  type ValueNode,
  type StringValueNode,
  type ListValueNode,
  type ObjectValueNode,
  type ObjectFieldNode,
  type DirectiveNode,
  type TypeNode,
  type NamedTypeNode,
  type ListTypeNode,
  type NonNullTypeNode,
  type TypeSystemDefinitionNode,
  type SchemaDefinitionNode,
  type OperationTypeDefinitionNode,
  type ScalarTypeDefinitionNode,
  type ObjectTypeDefinitionNode,
  type FieldDefinitionNode,
  type InputValueDefinitionNode,
  type InterfaceTypeDefinitionNode,
  type UnionTypeDefinitionNode,
  type EnumTypeDefinitionNode,
  type EnumValueDefinitionNode,
  type InputObjectTypeDefinitionNode,
  type DirectiveDefinitionNode,
  type TypeSystemExtensionNode,
  type SchemaExtensionNode,
  type ScalarTypeExtensionNode,
  type ObjectTypeExtensionNode,
  type InterfaceTypeExtensionNode,
  type UnionTypeExtensionNode,
  type EnumTypeExtensionNode,
  type InputObjectTypeExtensionNode,
} from './ast';

import { Kind } from './kinds';
import { DirectiveLocation } from './directiveLocation';

/**
 * Configuration options to control parser behavior
 */
export type ParseOptions = {
  /**
   * By default, the parser creates AST nodes that know the location
   * in the source that they correspond to. This configuration flag
   * disables that behavior for performance or testing.
   */
  noLocation?: boolean,

  /**
   * If enabled, the parser will parse empty fields sets in the Schema
   * Definition Language. Otherwise, the parser will follow the current
   * specification.
   *
   * This option is provided to ease adoption of the final SDL specification
   * and will be removed in v16.
   */
  allowLegacySDLEmptyFields?: boolean,

  /**
   * If enabled, the parser will parse implemented interfaces with no `&`
   * character between each interface. Otherwise, the parser will follow the
   * current specification.
   *
   * This option is provided to ease adoption of the final SDL specification
   * and will be removed in v16.
   */
  allowLegacySDLImplementsInterfaces?: boolean,

  /**
   * EXPERIMENTAL:
   *
   * If enabled, the parser will understand and parse variable definitions
   * contained in a fragment definition. They'll be represented in the
   * `variableDefinitions` field of the FragmentDefinitionNode.
   *
   * The syntax is identical to normal, query-defined variables. For example:
   *
   *   fragment A($var: Boolean = false) on T  {
   *     ...
   *   }
   *
   * Note: this feature is experimental and may change or be removed in the
   * future.
   */
  experimentalFragmentVariables?: boolean,

  ...
};

/**
 * Given a GraphQL source, parses it into a Document.
 * Throws GraphQLError if a syntax error is encountered.
 */
export function parse(
  source: string | Source,
  options?: ParseOptions,
): DocumentNode {
  const sourceObj = typeof source === 'string' ? new Source(source) : source;
  if (!(sourceObj instanceof Source)) {
    throw new TypeError(`Must provide Source. Received: ${inspect(sourceObj)}`);
  }
  const lexer = createLexer(sourceObj, options || {});
  return parseDocument(lexer);
}

/**
 * Given a string containing a GraphQL value (ex. `[42]`), parse the AST for
 * that value.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Values directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: valueFromAST().
 */
export function parseValue(
  source: string | Source,
  options?: ParseOptions,
): ValueNode {
  const sourceObj = typeof source === 'string' ? new Source(source) : source;
  const lexer = createLexer(sourceObj, options || {});
  expectToken(lexer, TokenKind.SOF);
  const value = parseValueLiteral(lexer, false);
  expectToken(lexer, TokenKind.EOF);
  return value;
}

/**
 * Given a string containing a GraphQL Type (ex. `[Int!]`), parse the AST for
 * that type.
 * Throws GraphQLError if a syntax error is encountered.
 *
 * This is useful within tools that operate upon GraphQL Types directly and
 * in isolation of complete GraphQL documents.
 *
 * Consider providing the results to the utility function: typeFromAST().
 */
export function parseType(
  source: string | Source,
  options?: ParseOptions,
): TypeNode {
  const sourceObj = typeof source === 'string' ? new Source(source) : source;
  const lexer = createLexer(sourceObj, options || {});
  expectToken(lexer, TokenKind.SOF);
  const type = parseTypeReference(lexer);
  expectToken(lexer, TokenKind.EOF);
  return type;
}

/**
 * Converts a name lex token into a name parse node.
 */
function parseName(lexer: Lexer<*>): NameNode {
  const token = expectToken(lexer, TokenKind.NAME);
  return {
    kind: Kind.NAME,
    value: ((token.value: any): string),
    loc: loc(lexer, token),
  };
}

// Implements the parsing rules in the Document section.

/**
 * Document : Definition+
 */
function parseDocument(lexer: Lexer<*>): DocumentNode {
  const start = lexer.token;
  return {
    kind: Kind.DOCUMENT,
    definitions: many(lexer, TokenKind.SOF, parseDefinition, TokenKind.EOF),
    loc: loc(lexer, start),
  };
}

/**
 * Definition :
 *   - ExecutableDefinition
 *   - TypeSystemDefinition
 *   - TypeSystemExtension
 */
function parseDefinition(lexer: Lexer<*>): DefinitionNode {
  if (peek(lexer, TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
      case 'fragment':
        return parseExecutableDefinition(lexer);
      case 'schema':
      case 'scalar':
      case 'type':
      case 'interface':
      case 'union':
      case 'enum':
      case 'input':
      case 'directive':
        return parseTypeSystemDefinition(lexer);
      case 'extend':
        return parseTypeSystemExtension(lexer);
    }
  } else if (peek(lexer, TokenKind.BRACE_L)) {
    return parseExecutableDefinition(lexer);
  } else if (peekDescription(lexer)) {
    return parseTypeSystemDefinition(lexer);
  }

  throw unexpected(lexer);
}

/**
 * ExecutableDefinition :
 *   - OperationDefinition
 *   - FragmentDefinition
 */
function parseExecutableDefinition(lexer: Lexer<*>): ExecutableDefinitionNode {
  if (peek(lexer, TokenKind.NAME)) {
    switch (lexer.token.value) {
      case 'query':
      case 'mutation':
      case 'subscription':
        return parseOperationDefinition(lexer);

      case 'fragment':
        return parseFragmentDefinition(lexer);
    }
  } else if (peek(lexer, TokenKind.BRACE_L)) {
    return parseOperationDefinition(lexer);
  }

  throw unexpected(lexer);
}

// Implements the parsing rules in the Operations section.

/**
 * OperationDefinition :
 *  - SelectionSet
 *  - OperationType Name? VariableDefinitions? Directives? SelectionSet
 */
function parseOperationDefinition(lexer: Lexer<*>): OperationDefinitionNode {
  const start = lexer.token;
  if (peek(lexer, TokenKind.BRACE_L)) {
    return {
      kind: Kind.OPERATION_DEFINITION,
      operation: 'query',
      name: undefined,
      variableDefinitions: [],
      directives: [],
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start),
    };
  }
  const operation = parseOperationType(lexer);
  let name;
  if (peek(lexer, TokenKind.NAME)) {
    name = parseName(lexer);
  }
  return {
    kind: Kind.OPERATION_DEFINITION,
    operation,
    name,
    variableDefinitions: parseVariableDefinitions(lexer),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start),
  };
}

/**
 * OperationType : one of query mutation subscription
 */
function parseOperationType(lexer: Lexer<*>): OperationTypeNode {
  const operationToken = expectToken(lexer, TokenKind.NAME);
  switch (operationToken.value) {
    case 'query':
      return 'query';
    case 'mutation':
      return 'mutation';
    case 'subscription':
      return 'subscription';
  }

  throw unexpected(lexer, operationToken);
}

/**
 * VariableDefinitions : ( VariableDefinition+ )
 */
function parseVariableDefinitions(
  lexer: Lexer<*>,
): Array<VariableDefinitionNode> {
  return peek(lexer, TokenKind.PAREN_L)
    ? many(lexer, TokenKind.PAREN_L, parseVariableDefinition, TokenKind.PAREN_R)
    : [];
}

/**
 * VariableDefinition : Variable : Type DefaultValue? Directives[Const]?
 */
function parseVariableDefinition(lexer: Lexer<*>): VariableDefinitionNode {
  const start = lexer.token;
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: parseVariable(lexer),
    type: (expectToken(lexer, TokenKind.COLON), parseTypeReference(lexer)),
    defaultValue: expectOptionalToken(lexer, TokenKind.EQUALS)
      ? parseValueLiteral(lexer, true)
      : undefined,
    directives: parseDirectives(lexer, true),
    loc: loc(lexer, start),
  };
}

/**
 * Variable : $ Name
 */
function parseVariable(lexer: Lexer<*>): VariableNode {
  const start = lexer.token;
  expectToken(lexer, TokenKind.DOLLAR);
  return {
    kind: Kind.VARIABLE,
    name: parseName(lexer),
    loc: loc(lexer, start),
  };
}

/**
 * SelectionSet : { Selection+ }
 */
function parseSelectionSet(lexer: Lexer<*>): SelectionSetNode {
  const start = lexer.token;
  return {
    kind: Kind.SELECTION_SET,
    selections: many(
      lexer,
      TokenKind.BRACE_L,
      parseSelection,
      TokenKind.BRACE_R,
    ),
    loc: loc(lexer, start),
  };
}

/**
 * Selection :
 *   - Field
 *   - FragmentSpread
 *   - InlineFragment
 */
function parseSelection(lexer: Lexer<*>): SelectionNode {
  return peek(lexer, TokenKind.SPREAD)
    ? parseFragment(lexer)
    : parseField(lexer);
}

/**
 * Field : Alias? Name Arguments? Directives? SelectionSet?
 *
 * Alias : Name :
 */
function parseField(lexer: Lexer<*>): FieldNode {
  const start = lexer.token;

  const nameOrAlias = parseName(lexer);
  let alias;
  let name;
  if (expectOptionalToken(lexer, TokenKind.COLON)) {
    alias = nameOrAlias;
    name = parseName(lexer);
  } else {
    name = nameOrAlias;
  }

  return {
    kind: Kind.FIELD,
    alias,
    name,
    arguments: parseArguments(lexer, false),
    directives: parseDirectives(lexer, false),
    selectionSet: peek(lexer, TokenKind.BRACE_L)
      ? parseSelectionSet(lexer)
      : undefined,
    loc: loc(lexer, start),
  };
}

/**
 * Arguments[Const] : ( Argument[?Const]+ )
 */
function parseArguments(
  lexer: Lexer<*>,
  isConst: boolean,
): Array<ArgumentNode> {
  const item = isConst ? parseConstArgument : parseArgument;
  return peek(lexer, TokenKind.PAREN_L)
    ? many(lexer, TokenKind.PAREN_L, item, TokenKind.PAREN_R)
    : [];
}

/**
 * Argument[Const] : Name : Value[?Const]
 */
function parseArgument(lexer: Lexer<*>): ArgumentNode {
  const start = lexer.token;
  const name = parseName(lexer);

  expectToken(lexer, TokenKind.COLON);
  return {
    kind: Kind.ARGUMENT,
    name,
    value: parseValueLiteral(lexer, false),
    loc: loc(lexer, start),
  };
}

function parseConstArgument(lexer: Lexer<*>): ArgumentNode {
  const start = lexer.token;
  return {
    kind: Kind.ARGUMENT,
    name: parseName(lexer),
    value: (expectToken(lexer, TokenKind.COLON), parseConstValue(lexer)),
    loc: loc(lexer, start),
  };
}

// Implements the parsing rules in the Fragments section.

/**
 * Corresponds to both FragmentSpread and InlineFragment in the spec.
 *
 * FragmentSpread : ... FragmentName Directives?
 *
 * InlineFragment : ... TypeCondition? Directives? SelectionSet
 */
function parseFragment(
  lexer: Lexer<*>,
): FragmentSpreadNode | InlineFragmentNode {
  const start = lexer.token;
  expectToken(lexer, TokenKind.SPREAD);

  const hasTypeCondition = expectOptionalKeyword(lexer, 'on');
  if (!hasTypeCondition && peek(lexer, TokenKind.NAME)) {
    return {
      kind: Kind.FRAGMENT_SPREAD,
      name: parseFragmentName(lexer),
      directives: parseDirectives(lexer, false),
      loc: loc(lexer, start),
    };
  }
  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: hasTypeCondition ? parseNamedType(lexer) : undefined,
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start),
  };
}

/**
 * FragmentDefinition :
 *   - fragment FragmentName on TypeCondition Directives? SelectionSet
 *
 * TypeCondition : NamedType
 */
function parseFragmentDefinition(lexer: Lexer<*>): FragmentDefinitionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'fragment');
  // Experimental support for defining variables within fragments changes
  // the grammar of FragmentDefinition:
  //   - fragment FragmentName VariableDefinitions? on TypeCondition Directives? SelectionSet
  if (lexer.options.experimentalFragmentVariables) {
    return {
      kind: Kind.FRAGMENT_DEFINITION,
      name: parseFragmentName(lexer),
      variableDefinitions: parseVariableDefinitions(lexer),
      typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
      directives: parseDirectives(lexer, false),
      selectionSet: parseSelectionSet(lexer),
      loc: loc(lexer, start),
    };
  }
  return {
    kind: Kind.FRAGMENT_DEFINITION,
    name: parseFragmentName(lexer),
    typeCondition: (expectKeyword(lexer, 'on'), parseNamedType(lexer)),
    directives: parseDirectives(lexer, false),
    selectionSet: parseSelectionSet(lexer),
    loc: loc(lexer, start),
  };
}

/**
 * FragmentName : Name but not `on`
 */
function parseFragmentName(lexer: Lexer<*>): NameNode {
  if (lexer.token.value === 'on') {
    throw unexpected(lexer);
  }
  return parseName(lexer);
}

// Implements the parsing rules in the Values section.

/**
 * Value[Const] :
 *   - [~Const] Variable
 *   - IntValue
 *   - FloatValue
 *   - StringValue
 *   - BooleanValue
 *   - NullValue
 *   - EnumValue
 *   - ListValue[?Const]
 *   - ObjectValue[?Const]
 *
 * BooleanValue : one of `true` `false`
 *
 * NullValue : `null`
 *
 * EnumValue : Name but not `true`, `false` or `null`
 */
function parseValueLiteral(lexer: Lexer<*>, isConst: boolean): ValueNode {
  const token = lexer.token;
  switch (token.kind) {
    case TokenKind.BRACKET_L:
      return parseList(lexer, isConst);
    case TokenKind.BRACE_L:
      return parseObject(lexer, isConst);
    case TokenKind.INT:
      lexer.advance();
      return {
        kind: Kind.INT,
        value: ((token.value: any): string),
        loc: loc(lexer, token),
      };
    case TokenKind.FLOAT:
      lexer.advance();
      return {
        kind: Kind.FLOAT,
        value: ((token.value: any): string),
        loc: loc(lexer, token),
      };
    case TokenKind.STRING:
    case TokenKind.BLOCK_STRING:
      return parseStringLiteral(lexer);
    case TokenKind.NAME:
      if (token.value === 'true' || token.value === 'false') {
        lexer.advance();
        return {
          kind: Kind.BOOLEAN,
          value: token.value === 'true',
          loc: loc(lexer, token),
        };
      } else if (token.value === 'null') {
        lexer.advance();
        return {
          kind: Kind.NULL,
          loc: loc(lexer, token),
        };
      }
      lexer.advance();
      return {
        kind: Kind.ENUM,
        value: ((token.value: any): string),
        loc: loc(lexer, token),
      };
    case TokenKind.DOLLAR:
      if (!isConst) {
        return parseVariable(lexer);
      }
      break;
  }
  throw unexpected(lexer);
}

function parseStringLiteral(lexer: Lexer<*>): StringValueNode {
  const token = lexer.token;
  lexer.advance();
  return {
    kind: Kind.STRING,
    value: ((token.value: any): string),
    block: token.kind === TokenKind.BLOCK_STRING,
    loc: loc(lexer, token),
  };
}

export function parseConstValue(lexer: Lexer<*>): ValueNode {
  return parseValueLiteral(lexer, true);
}

function parseValueValue(lexer: Lexer<*>): ValueNode {
  return parseValueLiteral(lexer, false);
}

/**
 * ListValue[Const] :
 *   - [ ]
 *   - [ Value[?Const]+ ]
 */
function parseList(lexer: Lexer<*>, isConst: boolean): ListValueNode {
  const start = lexer.token;
  const item = isConst ? parseConstValue : parseValueValue;
  return {
    kind: Kind.LIST,
    values: any(lexer, TokenKind.BRACKET_L, item, TokenKind.BRACKET_R),
    loc: loc(lexer, start),
  };
}

/**
 * ObjectValue[Const] :
 *   - { }
 *   - { ObjectField[?Const]+ }
 */
function parseObject(lexer: Lexer<*>, isConst: boolean): ObjectValueNode {
  const start = lexer.token;
  const item = () => parseObjectField(lexer, isConst);
  return {
    kind: Kind.OBJECT,
    fields: any(lexer, TokenKind.BRACE_L, item, TokenKind.BRACE_R),
    loc: loc(lexer, start),
  };
}

/**
 * ObjectField[Const] : Name : Value[?Const]
 */
function parseObjectField(lexer: Lexer<*>, isConst: boolean): ObjectFieldNode {
  const start = lexer.token;
  const name = parseName(lexer);
  expectToken(lexer, TokenKind.COLON);

  return {
    kind: Kind.OBJECT_FIELD,
    name,
    value: parseValueLiteral(lexer, isConst),
    loc: loc(lexer, start),
  };
}

// Implements the parsing rules in the Directives section.

/**
 * Directives[Const] : Directive[?Const]+
 */
function parseDirectives(
  lexer: Lexer<*>,
  isConst: boolean,
): Array<DirectiveNode> {
  const directives = [];
  while (peek(lexer, TokenKind.AT)) {
    directives.push(parseDirective(lexer, isConst));
  }
  return directives;
}

/**
 * Directive[Const] : @ Name Arguments[?Const]?
 */
function parseDirective(lexer: Lexer<*>, isConst: boolean): DirectiveNode {
  const start = lexer.token;
  expectToken(lexer, TokenKind.AT);
  return {
    kind: Kind.DIRECTIVE,
    name: parseName(lexer),
    arguments: parseArguments(lexer, isConst),
    loc: loc(lexer, start),
  };
}

// Implements the parsing rules in the Types section.

/**
 * Type :
 *   - NamedType
 *   - ListType
 *   - NonNullType
 */
export function parseTypeReference(lexer: Lexer<*>): TypeNode {
  const start = lexer.token;
  let type;
  if (expectOptionalToken(lexer, TokenKind.BRACKET_L)) {
    type = parseTypeReference(lexer);
    expectToken(lexer, TokenKind.BRACKET_R);
    type = ({
      kind: Kind.LIST_TYPE,
      type,
      loc: loc(lexer, start),
    }: ListTypeNode);
  } else {
    type = parseNamedType(lexer);
  }
  if (expectOptionalToken(lexer, TokenKind.BANG)) {
    return ({
      kind: Kind.NON_NULL_TYPE,
      type,
      loc: loc(lexer, start),
    }: NonNullTypeNode);
  }
  return type;
}

/**
 * NamedType : Name
 */
export function parseNamedType(lexer: Lexer<*>): NamedTypeNode {
  const start = lexer.token;
  return {
    kind: Kind.NAMED_TYPE,
    name: parseName(lexer),
    loc: loc(lexer, start),
  };
}

// Implements the parsing rules in the Type Definition section.

/**
 * TypeSystemDefinition :
 *   - SchemaDefinition
 *   - TypeDefinition
 *   - DirectiveDefinition
 *
 * TypeDefinition :
 *   - ScalarTypeDefinition
 *   - ObjectTypeDefinition
 *   - InterfaceTypeDefinition
 *   - UnionTypeDefinition
 *   - EnumTypeDefinition
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemDefinition(lexer: Lexer<*>): TypeSystemDefinitionNode {
  // Many definitions begin with a description and require a lookahead.
  const keywordToken = peekDescription(lexer) ? lexer.lookahead() : lexer.token;

  if (keywordToken.kind === TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaDefinition(lexer);
      case 'scalar':
        return parseScalarTypeDefinition(lexer);
      case 'type':
        return parseObjectTypeDefinition(lexer);
      case 'interface':
        return parseInterfaceTypeDefinition(lexer);
      case 'union':
        return parseUnionTypeDefinition(lexer);
      case 'enum':
        return parseEnumTypeDefinition(lexer);
      case 'input':
        return parseInputObjectTypeDefinition(lexer);
      case 'directive':
        return parseDirectiveDefinition(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}

function peekDescription(lexer: Lexer<*>): boolean {
  return peek(lexer, TokenKind.STRING) || peek(lexer, TokenKind.BLOCK_STRING);
}

/**
 * Description : StringValue
 */
function parseDescription(lexer: Lexer<*>): void | StringValueNode {
  if (peekDescription(lexer)) {
    return parseStringLiteral(lexer);
  }
}

/**
 * SchemaDefinition : schema Directives[Const]? { OperationTypeDefinition+ }
 */
function parseSchemaDefinition(lexer: Lexer<*>): SchemaDefinitionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'schema');
  const directives = parseDirectives(lexer, true);
  const operationTypes = many(
    lexer,
    TokenKind.BRACE_L,
    parseOperationTypeDefinition,
    TokenKind.BRACE_R,
  );
  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives,
    operationTypes,
    loc: loc(lexer, start),
  };
}

/**
 * OperationTypeDefinition : OperationType : NamedType
 */
function parseOperationTypeDefinition(
  lexer: Lexer<*>,
): OperationTypeDefinitionNode {
  const start = lexer.token;
  const operation = parseOperationType(lexer);
  expectToken(lexer, TokenKind.COLON);
  const type = parseNamedType(lexer);
  return {
    kind: Kind.OPERATION_TYPE_DEFINITION,
    operation,
    type,
    loc: loc(lexer, start),
  };
}

/**
 * ScalarTypeDefinition : Description? scalar Name Directives[Const]?
 */
function parseScalarTypeDefinition(lexer: Lexer<*>): ScalarTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'scalar');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    description,
    name,
    directives,
    loc: loc(lexer, start),
  };
}

/**
 * ObjectTypeDefinition :
 *   Description?
 *   type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition?
 */
function parseObjectTypeDefinition(lexer: Lexer<*>): ObjectTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'type');
  const name = parseName(lexer);
  const interfaces = parseImplementsInterfaces(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseFieldsDefinition(lexer);
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    description,
    name,
    interfaces,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * ImplementsInterfaces :
 *   - implements `&`? NamedType
 *   - ImplementsInterfaces & NamedType
 */
function parseImplementsInterfaces(lexer: Lexer<*>): Array<NamedTypeNode> {
  const types = [];
  if (expectOptionalKeyword(lexer, 'implements')) {
    // Optional leading ampersand
    expectOptionalToken(lexer, TokenKind.AMP);
    do {
      types.push(parseNamedType(lexer));
    } while (
      expectOptionalToken(lexer, TokenKind.AMP) ||
      // Legacy support for the SDL?
      (lexer.options.allowLegacySDLImplementsInterfaces &&
        peek(lexer, TokenKind.NAME))
    );
  }
  return types;
}

/**
 * FieldsDefinition : { FieldDefinition+ }
 */
function parseFieldsDefinition(lexer: Lexer<*>): Array<FieldDefinitionNode> {
  // Legacy support for the SDL?
  if (
    lexer.options.allowLegacySDLEmptyFields &&
    peek(lexer, TokenKind.BRACE_L) &&
    lexer.lookahead().kind === TokenKind.BRACE_R
  ) {
    lexer.advance();
    lexer.advance();
    return [];
  }
  return peek(lexer, TokenKind.BRACE_L)
    ? many(lexer, TokenKind.BRACE_L, parseFieldDefinition, TokenKind.BRACE_R)
    : [];
}

/**
 * FieldDefinition :
 *   - Description? Name ArgumentsDefinition? : Type Directives[Const]?
 */
function parseFieldDefinition(lexer: Lexer<*>): FieldDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  const name = parseName(lexer);
  const args = parseArgumentDefs(lexer);
  expectToken(lexer, TokenKind.COLON);
  const type = parseTypeReference(lexer);
  const directives = parseDirectives(lexer, true);
  return {
    kind: Kind.FIELD_DEFINITION,
    description,
    name,
    arguments: args,
    type,
    directives,
    loc: loc(lexer, start),
  };
}

/**
 * ArgumentsDefinition : ( InputValueDefinition+ )
 */
function parseArgumentDefs(lexer: Lexer<*>): Array<InputValueDefinitionNode> {
  if (!peek(lexer, TokenKind.PAREN_L)) {
    return [];
  }
  return many(lexer, TokenKind.PAREN_L, parseInputValueDef, TokenKind.PAREN_R);
}

/**
 * InputValueDefinition :
 *   - Description? Name : Type DefaultValue? Directives[Const]?
 */
function parseInputValueDef(lexer: Lexer<*>): InputValueDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  const name = parseName(lexer);
  expectToken(lexer, TokenKind.COLON);
  const type = parseTypeReference(lexer);
  let defaultValue;
  if (expectOptionalToken(lexer, TokenKind.EQUALS)) {
    defaultValue = parseConstValue(lexer);
  }
  const directives = parseDirectives(lexer, true);
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    description,
    name,
    type,
    defaultValue,
    directives,
    loc: loc(lexer, start),
  };
}

/**
 * InterfaceTypeDefinition :
 *   - Description? interface Name Directives[Const]? FieldsDefinition?
 */
function parseInterfaceTypeDefinition(
  lexer: Lexer<*>,
): InterfaceTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'interface');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseFieldsDefinition(lexer);
  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    description,
    name,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * UnionTypeDefinition :
 *   - Description? union Name Directives[Const]? UnionMemberTypes?
 */
function parseUnionTypeDefinition(lexer: Lexer<*>): UnionTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'union');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const types = parseUnionMemberTypes(lexer);
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    description,
    name,
    directives,
    types,
    loc: loc(lexer, start),
  };
}

/**
 * UnionMemberTypes :
 *   - = `|`? NamedType
 *   - UnionMemberTypes | NamedType
 */
function parseUnionMemberTypes(lexer: Lexer<*>): Array<NamedTypeNode> {
  const types = [];
  if (expectOptionalToken(lexer, TokenKind.EQUALS)) {
    // Optional leading pipe
    expectOptionalToken(lexer, TokenKind.PIPE);
    do {
      types.push(parseNamedType(lexer));
    } while (expectOptionalToken(lexer, TokenKind.PIPE));
  }
  return types;
}

/**
 * EnumTypeDefinition :
 *   - Description? enum Name Directives[Const]? EnumValuesDefinition?
 */
function parseEnumTypeDefinition(lexer: Lexer<*>): EnumTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'enum');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const values = parseEnumValuesDefinition(lexer);
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    description,
    name,
    directives,
    values,
    loc: loc(lexer, start),
  };
}

/**
 * EnumValuesDefinition : { EnumValueDefinition+ }
 */
function parseEnumValuesDefinition(
  lexer: Lexer<*>,
): Array<EnumValueDefinitionNode> {
  return peek(lexer, TokenKind.BRACE_L)
    ? many(
        lexer,
        TokenKind.BRACE_L,
        parseEnumValueDefinition,
        TokenKind.BRACE_R,
      )
    : [];
}

/**
 * EnumValueDefinition : Description? EnumValue Directives[Const]?
 *
 * EnumValue : Name
 */
function parseEnumValueDefinition(lexer: Lexer<*>): EnumValueDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    description,
    name,
    directives,
    loc: loc(lexer, start),
  };
}

/**
 * InputObjectTypeDefinition :
 *   - Description? input Name Directives[Const]? InputFieldsDefinition?
 */
function parseInputObjectTypeDefinition(
  lexer: Lexer<*>,
): InputObjectTypeDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'input');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseInputFieldsDefinition(lexer);
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    description,
    name,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * InputFieldsDefinition : { InputValueDefinition+ }
 */
function parseInputFieldsDefinition(
  lexer: Lexer<*>,
): Array<InputValueDefinitionNode> {
  return peek(lexer, TokenKind.BRACE_L)
    ? many(lexer, TokenKind.BRACE_L, parseInputValueDef, TokenKind.BRACE_R)
    : [];
}

/**
 * TypeSystemExtension :
 *   - SchemaExtension
 *   - TypeExtension
 *
 * TypeExtension :
 *   - ScalarTypeExtension
 *   - ObjectTypeExtension
 *   - InterfaceTypeExtension
 *   - UnionTypeExtension
 *   - EnumTypeExtension
 *   - InputObjectTypeDefinition
 */
function parseTypeSystemExtension(lexer: Lexer<*>): TypeSystemExtensionNode {
  const keywordToken = lexer.lookahead();

  if (keywordToken.kind === TokenKind.NAME) {
    switch (keywordToken.value) {
      case 'schema':
        return parseSchemaExtension(lexer);
      case 'scalar':
        return parseScalarTypeExtension(lexer);
      case 'type':
        return parseObjectTypeExtension(lexer);
      case 'interface':
        return parseInterfaceTypeExtension(lexer);
      case 'union':
        return parseUnionTypeExtension(lexer);
      case 'enum':
        return parseEnumTypeExtension(lexer);
      case 'input':
        return parseInputObjectTypeExtension(lexer);
    }
  }

  throw unexpected(lexer, keywordToken);
}

/**
 * SchemaExtension :
 *  - extend schema Directives[Const]? { OperationTypeDefinition+ }
 *  - extend schema Directives[Const]
 */
function parseSchemaExtension(lexer: Lexer<*>): SchemaExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'schema');
  const directives = parseDirectives(lexer, true);
  const operationTypes = peek(lexer, TokenKind.BRACE_L)
    ? many(
        lexer,
        TokenKind.BRACE_L,
        parseOperationTypeDefinition,
        TokenKind.BRACE_R,
      )
    : [];
  if (directives.length === 0 && operationTypes.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.SCHEMA_EXTENSION,
    directives,
    operationTypes,
    loc: loc(lexer, start),
  };
}

/**
 * ScalarTypeExtension :
 *   - extend scalar Name Directives[Const]
 */
function parseScalarTypeExtension(lexer: Lexer<*>): ScalarTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'scalar');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  if (directives.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.SCALAR_TYPE_EXTENSION,
    name,
    directives,
    loc: loc(lexer, start),
  };
}

/**
 * ObjectTypeExtension :
 *  - extend type Name ImplementsInterfaces? Directives[Const]? FieldsDefinition
 *  - extend type Name ImplementsInterfaces? Directives[Const]
 *  - extend type Name ImplementsInterfaces
 */
function parseObjectTypeExtension(lexer: Lexer<*>): ObjectTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'type');
  const name = parseName(lexer);
  const interfaces = parseImplementsInterfaces(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseFieldsDefinition(lexer);
  if (
    interfaces.length === 0 &&
    directives.length === 0 &&
    fields.length === 0
  ) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.OBJECT_TYPE_EXTENSION,
    name,
    interfaces,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * InterfaceTypeExtension :
 *   - extend interface Name Directives[Const]? FieldsDefinition
 *   - extend interface Name Directives[Const]
 */
function parseInterfaceTypeExtension(
  lexer: Lexer<*>,
): InterfaceTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'interface');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseFieldsDefinition(lexer);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.INTERFACE_TYPE_EXTENSION,
    name,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * UnionTypeExtension :
 *   - extend union Name Directives[Const]? UnionMemberTypes
 *   - extend union Name Directives[Const]
 */
function parseUnionTypeExtension(lexer: Lexer<*>): UnionTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'union');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const types = parseUnionMemberTypes(lexer);
  if (directives.length === 0 && types.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.UNION_TYPE_EXTENSION,
    name,
    directives,
    types,
    loc: loc(lexer, start),
  };
}

/**
 * EnumTypeExtension :
 *   - extend enum Name Directives[Const]? EnumValuesDefinition
 *   - extend enum Name Directives[Const]
 */
function parseEnumTypeExtension(lexer: Lexer<*>): EnumTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'enum');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const values = parseEnumValuesDefinition(lexer);
  if (directives.length === 0 && values.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.ENUM_TYPE_EXTENSION,
    name,
    directives,
    values,
    loc: loc(lexer, start),
  };
}

/**
 * InputObjectTypeExtension :
 *   - extend input Name Directives[Const]? InputFieldsDefinition
 *   - extend input Name Directives[Const]
 */
function parseInputObjectTypeExtension(
  lexer: Lexer<*>,
): InputObjectTypeExtensionNode {
  const start = lexer.token;
  expectKeyword(lexer, 'extend');
  expectKeyword(lexer, 'input');
  const name = parseName(lexer);
  const directives = parseDirectives(lexer, true);
  const fields = parseInputFieldsDefinition(lexer);
  if (directives.length === 0 && fields.length === 0) {
    throw unexpected(lexer);
  }
  return {
    kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name,
    directives,
    fields,
    loc: loc(lexer, start),
  };
}

/**
 * DirectiveDefinition :
 *   - Description? directive @ Name ArgumentsDefinition? `repeatable`? on DirectiveLocations
 */
function parseDirectiveDefinition(lexer: Lexer<*>): DirectiveDefinitionNode {
  const start = lexer.token;
  const description = parseDescription(lexer);
  expectKeyword(lexer, 'directive');
  expectToken(lexer, TokenKind.AT);
  const name = parseName(lexer);
  const args = parseArgumentDefs(lexer);
  const repeatable = expectOptionalKeyword(lexer, 'repeatable');
  expectKeyword(lexer, 'on');
  const locations = parseDirectiveLocations(lexer);
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    description,
    name,
    arguments: args,
    repeatable,
    locations,
    loc: loc(lexer, start),
  };
}

/**
 * DirectiveLocations :
 *   - `|`? DirectiveLocation
 *   - DirectiveLocations | DirectiveLocation
 */
function parseDirectiveLocations(lexer: Lexer<*>): Array<NameNode> {
  // Optional leading pipe
  expectOptionalToken(lexer, TokenKind.PIPE);
  const locations = [];
  do {
    locations.push(parseDirectiveLocation(lexer));
  } while (expectOptionalToken(lexer, TokenKind.PIPE));
  return locations;
}

/*
 * DirectiveLocation :
 *   - ExecutableDirectiveLocation
 *   - TypeSystemDirectiveLocation
 *
 * ExecutableDirectiveLocation : one of
 *   `QUERY`
 *   `MUTATION`
 *   `SUBSCRIPTION`
 *   `FIELD`
 *   `FRAGMENT_DEFINITION`
 *   `FRAGMENT_SPREAD`
 *   `INLINE_FRAGMENT`
 *
 * TypeSystemDirectiveLocation : one of
 *   `SCHEMA`
 *   `SCALAR`
 *   `OBJECT`
 *   `FIELD_DEFINITION`
 *   `ARGUMENT_DEFINITION`
 *   `INTERFACE`
 *   `UNION`
 *   `ENUM`
 *   `ENUM_VALUE`
 *   `INPUT_OBJECT`
 *   `INPUT_FIELD_DEFINITION`
 */
function parseDirectiveLocation(lexer: Lexer<*>): NameNode {
  const start = lexer.token;
  const name = parseName(lexer);
  if (DirectiveLocation[name.value] !== undefined) {
    return name;
  }
  throw unexpected(lexer, start);
}

// Core parsing utility functions

/**
 * Returns a location object, used to identify the place in
 * the source that created a given parsed object.
 */
function loc(lexer: Lexer<*>, startToken: Token): Location | void {
  if (!lexer.options.noLocation) {
    return new Loc(startToken, lexer.lastToken, lexer.source);
  }
}

function Loc(startToken: Token, endToken: Token, source: Source) {
  this.start = startToken.start;
  this.end = endToken.end;
  this.startToken = startToken;
  this.endToken = endToken;
  this.source = source;
}

// Print a simplified form when appearing in JSON/util.inspect.
defineToJSON(Loc, function() {
  return { start: this.start, end: this.end };
});

/**
 * Determines if the next token is of a given kind
 */
function peek(lexer: Lexer<*>, kind: TokenKindEnum): boolean {
  return lexer.token.kind === kind;
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and throw an error.
 */
function expectToken(lexer: Lexer<*>, kind: TokenKindEnum): Token {
  const token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }

  throw syntaxError(
    lexer.source,
    token.start,
    `Expected ${kind}, found ${getTokenDesc(token)}`,
  );
}

/**
 * If the next token is of the given kind, return that token after advancing
 * the lexer. Otherwise, do not change the parser state and return undefined.
 */
function expectOptionalToken(lexer: Lexer<*>, kind: TokenKindEnum): ?Token {
  const token = lexer.token;
  if (token.kind === kind) {
    lexer.advance();
    return token;
  }
  return undefined;
}

/**
 * If the next token is a given keyword, advance the lexer.
 * Otherwise, do not change the parser state and throw an error.
 */
function expectKeyword(lexer: Lexer<*>, value: string) {
  const token = lexer.token;
  if (token.kind === TokenKind.NAME && token.value === value) {
    lexer.advance();
  } else {
    throw syntaxError(
      lexer.source,
      token.start,
      `Expected "${value}", found ${getTokenDesc(token)}`,
    );
  }
}

/**
 * If the next token is a given keyword, return "true" after advancing
 * the lexer. Otherwise, do not change the parser state and return "false".
 */
function expectOptionalKeyword(lexer: Lexer<*>, value: string): boolean {
  const token = lexer.token;
  if (token.kind === TokenKind.NAME && token.value === value) {
    lexer.advance();
    return true;
  }
  return false;
}

/**
 * Helper function for creating an error when an unexpected lexed token
 * is encountered.
 */
function unexpected(lexer: Lexer<*>, atToken?: ?Token): GraphQLError {
  const token = atToken || lexer.token;
  return syntaxError(
    lexer.source,
    token.start,
    `Unexpected ${getTokenDesc(token)}`,
  );
}

/**
 * Returns a possibly empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function any<T>(
  lexer: Lexer<*>,
  openKind: TokenKindEnum,
  parseFn: (lexer: Lexer<*>) => T,
  closeKind: TokenKindEnum,
): Array<T> {
  expectToken(lexer, openKind);
  const nodes = [];
  while (!expectOptionalToken(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}

/**
 * Returns a non-empty list of parse nodes, determined by
 * the parseFn. This list begins with a lex token of openKind
 * and ends with a lex token of closeKind. Advances the parser
 * to the next lex token after the closing token.
 */
function many<T>(
  lexer: Lexer<*>,
  openKind: TokenKindEnum,
  parseFn: (lexer: Lexer<*>) => T,
  closeKind: TokenKindEnum,
): Array<T> {
  expectToken(lexer, openKind);
  const nodes = [parseFn(lexer)];
  while (!expectOptionalToken(lexer, closeKind)) {
    nodes.push(parseFn(lexer));
  }
  return nodes;
}
