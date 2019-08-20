import { GraphQLClient } from 'graphql-request';
import { GraphQLSchema } from 'graphql';
import { IntrospectionResult } from '../../types';
export declare type GraphQLConfigEnpointsSubscription = {
    url: string;
    connectionParams?: {
        [name: string]: string | undefined;
    };
};
export declare type GraphQLConfigEnpointConfig = {
    url: string;
    headers?: {
        [name: string]: string;
    };
    subscription?: GraphQLConfigEnpointsSubscription;
};
export declare type GraphQLConfigEnpointsMapData = {
    [env: string]: GraphQLConfigEnpointConfig | string;
};
export declare type GraphQLConfigEnpointsMap = {
    [env: string]: GraphQLConfigEnpointConfig | GraphQLEndpoint;
};
export declare type GraphQLConfigEnpointsData = GraphQLConfigEnpointsMapData;
export declare class GraphQLEndpointsExtension {
    raw: GraphQLConfigEnpointsMapData;
    private configPath;
    constructor(endpointConfig: GraphQLConfigEnpointsMapData, configPath: string);
    getRawEndpointsMap(): GraphQLConfigEnpointsMap;
    getEnvVarsForEndpoint(endpointName: string): {
        [name: string]: string | null;
    };
    getEndpoint(endpointName: string, env?: {
        [name: string]: string | undefined;
    }): GraphQLEndpoint;
    private getRawEndpoint(endpointName?);
}
export declare class GraphQLEndpoint {
    url: string;
    headers: {
        [name: string]: string;
    };
    subscription: GraphQLConfigEnpointsSubscription;
    constructor(resolvedConfig: GraphQLConfigEnpointConfig);
    getClient(clientOptions?: any): GraphQLClient;
    resolveIntrospection(): Promise<IntrospectionResult>;
    resolveSchema(): Promise<GraphQLSchema>;
    resolveSchemaSDL(): Promise<string>;
}
