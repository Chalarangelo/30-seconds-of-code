/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class WebEnvironmentPlugin {
	constructor(inputFileSystem, outputFileSystem) {
		this.inputFileSystem = inputFileSystem;
		this.outputFileSystem = outputFileSystem;
	}

	apply(compiler) {
		compiler.outputFileSystem = this.outputFileSystem;
	}
}

module.exports = WebEnvironmentPlugin;
