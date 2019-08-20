import { GraphQLSchema } from 'graphql';
import { IntrospectionResult, GraphQLResolvedConfigData, GraphQLConfigData, GraphQLConfigExtensions } from './types';
import { GraphQLEndpointsExtension } from './extensions';
export declare class GraphQLProjectConfig {
    config: GraphQLResolvedConfigData;
    configPath: string;
    projectName?: string;
    constructor(config: GraphQLConfigData, configPath: string, projectName?: string);
    resolveConfigPath(relativePath: string): string;
    includesFile(fileUri: string): boolean;
    getSchema(): GraphQLSchema;
    resolveIntrospection(): Promise<IntrospectionResult>;
    getSchemaSDL(): string;
    readonly configDir: string;
    readonly schemaPath: string | null;
    readonly includes: string[];
    readonly excludes: string[];
    readonly extensions: GraphQLConfigExtensions;
    readonly endpointsExtension: GraphQLEndpointsExtension | null;
}
