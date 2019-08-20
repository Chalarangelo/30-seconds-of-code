import { IntrospectionQuery } from 'graphql';
import { GraphQLConfigEnpointsData } from './extensions/';
export declare type IntrospectionResult = {
    data: IntrospectionQuery;
    extensions?: Object;
    errors?: any;
};
export declare type GraphQLConfigExtensions = {
    endpoints?: GraphQLConfigEnpointsData;
    [name: string]: any;
};
export declare type GraphQLResolvedConfigData = {
    schemaPath: string;
    includes?: Array<string>;
    excludes?: Array<string>;
    extensions?: GraphQLConfigExtensions;
};
export declare type GraphQLConfigData = GraphQLResolvedConfigData & {
    projects?: {
        [projectName: string]: GraphQLResolvedConfigData;
    };
};
