import { TypeDefinitionNode, DirectiveDefinitionNode } from 'graphql';
export declare type ValidDefinitionNode = DirectiveDefinitionNode | TypeDefinitionNode;
export interface DefinitionMap {
    [key: string]: ValidDefinitionNode;
}
/**
 * Post processing of all imported type definitions. Loops over each of the
 * imported type definitions, and processes it using collectNewTypeDefinitions.
 *
 * @param allDefinitions All definitions from all schemas
 * @param definitionPool Current definitions (from first schema)
 * @param newTypeDefinitions All imported definitions
 * @returns Final collection of type definitions for the resulting schema
 */
export declare function completeDefinitionPool(allDefinitions: ValidDefinitionNode[], definitionPool: ValidDefinitionNode[], newTypeDefinitions: ValidDefinitionNode[]): ValidDefinitionNode[];
