/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Gajus Kuizinas @gajus
*/
"use strict";

const Ajv = require("ajv");
const ajv = new Ajv({
	errorDataPath: "configuration",
	allErrors: true,
	verbose: true
});
require("ajv-keywords")(ajv, ["instanceof"]);
require("../schemas/ajv.absolutePath")(ajv);

const validateSchema = (schema, options) => {
	if (Array.isArray(options)) {
		const errors = options.map(options => validateObject(schema, options));
		errors.forEach((list, idx) => {
			const applyPrefix = err => {
				err.dataPath = `[${idx}]${err.dataPath}`;
				if (err.children) {
					err.children.forEach(applyPrefix);
				}
			};
			list.forEach(applyPrefix);
		});
		return errors.reduce((arr, items) => {
			return arr.concat(items);
		}, []);
	} else {
		return validateObject(schema, options);
	}
};

const validateObject = (schema, options) => {
	const validate = ajv.compile(schema);
	const valid = validate(options);
	return valid ? [] : filterErrors(validate.errors);
};

const filterErrors = errors => {
	let newErrors = [];
	for (const err of errors) {
		const dataPath = err.dataPath;
		let children = [];
		newErrors = newErrors.filter(oldError => {
			if (oldError.dataPath.includes(dataPath)) {
				if (oldError.children) {
					children = children.concat(oldError.children.slice(0));
				}
				oldError.children = undefined;
				children.push(oldError);
				return false;
			}
			return true;
		});
		if (children.length) {
			err.children = children;
		}
		newErrors.push(err);
	}

	return newErrors;
};

module.exports = validateSchema;
