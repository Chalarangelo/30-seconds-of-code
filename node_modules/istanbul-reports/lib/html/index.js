/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars').create();
const annotator = require('./annotator');
const helpers = require('./helpers');
const templateFor = function(name) {
    return handlebars.compile(
        fs.readFileSync(
            path.resolve(__dirname, 'templates', name + '.txt'),
            'utf8'
        )
    );
};
const headerTemplate = templateFor('head');
const footerTemplate = templateFor('foot');
const detailTemplate = handlebars.compile(
    [
        '<tr>',
        '<td class="line-count quiet">{{#show_lines}}{{maxLines}}{{/show_lines}}</td>',
        '<td class="line-coverage quiet">{{#show_line_execution_counts lineCoverage}}{{maxLines}}{{/show_line_execution_counts}}</td>',
        '<td class="text"><pre class="prettyprint lang-js">{{#show_code annotatedCode}}{{/show_code}}</pre></td>',
        '</tr>\n'
    ].join('')
);
const summaryTableHeader = [
    '<div class="pad1">',
    '<table class="coverage-summary">',
    '<thead>',
    '<tr>',
    '   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>',
    '   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>',
    '   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>',
    '   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>',
    '   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>',
    '   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>',
    '   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>',
    '</tr>',
    '</thead>',
    '<tbody>'
].join('\n');
const summaryLineTemplate = handlebars.compile(
    [
        '<tr>',
        '<td class="file {{reportClasses.statements}}" data-value="{{file}}"><a href="{{output}}">{{file}}</a></td>',
        '<td data-value="{{metrics.statements.pct}}" class="pic {{reportClasses.statements}}"><div class="chart">{{#show_picture}}{{metrics.statements.pct}}{{/show_picture}}</div></td>',
        '<td data-value="{{metrics.statements.pct}}" class="pct {{reportClasses.statements}}">{{metrics.statements.pct}}%</td>',
        '<td data-value="{{metrics.statements.total}}" class="abs {{reportClasses.statements}}">{{metrics.statements.covered}}/{{metrics.statements.total}}</td>',
        '<td data-value="{{metrics.branches.pct}}" class="pct {{reportClasses.branches}}">{{metrics.branches.pct}}%</td>',
        '<td data-value="{{metrics.branches.total}}" class="abs {{reportClasses.branches}}">{{metrics.branches.covered}}/{{metrics.branches.total}}</td>',
        '<td data-value="{{metrics.functions.pct}}" class="pct {{reportClasses.functions}}">{{metrics.functions.pct}}%</td>',
        '<td data-value="{{metrics.functions.total}}" class="abs {{reportClasses.functions}}">{{metrics.functions.covered}}/{{metrics.functions.total}}</td>',
        '<td data-value="{{metrics.lines.pct}}" class="pct {{reportClasses.lines}}">{{metrics.lines.pct}}%</td>',
        '<td data-value="{{metrics.lines.total}}" class="abs {{reportClasses.lines}}">{{metrics.lines.covered}}/{{metrics.lines.total}}</td>',
        '</tr>\n'
    ].join('\n\t')
);
const summaryTableFooter = ['</tbody>', '</table>', '</div>'].join('\n');
const emptyClasses = {
    statements: 'empty',
    lines: 'empty',
    functions: 'empty',
    branches: 'empty'
};

helpers.registerHelpers(handlebars);

const standardLinkMapper = {
    getPath(node) {
        if (typeof node === 'string') {
            return node;
        }
        let filePath = node.getQualifiedName();
        if (node.isSummary()) {
            if (filePath !== '') {
                filePath += '/index.html';
            } else {
                filePath = 'index.html';
            }
        } else {
            filePath += '.html';
        }
        return filePath;
    },

    relativePath(source, target) {
        const targetPath = this.getPath(target);
        const sourcePath = path.dirname(this.getPath(source));
        return path.relative(sourcePath, targetPath);
    },

    assetPath(node, name) {
        return this.relativePath(this.getPath(node), name);
    }
};

function fixPct(metrics) {
    Object.keys(emptyClasses).forEach(key => {
        metrics[key].pct = 0;
    });
    return metrics;
}

class HtmlReport {
    constructor(opts) {
        this.verbose = opts.verbose;
        this.linkMapper = opts.linkMapper || standardLinkMapper;
        this.subdir = opts.subdir || '';
        this.date = Date();
        this.skipEmpty = opts.skipEmpty;
    }

