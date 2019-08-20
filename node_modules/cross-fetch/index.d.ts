declare const fet: typeof fetch;
declare const req: typeof Request;
declare const res: typeof Response;
declare const headers: typeof Headers;

declare module "cross-fetch" {
  export const fetch: typeof fet;
  export const Request: typeof req;
  export const Response: typeof res;
  export const Headers: typeof headers;
  export default fetch;
}
