/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

function TextSummaryReport(opts) {
    opts = opts || {};
    this.file = opts.file || null;
}

function lineForKey(summary, key) {
    const metrics = summary[key];

    key = key.substring(0, 1).toUpperCase() + key.substring(1);
    if (key.length < 12) {
        key += '                   '.substring(0, 12 - key.length);
    }
    const result = [
        key,
        ':',
        metrics.pct + '%',
        '(',
        metrics.covered + '/' + metrics.total,
        ')'
    ].join(' ');
    const skipped = metrics.skipped;
    if (skipped > 0) {
        return result + ', ' + skipped + ' ignored';
    }
    return result;
}

TextSummaryReport.prototype.onStart = function(node, context) {
    const summary = node.getCoverageSummary();
    const cw = context.writer.writeFile(this.file);
    const printLine = function(key) {
        const str = lineForKey(summary, key);
        const clazz = context.classForPercent(key, summary[key].pct);
        cw.println(cw.colorize(str, clazz));
    };

    cw.println('');
    cw.println(
        '=============================== Coverage summary ==============================='
    );
    printLine('statements');
    printLine('branches');
    printLine('functions');
    printLine('lines');
    cw.println(
        '================================================================================'
    );
    cw.close();
};

module.exports = TextSummaryReport;
