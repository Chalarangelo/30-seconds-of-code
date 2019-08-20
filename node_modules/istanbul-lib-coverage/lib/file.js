/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function percent(covered, total) {
    let tmp;
    if (total > 0) {
        tmp = (1000 * 100 * covered) / total + 5;
        return Math.floor(tmp / 10) / 100;
    } else {
        return 100.0;
    }
}

function blankSummary() {
    const empty = function() {
        return {
            total: 0,
            covered: 0,
            skipped: 0,
            pct: 'Unknown'
        };
    };
    return {
        lines: empty(),
        statements: empty(),
        functions: empty(),
        branches: empty()
    };
}

// asserts that a data object "looks like" a summary coverage object
function assertValidSummary(obj) {
    const valid =
        obj && obj.lines && obj.statements && obj.functions && obj.branches;
    if (!valid) {
        throw new Error(
            'Invalid summary coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 * @param {Object|CoverageSummary} [obj=undefined] an optional data object or
 * another coverage summary to initialize this object with.
 * @constructor
 */
function CoverageSummary(obj) {
    if (!obj) {
        this.data = blankSummary();
    } else if (obj instanceof CoverageSummary) {
        this.data = obj.data;
    } else {
        this.data = obj;
    }
    assertValidSummary(this.data);
}

['lines', 'statements', 'functions', 'branches'].forEach(p => {
    Object.defineProperty(CoverageSummary.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});

/**
 * merges a second summary coverage object into this one
 * @param {CoverageSummary} obj - another coverage summary object
 */
CoverageSummary.prototype.merge = function(obj) {
    const keys = ['lines', 'statements', 'branches', 'functions'];
    keys.forEach(key => {
        this[key].total += obj[key].total;
        this[key].covered += obj[key].covered;
        this[key].skipped += obj[key].skipped;
        this[key].pct = percent(this[key].covered, this[key].total);
    });
    return this;
};

/**
 * returns a POJO that is JSON serializable. May be used to get the raw
 * summary object.
 */
CoverageSummary.prototype.toJSON = function() {
    return this.data;
};

/**
 * return true if summary has no lines of code
 */
CoverageSummary.prototype.isEmpty = function() {
    return this.lines.total === 0;
};

// returns a data object that represents empty coverage
function emptyCoverage(filePath) {
    return {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
    };
}
// asserts that a data object "looks like" a coverage object
function assertValidObject(obj) {
    const valid =
        obj &&
        obj.path &&
        obj.statementMap &&
        obj.fnMap &&
        obj.branchMap &&
        obj.s &&
        obj.f &&
        obj.b;
    if (!valid) {
        throw new Error(
            'Invalid file coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * provides a read-only view of coverage for a single file.
 * The deep structure of this object is documented elsewhere. It has the following
 * properties:
 *
 * * `path` - the file path for which coverage is being tracked
 * * `statementMap` - map of statement locations keyed by statement index
 * * `fnMap` - map of function metadata keyed by function index
 * * `branchMap` - map of branch metadata keyed by branch index
 * * `s` - hit counts for statements
 * * `f` - hit count for functions
 * * `b` - hit count for branches
 *
 * @param {Object|FileCoverage|String} pathOrObj is a string that initializes
 * and empty coverage object with the specified file path or a data object that
 * has all the required properties for a file coverage object.
 * @constructor
 */
function FileCoverage(pathOrObj) {
    if (!pathOrObj) {
        throw new Error(
            'Coverage must be initialized with a path or an object'
        );
    }
    if (typeof pathOrObj === 'string') {
        this.data = emptyCoverage(pathOrObj);
    } else if (pathOrObj instanceof FileCoverage) {
        this.data = pathOrObj.data;
    } else if (typeof pathOrObj === 'object') {
        this.data = pathOrObj;
    } else {
        throw new Error('Invalid argument to coverage constructor');
    }
    assertValidObject(this.data);
}
/**
 * returns computed line coverage from statement coverage.
 * This is a map of hits keyed by line number in the source.
 */
FileCoverage.prototype.getLineCoverage = function() {
    const statementMap = this.data.statementMap;
    const statements = this.data.s;
    const lineMap = Object.create(null);

    Object.keys(statements).forEach(st => {
        if (!statementMap[st]) {
            return;
        }
        const line = statementMap[st].start.line;
        const count = statements[st];
        const prevVal = lineMap[line];
        if (prevVal === undefined || prevVal < count) {
            lineMap[line] = count;
        }
    });
    return lineMap;
};
/**
 * returns an array of uncovered line numbers.
 * @returns {Array} an array of line numbers for which no hits have been
 *  collected.
 */
FileCoverage.prototype.getUncoveredLines = function() {
    const lc = this.getLineCoverage();
    const ret = [];
    Object.keys(lc).forEach(l => {
        const hits = lc[l];
        if (hits === 0) {
            ret.push(l);
        }
    });
    return ret;
};
/**
 * returns a map of branch coverage by source line number.
 * @returns {Object} an object keyed by line number. Each object
 * has a `covered`, `total` and `coverage` (percentage) property.
 */
FileCoverage.prototype.getBranchCoverageByLine = function() {
    const branchMap = this.branchMap;
    const branches = this.b;
    const ret = {};
    Object.keys(branchMap).forEach(k => {
        const line = branchMap[k].line || branchMap[k].loc.start.line;
        const branchData = branches[k];
        ret[line] = ret[line] || [];
        ret[line].push(...branchData);
    });
    Object.keys(ret).forEach(k => {
        const dataArray = ret[k];
        const covered = dataArray.filter(item => item > 0);
        const coverage = (covered.length / dataArray.length) * 100;
        ret[k] = {
            covered: covered.length,
            total: dataArray.length,
            coverage
        };
    });
    return ret;
};

// expose coverage data attributes
['path', 'statementMap', 'fnMap', 'branchMap', 's', 'f', 'b'].forEach(p => {
    Object.defineProperty(FileCoverage.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});
/**
 * return a JSON-serializable POJO for this file coverage object
 */
FileCoverage.prototype.toJSON = function() {
    return this.data;
};
/**
 * merges a second coverage object into this one, updating hit counts
 * @param {FileCoverage} other - the coverage object to be merged into this one.
 *  Note that the other object should have the same structure as this one (same file).
 */
FileCoverage.prototype.merge = function(other) {
    Object.keys(other.s).forEach(k => {
        this.data.s[k] += other.s[k];
    });
    Object.keys(other.f).forEach(k => {
        this.data.f[k] += other.f[k];
    });
    Object.keys(other.b).forEach(k => {
        let i;
        const retArray = this.data.b[k];
        const secondArray = other.b[k];
        if (!retArray) {
            this.data.b[k] = secondArray;
            return;
        }
        for (i = 0; i < retArray.length; i += 1) {
            retArray[i] += secondArray[i];
        }
    });
};

FileCoverage.prototype.computeSimpleTotals = function(property) {
    let stats = this[property];
    const ret = { total: 0, covered: 0, skipped: 0 };

    if (typeof stats === 'function') {
        stats = stats.call(this);
    }
    Object.keys(stats).forEach(key => {
        const covered = !!stats[key];
        ret.total += 1;
        if (covered) {
            ret.covered += 1;
        }
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};

FileCoverage.prototype.computeBranchTotals = function() {
    const stats = this.b;
    const ret = { total: 0, covered: 0, skipped: 0 };

    Object.keys(stats).forEach(key => {
        const branches = stats[key];
        let covered;
        branches.forEach(branchHits => {
            covered = branchHits > 0;
            if (covered) {
                ret.covered += 1;
            }
        });
        ret.total += branches.length;
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};
/**
 * resets hit counts for all statements, functions and branches
 * in this coverage object resulting in zero coverage.
 */
FileCoverage.prototype.resetHits = function() {
    const statements = this.s;
    const functions = this.f;
    const branches = this.b;
    Object.keys(statements).forEach(s => {
        statements[s] = 0;
    });
    Object.keys(functions).forEach(f => {
        functions[f] = 0;
    });
    Object.keys(branches).forEach(b => {
        const hits = branches[b];
        branches[b] = hits.map(() => 0);
    });
};

/**
 * returns a CoverageSummary for this file coverage object
 * @returns {CoverageSummary}
 */
FileCoverage.prototype.toSummary = function() {
    const ret = {};
    ret.lines = this.computeSimpleTotals('getLineCoverage');
    ret.functions = this.computeSimpleTotals('f', 'fnMap');
    ret.statements = this.computeSimpleTotals('s', 'statementMap');
    ret.branches = this.computeBranchTotals();
    return new CoverageSummary(ret);
};

module.exports = {
    CoverageSummary,
    FileCoverage
};
