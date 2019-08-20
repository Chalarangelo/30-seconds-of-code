export interface RollupError {
    message: string;
    code?: string;
    name?: string;
    url?: string;
    id?: string;
    loc?: {
        file?: string;
        line: number;
        column: number;
    };
    stack?: string;
    frame?: string;
    pos?: number;
    plugin?: string;
    pluginCode?: string;
}
export default function error(props: Error | RollupError): void;
