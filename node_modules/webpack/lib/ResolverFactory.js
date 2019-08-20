/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Tobias Koppers @sokra
 */
"use strict";

const { Tapable, HookMap, SyncHook, SyncWaterfallHook } = require("tapable");
const Factory = require("enhanced-resolve").ResolverFactory;

/** @typedef {import("enhanced-resolve").Resolver} Resolver */

module.exports = class ResolverFactory extends Tapable {
	constructor() {
		super();
		this.hooks = {
			resolveOptions: new HookMap(
				() => new SyncWaterfallHook(["resolveOptions"])
			),
			resolver: new HookMap(() => new SyncHook(["resolver", "resolveOptions"]))
		};
		this._pluginCompat.tap("ResolverFactory", options => {
			let match;
			match = /^resolve-options (.+)$/.exec(options.name);
			if (match) {
				this.hooks.resolveOptions.tap(
					match[1],
					options.fn.name || "unnamed compat plugin",
					options.fn
				);
				return true;
			}
			match = /^resolver (.+)$/.exec(options.name);
			if (match) {
				this.hooks.resolver.tap(
					match[1],
					options.fn.name || "unnamed compat plugin",
					options.fn
				);
				return true;
			}
		});
		this.cache1 = new WeakMap();
		this.cache2 = new Map();
	}

	get(type, resolveOptions) {
		const cachedResolver = this.cache1.get(resolveOptions);
		if (cachedResolver) return cachedResolver();
		const ident = `${type}|${JSON.stringify(resolveOptions)}`;
		const resolver = this.cache2.get(ident);
		if (resolver) return resolver;
		const newResolver = this._create(type, resolveOptions);
		this.cache2.set(ident, newResolver);
		return newResolver;
	}

	_create(type, resolveOptions) {
		const originalResolveOptions = Object.assign({}, resolveOptions);
		resolveOptions = this.hooks.resolveOptions.for(type).call(resolveOptions);
		const resolver = Factory.createResolver(resolveOptions);
		if (!resolver) {
			throw new Error("No resolver created");
		}
		/** @type {Map<Object, Resolver>} */
		const childCache = new Map();
		resolver.withOptions = options => {
			const cacheEntry = childCache.get(options);
			if (cacheEntry !== undefined) return cacheEntry;
			const mergedOptions = Object.assign({}, originalResolveOptions, options);
			const resolver = this.get(type, mergedOptions);
			childCache.set(options, resolver);
			return resolver;
		};
		this.hooks.resolver.for(type).call(resolver, resolveOptions);
		return resolver;
	}
};
