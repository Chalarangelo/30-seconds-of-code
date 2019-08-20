/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const debug = require('debug')('istanbuljs');
const libCoverage = require('istanbul-lib-coverage');
const { MappedCoverage } = require('./mapped');
const getMapping = require('./get-mapping');
const { getUniqueKey, getOutput } = require('./transform-utils');

class SourceMapTransformer {
    constructor(finder, opts = {}) {
        this.finder = finder;
        this.baseDir = opts.baseDir || process.cwd();
    }

    processFile(fc, sourceMap, coverageMapper) {
        let changes = 0;

        Object.keys(fc.statementMap).forEach(s => {
            const loc = fc.statementMap[s];
            const hits = fc.s[s];
            const mapping = getMapping(sourceMap, loc, fc.path);

            if (mapping) {
                changes += 1;
                const mappedCoverage = coverageMapper(mapping.source);
                mappedCoverage.addStatement(mapping.loc, hits);
            }
        });

        Object.keys(fc.fnMap).forEach(f => {
            const fnMeta = fc.fnMap[f];
            const hits = fc.f[f];
            const mapping = getMapping(sourceMap, fnMeta.decl, fc.path);
            const spanMapping = getMapping(sourceMap, fnMeta.loc, fc.path);

            if (
                mapping &&
                spanMapping &&
                mapping.source === spanMapping.source
            ) {
                changes += 1;
                const mappedCoverage = coverageMapper(mapping.source);
                mappedCoverage.addFunction(
                    fnMeta.name,
                    mapping.loc,
                    spanMapping.loc,
                    hits
                );
            }
        });

        Object.keys(fc.branchMap).forEach(b => {
            const branchMeta = fc.branchMap[b];
            const hits = fc.b[b];
            const locs = [];
            const mappedHits = [];
            let source;
            let skip;

            branchMeta.locations.forEach((loc, i) => {
                const mapping = getMapping(sourceMap, loc, fc.path);
                if (mapping) {
                    if (!source) {
                        source = mapping.source;
                    }

                    if (mapping.source !== source) {
                        skip = true;
                    }

                    locs.push(mapping.loc);
                    mappedHits.push(hits[i]);
                }
            });

            if (!skip && locs.length > 0) {
                changes += 1;
                const mappedCoverage = coverageMapper(source);
                mappedCoverage.addBranch(
                    branchMeta.type,
                    locs[0] /* XXX */,
                    locs,
                    mappedHits
                );
            }
        });

        return changes > 0;
    }

    transform(coverageMap) {
        const uniqueFiles = {};
        const getMappedCoverage = file => {
            const key = getUniqueKey(file);
            if (!uniqueFiles[key]) {
                uniqueFiles[key] = {
                    file,
                    mappedCoverage: new MappedCoverage(file)
                };
            }

            return uniqueFiles[key].mappedCoverage;
        };

        coverageMap.files().forEach(file => {
            const fc = coverageMap.fileCoverageFor(file);
            const sourceMap = this.finder(file);
            if (!sourceMap) {
                uniqueFiles[getUniqueKey(file)] = {
                    file,
                    mappedCoverage: fc
                };
                return;
            }

            const changed = this.processFile(fc, sourceMap, getMappedCoverage);
            if (!changed) {
                debug(`File [${file}] ignored, nothing could be mapped`);
            }
        });

        return libCoverage.createCoverageMap(getOutput(uniqueFiles));
    }
}

module.exports = {
    create(finder, opts) {
        return new SourceMapTransformer(finder, opts);
    }
};
