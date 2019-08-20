/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('debug')('istanbuljs');
const SMC = require('source-map').SourceMapConsumer;
const pathutils = require('./pathutils');
const sourceStore = require('./source-store');
const transformer = require('./transformer');

/**
 * Tracks source maps for registered files
 */
class MapStore {
    /**
     * @param {Object} opts [opts=undefined] options.
     * @param {Boolean} opts.verbose [opts.verbose=false] verbose mode
     * @param {String} opts.baseDir [opts.baseDir=null] alternate base directory
     *  to resolve sourcemap files
     * @param {String} opts.sourceStore [opts.sourceStore='memory'] - store that tracks
     *  embedded sources found in source maps, one of 'memory' or 'file'
     * @param {String} opts.tmpdir [opts.tmpdir=undefined] - temporary directory
     *   to use for storing files.
     * @constructor
     */
    constructor(opts = {}) {
        this.baseDir = opts.baseDir || null;
        this.verbose = opts.verbose || false;
        this.sourceStore = sourceStore.create(opts.sourceStore, {
            tmpdir: opts.tmpdir
        });
        this.data = Object.create(null);
    }

    /**
     * Registers a source map URL with this store. It makes some input sanity checks
     * and silently fails on malformed input.
     * @param transformedFilePath - the file path for which the source map is valid.
     *  This must *exactly* match the path stashed for the coverage object to be
     *  useful.
     * @param sourceMapUrl - the source map URL, **not** a comment
     */
    registerURL(transformedFilePath, sourceMapUrl) {
        const d = 'data:';

        if (
            sourceMapUrl.length > d.length &&
            sourceMapUrl.substring(0, d.length) === d
        ) {
            const b64 = 'base64,';
            const pos = sourceMapUrl.indexOf(b64);
            if (pos > 0) {
                this.data[transformedFilePath] = {
                    type: 'encoded',
                    data: sourceMapUrl.substring(pos + b64.length)
                };
            } else {
                debug(`Unable to interpret source map URL: ${sourceMapUrl}`);
            }

            return;
        }

        const dir = path.dirname(path.resolve(transformedFilePath));
        const file = path.resolve(dir, sourceMapUrl);
        this.data[transformedFilePath] = { type: 'file', data: file };
    }

    /**
     * Registers a source map object with this store. Makes some basic sanity checks
     * and silently fails on malformed input.
     * @param transformedFilePath - the file path for which the source map is valid
     * @param sourceMap - the source map object
     */
    registerMap(transformedFilePath, sourceMap) {
        if (sourceMap && sourceMap.version) {
            this.data[transformedFilePath] = {
                type: 'object',
                data: sourceMap
            };
        } else {
            debug(
                'Invalid source map object: ' +
                    JSON.stringify(sourceMap, null, 2)
            );
        }
    }

    /**
     * Transforms the coverage map provided into one that refers to original
     * sources when valid mappings have been registered with this store.
     * @param {CoverageMap} coverageMap - the coverage map to transform
     * @returns {Object} an object with 2 properties. `map` for the transformed
     * coverage map and `sourceFinder` which is a function to return the source
     * text for a file.
     */
    transformCoverage(coverageMap) {
        const sourceFinder = filePath => {
            const content = this.sourceStore.getSource(filePath);
            if (content !== null) {
                return content;
            }

            if (path.isAbsolute(filePath)) {
                return fs.readFileSync(filePath, 'utf8');
            }

            return fs.readFileSync(
                pathutils.asAbsolute(filePath, this.baseDir)
            );
        };

        coverageMap.files().forEach(file => {
            const coverage = coverageMap.fileCoverageFor(file);
            if (coverage.data.inputSourceMap && !this.data[file]) {
                this.registerMap(file, coverage.data.inputSourceMap);
            }
        });

        if (Object.keys(this.data).length === 0) {
            return {
                map: coverageMap,
                sourceFinder
            };
        }

        const mappedCoverage = transformer
            .create(filePath => {
                try {
                    if (!this.data[filePath]) {
                        return null;
                    }

                    const d = this.data[filePath];
                    let obj;
                    if (d.type === 'file') {
                        obj = JSON.parse(fs.readFileSync(d.data, 'utf8'));
                    } else if (d.type === 'encoded') {
                        obj = JSON.parse(
                            Buffer.from(d.data, 'base64').toString()
                        );
                    } else {
                        obj = d.data;
                    }

                    const smc = new SMC(obj);
                    smc.sources.forEach(s => {
                        const content = smc.sourceContentFor(s);
                        if (content) {
                            const sourceFilePath = pathutils.relativeTo(
                                s,
                                filePath
                            );
                            this.sourceStore.registerSource(
                                sourceFilePath,
                                content
                            );
                        }
                    });

                    return smc;
                } catch (error) {
                    debug('Error returning source map for ' + filePath);
                    debug(error.stack);

                    return null;
                }
            })
            .transform(coverageMap);

        return {
            map: mappedCoverage,
            sourceFinder
        };
    }

    /**
     * Disposes temporary resources allocated by this map store
     */
    dispose() {
        this.sourceStore.dispose();
    }
}

module.exports = { MapStore };
