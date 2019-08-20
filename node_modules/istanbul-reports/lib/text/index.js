/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const PCT_COLS = 9;
const MISSING_COL = 18;
const TAB_SIZE = 1;
const DELIM = ' |';
const COL_DELIM = '-|';

function padding(num, ch) {
    let str = '';
    let i;
    ch = ch || ' ';
    for (i = 0; i < num; i += 1) {
        str += ch;
    }
    return str;
}

function fill(str, width, right, tabs) {
    tabs = tabs || 0;
    str = String(str);

    const leadingSpaces = tabs * TAB_SIZE;
    const remaining = width - leadingSpaces;
    const leader = padding(leadingSpaces);
    let fmtStr = '';
    let fillStr;
    const strlen = str.length;

    if (remaining > 0) {
        if (remaining >= strlen) {
            fillStr = padding(remaining - strlen);
            fmtStr = right ? fillStr + str : str + fillStr;
        } else {
            fmtStr = str.substring(strlen - remaining);
            fmtStr = '... ' + fmtStr.substring(4);
        }
    }

    return leader + fmtStr;
}

function formatName(name, maxCols, level) {
    return fill(name, maxCols, false, level);
}

function formatPct(pct, width) {
    return fill(pct, width || PCT_COLS, true, 0);
}

function nodeName(node) {
    return node.getRelativeName() || 'All files';
}

function depthFor(node) {
    let ret = 0;
    node = node.getParent();
    while (node) {
        ret += 1;
        node = node.getParent();
    }
    return ret;
}

function findNameWidth(node, context) {
    let last = 0;
    const compareWidth = function(node) {
        const depth = depthFor(node);
        const idealWidth = TAB_SIZE * depth + nodeName(node).length;
        if (idealWidth > last) {
            last = idealWidth;
        }
    };
    const visitor = {
        onSummary(node) {
            compareWidth(node);
        },
        onDetail(node) {
            compareWidth(node);
        }
    };
    node.visit(context.getVisitor(visitor));
    return last;
}

function makeLine(nameWidth) {
    const name = padding(nameWidth, '-');
    const pct = padding(PCT_COLS, '-');
    const elements = [];

    elements.push(name);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    elements.push(pct);
    elements.push(padding(MISSING_COL, '-'));
    return elements.join(COL_DELIM) + COL_DELIM;
}

function tableHeader(maxNameCols) {
    const elements = [];
    elements.push(formatName('File', maxNameCols, 0));
    elements.push(formatPct('% Stmts'));
    elements.push(formatPct('% Branch'));
    elements.push(formatPct('% Funcs'));
    elements.push(formatPct('% Lines'));
    elements.push(formatPct('Uncovered Line #s', MISSING_COL));
    return elements.join(' |') + ' |';
}

function missingLines(node, colorizer) {
    const missingLines = node.isSummary()
        ? []
        : node.getFileCoverage().getUncoveredLines();
    return colorizer(formatPct(missingLines.join(','), MISSING_COL), 'low');
}

function missingBranches(node, colorizer) {
    const branches = node.isSummary()
        ? {}
        : node.getFileCoverage().getBranchCoverageByLine();
    const missingLines = Object.keys(branches)
        .filter(key => branches[key].coverage < 100)
        .map(key => key);
    return colorizer(formatPct(missingLines.join(','), MISSING_COL), 'medium');
}

function isFull(metrics) {
    return (
        metrics.statements.pct === 100 &&
        metrics.branches.pct === 100 &&
        metrics.functions.pct === 100 &&
        metrics.lines.pct === 100
    );
}

function tableRow(
    node,
    context,
    colorizer,
    maxNameCols,
    level,
    skipEmpty,
    skipFull
) {
    const name = nodeName(node);
    const metrics = node.getCoverageSummary();
    const isEmpty = metrics.isEmpty();
    if (skipEmpty && isEmpty) {
        return '';
    }
    if (skipFull && isFull(metrics)) {
        return '';
    }

    const mm = {
        statements: isEmpty ? 0 : metrics.statements.pct,
        branches: isEmpty ? 0 : metrics.branches.pct,
        functions: isEmpty ? 0 : metrics.functions.pct,
        lines: isEmpty ? 0 : metrics.lines.pct
    };
    const colorize = isEmpty
        ? function(str) {
              return str;
          }
        : function(str, key) {
              return colorizer(str, context.classForPercent(key, mm[key]));
          };
    const elements = [];

    elements.push(colorize(formatName(name, maxNameCols, level), 'statements'));
    elements.push(colorize(formatPct(mm.statements), 'statements'));
    elements.push(colorize(formatPct(mm.branches), 'branches'));
    elements.push(colorize(formatPct(mm.functions), 'functions'));
    elements.push(colorize(formatPct(mm.lines), 'lines'));
    if (mm.lines === 100) {
        elements.push(missingBranches(node, colorizer));
    } else {
        elements.push(missingLines(node, colorizer));
    }
    return elements.join(DELIM) + DELIM;
}

function TextReport(opts) {
    opts = opts || {};
    this.file = opts.file || null;
    this.maxCols = opts.maxCols || 0;
    this.cw = null;
    this.skipEmpty = opts.skipEmpty;
    this.skipFull = opts.skipFull;
}

TextReport.prototype.onStart = function(root, context) {
    const statsWidth = 4 * (PCT_COLS + 2) + MISSING_COL;

    this.cw = context.writer.writeFile(this.file);
    this.nameWidth = findNameWidth(root, context);
    if (this.maxCols > 0) {
        const maxRemaining = this.maxCols - statsWidth - 2;
        if (this.nameWidth > maxRemaining) {
            this.nameWidth = maxRemaining;
        }
    }
    const line = makeLine(this.nameWidth);
    this.cw.println(line);
    this.cw.println(tableHeader(this.nameWidth));
    this.cw.println(line);
};

TextReport.prototype.onSummary = function(node, context) {
    const nodeDepth = depthFor(node);
    const row = tableRow(
        node,
        context,
        this.cw.colorize.bind(this.cw),
        this.nameWidth,
        nodeDepth,
        this.skipEmpty,
        this.skipFull
    );
    if (row) {
        this.cw.println(row);
    }
};

TextReport.prototype.onDetail = function(node, context) {
    return this.onSummary(node, context);
};

TextReport.prototype.onEnd = function() {
    this.cw.println(makeLine(this.nameWidth));
    this.cw.close();
};

module.exports = TextReport;
