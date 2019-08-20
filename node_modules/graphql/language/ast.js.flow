// @flow strict

import { type Source } from './source';
import { type TokenKindEnum } from './tokenKind';

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
export type Location = {
  /**
   * The character offset at which this Node begins.
   */
  +start: number,

  /**
   * The character offset at which this Node ends.
   */
  +end: number,

  /**
   * The Token at which this Node begins.
   */
  +startToken: Token,

  /**
   * The Token at which this Node ends.
   */
  +endToken: Token,

  /**
   * The Source document the AST represents.
   */
  +source: Source,

  ...
};

/**
 * Represents a range of characters represented by a lexical token
 * within a Source.
 */
export type Token = {
  /**
   * The kind of Token.
   */
  +kind: TokenKindEnum,

  /**
   * The character offset at which this Node begins.
   */
  +start: number,

  /**
   * The character offset at which this Node ends.
   */
  +end: number,

  /**
   * The 1-indexed line number on which this Token appears.
   */
  +line: number,

  /**
   * The 1-indexed column number at which this Token begins.
   */
  +column: number,

  /**
   * For non-punctuation tokens, represents the interpreted value of the token.
   */
  +value: string | void,

  /**
   * Tokens exist as nodes in a double-linked-list amongst all tokens
   * including ignored tokens. <SOF> is always the first node and <EOF>
   * the last.
   */
  +prev: Token | null,
  +next: Token | null,

  ...
};

/**
 * The list of all possible AST node types.
 */
export type ASTNode =
  | NameNode
  | DocumentNode
  | OperationDefinitionNode
  | VariableDefinitionNode
  | VariableNode
  | SelectionSetNode
  | FieldNode
  | ArgumentNode
  | FragmentSpreadNode
  | InlineFragmentNode
  | FragmentDefinitionNode
  | IntValueNode
  | FloatValueNode
  | StringValueNode
  | BooleanValueNode
  | NullValueNode
  | EnumValueNode
  | ListValueNode
  | ObjectValueNode
  | ObjectFieldNode
  | DirectiveNode
  | NamedTypeNode
  | ListTypeNode
  | NonNullTypeNode
  | SchemaDefinitionNode
  | OperationTypeDefinitionNode
  | ScalarTypeDefinitionNode
  | ObjectTypeDefinitionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | InterfaceTypeDefinitionNode
  | UnionTypeDefinitionNode
  | EnumTypeDefinitionNode
  | EnumValueDefinitionNode
  | InputObjectTypeDefinitionNode
  | DirectiveDefinitionNode
  | SchemaExtensionNode
  | ScalarTypeExtensionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode
  | UnionTypeExtensionNode
  | EnumTypeExtensionNode
  | InputObjectTypeExtensionNode;

/**
 * Utility type listing all nodes indexed by their kind.
 */
export type ASTKindToNode = {|
  Name: NameNode,
  Document: DocumentNode,
  OperationDefinition: OperationDefinitionNode,
  VariableDefinition: VariableDefinitionNode,
  Variable: VariableNode,
  SelectionSet: SelectionSetNode,
  Field: FieldNode,
  Argument: ArgumentNode,
  FragmentSpread: FragmentSpreadNode,
  InlineFragment: InlineFragmentNode,
  FragmentDefinition: FragmentDefinitionNode,
  IntValue: IntValueNode,
  FloatValue: FloatValueNode,
  StringValue: StringValueNode,
  BooleanValue: BooleanValueNode,
  NullValue: NullValueNode,
  EnumValue: EnumValueNode,
  ListValue: ListValueNode,
  ObjectValue: ObjectValueNode,
  ObjectField: ObjectFieldNode,
  Directive: DirectiveNode,
  NamedType: NamedTypeNode,
  ListType: ListTypeNode,
  NonNullType: NonNullTypeNode,
  SchemaDefinition: SchemaDefinitionNode,
  OperationTypeDefinition: OperationTypeDefinitionNode,
  ScalarTypeDefinition: ScalarTypeDefinitionNode,
  ObjectTypeDefinition: ObjectTypeDefinitionNode,
  FieldDefinition: FieldDefinitionNode,
  InputValueDefinition: InputValueDefinitionNode,
  InterfaceTypeDefinition: InterfaceTypeDefinitionNode,
  UnionTypeDefinition: UnionTypeDefinitionNode,
  EnumTypeDefinition: EnumTypeDefinitionNode,
  EnumValueDefinition: EnumValueDefinitionNode,
  InputObjectTypeDefinition: InputObjectTypeDefinitionNode,
  DirectiveDefinition: DirectiveDefinitionNode,
  SchemaExtension: SchemaExtensionNode,
  ScalarTypeExtension: ScalarTypeExtensionNode,
  ObjectTypeExtension: ObjectTypeExtensionNode,
  InterfaceTypeExtension: InterfaceTypeExtensionNode,
  UnionTypeExtension: UnionTypeExtensionNode,
  EnumTypeExtension: EnumTypeExtensionNode,
  InputObjectTypeExtension: InputObjectTypeExtensionNode,
|};

