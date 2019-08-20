/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ResolverFactory = require("./ResolverFactory");

const NodeJsInputFileSystem = require("./NodeJsInputFileSystem");
const CachedInputFileSystem = require("./CachedInputFileSystem");

const nodeFileSystem = new CachedInputFileSystem(new NodeJsInputFileSystem(), 4000);

const nodeContext = {
	environments: [
		"node+es3+es5+process+native"
	]
};

const asyncResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	fileSystem: nodeFileSystem
});
module.exports = function resolve(context, path, request, resolveContext, callback) {
	if(typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if(typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncResolver.resolve(context, path, request, resolveContext, callback);
};

const syncResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.sync = function resolveSync(context, path, request) {
	if(typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncResolver.resolveSync(context, path, request);
};

const asyncContextResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	resolveToContext: true,
	fileSystem: nodeFileSystem
});
module.exports.context = function resolveContext(context, path, request, resolveContext, callback) {
	if(typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if(typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncContextResolver.resolve(context, path, request, resolveContext, callback);
};

const syncContextResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	resolveToContext: true,
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.context.sync = function resolveContextSync(context, path, request) {
	if(typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncContextResolver.resolveSync(context, path, request);
};

const asyncLoaderResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	moduleExtensions: ["-loader"],
	mainFields: ["loader", "main"],
	fileSystem: nodeFileSystem
});
module.exports.loader = function resolveLoader(context, path, request, resolveContext, callback) {
	if(typeof context === "string") {
		callback = resolveContext;
		resolveContext = request;
		request = path;
		path = context;
		context = nodeContext;
	}
	if(typeof callback !== "function") {
		callback = resolveContext;
	}
	asyncLoaderResolver.resolve(context, path, request, resolveContext, callback);
};

const syncLoaderResolver = ResolverFactory.createResolver({
	extensions: [".js", ".json", ".node"],
	moduleExtensions: ["-loader"],
	mainFields: ["loader", "main"],
	useSyncFileSystemCalls: true,
	fileSystem: nodeFileSystem
});
module.exports.loader.sync = function resolveLoaderSync(context, path, request) {
	if(typeof context === "string") {
		request = path;
		path = context;
		context = nodeContext;
	}
	return syncLoaderResolver.resolveSync(context, path, request);
};

module.exports.create = function create(options) {
	options = Object.assign({
		fileSystem: nodeFileSystem
	}, options);
	const resolver = ResolverFactory.createResolver(options);
	return function(context, path, request, resolveContext, callback) {
		if(typeof context === "string") {
			callback = resolveContext;
			resolveContext = request;
			request = path;
			path = context;
			context = nodeContext;
		}
		if(typeof callback !== "function") {
			callback = resolveContext;
		}
		resolver.resolve(context, path, request, resolveContext, callback);
	};
};

module.exports.create.sync = function createSync(options) {
	options = Object.assign({
		useSyncFileSystemCalls: true,
		fileSystem: nodeFileSystem
	}, options);
	const resolver = ResolverFactory.createResolver(options);
	return function(context, path, request) {
		if(typeof context === "string") {
			request = path;
			path = context;
			context = nodeContext;
		}
		return resolver.resolveSync(context, path, request);
	};
};

// Export Resolver, FileSystems and Plugins
module.exports.ResolverFactory = ResolverFactory;

module.exports.NodeJsInputFileSystem = NodeJsInputFileSystem;
module.exports.CachedInputFileSystem = CachedInputFileSystem;
