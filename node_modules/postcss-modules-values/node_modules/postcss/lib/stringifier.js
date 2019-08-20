'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRaw = {
    colon: ': ',
    indent: '    ',
    beforeDecl: '\n',
    beforeRule: '\n',
    beforeOpen: ' ',
    beforeClose: '\n',
    beforeComment: '\n',
    after: '\n',
    emptyBody: '',
    commentLeft: ' ',
    commentRight: ' '
};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

var Stringifier = function () {
    function Stringifier(builder) {
        _classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    Stringifier.prototype.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
    };

    Stringifier.prototype.root = function root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
    };

    Stringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');
        this.builder('/*' + left + node.text + right + '*/', node);
    };

    Stringifier.prototype.decl = function decl(node, semicolon) {
        var between = this.raw(node, 'between', 'colon');
        var string = node.prop + between + this.rawValue(node, 'value');

        if (node.important) {
            string += node.raws.important || ' !important';
        }

        if (semicolon) string += ';';
        this.builder(string, node);
    };

    Stringifier.prototype.rule = function rule(node) {
        this.block(node, this.rawValue(node, 'selector'));
        if (node.raws.ownSemicolon) {
            this.builder(node.raws.ownSemicolon, node, 'end');
        }
    };

    Stringifier.prototype.atrule = function atrule(node, semicolon) {
        var name = '@' + node.name;
        var params = node.params ? this.rawValue(node, 'params') : '';

        if (typeof node.raws.afterName !== 'undefined') {
            name += node.raws.afterName;
        } else if (params) {
            name += ' ';
        }

        if (node.nodes) {
            this.block(node, name + params);
        } else {
            var end = (node.raws.between || '') + (semicolon ? ';' : '');
            this.builder(name + params + end, node);
        }
    };

    Stringifier.prototype.body = function body(node) {
        var last = node.nodes.length - 1;
        while (last > 0) {
            if (node.nodes[last].type !== 'comment') break;
            last -= 1;
        }

        var semicolon = this.raw(node, 'semicolon');
        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            var before = this.raw(child, 'before');
            if (before) this.builder(before);
            this.stringify(child, last !== i || semicolon);
        }
    };

    Stringifier.prototype.block = function block(node, start) {
        var between = this.raw(node, 'between', 'beforeOpen');
        this.builder(start + between + '{', node, 'start');

        var after = void 0;
        if (node.nodes && node.nodes.length) {
            this.body(node);
            after = this.raw(node, 'after');
        } else {
            after = this.raw(node, 'after', 'emptyBody');
        }

        if (after) this.builder(after);
        this.builder('}', node, 'end');
    };

    Stringifier.prototype.raw = function raw(node, own, detect) {
        var value = void 0;
        if (!detect) detect = own;

        // Already had
        if (own) {
            value = node.raws[own];
            if (typeof value !== 'undefined') return value;
        }

        var parent = node.parent;

        // Hack for first rule in CSS
        if (detect === 'before') {
            if (!parent || parent.type === 'root' && parent.first === node) {
                return '';
            }
        }

        // Floating child without parent
        if (!parent) return defaultRaw[detect];

        // Detect style by other nodes
        var root = node.root();
        if (!root.rawCache) root.rawCache = {};
        if (typeof root.rawCache[detect] !== 'undefined') {
            return root.rawCache[detect];
        }

        if (detect === 'before' || detect === 'after') {
            return this.beforeAfter(node, detect);
        } else {
            var method = 'raw' + capitalize(detect);
            if (this[method]) {
                value = this[method](root, node);
            } else {
                root.walk(function (i) {
                    value = i.raws[own];
                    if (typeof value !== 'undefined') return false;
                });
            }
        }

        if (typeof value === 'undefined') value = defaultRaw[detect];

        root.rawCache[detect] = value;
        return value;
    };

    Stringifier.prototype.rawSemicolon = function rawSemicolon(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length && i.last.type === 'decl') {
                value = i.raws.semicolon;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawEmptyBody = function rawEmptyBody(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length === 0) {
                value = i.raws.after;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawIndent = function rawIndent(root) {
        if (root.raws.indent) return root.raws.indent;
        var value = void 0;
        root.walk(function (i) {
            var p = i.parent;
            if (p && p !== root && p.parent && p.parent === root) {
                if (typeof i.raws.before !== 'undefined') {
                    var parts = i.raws.before.split('\n');
                    value = parts[parts.length - 1];
                    value = value.replace(/[^\s]/g, '');
                    return false;
                }
            }
        });
        return value;
    };

    Stringifier.prototype.rawBeforeComment = function rawBeforeComment(root, node) {
        var value = void 0;
        root.walkComments(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeDecl');
        } else if (value) {
            value = value.replace(/[^\s]/g, '');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeDecl = function rawBeforeDecl(root, node) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeRule');
        } else if (value) {
            value = value.replace(/[^\s]/g, '');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeRule = function rawBeforeRule(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && (i.parent !== root || root.first !== i)) {
                if (typeof i.raws.before !== 'undefined') {
                    value = i.raws.before;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        if (value) value = value.replace(/[^\s]/g, '');
        return value;
    };

    Stringifier.prototype.rawBeforeClose = function rawBeforeClose(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length > 0) {
                if (typeof i.raws.after !== 'undefined') {
                    value = i.raws.after;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        if (value) value = value.replace(/[^\s]/g, '');
        return value;
    };

    Stringifier.prototype.rawBeforeOpen = function rawBeforeOpen(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.type !== 'decl') {
                value = i.raws.between;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawColon = function rawColon(root) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.between !== 'undefined') {
                value = i.raws.between.replace(/[^\s:]/g, '');
                return false;
            }
        });
        return value;
    };

    Stringifier.prototype.beforeAfter = function beforeAfter(node, detect) {
        var value = void 0;
        if (node.type === 'decl') {
            value = this.raw(node, null, 'beforeDecl');
        } else if (node.type === 'comment') {
            value = this.raw(node, null, 'beforeComment');
        } else if (detect === 'before') {
            value = this.raw(node, null, 'beforeRule');
        } else {
            value = this.raw(node, null, 'beforeClose');
        }

        var buf = node.parent;
        var depth = 0;
        while (buf && buf.type !== 'root') {
            depth += 1;
            buf = buf.parent;
        }

        if (value.indexOf('\n') !== -1) {
            var indent = this.raw(node, null, 'indent');
            if (indent.length) {
                for (var step = 0; step < depth; step++) {
                    value += indent;
                }
            }
        }

        return value;
    };

    Stringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.raw;
        } else {
            return value;
        }
    };

    return Stringifier;
}();

