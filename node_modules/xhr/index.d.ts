export type XhrCallback = (
  error: Error,
  response: XhrResponse,
  body: any
) => void;

export interface XhrResponse {
  body: Object | string;
  statusCode: number;
  method: string;
  headers: XhrHeaders;
  url: string;
  rawRequest: XMLHttpRequest;
}

export interface XhrHeaders {
  [key: string]: string;
}

export interface XhrBaseConfig {
  useXDR?: boolean;
  sync?: boolean;
  method?: 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT';
  timeout?: number;
  headers?: XhrHeaders;
  body?: string | any;
  json?: boolean;
  username?: string;
  password?: string;
  withCredentials?: boolean;
  responseType?: '' | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text';
  beforeSend?: (xhrObject: XMLHttpRequest) => void;
  xhr?: XMLHttpRequest;
}

export interface XhrUriConfig extends XhrBaseConfig {
  uri: string;
}

export interface XhrUrlConfig extends XhrBaseConfig {
  url: string;
}

export interface XhrInstance {
  (options: XhrUriConfig | XhrUrlConfig, callback: XhrCallback): any;
  (url: string, callback: XhrCallback): any;
  (url: string, options: XhrBaseConfig, callback: XhrCallback): any;
}

export interface XhrStatic extends XhrInstance {
  del: XhrInstance;
  get: XhrInstance;
  head: XhrInstance;
  patch: XhrInstance;
  post: XhrInstance;
  put: XhrInstance;
}

declare const Xhr: XhrStatic;

export default Xhr;