// Name

export type NameNode = {
  +kind: 'Name',
  +loc?: Location,
  +value: string,
  ...
};

// Document

export type DocumentNode = {
  +kind: 'Document',
  +loc?: Location,
  +definitions: $ReadOnlyArray<DefinitionNode>,
  ...
};

export type DefinitionNode =
  | ExecutableDefinitionNode
  | TypeSystemDefinitionNode
  | TypeSystemExtensionNode;

export type ExecutableDefinitionNode =
  | OperationDefinitionNode
  | FragmentDefinitionNode;

export type OperationDefinitionNode = {
  +kind: 'OperationDefinition',
  +loc?: Location,
  +operation: OperationTypeNode,
  +name?: NameNode,
  +variableDefinitions?: $ReadOnlyArray<VariableDefinitionNode>,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +selectionSet: SelectionSetNode,
  ...
};

export type OperationTypeNode = 'query' | 'mutation' | 'subscription';

export type VariableDefinitionNode = {
  +kind: 'VariableDefinition',
  +loc?: Location,
  +variable: VariableNode,
  +type: TypeNode,
  +defaultValue?: ValueNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type VariableNode = {
  +kind: 'Variable',
  +loc?: Location,
  +name: NameNode,
  ...
};

export type SelectionSetNode = {
  kind: 'SelectionSet',
  loc?: Location,
  selections: $ReadOnlyArray<SelectionNode>,
  ...
};

export type SelectionNode = FieldNode | FragmentSpreadNode | InlineFragmentNode;

export type FieldNode = {
  +kind: 'Field',
  +loc?: Location,
  +alias?: NameNode,
  +name: NameNode,
  +arguments?: $ReadOnlyArray<ArgumentNode>,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +selectionSet?: SelectionSetNode,
  ...
};

export type ArgumentNode = {
  +kind: 'Argument',
  +loc?: Location,
  +name: NameNode,
  +value: ValueNode,
  ...
};

// Fragments

export type FragmentSpreadNode = {
  +kind: 'FragmentSpread',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type InlineFragmentNode = {
  +kind: 'InlineFragment',
  +loc?: Location,
  +typeCondition?: NamedTypeNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +selectionSet: SelectionSetNode,
  ...
};

export type FragmentDefinitionNode = {
  +kind: 'FragmentDefinition',
  +loc?: Location,
  +name: NameNode,
  // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  +variableDefinitions?: $ReadOnlyArray<VariableDefinitionNode>,
  +typeCondition: NamedTypeNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +selectionSet: SelectionSetNode,
  ...
};

// Values

export type ValueNode =
  | VariableNode
  | IntValueNode
  | FloatValueNode
  | StringValueNode
  | BooleanValueNode
  | NullValueNode
  | EnumValueNode
  | ListValueNode
  | ObjectValueNode;

export type IntValueNode = {
  +kind: 'IntValue',
  +loc?: Location,
  +value: string,
  ...
};

export type FloatValueNode = {
  +kind: 'FloatValue',
  +loc?: Location,
  +value: string,
  ...
};

export type StringValueNode = {
  +kind: 'StringValue',
  +loc?: Location,
  +value: string,
  +block?: boolean,
  ...
};

export type BooleanValueNode = {
  +kind: 'BooleanValue',
  +loc?: Location,
  +value: boolean,
  ...
};

export type NullValueNode = {
  +kind: 'NullValue',
  +loc?: Location,
  ...
};

export type EnumValueNode = {
  +kind: 'EnumValue',
  +loc?: Location,
  +value: string,
  ...
};

export type ListValueNode = {
  +kind: 'ListValue',
  +loc?: Location,
  +values: $ReadOnlyArray<ValueNode>,
  ...
};

export type ObjectValueNode = {
  +kind: 'ObjectValue',
  +loc?: Location,
  +fields: $ReadOnlyArray<ObjectFieldNode>,
  ...
};

export type ObjectFieldNode = {
  +kind: 'ObjectField',
  +loc?: Location,
  +name: NameNode,
  +value: ValueNode,
  ...
};

// Directives

export type DirectiveNode = {
  +kind: 'Directive',
  +loc?: Location,
  +name: NameNode,
  +arguments?: $ReadOnlyArray<ArgumentNode>,
  ...
};

// Type Reference

export type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

export type NamedTypeNode = {
  +kind: 'NamedType',
  +loc?: Location,
  +name: NameNode,
  ...
};

export type ListTypeNode = {
  +kind: 'ListType',
  +loc?: Location,
  +type: TypeNode,
  ...
};

export type NonNullTypeNode = {
  +kind: 'NonNullType',
  +loc?: Location,
  +type: NamedTypeNode | ListTypeNode,
  ...
};

// Type System Definition

export type TypeSystemDefinitionNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | DirectiveDefinitionNode;

export type SchemaDefinitionNode = {
  +kind: 'SchemaDefinition',
  +loc?: Location,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +operationTypes: $ReadOnlyArray<OperationTypeDefinitionNode>,
  ...
};

export type OperationTypeDefinitionNode = {
  +kind: 'OperationTypeDefinition',
  +loc?: Location,
  +operation: OperationTypeNode,
  +type: NamedTypeNode,
  ...
};

// Type Definition

export type TypeDefinitionNode =
  | ScalarTypeDefinitionNode
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | UnionTypeDefinitionNode
  | EnumTypeDefinitionNode
  | InputObjectTypeDefinitionNode;

export type ScalarTypeDefinitionNode = {
  +kind: 'ScalarTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type ObjectTypeDefinitionNode = {
  +kind: 'ObjectTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +interfaces?: $ReadOnlyArray<NamedTypeNode>,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<FieldDefinitionNode>,
  ...
};

export type FieldDefinitionNode = {
  +kind: 'FieldDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +arguments?: $ReadOnlyArray<InputValueDefinitionNode>,
  +type: TypeNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type InputValueDefinitionNode = {
  +kind: 'InputValueDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +type: TypeNode,
  +defaultValue?: ValueNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type InterfaceTypeDefinitionNode = {
  +kind: 'InterfaceTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<FieldDefinitionNode>,
  ...
};

export type UnionTypeDefinitionNode = {
  +kind: 'UnionTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +types?: $ReadOnlyArray<NamedTypeNode>,
  ...
};

export type EnumTypeDefinitionNode = {
  +kind: 'EnumTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +values?: $ReadOnlyArray<EnumValueDefinitionNode>,
  ...
};

export type EnumValueDefinitionNode = {
  +kind: 'EnumValueDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type InputObjectTypeDefinitionNode = {
  +kind: 'InputObjectTypeDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<InputValueDefinitionNode>,
  ...
};

// Directive Definitions

export type DirectiveDefinitionNode = {
  +kind: 'DirectiveDefinition',
  +loc?: Location,
  +description?: StringValueNode,
  +name: NameNode,
  +arguments?: $ReadOnlyArray<InputValueDefinitionNode>,
  +repeatable: boolean,
  +locations: $ReadOnlyArray<NameNode>,
  ...
};

// Type System Extensions

export type TypeSystemExtensionNode = SchemaExtensionNode | TypeExtensionNode;

export type SchemaExtensionNode = {
  +kind: 'SchemaExtension',
  +loc?: Location,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +operationTypes?: $ReadOnlyArray<OperationTypeDefinitionNode>,
  ...
};

// Type Extensions

export type TypeExtensionNode =
  | ScalarTypeExtensionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode
  | UnionTypeExtensionNode
  | EnumTypeExtensionNode
  | InputObjectTypeExtensionNode;

export type ScalarTypeExtensionNode = {
  +kind: 'ScalarTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  ...
};

export type ObjectTypeExtensionNode = {
  +kind: 'ObjectTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +interfaces?: $ReadOnlyArray<NamedTypeNode>,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<FieldDefinitionNode>,
  ...
};

export type InterfaceTypeExtensionNode = {
  +kind: 'InterfaceTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<FieldDefinitionNode>,
  ...
};

export type UnionTypeExtensionNode = {
  +kind: 'UnionTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +types?: $ReadOnlyArray<NamedTypeNode>,
  ...
};

export type EnumTypeExtensionNode = {
  +kind: 'EnumTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +values?: $ReadOnlyArray<EnumValueDefinitionNode>,
  ...
};

export type InputObjectTypeExtensionNode = {
  +kind: 'InputObjectTypeExtension',
  +loc?: Location,
  +name: NameNode,
  +directives?: $ReadOnlyArray<DirectiveNode>,
  +fields?: $ReadOnlyArray<InputValueDefinitionNode>,
  ...
};
