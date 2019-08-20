import { GraphQLError, Headers as HttpHeaders, Options, Variables } from './types';
export { ClientError } from './types';
import 'cross-fetch/polyfill';
export declare class GraphQLClient {
    private url;
    private options;
    constructor(url: string, options?: Options);
    rawRequest<T extends any>(query: string, variables?: Variables): Promise<{
        data?: T;
        extensions?: any;
        headers: Headers;
        status: number;
        errors?: GraphQLError[];
    }>;
    request<T extends any>(query: string, variables?: Variables): Promise<T>;
    setHeaders(headers: HttpHeaders): GraphQLClient;
    setHeader(key: string, value: string): GraphQLClient;
}
export declare function rawRequest<T extends any>(url: string, query: string, variables?: Variables): Promise<{
    data?: T;
    extensions?: any;
    headers: Headers;
    status: number;
    errors?: GraphQLError[];
}>;
export declare function request<T extends any>(url: string, query: string, variables?: Variables): Promise<T>;
export default request;
