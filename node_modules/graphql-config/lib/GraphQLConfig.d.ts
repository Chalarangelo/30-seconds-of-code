import { GraphQLConfigData } from './types';
import { GraphQLProjectConfig } from './GraphQLProjectConfig';
export declare class GraphQLConfig {
    config: GraphQLConfigData;
    configPath: string;
    constructor(config: GraphQLConfigData, configPath: string);
    readonly configDir: string;
    getProjectConfig(projectName?: string): GraphQLProjectConfig;
    getConfigForFile(filePath: string): GraphQLProjectConfig | undefined;
    getProjectNameForFile(filePath: string): string | undefined;
    getProjects(): {
        [name: string]: GraphQLProjectConfig;
    } | undefined;
    saveConfig(newConfig: GraphQLConfigData, projectName?: string): void;
}
