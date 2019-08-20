import {
  FieldNode,
  FragmentDefinitionNode,
  GraphQLResolveInfo,
  InlineFragmentNode,
  GraphQLOutputType,
} from 'graphql';

export type ProjectionNode = { [fieldName: string]: any };
export type ProjectionType = {
  [fieldName: string]: any;
};

export function getProjectionFromAST(
  info: GraphQLResolveInfo,
  fieldNode?: FieldNode | InlineFragmentNode | FragmentDefinitionNode
): ProjectionType;

export function getFlatProjectionFromAST(
  info: GraphQLResolveInfo,
  fieldNodes?: FieldNode | InlineFragmentNode | FragmentDefinitionNode
): { [key: string]: boolean };

export function extendByFieldProjection(
  returnType: GraphQLOutputType,
  projection: ProjectionType
): ProjectionType;
