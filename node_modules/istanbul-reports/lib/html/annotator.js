/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

const InsertionText = require('./insertion-text');
const lt = '\u0001';
const gt = '\u0002';
const RE_LT = /</g;
const RE_GT = />/g;
const RE_AMP = /&/g;
// eslint-disable-next-line
var RE_lt = /\u0001/g;
// eslint-disable-next-line
var RE_gt = /\u0002/g;

function title(str) {
    return ' title="' + str + '" ';
}

function customEscape(text) {
    text = String(text);
    return text
        .replace(RE_AMP, '&amp;')
        .replace(RE_LT, '&lt;')
        .replace(RE_GT, '&gt;')
        .replace(RE_lt, '<')
        .replace(RE_gt, '>');
}

function annotateLines(fileCoverage, structuredText) {
    const lineStats = fileCoverage.getLineCoverage();
    if (!lineStats) {
        return;
    }
    Object.keys(lineStats).forEach(lineNumber => {
        const count = lineStats[lineNumber];
        if (structuredText[lineNumber]) {
            structuredText[lineNumber].covered = count > 0 ? 'yes' : 'no';
            structuredText[lineNumber].hits = count;
        }
    });
}

function annotateStatements(fileCoverage, structuredText) {
    const statementStats = fileCoverage.s;
    const statementMeta = fileCoverage.statementMap;
    Object.keys(statementStats).forEach(stName => {
        const count = statementStats[stName];
        const meta = statementMeta[stName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.start.column;
        let endCol = meta.end.column + 1;
        const startLine = meta.start.line;
        const endLine = meta.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'cstat-skip' : 'cstat-no') +
            '"' +
            title('statement not covered') +
            gt;
        const closeSpan = lt + '/span' + gt;
        let text;

        if (type === 'no' && structuredText[startLine]) {
            if (endLine !== startLine) {
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(
                startCol,
                openSpan,
                startCol < endCol ? endCol : text.originalLength(),
                closeSpan
            );
        }
    });
}

function annotateFunctions(fileCoverage, structuredText) {
    const fnStats = fileCoverage.f;
    const fnMeta = fileCoverage.fnMap;
    if (!fnStats) {
        return;
    }
    Object.keys(fnStats).forEach(fName => {
        const count = fnStats[fName];
        const meta = fnMeta[fName];
        const type = count > 0 ? 'yes' : 'no';
        const startCol = meta.decl.start.column;
        let endCol = meta.decl.end.column + 1;
        const startLine = meta.decl.start.line;
        const endLine = meta.decl.end.line;
        const openSpan =
            lt +
            'span class="' +
            (meta.skip ? 'fstat-skip' : 'fstat-no') +
            '"' +
            title('function not covered') +
            gt;
        const closeSpan = lt + '/span' + gt;
        let text;

        if (type === 'no' && structuredText[startLine]) {
            if (endLine !== startLine) {
                endCol = structuredText[startLine].text.originalLength();
            }
            text = structuredText[startLine].text;
            text.wrap(
                startCol,
                openSpan,
                startCol < endCol ? endCol : text.originalLength(),
                closeSpan
            );
        }
    });
}

function annotateBranches(fileCoverage, structuredText) {
    const branchStats = fileCoverage.b;
    const branchMeta = fileCoverage.branchMap;
    if (!branchStats) {
        return;
    }

    Object.keys(branchStats).forEach(branchName => {
        const branchArray = branchStats[branchName];
        const sumCount = branchArray.reduce((p, n) => p + n, 0);
        const metaArray = branchMeta[branchName].locations;
        let i;
        let count;
        let meta;
        let startCol;
        let endCol;
        let startLine;
        let endLine;
        let openSpan;
        let closeSpan;
        let text;

        // only highlight if partial branches are missing or if there is a
        // single uncovered branch.
        if (sumCount > 0 || (sumCount === 0 && branchArray.length === 1)) {
            for (
                i = 0;
                i < branchArray.length && i < metaArray.length;
                i += 1
            ) {
                count = branchArray[i];
                meta = metaArray[i];
                startCol = meta.start.column;
                endCol = meta.end.column + 1;
                startLine = meta.start.line;
                endLine = meta.end.line;
                openSpan =
                    lt +
                    'span class="branch-' +
                    i +
                    ' ' +
                    (meta.skip ? 'cbranch-skip' : 'cbranch-no') +
                    '"' +
                    title('branch not covered') +
                    gt;
                closeSpan = lt + '/span' + gt;

                if (count === 0 && structuredText[startLine]) {
                    //skip branches taken
                    if (endLine !== startLine) {
                        endCol = structuredText[
                            startLine
                        ].text.originalLength();
                    }
                    text = structuredText[startLine].text;
                    if (branchMeta[branchName].type === 'if') {
                        // 'if' is a special case
                        // since the else branch might not be visible, being non-existent
                        text.insertAt(
                            startCol,
                            lt +
                                'span class="' +
                                (meta.skip
                                    ? 'skip-if-branch'
                                    : 'missing-if-branch') +
                                '"' +
                                title(
                                    (i === 0 ? 'if' : 'else') +
                                        ' path not taken'
                                ) +
                                gt +
                                (i === 0 ? 'I' : 'E') +
                                lt +
                                '/span' +
                                gt,
                            true,
                            false
                        );
                    } else {
                        text.wrap(
                            startCol,
                            openSpan,
                            startCol < endCol ? endCol : text.originalLength(),
                            closeSpan
                        );
                    }
                }
            }
        }
    });
}

function annotateSourceCode(fileCoverage, sourceStore) {
    let codeArray;
    let lineCoverageArray;
    try {
        const sourceText = sourceStore.getSource(fileCoverage.path);
        const code = sourceText.split(/(?:\r?\n)|\r/);
        let count = 0;
        const structured = code.map(str => {
            count += 1;
            return {
                line: count,
                covered: 'neutral',
                hits: 0,
                text: new InsertionText(str, true)
            };
        });
        structured.unshift({
            line: 0,
            covered: null,
            text: new InsertionText('')
        });
        annotateLines(fileCoverage, structured);
        //note: order is important, since statements typically result in spanning the whole line and doing branches late
        //causes mismatched tags
        annotateBranches(fileCoverage, structured);
        annotateFunctions(fileCoverage, structured);
        annotateStatements(fileCoverage, structured);
        structured.shift();

        codeArray = structured.map(
            item => customEscape(item.text.toString()) || '&nbsp;'
        );

        lineCoverageArray = structured.map(item => ({
            covered: item.covered,
            hits: item.hits > 0 ? item.hits + 'x' : '&nbsp;'
        }));

        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: structured.length
        };
    } catch (ex) {
        codeArray = [ex.message];
        lineCoverageArray = [{ covered: 'no', hits: 0 }];
        String(ex.stack || '')
            .split(/\r?\n/)
            .forEach(line => {
                codeArray.push(line);
                lineCoverageArray.push({ covered: 'no', hits: 0 });
            });
        return {
            annotatedCode: codeArray,
            lineCoverage: lineCoverageArray,
            maxLines: codeArray.length
        };
    }
}

module.exports = {
    annotateSourceCode
};