    getBreadcrumbHtml(node) {
        let parent = node.getParent();
        const nodePath = [];

        while (parent) {
            nodePath.push(parent);
            parent = parent.getParent();
        }

        const linkPath = nodePath.map(ancestor => {
            const target = this.linkMapper.relativePath(node, ancestor);
            const name = ancestor.getRelativeName() || 'All files';
            return '<a href="' + target + '">' + name + '</a>';
        });

        linkPath.reverse();
        return linkPath.length > 0
            ? linkPath.join(' / ') + ' ' + node.getRelativeName()
            : 'All files';
    }

    fillTemplate(node, templateData, context) {
        const linkMapper = this.linkMapper;
        const summary = node.getCoverageSummary();
        templateData.entity = node.getQualifiedName() || 'All files';
        templateData.metrics = summary;
        templateData.reportClass = context.classForPercent(
            'statements',
            summary.statements.pct
        );
        templateData.pathHtml = this.getBreadcrumbHtml(node);
        templateData.base = {
            css: linkMapper.assetPath(node, 'base.css')
        };
        templateData.sorter = {
            js: linkMapper.assetPath(node, 'sorter.js'),
            image: linkMapper.assetPath(node, 'sort-arrow-sprite.png')
        };
        templateData.blockNavigation = {
            js: linkMapper.assetPath(node, 'block-navigation.js')
        };
        templateData.prettify = {
            js: linkMapper.assetPath(node, 'prettify.js'),
            css: linkMapper.assetPath(node, 'prettify.css')
        };
    }

    getTemplateData() {
        return { datetime: this.date };
    }

    getWriter(context) {
        if (!this.subdir) {
            return context.writer;
        }
        return context.writer.writerForDir(this.subdir);
    }

    onStart(root, context) {
        const assetHeaders = {
            '.js': '/* eslint-disable */\n'
        };

        ['.', 'vendor'].forEach(subdir => {
            const writer = this.getWriter(context);
            const srcDir = path.resolve(__dirname, 'assets', subdir);
            fs.readdirSync(srcDir).forEach(f => {
                const resolvedSource = path.resolve(srcDir, f);
                const resolvedDestination = '.';
                const stat = fs.statSync(resolvedSource);
                let dest;

                if (stat.isFile()) {
                    dest = resolvedDestination + '/' + f;
                    if (this.verbose) {
                        console.log('Write asset: ' + dest);
                    }
                    writer.copyFile(
                        resolvedSource,
                        dest,
                        assetHeaders[path.extname(f)]
                    );
                }
            });
        });
    }

    onSummary(node, context) {
        const linkMapper = this.linkMapper;
        const templateData = this.getTemplateData();
        const children = node.getChildren();
        const skipEmpty = this.skipEmpty;

        this.fillTemplate(node, templateData, context);
        const cw = this.getWriter(context).writeFile(linkMapper.getPath(node));
        cw.write(headerTemplate(templateData));
        cw.write(summaryTableHeader);
        children.forEach(child => {
            const metrics = child.getCoverageSummary();
            const isEmpty = metrics.isEmpty();
            if (skipEmpty && isEmpty) {
                return;
            }
            const reportClasses = isEmpty
                ? emptyClasses
                : {
                      statements: context.classForPercent(
                          'statements',
                          metrics.statements.pct
                      ),
                      lines: context.classForPercent(
                          'lines',
                          metrics.lines.pct
                      ),
                      functions: context.classForPercent(
                          'functions',
                          metrics.functions.pct
                      ),
                      branches: context.classForPercent(
                          'branches',
                          metrics.branches.pct
                      )
                  };
            const data = {
                metrics: isEmpty ? fixPct(metrics) : metrics,
                reportClasses,
                file: child.getRelativeName(),
                output: linkMapper.relativePath(node, child)
            };
            cw.write(summaryLineTemplate(data) + '\n');
        });
        cw.write(summaryTableFooter);
        cw.write(footerTemplate(templateData));
        cw.close();
    }

    onDetail(node, context) {
        const linkMapper = this.linkMapper;
        const templateData = this.getTemplateData();

        this.fillTemplate(node, templateData, context);
        const cw = this.getWriter(context).writeFile(linkMapper.getPath(node));
        cw.write(headerTemplate(templateData));
        cw.write('<pre><table class="coverage">\n');
        cw.write(
            detailTemplate(
                annotator.annotateSourceCode(node.getFileCoverage(), context)
            )
        );
        cw.write('</table></pre>\n');
        cw.write(footerTemplate(templateData));
        cw.close();
    }
}

module.exports = HtmlReport;
