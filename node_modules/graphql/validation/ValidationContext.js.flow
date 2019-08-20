// @flow strict

import { type ObjMap } from '../jsutils/ObjMap';
import { type GraphQLError } from '../error/GraphQLError';
import { type ASTVisitor, visit, visitWithTypeInfo } from '../language/visitor';
import { Kind } from '../language/kinds';
import {
  type DocumentNode,
  type OperationDefinitionNode,
  type VariableNode,
  type SelectionSetNode,
  type FragmentSpreadNode,
  type FragmentDefinitionNode,
} from '../language/ast';
import { type GraphQLSchema } from '../type/schema';
import {
  type GraphQLInputType,
  type GraphQLOutputType,
  type GraphQLCompositeType,
  type GraphQLField,
  type GraphQLArgument,
} from '../type/definition';
import { type GraphQLDirective } from '../type/directives';
import { TypeInfo } from '../utilities/TypeInfo';

type NodeWithSelectionSet = OperationDefinitionNode | FragmentDefinitionNode;
type VariableUsage = {|
  +node: VariableNode,
  +type: ?GraphQLInputType,
  +defaultValue: ?mixed,
|};

/**
 * An instance of this class is passed as the "this" context to all validators,
 * allowing access to commonly useful contextual information from within a
 * validation rule.
 */
export class ASTValidationContext {
  _ast: DocumentNode;
  _errors: Array<GraphQLError>;
  _fragments: ?ObjMap<FragmentDefinitionNode>;
  _fragmentSpreads: Map<SelectionSetNode, $ReadOnlyArray<FragmentSpreadNode>>;
  _recursivelyReferencedFragments: Map<
    OperationDefinitionNode,
    $ReadOnlyArray<FragmentDefinitionNode>,
  >;

  constructor(ast: DocumentNode): void {
    this._ast = ast;
    this._errors = [];
    this._fragments = undefined;
    this._fragmentSpreads = new Map();
    this._recursivelyReferencedFragments = new Map();
  }

  reportError(error: GraphQLError): void {
    this._errors.push(error);
  }

  getErrors(): $ReadOnlyArray<GraphQLError> {
    return this._errors;
  }

  getDocument(): DocumentNode {
    return this._ast;
  }

  getFragment(name: string): ?FragmentDefinitionNode {
    let fragments = this._fragments;
    if (!fragments) {
      this._fragments = fragments = this.getDocument().definitions.reduce(
        (frags, statement) => {
          if (statement.kind === Kind.FRAGMENT_DEFINITION) {
            frags[statement.name.value] = statement;
          }
          return frags;
        },
        Object.create(null),
      );
    }
    return fragments[name];
  }

  getFragmentSpreads(
    node: SelectionSetNode,
  ): $ReadOnlyArray<FragmentSpreadNode> {
    let spreads = this._fragmentSpreads.get(node);
    if (!spreads) {
      spreads = [];
      const setsToVisit: Array<SelectionSetNode> = [node];
      while (setsToVisit.length !== 0) {
        const set = setsToVisit.pop();
        for (const selection of set.selections) {
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }
      this._fragmentSpreads.set(node, spreads);
    }
    return spreads;
  }

  getRecursivelyReferencedFragments(
    operation: OperationDefinitionNode,
  ): $ReadOnlyArray<FragmentDefinitionNode> {
    let fragments = this._recursivelyReferencedFragments.get(operation);
    if (!fragments) {
      fragments = [];
      const collectedNames = Object.create(null);
      const nodesToVisit: Array<SelectionSetNode> = [operation.selectionSet];
      while (nodesToVisit.length !== 0) {
        const node = nodesToVisit.pop();
        for (const spread of this.getFragmentSpreads(node)) {
          const fragName = spread.name.value;
          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            const fragment = this.getFragment(fragName);
            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }
      this._recursivelyReferencedFragments.set(operation, fragments);
    }
    return fragments;
  }
}

export type ASTValidationRule = ASTValidationContext => ASTVisitor;

export class SDLValidationContext extends ASTValidationContext {
  _schema: ?GraphQLSchema;

  constructor(ast: DocumentNode, schema?: ?GraphQLSchema): void {
    super(ast);
    this._schema = schema;
  }

  getSchema(): ?GraphQLSchema {
    return this._schema;
  }
}

export type SDLValidationRule = SDLValidationContext => ASTVisitor;

export class ValidationContext extends ASTValidationContext {
  _schema: GraphQLSchema;
  _typeInfo: TypeInfo;
  _variableUsages: Map<NodeWithSelectionSet, $ReadOnlyArray<VariableUsage>>;
  _recursiveVariableUsages: Map<
    OperationDefinitionNode,
    $ReadOnlyArray<VariableUsage>,
  >;

  constructor(
    schema: GraphQLSchema,
    ast: DocumentNode,
    typeInfo: TypeInfo,
  ): void {
    super(ast);
    this._schema = schema;
    this._typeInfo = typeInfo;
    this._variableUsages = new Map();
    this._recursiveVariableUsages = new Map();
  }

  getSchema(): GraphQLSchema {
    return this._schema;
  }

  getVariableUsages(node: NodeWithSelectionSet): $ReadOnlyArray<VariableUsage> {
    let usages = this._variableUsages.get(node);
    if (!usages) {
      const newUsages = [];
      const typeInfo = new TypeInfo(this._schema);
      visit(
        node,
        visitWithTypeInfo(typeInfo, {
          VariableDefinition: () => false,
          Variable(variable) {
            newUsages.push({
              node: variable,
              type: typeInfo.getInputType(),
              defaultValue: typeInfo.getDefaultValue(),
            });
          },
        }),
      );
      usages = newUsages;
      this._variableUsages.set(node, usages);
    }
    return usages;
  }

  getRecursiveVariableUsages(
    operation: OperationDefinitionNode,
  ): $ReadOnlyArray<VariableUsage> {
    let usages = this._recursiveVariableUsages.get(operation);
    if (!usages) {
      usages = this.getVariableUsages(operation);
      for (const frag of this.getRecursivelyReferencedFragments(operation)) {
        usages = usages.concat(this.getVariableUsages(frag));
      }
      this._recursiveVariableUsages.set(operation, usages);
    }
    return usages;
  }

  getType(): ?GraphQLOutputType {
    return this._typeInfo.getType();
  }

  getParentType(): ?GraphQLCompositeType {
    return this._typeInfo.getParentType();
  }

  getInputType(): ?GraphQLInputType {
    return this._typeInfo.getInputType();
  }

  getParentInputType(): ?GraphQLInputType {
    return this._typeInfo.getParentInputType();
  }

  getFieldDef(): ?GraphQLField<*, *> {
    return this._typeInfo.getFieldDef();
  }

  getDirective(): ?GraphQLDirective {
    return this._typeInfo.getDirective();
  }

  getArgument(): ?GraphQLArgument {
    return this._typeInfo.getArgument();
  }
}

export type ValidationRule = ValidationContext => ASTVisitor;
