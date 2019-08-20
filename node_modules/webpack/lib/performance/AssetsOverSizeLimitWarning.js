/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Sean Larkin @thelarkinn
*/
"use strict";

const WebpackError = require("../WebpackError");
const SizeFormatHelpers = require("../SizeFormatHelpers");

module.exports = class AssetsOverSizeLimitWarning extends WebpackError {
	constructor(assetsOverSizeLimit, assetLimit) {
		const assetLists = assetsOverSizeLimit
			.map(
				asset =>
					`\n  ${asset.name} (${SizeFormatHelpers.formatSize(asset.size)})`
			)
			.join("");

		super(`asset size limit: The following asset(s) exceed the recommended size limit (${SizeFormatHelpers.formatSize(
			assetLimit
		)}).
This can impact web performance.
Assets: ${assetLists}`);

		this.name = "AssetsOverSizeLimitWarning";
		this.assets = assetsOverSizeLimit;

		Error.captureStackTrace(this, this.constructor);
	}
};
