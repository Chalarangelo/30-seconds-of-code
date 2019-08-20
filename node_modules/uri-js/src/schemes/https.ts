import { URISchemeHandler, URIComponents, URIOptions } from "../uri";
import http from "./http";

const handler:URISchemeHandler = {
	scheme : "https",
	domainHost : http.domainHost,
	parse : http.parse,
	serialize : http.serialize
}

export default handler;