exports.default = Stringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJkZWZhdWx0UmF3IiwiY29sb24iLCJpbmRlbnQiLCJiZWZvcmVEZWNsIiwiYmVmb3JlUnVsZSIsImJlZm9yZU9wZW4iLCJiZWZvcmVDbG9zZSIsImJlZm9yZUNvbW1lbnQiLCJhZnRlciIsImVtcHR5Qm9keSIsImNvbW1lbnRMZWZ0IiwiY29tbWVudFJpZ2h0IiwiY2FwaXRhbGl6ZSIsInN0ciIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJTdHJpbmdpZmllciIsImJ1aWxkZXIiLCJzdHJpbmdpZnkiLCJub2RlIiwic2VtaWNvbG9uIiwidHlwZSIsInJvb3QiLCJib2R5IiwicmF3cyIsImNvbW1lbnQiLCJsZWZ0IiwicmF3IiwicmlnaHQiLCJ0ZXh0IiwiZGVjbCIsImJldHdlZW4iLCJzdHJpbmciLCJwcm9wIiwicmF3VmFsdWUiLCJpbXBvcnRhbnQiLCJydWxlIiwiYmxvY2siLCJvd25TZW1pY29sb24iLCJhdHJ1bGUiLCJuYW1lIiwicGFyYW1zIiwiYWZ0ZXJOYW1lIiwibm9kZXMiLCJlbmQiLCJsYXN0IiwibGVuZ3RoIiwiaSIsImNoaWxkIiwiYmVmb3JlIiwic3RhcnQiLCJvd24iLCJkZXRlY3QiLCJ2YWx1ZSIsInBhcmVudCIsImZpcnN0IiwicmF3Q2FjaGUiLCJiZWZvcmVBZnRlciIsIm1ldGhvZCIsIndhbGsiLCJyYXdTZW1pY29sb24iLCJyYXdFbXB0eUJvZHkiLCJyYXdJbmRlbnQiLCJwIiwicGFydHMiLCJzcGxpdCIsInJlcGxhY2UiLCJyYXdCZWZvcmVDb21tZW50Iiwid2Fsa0NvbW1lbnRzIiwiaW5kZXhPZiIsInJhd0JlZm9yZURlY2wiLCJ3YWxrRGVjbHMiLCJyYXdCZWZvcmVSdWxlIiwicmF3QmVmb3JlQ2xvc2UiLCJyYXdCZWZvcmVPcGVuIiwicmF3Q29sb24iLCJidWYiLCJkZXB0aCIsInN0ZXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLGFBQWE7QUFDZkMsV0FBZSxJQURB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QWtDO0FBQzlCLG1CQUFPMUIsSUFBSUEsR0FBWDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPMEIsS0FBUDtBQUNIO0FBQ0osSzs7Ozs7a0JBSVVyQyxXIiwiZmlsZSI6InN0cmluZ2lmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVmYXVsdFJhdyA9IHtcbiAgICBjb2xvbjogICAgICAgICAnOiAnLFxuICAgIGluZGVudDogICAgICAgICcgICAgJyxcbiAgICBiZWZvcmVEZWNsOiAgICAnXFxuJyxcbiAgICBiZWZvcmVSdWxlOiAgICAnXFxuJyxcbiAgICBiZWZvcmVPcGVuOiAgICAnICcsXG4gICAgYmVmb3JlQ2xvc2U6ICAgJ1xcbicsXG4gICAgYmVmb3JlQ29tbWVudDogJ1xcbicsXG4gICAgYWZ0ZXI6ICAgICAgICAgJ1xcbicsXG4gICAgZW1wdHlCb2R5OiAgICAgJycsXG4gICAgY29tbWVudExlZnQ6ICAgJyAnLFxuICAgIGNvbW1lbnRSaWdodDogICcgJ1xufTtcblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmNsYXNzIFN0cmluZ2lmaWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gYnVpbGRlcjtcbiAgICB9XG5cbiAgICBzdHJpbmdpZnkobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBzZW1pY29sb24pO1xuICAgIH1cblxuICAgIHJvb3Qobm9kZSkge1xuICAgICAgICB0aGlzLmJvZHkobm9kZSk7XG4gICAgICAgIGlmICggbm9kZS5yYXdzLmFmdGVyICkgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5hZnRlcik7XG4gICAgfVxuXG4gICAgY29tbWVudChub2RlKSB7XG4gICAgICAgIGxldCBsZWZ0ICA9IHRoaXMucmF3KG5vZGUsICdsZWZ0JywgICdjb21tZW50TGVmdCcpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0Jyk7XG4gICAgICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSk7XG4gICAgfVxuXG4gICAgZGVjbChub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdjb2xvbicpO1xuICAgICAgICBsZXQgc3RyaW5nICA9IG5vZGUucHJvcCArIGJldHdlZW4gKyB0aGlzLnJhd1ZhbHVlKG5vZGUsICd2YWx1ZScpO1xuXG4gICAgICAgIGlmICggbm9kZS5pbXBvcnRhbnQgKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzZW1pY29sb24gKSBzdHJpbmcgKz0gJzsnO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoc3RyaW5nLCBub2RlKTtcbiAgICB9XG5cbiAgICBydWxlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5ibG9jayhub2RlLCB0aGlzLnJhd1ZhbHVlKG5vZGUsICdzZWxlY3RvcicpKTtcbiAgICAgICAgaWYgKCBub2RlLnJhd3Mub3duU2VtaWNvbG9uICkge1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5vd25TZW1pY29sb24sIG5vZGUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0cnVsZShub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgbGV0IG5hbWUgICA9ICdAJyArIG5vZGUubmFtZTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5vZGUucGFyYW1zID8gdGhpcy5yYXdWYWx1ZShub2RlLCAncGFyYW1zJykgOiAnJztcblxuICAgICAgICBpZiAoIHR5cGVvZiBub2RlLnJhd3MuYWZ0ZXJOYW1lICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICggcGFyYW1zICkge1xuICAgICAgICAgICAgbmFtZSArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG5vZGUubm9kZXMgKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGVuZCA9IChub2RlLnJhd3MuYmV0d2VlbiB8fCAnJykgKyAoc2VtaWNvbG9uID8gJzsnIDogJycpO1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyKG5hbWUgKyBwYXJhbXMgKyBlbmQsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm9keShub2RlKSB7XG4gICAgICAgIGxldCBsYXN0ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoIGxhc3QgPiAwICkge1xuICAgICAgICAgICAgaWYgKCBub2RlLm5vZGVzW2xhc3RdLnR5cGUgIT09ICdjb21tZW50JyApIGJyZWFrO1xuICAgICAgICAgICAgbGFzdCAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbWljb2xvbiA9IHRoaXMucmF3KG5vZGUsICdzZW1pY29sb24nKTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCAgPSBub2RlLm5vZGVzW2ldO1xuICAgICAgICAgICAgbGV0IGJlZm9yZSA9IHRoaXMucmF3KGNoaWxkLCAnYmVmb3JlJyk7XG4gICAgICAgICAgICBpZiAoIGJlZm9yZSApIHRoaXMuYnVpbGRlcihiZWZvcmUpO1xuICAgICAgICAgICAgdGhpcy5zdHJpbmdpZnkoY2hpbGQsIGxhc3QgIT09IGkgfHwgc2VtaWNvbG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJsb2NrKG5vZGUsIHN0YXJ0KSB7XG4gICAgICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnYmVmb3JlT3BlbicpO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoc3RhcnQgKyBiZXR3ZWVuICsgJ3snLCBub2RlLCAnc3RhcnQnKTtcblxuICAgICAgICBsZXQgYWZ0ZXI7XG4gICAgICAgIGlmICggbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keShub2RlKTtcbiAgICAgICAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicsICdlbXB0eUJvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggYWZ0ZXIgKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoJ30nLCBub2RlLCAnZW5kJyk7XG4gICAgfVxuXG4gICAgcmF3KG5vZGUsIG93biwgZGV0ZWN0KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgaWYgKCAhZGV0ZWN0ICkgZGV0ZWN0ID0gb3duO1xuXG4gICAgICAgIC8vIEFscmVhZHkgaGFkXG4gICAgICAgIGlmICggb3duICkge1xuICAgICAgICAgICAgdmFsdWUgPSBub2RlLnJhd3Nbb3duXTtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyApIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcblxuICAgICAgICAvLyBIYWNrIGZvciBmaXJzdCBydWxlIGluIENTU1xuICAgICAgICBpZiAoIGRldGVjdCA9PT0gJ2JlZm9yZScgKSB7XG4gICAgICAgICAgICBpZiAoICFwYXJlbnQgfHwgcGFyZW50LnR5cGUgPT09ICdyb290JyAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmxvYXRpbmcgY2hpbGQgd2l0aG91dCBwYXJlbnRcbiAgICAgICAgaWYgKCAhcGFyZW50ICkgcmV0dXJuIGRlZmF1bHRSYXdbZGV0ZWN0XTtcblxuICAgICAgICAvLyBEZXRlY3Qgc3R5bGUgYnkgb3RoZXIgbm9kZXNcbiAgICAgICAgbGV0IHJvb3QgPSBub2RlLnJvb3QoKTtcbiAgICAgICAgaWYgKCAhcm9vdC5yYXdDYWNoZSApIHJvb3QucmF3Q2FjaGUgPSB7IH07XG4gICAgICAgIGlmICggdHlwZW9mIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICByZXR1cm4gcm9vdC5yYXdDYWNoZVtkZXRlY3RdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBkZXRlY3QgPT09ICdiZWZvcmUnIHx8IGRldGVjdCA9PT0gJ2FmdGVyJyApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ3JhdycgKyBjYXBpdGFsaXplKGRldGVjdCk7XG4gICAgICAgICAgICBpZiAoIHRoaXNbbWV0aG9kXSApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290LCBub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpLnJhd3Nbb3duXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICkgdmFsdWUgPSBkZWZhdWx0UmF3W2RldGVjdF07XG5cbiAgICAgICAgcm9vdC5yYXdDYWNoZVtkZXRlY3RdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdTZW1pY29sb24ocm9vdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2FsayggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggJiYgaS5sYXN0LnR5cGUgPT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5zZW1pY29sb247XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJhd0VtcHR5Qm9keShyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3SW5kZW50KHJvb3QpIHtcbiAgICAgICAgaWYgKCByb290LnJhd3MuaW5kZW50ICkgcmV0dXJuIHJvb3QucmF3cy5pbmRlbnQ7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGxldCBwID0gaS5wYXJlbnQ7XG4gICAgICAgICAgICBpZiAoIHAgJiYgcCAhPT0gcm9vdCAmJiBwLnBhcmVudCAmJiBwLnBhcmVudCA9PT0gcm9vdCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gaS5yYXdzLmJlZm9yZS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdCZWZvcmVDb21tZW50KHJvb3QsIG5vZGUpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICByb290LndhbGtDb21tZW50cyggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmU7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKTtcbiAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJhd0JlZm9yZURlY2wocm9vdCwgbm9kZSkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2Fsa0RlY2xzKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZTtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpO1xuICAgICAgICB9IGVsc2UgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3QmVmb3JlUnVsZShyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggaS5ub2RlcyAmJiAoaS5wYXJlbnQgIT09IHJvb3QgfHwgcm9vdC5maXJzdCAhPT0gaSkgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIHZhbHVlICkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3QmVmb3JlQ2xvc2Uocm9vdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2FsayggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGkucmF3cy5hZnRlciAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICggdmFsdWUgKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdCZWZvcmVPcGVuKHJvb3QpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICByb290LndhbGsoIGkgPT4ge1xuICAgICAgICAgICAgaWYgKCBpLnR5cGUgIT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuO1xuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdDb2xvbihyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrRGVjbHMoIGkgPT4ge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgaS5yYXdzLmJldHdlZW4gIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJldHdlZW4ucmVwbGFjZSgvW15cXHM6XS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIGlmICggbm9kZS50eXBlID09PSAnZGVjbCcgKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ29tbWVudCcpO1xuICAgICAgICB9IGVsc2UgaWYgKCBkZXRlY3QgPT09ICdiZWZvcmUnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ2xvc2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidWYgICA9IG5vZGUucGFyZW50O1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICB3aGlsZSAoIGJ1ZiAmJiBidWYudHlwZSAhPT0gJ3Jvb3QnICkge1xuICAgICAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnaW5kZW50Jyk7XG4gICAgICAgICAgICBpZiAoIGluZGVudC5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgZm9yICggbGV0IHN0ZXAgPSAwOyBzdGVwIDwgZGVwdGg7IHN0ZXArKyApIHZhbHVlICs9IGluZGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdWYWx1ZShub2RlLCBwcm9wKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5vZGVbcHJvcF07XG4gICAgICAgIGxldCByYXcgICA9IG5vZGUucmF3c1twcm9wXTtcbiAgICAgICAgaWYgKCByYXcgJiYgcmF3LnZhbHVlID09PSB2YWx1ZSApIHtcbiAgICAgICAgICAgIHJldHVybiByYXcucmF3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ2lmaWVyO1xuIl19
