/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function LcovOnlyReport(opts) {
    this.file = opts.file || 'lcov.info';
    this.contentWriter = null;
}

LcovOnlyReport.prototype.onStart = function(root, context) {
    this.contentWriter = context.writer.writeFile(this.file);
};

LcovOnlyReport.prototype.onDetail = function(node) {
    const fc = node.getFileCoverage();
    const writer = this.contentWriter;
    const functions = fc.f;
    const functionMap = fc.fnMap;
    const lines = fc.getLineCoverage();
    const branches = fc.b;
    const branchMap = fc.branchMap;
    const summary = node.getCoverageSummary();

    writer.println('TN:'); //no test name
    writer.println('SF:' + fc.path);

    Object.keys(functionMap).forEach(key => {
        const meta = functionMap[key];
        writer.println('FN:' + [meta.decl.start.line, meta.name].join(','));
    });
    writer.println('FNF:' + summary.functions.total);
    writer.println('FNH:' + summary.functions.covered);

    Object.keys(functionMap).forEach(key => {
        const stats = functions[key];
        const meta = functionMap[key];
        writer.println('FNDA:' + [stats, meta.name].join(','));
    });

    Object.keys(lines).forEach(key => {
        const stat = lines[key];
        writer.println('DA:' + [key, stat].join(','));
    });
    writer.println('LF:' + summary.lines.total);
    writer.println('LH:' + summary.lines.covered);

    Object.keys(branches).forEach(key => {
        const branchArray = branches[key];
        const meta = branchMap[key];
        const line = meta.loc.start.line;
        let i = 0;
        branchArray.forEach(b => {
            writer.println('BRDA:' + [line, key, i, b].join(','));
            i += 1;
        });
    });
    writer.println('BRF:' + summary.branches.total);
    writer.println('BRH:' + summary.branches.covered);
    writer.println('end_of_record');
};

LcovOnlyReport.prototype.onEnd = function() {
    this.contentWriter.close();
};

module.exports = LcovOnlyReport;
