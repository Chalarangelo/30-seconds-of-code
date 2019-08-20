"use strict";

var to_ascii = typeof atob == "undefined" ? function(b64) {
    return new Buffer(b64, "base64").toString();
} : atob;
var to_base64 = typeof btoa == "undefined" ? function(str) {
    return new Buffer(str).toString("base64");
} : btoa;

function read_source_map(name, code) {
    var match = /\n\/\/# sourceMappingURL=data:application\/json(;.*?)?;base64,(\S+)\s*$/.exec(code);
    if (!match) {
        AST_Node.warn("inline source map not found: " + name);
        return null;
    }
    return to_ascii(match[2]);
}

function parse_source_map(content) {
    try {
        return JSON.parse(content);
    } catch (ex) {
        throw new Error("invalid input source map: " + content);
    }
}

function set_shorthand(name, options, keys) {
    if (options[name]) {
        keys.forEach(function(key) {
            if (options[key]) {
                if (typeof options[key] != "object") options[key] = {};
                if (!(name in options[key])) options[key][name] = options[name];
            }
        });
    }
}

function init_cache(cache) {
    if (!cache) return;
    if (!("props" in cache)) {
        cache.props = new Dictionary();
    } else if (!(cache.props instanceof Dictionary)) {
        cache.props = Dictionary.fromObject(cache.props);
    }
}

function to_json(cache) {
    return {
        props: cache.props.toObject()
    };
}

