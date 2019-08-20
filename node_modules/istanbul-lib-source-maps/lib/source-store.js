/*
 Copyright 2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const mkdirp = require('make-dir');
const rimraf = require('rimraf');

/* This exists for compatibility only to avoid changing the
 * prototype chain. */
class SourceStore {}

class MemoryStore extends SourceStore {
    constructor() {
        super();

        this.data = {};
    }

    registerSource(filePath, sourceText) {
        this.data[filePath] = sourceText;
    }

    getSource(filePath) {
        return this.data[filePath] || null;
    }

    dispose() {}
}

class FileStore extends SourceStore {
    constructor(opts = {}) {
        super();

        const tmpDir = opts.tmpdir || os.tmpdir();
        this.counter = 0;
        this.mappings = [];
        this.basePath = path.resolve(tmpDir, '.istanbul', 'cache_');
        mkdirp.sync(path.dirname(this.basePath));
    }

    registerSource(filePath, sourceText) {
        if (this.mappings[filePath]) {
            return;
        }

        this.counter += 1;
        const mapFile = this.basePath + this.counter;
        this.mappings[filePath] = mapFile;
        fs.writeFileSync(mapFile, sourceText, 'utf8');
    }

    getSource(filePath) {
        const mapFile = this.mappings[filePath];
        if (!mapFile) {
            return null;
        }

        return fs.readFileSync(mapFile, 'utf8');
    }

    dispose() {
        this.mappings = [];
        rimraf.sync(path.dirname(this.basePath));
    }
}

module.exports = {
    create(type = 'memory', opts = {}) {
        if (type.toLowerCase() === 'file') {
            return new FileStore(opts);
        }

        return new MemoryStore(opts);
    }
};
