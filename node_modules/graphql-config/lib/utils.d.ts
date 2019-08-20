import { GraphQLSchema, IntrospectionQuery } from 'graphql';
import { GraphQLConfigData, IntrospectionResult } from './types';
export declare function readConfig(configPath: string): GraphQLConfigData;
export declare function writeConfig(configPath: string, config: GraphQLConfigData): void;
export declare function normalizeGlob(glob: string): string;
export declare function matchesGlobs(filePath: string, configDir: string, globs?: string[]): boolean;
export declare function validateConfig(config: GraphQLConfigData): void;
export declare function mergeConfigs(dest: GraphQLConfigData, src: GraphQLConfigData): GraphQLConfigData;
export declare function schemaToIntrospection(schema: GraphQLSchema): Promise<IntrospectionResult>;
export declare function introspectionToSchema(introspection: IntrospectionResult | (IntrospectionQuery & {
    errors: undefined;
    data: undefined;
})): GraphQLSchema;
export declare function readSchema(path: any): GraphQLSchema;
export declare function writeSchema(path: string, schema: GraphQLSchema, schemaExtensions?: {
    [name: string]: string;
}): Promise<void>;
export declare function getSchemaExtensions(path: string): {
    [name: string]: string;
};