function minify(files, options) {
    try {
        options = defaults(options, {
            compress: {},
            enclose: false,
            ie8: false,
            keep_fnames: false,
            mangle: {},
            nameCache: null,
            output: {},
            parse: {},
            rename: undefined,
            sourceMap: false,
            timings: false,
            toplevel: false,
            warnings: false,
            wrap: false,
        }, true);
        var timings = options.timings && {
            start: Date.now()
        };
        if (options.rename === undefined) {
            options.rename = options.compress && options.mangle;
        }
        set_shorthand("ie8", options, [ "compress", "mangle", "output" ]);
        set_shorthand("keep_fnames", options, [ "compress", "mangle" ]);
        set_shorthand("toplevel", options, [ "compress", "mangle" ]);
        var quoted_props;
        if (options.mangle) {
            options.mangle = defaults(options.mangle, {
                cache: options.nameCache && (options.nameCache.vars || {}),
                eval: false,
                ie8: false,
                keep_fnames: false,
                properties: false,
                reserved: [],
                toplevel: false,
            }, true);
            if (options.mangle.properties) {
                if (typeof options.mangle.properties != "object") {
                    options.mangle.properties = {};
                }
                if (options.mangle.properties.keep_quoted) {
                    quoted_props = options.mangle.properties.reserved;
                    if (!Array.isArray(quoted_props)) quoted_props = [];
                    options.mangle.properties.reserved = quoted_props;
                }
                if (options.nameCache && !("cache" in options.mangle.properties)) {
                    options.mangle.properties.cache = options.nameCache.props || {};
                }
            }
            init_cache(options.mangle.cache);
            init_cache(options.mangle.properties.cache);
        }
        if (options.sourceMap) {
            options.sourceMap = defaults(options.sourceMap, {
                content: null,
                filename: null,
                includeSources: false,
                root: null,
                url: null,
            }, true);
        }
        var warnings = [];
        if (options.warnings) AST_Node.log_function(function(warning) {
            warnings.push(warning);
        }, options.warnings == "verbose");
        if (timings) timings.parse = Date.now();
        var source_maps, toplevel;
        if (files instanceof AST_Toplevel) {
            toplevel = files;
        } else {
            if (typeof files == "string") {
                files = [ files ];
            }
            options.parse = options.parse || {};
            options.parse.toplevel = null;
            var source_map_content = options.sourceMap && options.sourceMap.content;
            if (typeof source_map_content == "string" && source_map_content != "inline") {
                source_map_content = parse_source_map(source_map_content);
            }
            source_maps = source_map_content && Object.create(null);
            for (var name in files) if (HOP(files, name)) {
                options.parse.filename = name;
                options.parse.toplevel = parse(files[name], options.parse);
                if (source_maps) {
                    if (source_map_content == "inline") {
                        var inlined_content = read_source_map(name, files[name]);
                        if (inlined_content) {
                            source_maps[name] = parse_source_map(inlined_content);
                        }
                    } else {
                        source_maps[name] = source_map_content;
                    }
                }
            }
            toplevel = options.parse.toplevel;
        }
        if (quoted_props) {
            reserve_quoted_keys(toplevel, quoted_props);
        }
        [ "enclose", "wrap" ].forEach(function(action) {
            var option = options[action];
            if (!option) return;
            var orig = toplevel.print_to_string().slice(0, -1);
            toplevel = toplevel[action](option);
            files[toplevel.start.file] = toplevel.print_to_string().replace(orig, "");
        });
        if (timings) timings.rename = Date.now();
        if (options.rename) {
            toplevel.figure_out_scope(options.mangle);
            toplevel.expand_names(options.mangle);
        }
        if (timings) timings.compress = Date.now();
        if (options.compress) toplevel = new Compressor(options.compress).compress(toplevel);
        if (timings) timings.scope = Date.now();
        if (options.mangle) toplevel.figure_out_scope(options.mangle);
        if (timings) timings.mangle = Date.now();
        if (options.mangle) {
            toplevel.compute_char_frequency(options.mangle);
            toplevel.mangle_names(options.mangle);
        }
        if (timings) timings.properties = Date.now();
        if (options.mangle && options.mangle.properties) {
            toplevel = mangle_properties(toplevel, options.mangle.properties);
        }
        if (timings) timings.output = Date.now();
        var result = {};
        if (options.output.ast) {
            result.ast = toplevel;
        }
        if (!HOP(options.output, "code") || options.output.code) {
            if (options.sourceMap) {
                options.output.source_map = SourceMap({
                    file: options.sourceMap.filename,
                    orig: source_maps,
                    root: options.sourceMap.root
                });
                if (options.sourceMap.includeSources) {
                    if (files instanceof AST_Toplevel) {
                        throw new Error("original source content unavailable");
                    } else for (var name in files) if (HOP(files, name)) {
                        options.output.source_map.get().setSourceContent(name, files[name]);
                    }
                } else {
                    options.output.source_map.get()._sourcesContents = null;
                }
            }
            delete options.output.ast;
            delete options.output.code;
            var stream = OutputStream(options.output);
            toplevel.print(stream);
            result.code = stream.get();
            if (options.sourceMap) {
                result.map = options.output.source_map.toString();
                var url = options.sourceMap.url;
                if (url) {
                    result.code = result.code.replace(/\n\/\/# sourceMappingURL=\S+\s*$/, "");
                    if (url == "inline") {
                        result.code += "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64," + to_base64(result.map);
                    } else {
                        result.code += "\n//# sourceMappingURL=" + url;
                    }
                }
            }
        }
        if (options.nameCache && options.mangle) {
            if (options.mangle.cache) options.nameCache.vars = to_json(options.mangle.cache);
            if (options.mangle.properties && options.mangle.properties.cache) {
                options.nameCache.props = to_json(options.mangle.properties.cache);
            }
        }
        if (timings) {
            timings.end = Date.now();
            result.timings = {
                parse: 1e-3 * (timings.rename - timings.parse),
                rename: 1e-3 * (timings.compress - timings.rename),
                compress: 1e-3 * (timings.scope - timings.compress),
                scope: 1e-3 * (timings.mangle - timings.scope),
                mangle: 1e-3 * (timings.properties - timings.mangle),
                properties: 1e-3 * (timings.output - timings.properties),
                output: 1e-3 * (timings.end - timings.output),
                total: 1e-3 * (timings.end - timings.start)
            }
        }
        if (warnings.length) {
            result.warnings = warnings;
        }
        return result;
    } catch (ex) {
        return { error: ex };
    }
}
