import { URISchemeHandler, URIComponents, URIOptions } from "../uri";
import { URNComponents } from "./urn";
import { SCHEMES } from "../uri";

export interface UUIDComponents extends URNComponents {
	uuid?: string;
}

const UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
const UUID_PARSE = /^[0-9A-Fa-f\-]{36}/;

//RFC 4122
const handler:URISchemeHandler<UUIDComponents, URIOptions, URNComponents> = {
	scheme : "urn:uuid",

	parse : function (urnComponents:URNComponents, options:URIOptions):UUIDComponents {
		const uuidComponents = urnComponents as UUIDComponents;
		uuidComponents.uuid = uuidComponents.nss;
		uuidComponents.nss = undefined;

		if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
			uuidComponents.error = uuidComponents.error || "UUID is not valid.";
		}

		return uuidComponents;
	},

	serialize : function (uuidComponents:UUIDComponents, options:URIOptions):URNComponents {
		const urnComponents = uuidComponents as URNComponents;
		//normalize UUID
		urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
		return urnComponents;
	},
};

export default handler;