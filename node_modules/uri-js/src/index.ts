import { SCHEMES } from "./uri";

import http from "./schemes/http";
SCHEMES[http.scheme] = http;

import https from "./schemes/https";
SCHEMES[https.scheme] = https;

import mailto from "./schemes/mailto";
SCHEMES[mailto.scheme] = mailto;

import urn from "./schemes/urn";
SCHEMES[urn.scheme] = urn;

import uuid from "./schemes/urn-uuid";
SCHEMES[uuid.scheme] = uuid;

export * from "./uri";
