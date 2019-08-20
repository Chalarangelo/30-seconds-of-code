import { Request, Response } from 'express';
import { MiddlewareOptions } from 'graphql-playground-html';
export declare type ExpressPlaygroundMiddleware = (req: Request, res: Response, next: () => void) => void;
export declare type Register = (options: MiddlewareOptions) => ExpressPlaygroundMiddleware;
declare const express: Register;
export default express;
