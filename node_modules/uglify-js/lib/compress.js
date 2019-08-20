/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.
  https://github.com/mishoo/UglifyJS2

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2012 (c) Mihai Bazon <mihai.bazon@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

"use strict";

function Compressor(options, false_by_default) {
    if (!(this instanceof Compressor))
        return new Compressor(options, false_by_default);
    TreeTransformer.call(this, this.before, this.after);
    this.options = defaults(options, {
        arguments       : !false_by_default,
        assignments     : !false_by_default,
        booleans        : !false_by_default,
        collapse_vars   : !false_by_default,
        comparisons     : !false_by_default,
        conditionals    : !false_by_default,
        dead_code       : !false_by_default,
        directives      : !false_by_default,
        drop_console    : false,
        drop_debugger   : !false_by_default,
        evaluate        : !false_by_default,
        expression      : false,
        functions       : !false_by_default,
        global_defs     : false,
        hoist_funs      : false,
        hoist_props     : !false_by_default,
        hoist_vars      : false,
        ie8             : false,
        if_return       : !false_by_default,
        inline          : !false_by_default,
        join_vars       : !false_by_default,
        keep_fargs      : false_by_default || "strict",
        keep_fnames     : false,
        keep_infinity   : false,
        loops           : !false_by_default,
        negate_iife     : !false_by_default,
        passes          : 1,
        properties      : !false_by_default,
        pure_getters    : !false_by_default && "strict",
        pure_funcs      : null,
        reduce_funcs    : !false_by_default,
        reduce_vars     : !false_by_default,
        sequences       : !false_by_default,
        side_effects    : !false_by_default,
        switches        : !false_by_default,
        top_retain      : null,
        toplevel        : !!(options && options["top_retain"]),
        typeofs         : !false_by_default,
        unsafe          : false,
        unsafe_comps    : false,
        unsafe_Function : false,
        unsafe_math     : false,
        unsafe_proto    : false,
        unsafe_regexp   : false,
        unsafe_undefined: false,
        unused          : !false_by_default,
    }, true);
    var global_defs = this.options["global_defs"];
    if (typeof global_defs == "object") for (var key in global_defs) {
        if (/^@/.test(key) && HOP(global_defs, key)) {
            global_defs[key.slice(1)] = parse(global_defs[key], {
                expression: true
            });
        }
    }
    if (this.options["inline"] === true) this.options["inline"] = 3;
    var keep_fargs = this.options["keep_fargs"];
    this.drop_fargs = keep_fargs == "strict" ? function(lambda, parent) {
        if (lambda.length_read) return false;
        var name = lambda.name;
        if (!name) return parent && parent.TYPE == "Call" && parent.expression === lambda;
        if (name.fixed_value() !== lambda) return false;
        var def = name.definition();
        if (def.direct_access) return false;
        var escaped = def.escaped;
        return escaped && escaped.depth != 1;
    } : keep_fargs ? return_false : return_true;
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            return pure_funcs !== node.expression.print_to_string();
        };
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            return !member(node.expression.print_to_string(), pure_funcs);
        };
    } else {
        this.pure_funcs = return_true;
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
            return top_retain.test(def.name);
        };
    } else if (typeof top_retain == "function") {
        this.top_retain = top_retain;
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
            return member(def.name, top_retain);
        };
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
        funcs: /funcs/.test(toplevel),
        vars: /vars/.test(toplevel)
    } : {
        funcs: toplevel,
        vars: toplevel
    };
}

Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        if (def.global) for (var i = 0; i < def.orig.length; i++)
            if (!this.toplevel[def.orig[i] instanceof AST_SymbolDefun ? "funcs" : "vars"])
                return true;
        return false;
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        if (this.option("expression")) {
            node.process_expression(true);
        }
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        var mangle = { ie8: this.option("ie8") };
        for (var pass = 0; pass < passes; pass++) {
            node.figure_out_scope(mangle);
            if (pass > 0 || this.option("reduce_vars"))
                node.reset_opt_flags(this);
            node = node.transform(this);
            if (passes > 1) {
                var count = 0;
                node.walk(new TreeWalker(function() {
                    count++;
                }));
                AST_Node.info("pass " + pass + ": last_count: " + min_count + ", count: " + count);
                if (count < min_count) {
                    min_count = count;
                    stopping = false;
                } else if (stopping) {
                    break;
                } else {
                    stopping = true;
                }
            }
        }
        if (this.option("expression")) {
            node.process_expression(false);
        }
        return node;
    },
    before: function(node, descend, in_list) {
        if (node._squeezed) return node;
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
            node.hoist_properties(this);
            node.hoist_declarations(this);
        }
        // Before https://github.com/mishoo/UglifyJS2/pull/1602 AST_Node.optimize()
        // would call AST_Node.transform() if a different instance of AST_Node is
        // produced after OPT().
        // This corrupts TreeWalker.stack, which cause AST look-ups to malfunction.
        // Migrate and defer all children's AST_Node.transform() to below, which
        // will now happen after this parent AST_Node has been properly substituted
        // thus gives a consistent AST snapshot.
        descend(node, this);
        // Existing code relies on how AST_Node.optimize() worked, and omitting the
        // following replacement call would result in degraded efficiency of both
        // output and performance.
        descend(node, this);
        var opt = node.optimize(this);
        if (is_scope) {
            opt.drop_unused(this);
            descend(opt, this);
        }
        if (opt === node) opt._squeezed = true;
        return opt;
    }
});

(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
        return self;
    });

    AST_Node.DEFMETHOD("equivalent_to", function(node) {
        return this.TYPE == node.TYPE && this.print_to_string() == node.print_to_string();
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, compressor) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
                return make_node(AST_Return, node, {
                    value: node.body
                });
            }
            if (!insert && node instanceof AST_Return) {
                if (compressor) {
                    var value = node.value && node.value.drop_side_effect_free(compressor, true);
                    return value ? make_node(AST_SimpleStatement, node, {
                        body: value
                    }) : make_node(AST_EmptyStatement, node);
                }
                return make_node(AST_SimpleStatement, node, {
                    body: node.value || make_node(AST_UnaryPrefix, node, {
                        operator: "void",
                        expression: make_node(AST_Number, node, {
                            value: 0
                        })
                    })
                });
            }
            if (node instanceof AST_Lambda && node !== self) {
                return node;
            }
            if (node instanceof AST_Block) {
                var index = node.body.length - 1;
                if (index >= 0) {
                    node.body[index] = node.body[index].transform(tt);
                }
            } else if (node instanceof AST_If) {
                node.body = node.body.transform(tt);
                if (node.alternative) {
                    node.alternative = node.alternative.transform(tt);
                }
            } else if (node instanceof AST_With) {
                node.body = node.body.transform(tt);
            }
            return node;
        });
        self.transform(tt);
    });

    function read_property(obj, node) {
        var key = node.getProperty();
        if (key instanceof AST_Node) return;
        var value;
        if (obj instanceof AST_Array) {
            var elements = obj.elements;
            if (key == "length") return make_node_from_constant(elements.length, obj);
            if (typeof key == "number" && key in elements) value = elements[key];
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
                return make_node_from_constant(obj.argnames.length, obj);
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
            var props = obj.properties;
            for (var i = props.length; --i >= 0;) {
                var prop = props[i];
                if (!(prop instanceof AST_ObjectKeyVal)) return;
                if (!value && props[i].key === key) value = props[i].value;
            }
        }
        return value instanceof AST_SymbolRef && value.fixed_value() || value;
    }

    function is_read_only_fn(value, name) {
        if (value instanceof AST_Boolean) return native_fns.Boolean[name];
        if (value instanceof AST_Number) return native_fns.Number[name];
        if (value instanceof AST_String) return native_fns.String[name];
        if (name == "valueOf") return false;
        if (value instanceof AST_Array) return native_fns.Array[name];
        if (value instanceof AST_Function) return native_fns.Function[name];
        if (value instanceof AST_Object) return native_fns.Object[name];
        if (value instanceof AST_RegExp) return native_fns.RegExp[name];
    }

    function is_modified(compressor, tw, node, value, level, immutable) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        var lhs = is_lhs(node, parent);
        if (lhs) return lhs;
        if (!immutable
            && parent instanceof AST_Call
            && parent.expression === node
            && !parent.is_expr_pure(compressor)
            && (!(value instanceof AST_Function)
                || !(parent instanceof AST_New) && value.contains_this())) {
            return true;
        }
        if (parent instanceof AST_Array) {
            return is_modified(compressor, tw, parent, parent, level + 1);
        }
        if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
            var obj = tw.parent(level + 1);
            return is_modified(compressor, tw, obj, obj, level + 2);
        }
        if (parent instanceof AST_PropAccess && parent.expression === node) {
            var prop = read_property(value, parent);
            return !immutable && is_modified(compressor, tw, parent, prop, level + 1);
        }
    }

    function is_arguments(def) {
        if (def.name != "arguments") return false;
        var orig = def.orig;
        return orig.length == 1 && orig[0] instanceof AST_SymbolFunarg;
    }

    (function(def) {
        def(AST_Node, noop);

        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.chained = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.scope.pinned()
                && !compressor.exposed(def)
                && !(def.init instanceof AST_Function && def.init !== def.scope)
                && def.init;
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
                var scope = ref.scope;
                do {
                    if (def.scope === scope) return true;
                } while (scope instanceof AST_Function && (scope = scope.parent_scope));
            })) {
                tw.defun_ids[def.id] = false;
            }
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }

        function reset_variables(tw, compressor, scope) {
            scope.variables.each(function(def) {
                reset_def(tw, compressor, def);
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                    mark(tw, def, true);
                } else if (def.fixed) {
                    tw.loop_ids[def.id] = tw.in_loop;
                    mark(tw, def, true);
                }
            });
            scope.may_call_this = function() {
                scope.may_call_this = noop;
                if (!scope.contains_this()) return;
                scope.functions.each(function(def) {
                    if (def.init instanceof AST_Defun && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
        }

        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var marker = tw.defun_ids[def.id];
                if (!marker) return;
                var visited = tw.defun_visited[def.id];
                if (marker === tw.safe_ids) {
                    if (!visited) return def.fixed;
                } else if (visited) {
                    def.init.enclosed.forEach(function(d) {
                        if (def.init.variables.get(d.name) === d) return;
                        if (!safe_to_read(tw, d)) d.fixed = false;
                    });
                } else {
                    tw.defun_ids[def.id] = false;
                }
            } else {
                if (!tw.in_loop) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                    return def.fixed;
                }
                tw.defun_ids[def.id] = false;
            }
        }

        function walk_defuns(tw, scope) {
            scope.functions.each(function(def) {
                if (def.init instanceof AST_Defun && !tw.defun_visited[def.id]) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                    def.init.walk(tw);
                }
            });
        }

        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }

        function pop(tw) {
            tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
        }

        function mark(tw, def, safe) {
            tw.safe_ids[def.id] = safe;
        }

        function safe_to_read(tw, def) {
            if (def.single_use == "m") return false;
            if (tw.safe_ids[def.id]) {
                if (def.fixed == null) {
                    if (is_arguments(def)) return false;
                    if (def.global && def.name == "arguments") return false;
                    def.fixed = make_node(AST_Undefined, def.orig);
                }
                return true;
            }
            return def.fixed instanceof AST_Defun;
        }

        function safe_to_assign(tw, def, scope, value) {
            if (def.fixed === undefined) return true;
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
                delete def.safe_ids;
                return true;
            }
            if (!HOP(tw.safe_ids, def.id)) return false;
            if (!safe_to_read(tw, def)) return false;
            if (def.fixed === false) return false;
            if (def.fixed != null && (!value || def.references.length > def.assignments)) return false;
            if (def.fixed instanceof AST_Defun) {
                return value instanceof AST_Node && def.fixed.parent_scope === scope;
            }
            return all(def.orig, function(sym) {
                return !(sym instanceof AST_SymbolDefun || sym instanceof AST_SymbolLambda);
            });
        }

        function ref_once(tw, compressor, def) {
            return compressor.option("unused")
                && !def.scope.pinned()
                && def.references.length - def.recursive_refs == 1
                && tw.loop_ids[def.id] === tw.in_loop;
        }

        function is_immutable(value) {
            if (!value) return false;
            return value.is_constant()
                || value instanceof AST_Lambda
                || value instanceof AST_This;
        }

        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (value && value.is_constant()) return;
            if (parent instanceof AST_Assign && parent.operator == "=" && node === parent.right
                || parent instanceof AST_Call && (node !== parent.expression || parent instanceof AST_New)
                || parent instanceof AST_Exit && node === parent.value && node.scope !== d.scope
                || parent instanceof AST_VarDef && node === parent.value) {
                d.escaped.push(parent);
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
                return;
            } else if (parent instanceof AST_Array
                || parent instanceof AST_Binary && lazy_op[parent.operator]
                || parent instanceof AST_Conditional && node !== parent.condition
                || parent instanceof AST_Sequence && node === parent.tail_node()) {
                mark_escaped(tw, d, scope, parent, parent, level + 1, depth);
            } else if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
                var obj = tw.parent(level + 1);
                mark_escaped(tw, d, scope, obj, obj, level + 2, depth);
            } else if (parent instanceof AST_PropAccess && node === parent.expression) {
                value = read_property(value, parent);
                mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
                if (value) return;
            }
            if (level > 0) return;
            if (parent instanceof AST_Call && node === parent.expression) return;
            if (parent instanceof AST_Sequence && node !== parent.tail_node()) return;
            if (parent instanceof AST_SimpleStatement) return;
            if (parent instanceof AST_Unary && !unary_side_effects[parent.operator]) return;
            d.direct_access = true;
        }

        function mark_assignment_to_arguments(node) {
            if (!(node instanceof AST_Sub)) return;
            var expr = node.expression;
            if (!(expr instanceof AST_SymbolRef)) return;
            var def = expr.definition();
            if (is_arguments(def) && node.property instanceof AST_Number) def.reassigned = true;
        }

        var suppressor = new TreeWalker(function(node) {
            if (!(node instanceof AST_Symbol)) return;
            var d = node.definition();
            if (!d) return;
            if (node instanceof AST_SymbolRef) d.references.push(node);
            d.fixed = false;
        });
        def(AST_Accessor, function(tw, descend, compressor) {
            push(tw);
            reset_variables(tw, compressor, this);
            descend();
            pop(tw);
            walk_defuns(tw, this);
            return true;
        });
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var sym = node.left;
            if (!(sym instanceof AST_SymbolRef)) {
                mark_assignment_to_arguments(sym);
                return;
            }
            if (sym.fixed) delete sym.fixed;
            var d = sym.definition();
            var safe = safe_to_assign(tw, d, sym.scope, node.right);
            d.assignments++;
            var fixed = d.fixed;
            if (!fixed && node.operator != "=") return;
            var eq = node.operator == "=";
            var value = eq ? node.right : node;
            if (is_modified(compressor, tw, node, value, 0)) return;
            if (!eq) d.chained = true;
            sym.fixed = d.fixed = eq ? function() {
                return node.right;
            } : function() {
                return make_node(AST_Binary, node, {
                    operator: node.operator.slice(0, -1),
                    left: fixed instanceof AST_Node ? fixed : fixed(),
                    right: node.right
                });
            };
            if (!safe) return;
            d.references.push(sym);
            mark(tw, d, false);
            node.right.walk(tw);
            mark(tw, d, true);
            if (eq) mark_escaped(tw, d, sym.scope, node, value, 0, 1);
            return true;
        });
        def(AST_Binary, function(tw) {
            if (!lazy_op[this.operator]) return;
            this.left.walk(tw);
            push(tw);
            this.right.walk(tw);
            pop(tw);
            return true;
        });
        def(AST_Call, function(tw, descend) {
            tw.find_parent(AST_Scope).may_call_this();
            var exp = this.expression;
            if (!(exp instanceof AST_SymbolRef)) return;
            var def = exp.definition();
            if (!(def.fixed instanceof AST_Defun)) return;
            var defun = mark_defun(tw, def);
            if (!defun) return;
            descend();
            defun.walk(tw);
            return true;
        });
        def(AST_Case, function(tw) {
            push(tw);
            this.expression.walk(tw);
            pop(tw);
            push(tw);
            walk_body(this, tw);
            pop(tw);
            return true;
        });
        def(AST_Conditional, function(tw) {
            this.condition.walk(tw);
            push(tw);
            this.consequent.walk(tw);
            pop(tw);
            push(tw);
            this.alternative.walk(tw);
            pop(tw);
            return true;
        });
        def(AST_Default, function(tw, descend) {
            push(tw);
            descend();
            pop(tw);
            return true;
        });
        def(AST_Defun, function(tw, descend, compressor) {
            var id = this.name.definition().id;
            if (tw.defun_visited[id]) return true;
            if (tw.defun_ids[id] !== tw.safe_ids) return true;
            tw.defun_visited[id] = true;
            this.inlined = false;
            push(tw);
            reset_variables(tw, compressor, this);
            descend();
            pop(tw);
            walk_defuns(tw, this);
            return true;
        });
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            this.body.walk(tw);
            if (has_break_or_continue(this)) {
                pop(tw);
                push(tw);
            }
            this.condition.walk(tw);
            pop(tw);
            tw.in_loop = saved_loop;
            return true;
        });
        def(AST_For, function(tw) {
            if (this.init) this.init.walk(tw);
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            if (this.condition) this.condition.walk(tw);
            this.body.walk(tw);
            if (this.step) {
                if (has_break_or_continue(this)) {
                    pop(tw);
                    push(tw);
                }
                this.step.walk(tw);
            }
            pop(tw);
            tw.in_loop = saved_loop;
            return true;
        });
        def(AST_ForIn, function(tw) {
            this.init.walk(suppressor);
            this.object.walk(tw);
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            this.body.walk(tw);
            pop(tw);
            tw.in_loop = saved_loop;
            return true;
        });
        def(AST_Function, function(tw, descend, compressor) {
            var node = this;
            node.inlined = false;
            push(tw);
            reset_variables(tw, compressor, node);
            var iife;
            if (!node.name
                && (iife = tw.parent()) instanceof AST_Call
                && iife.expression === node) {
                // Virtually turn IIFE parameters into variable definitions:
                //   (function(a,b) {...})(c,d) => (function() {var a=c,b=d; ...})()
                // So existing transformation rules can work on them.
                node.argnames.forEach(function(arg, i) {
                    var d = arg.definition();
                    if (d.fixed === undefined && (!node.uses_arguments || tw.has_directive("use strict"))) {
                        d.fixed = function() {
                            return iife.args[i] || make_node(AST_Undefined, iife);
                        };
                        tw.loop_ids[d.id] = tw.in_loop;
                        mark(tw, d, true);
                    } else {
                        d.fixed = false;
                    }
                });
            }
            descend();
            pop(tw);
            walk_defuns(tw, node);
            return true;
        });
        def(AST_If, function(tw) {
            this.condition.walk(tw);
            push(tw);
            this.body.walk(tw);
            pop(tw);
            if (this.alternative) {
                push(tw);
                this.alternative.walk(tw);
                pop(tw);
            }
            return true;
        });
        def(AST_LabeledStatement, function(tw) {
            push(tw);
            this.body.walk(tw);
            pop(tw);
            return true;
        });
        def(AST_SymbolCatch, function() {
            this.definition().fixed = false;
        });
        def(AST_SymbolRef, function(tw, descend, compressor) {
            if (this.fixed) delete this.fixed;
            var d = this.definition();
            d.references.push(this);
            if (d.references.length == 1
                && !d.fixed
                && d.orig[0] instanceof AST_SymbolDefun) {
                tw.loop_ids[d.id] = tw.in_loop;
            }
            var value;
            if (d.fixed === undefined || !safe_to_read(tw, d)) {
                d.fixed = false;
            } else if (d.fixed) {
                value = this.fixed_value();
                if (recursive_ref(tw, d)) {
                    d.recursive_refs++;
                } else if (value && ref_once(tw, compressor, d)) {
                    d.single_use = value instanceof AST_Lambda && !value.pinned()
                        || d.scope === this.scope && value.is_constant_expression();
                } else {
                    d.single_use = false;
                }
                if (is_modified(compressor, tw, this, value, 0, is_immutable(value))) {
                    if (d.single_use) {
                        d.single_use = "m";
                    } else {
                        d.fixed = false;
                    }
                }
                mark_escaped(tw, d, this.scope, this, value, 0, 1);
            }
            var parent;
            if (d.fixed instanceof AST_Defun
                && !((parent = tw.parent()) instanceof AST_Call && parent.expression === this)) {
                var defun = mark_defun(tw, d);
                if (defun) defun.walk(tw);
            }
        });
        def(AST_Toplevel, function(tw, descend, compressor) {
            this.globals.each(function(def) {
                reset_def(tw, compressor, def);
            });
            push(tw);
            reset_variables(tw, compressor, this);
            descend();
            pop(tw);
            walk_defuns(tw, this);
            return true;
        });
        def(AST_Try, function(tw) {
            push(tw);
            walk_body(this, tw);
            pop(tw);
            if (this.bcatch) {
                push(tw);
                this.bcatch.walk(tw);
                pop(tw);
            }
            if (this.bfinally) this.bfinally.walk(tw);
            return true;
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            if (!unary_arithmetic[node.operator]) return;
            var exp = node.expression;
            if (!(exp instanceof AST_SymbolRef)) {
                mark_assignment_to_arguments(exp);
                return;
            }
            if (exp.fixed) delete exp.fixed;
            var d = exp.definition();
            var safe = safe_to_assign(tw, d, exp.scope, true);
            d.assignments++;
            var fixed = d.fixed;
            if (!fixed) return;
            d.chained = true;
            exp.fixed = d.fixed = function() {
                return make_node(AST_Binary, node, {
                    operator: node.operator.slice(0, -1),
                    left: make_node(AST_UnaryPrefix, node, {
                        operator: "+",
                        expression: fixed instanceof AST_Node ? fixed : fixed()
                    }),
                    right: make_node(AST_Number, node, {
                        value: 1
                    })
                });
            };
            if (!safe) return;
            d.references.push(exp);
            mark(tw, d, true);
            return true;
        });
        def(AST_VarDef, function(tw, descend) {
            var node = this;
            var d = node.name.definition();
            if (node.value) {
                if (safe_to_assign(tw, d, node.name.scope, node.value)) {
                    d.fixed = function() {
                        return node.value;
                    };
                    tw.loop_ids[d.id] = tw.in_loop;
                    mark(tw, d, false);
                    descend();
                    mark(tw, d, true);
                    return true;
                } else {
                    d.fixed = false;
                }
            }
        });
        def(AST_While, function(tw, descend) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            descend();
            pop(tw);
            tw.in_loop = saved_loop;
            return true;
        });
    })(function(node, func) {
        node.DEFMETHOD("reduce_vars", func);
    });

    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var tw = new TreeWalker(compressor.option("reduce_vars") ? function(node, descend) {
            node._squeezed = false;
            node._optimized = false;
            return node.reduce_vars(tw, descend, compressor);
        } : function(node) {
            node._squeezed = false;
            node._optimized = false;
        });
        // Flow control for visiting `AST_Defun`s
        tw.defun_ids = Object.create(null);
        tw.defun_visited = Object.create(null);
        // Record the loop body in which `AST_SymbolDeclaration` is first encountered
        tw.in_loop = null;
        tw.loop_ids = Object.create(null);
        // Stack of look-up tables to keep track of whether a `SymbolDef` has been
        // properly assigned before use:
        // - `push()` & `pop()` when visiting conditional branches
        // - backup & restore via `save_ids` when visiting out-of-order sections
        tw.safe_ids = Object.create(null);
        this.walk(tw);
    });

    AST_Symbol.DEFMETHOD("fixed_value", function(final) {
        var fixed = this.definition().fixed;
        if (!fixed) return fixed;
        if (!final && this.fixed) fixed = this.fixed;
        return fixed instanceof AST_Node ? fixed : fixed();
    });

    AST_SymbolRef.DEFMETHOD("is_immutable", function() {
        var orig = this.definition().orig;
        return orig.length == 1 && orig[0] instanceof AST_SymbolLambda;
    });

    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_This) return true;
        if (lhs instanceof AST_SymbolRef) {
            var def = lhs.definition();
            return def.orig[0] instanceof AST_SymbolLambda
                || compressor.exposed(def) && identifier_atom[def.name];
        }
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                if (lhs.is_immutable()) return false;
                lhs = lhs.fixed_value();
            }
            if (!lhs) return true;
            if (lhs.is_constant()) return true;
            return is_lhs_read_only(lhs, compressor);
        }
        return false;
    }

    function find_variable(compressor, name) {
        var scope, i = 0;
        while (scope = compressor.parent(i++)) {
            if (scope instanceof AST_Scope) break;
            if (scope instanceof AST_Catch) {
                scope = scope.argname.definition().scope;
                break;
            }
        }
        return scope.find_variable(name);
    }

    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
        return new ctor(props);
    }

    function make_sequence(orig, expressions) {
        if (expressions.length == 1) return expressions[0];
        return make_node(AST_Sequence, orig, {
            expressions: expressions.reduce(merge_sequence, [])
        });
    }

    function make_node_from_constant(val, orig) {
        switch (typeof val) {
          case "string":
            return make_node(AST_String, orig, {
                value: val
            });
          case "number":
            if (isNaN(val)) return make_node(AST_NaN, orig);
            if (isFinite(val)) {
                return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
                    operator: "-",
                    expression: make_node(AST_Number, orig, { value: -val })
                }) : make_node(AST_Number, orig, { value: val });
            }
            return val < 0 ? make_node(AST_UnaryPrefix, orig, {
                operator: "-",
                expression: make_node(AST_Infinity, orig)
            }) : make_node(AST_Infinity, orig);
          case "boolean":
            return make_node(val ? AST_True : AST_False, orig);
          case "undefined":
            return make_node(AST_Undefined, orig);
          default:
            if (val === null) {
                return make_node(AST_Null, orig, { value: null });
            }
            if (val instanceof RegExp) {
                return make_node(AST_RegExp, orig, { value: val });
            }
            throw new Error(string_template("Can't handle constant of type: {type}", {
                type: typeof val
            }));
        }
    }

    function needs_unbinding(compressor, val) {
        return val instanceof AST_PropAccess
            || compressor.has_directive("use strict")
                && is_undeclared_ref(val)
                && val.name == "eval";
    }

    // we shouldn't compress (1,func)(something) to
    // func(something) because that changes the meaning of
    // the func (becomes lexical instead of global).
    function maintain_this_binding(compressor, parent, orig, val) {
        if (parent instanceof AST_UnaryPrefix && parent.operator == "delete"
            || parent.TYPE == "Call" && parent.expression === orig && needs_unbinding(compressor, val)) {
            return make_sequence(orig, [ make_node(AST_Number, orig, { value: 0 }), val ]);
        }
        return val;
    }

    function merge_sequence(array, node) {
        if (node instanceof AST_Sequence) {
            array.push.apply(array, node.expressions);
        } else {
            array.push(node);
        }
        return array;
    }

    function as_statement_array(thing) {
        if (thing === null) return [];
        if (thing instanceof AST_BlockStatement) return thing.body;
        if (thing instanceof AST_EmptyStatement) return [];
        if (thing instanceof AST_Statement) return [ thing ];
        throw new Error("Can't convert thing to statement array");
    }

    function is_empty(thing) {
        if (thing === null) return true;
        if (thing instanceof AST_EmptyStatement) return true;
        if (thing instanceof AST_BlockStatement) return thing.body.length == 0;
        return false;
    }

    function loop_body(x) {
        if (x instanceof AST_IterationStatement) {
            return x.body instanceof AST_BlockStatement ? x.body : x;
        }
        return x;
    }

    function root_expr(prop) {
        while (prop instanceof AST_PropAccess) prop = prop.expression;
        return prop;
    }

    function is_iife_call(node) {
        if (node.TYPE != "Call") return false;
        return node.expression instanceof AST_Function || is_iife_call(node.expression);
    }

    function is_undeclared_ref(node) {
        return node instanceof AST_SymbolRef && node.definition().undeclared;
    }

    var global_names = makePredicate("Array Boolean clearInterval clearTimeout console Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error escape eval EvalError Function isFinite isNaN JSON Math Number parseFloat parseInt RangeError ReferenceError RegExp Object setInterval setTimeout String SyntaxError TypeError unescape URIError");
    AST_SymbolRef.DEFMETHOD("is_declared", function(compressor) {
        return !this.definition().undeclared
            || compressor.option("unsafe") && global_names[this.name];
    });

    var identifier_atom = makePredicate("Infinity NaN undefined");
    function is_identifier_atom(node) {
        return node instanceof AST_Infinity
            || node instanceof AST_NaN
            || node instanceof AST_Undefined;
    }

    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        find_loop_scope_try();
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
            eliminate_spurious_blocks(statements);
            if (compressor.option("dead_code")) {
                eliminate_dead_code(statements, compressor);
            }
            if (compressor.option("if_return")) {
                handle_if_return(statements, compressor);
            }
            if (compressor.sequences_limit > 0) {
                sequencesize(statements, compressor);
                sequencesize_2(statements, compressor);
            }
            if (compressor.option("join_vars")) {
                join_consecutive_vars(statements);
            }
            if (compressor.option("collapse_vars")) {
                collapse(statements, compressor);
            }
        } while (CHANGED && max_iter-- > 0);

        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (node instanceof AST_Catch || node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                    break;
                } else if (node instanceof AST_Try) {
                    in_try = true;
                }
            } while (node = compressor.parent(level++));
        }

        // Search from right to left for assignment-like expressions:
        // - `var a = x;`
        // - `a = x;`
        // - `++a`
        // For each candidate, scan from left to right for first usage, then try
        // to fold assignment into the site for compression.
        // Will not attempt to collapse assignments into or past code blocks
        // which are not sequentially executed, e.g. loops and conditionals.
        function collapse(statements, compressor) {
            if (scope.pinned()) return statements;
            var args;
            var candidates = [];
            var stat_index = statements.length;
            var scanner = new TreeTransformer(function(node) {
                if (abort) return node;
                // Skip nodes before `candidate` as quickly as possible
                if (!hit) {
                    if (node !== hit_stack[hit_index]) return node;
                    hit_index++;
                    if (hit_index < hit_stack.length) return handle_custom_scan_order(node);
                    hit = true;
                    stop_after = find_stop(node, 0);
                    if (stop_after === node) abort = true;
                    return node;
                }
                // Stop immediately if these node types are encountered
                var parent = scanner.parent();
                if (should_stop(node, parent)) {
                    abort = true;
                    return node;
                }
                // Stop only if candidate is found within conditional branches
                if (!stop_if_hit && in_conditional(node, parent)) {
                    stop_if_hit = parent;
                }
                // Replace variable with assignment when found
                var hit_rhs;
                if (can_replace
                    && !(node instanceof AST_SymbolDeclaration)
                    && (scan_lhs && lhs.equivalent_to(node)
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        abort = true;
                        return node;
                    }
                    if (is_lhs(node, parent)) {
                        if (value_def) replaced++;
                        return node;
                    } else {
                        replaced++;
                        if (value_def && candidate instanceof AST_VarDef) return node;
                    }
                    CHANGED = abort = true;
                    AST_Node.info("Collapsing {name} [{file}:{line},{col}]", {
                        name: node.print_to_string(),
                        file: node.start.file,
                        line: node.start.line,
                        col: node.start.col
                    });
                    if (candidate instanceof AST_UnaryPostfix) {
                        return make_node(AST_UnaryPrefix, candidate, candidate);
                    }
                    if (candidate instanceof AST_VarDef) {
                        var def = candidate.name.definition();
                        if (def.references.length - def.replaced == 1 && !compressor.exposed(def)) {
                            def.replaced++;
                            return maintain_this_binding(compressor, parent, node, candidate.value);
                        }
                        return make_node(AST_Assign, candidate, {
                            operator: "=",
                            left: make_node(AST_SymbolRef, candidate.name, candidate.name),
                            right: candidate.value
                        });
                    }
                    candidate.write_only = false;
                    return candidate;
                }
                // These node types have child nodes that execute sequentially,
                // but are otherwise not safe to scan into or beyond them.
                var sym;
                if (is_last_node(node, parent) || may_throw(node)) {
                    stop_after = node;
                    if (node instanceof AST_Scope) abort = true;
                }
                return handle_custom_scan_order(node);
            }, function(node) {
                if (abort) return;
                if (stop_after === node) abort = true;
                if (stop_if_hit === node) stop_if_hit = null;
            });
            var multi_replacer = new TreeTransformer(function(node) {
                if (abort) return node;
                // Skip nodes before `candidate` as quickly as possible
                if (!hit) {
                    if (node !== hit_stack[hit_index]) return node;
                    hit_index++;
                    if (hit_index < hit_stack.length) return;
                    hit = true;
                    return node;
                }
                // Replace variable when found
                if (node instanceof AST_SymbolRef
                    && node.name == def.name) {
                    if (!--replaced) abort = true;
                    if (is_lhs(node, multi_replacer.parent())) return node;
                    def.replaced++;
                    value_def.replaced--;
                    return candidate.value.clone();
                }
                // Skip (non-executed) functions and (leading) default case in switch statements
                if (node instanceof AST_Default || node instanceof AST_Scope) return node;
            });
            while (--stat_index >= 0) {
                // Treat parameters as collapsible in IIFE, i.e.
                //   function(a, b){ ... }(x());
                // would be translated into equivalent assignments:
                //   var a = x(), b = undefined;
                if (stat_index == 0 && compressor.option("unused")) extract_args();
                // Find collapsible assignments
                var hit_stack = [];
                extract_candidates(statements[stat_index]);
                while (candidates.length > 0) {
                    hit_stack = candidates.pop();
                    var hit_index = 0;
                    var candidate = hit_stack[hit_stack.length - 1];
                    var value_def = null;
                    var stop_after = null;
                    var stop_if_hit = null;
                    var lhs = get_lhs(candidate);
                    var side_effects = lhs && lhs.has_side_effects(compressor);
                    var scan_lhs = lhs && !side_effects && !is_lhs_read_only(lhs, compressor);
                    var scan_rhs = foldable(get_rhs(candidate));
                    if (!scan_lhs && !scan_rhs) continue;
                    // Locate symbols which may execute code outside of scanning range
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    if (!side_effects) side_effects = value_has_side_effects(candidate);
                    var replace_all = replace_all_symbols();
                    var may_throw = candidate.may_throw(compressor) ? in_try ? function(node) {
                        return node.has_side_effects(compressor);
                    } : side_effects_external : return_false;
                    var funarg = candidate.name instanceof AST_SymbolFunarg;
                    var hit = funarg;
                    var abort = false, replaced = 0, can_replace = !args || !hit;
                    if (!can_replace) {
                        for (var j = compressor.self().argnames.lastIndexOf(candidate.name) + 1; !abort && j < args.length; j++) {
                            args[j].transform(scanner);
                        }
                        can_replace = true;
                    }
                    for (var i = stat_index; !abort && i < statements.length; i++) {
                        statements[i].transform(scanner);
                    }
                    if (value_def) {
                        var def = candidate.name.definition();
                        if (abort && def.references.length - def.replaced > replaced) replaced = false;
                        else {
                            abort = false;
                            hit_index = 0;
                            hit = funarg;
                            for (var i = stat_index; !abort && i < statements.length; i++) {
                                statements[i].transform(multi_replacer);
                            }
                            value_def.single_use = false;
                        }
                    }
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }

            function handle_custom_scan_order(node) {
                // Skip (non-executed) functions
                if (node instanceof AST_Scope) return node;
                // Scan case expressions first in a switch statement
                if (node instanceof AST_Switch) {
                    node.expression = node.expression.transform(scanner);
                    for (var i = 0; !abort && i < node.body.length; i++) {
                        var branch = node.body[i];
                        if (branch instanceof AST_Case) {
                            if (!hit) {
                                if (branch !== hit_stack[hit_index]) continue;
                                hit_index++;
                            }
                            branch.expression = branch.expression.transform(scanner);
                            if (!replace_all) break;
                        }
                    }
                    abort = true;
                    return node;
                }
            }

            function should_stop(node, parent) {
                if (parent instanceof AST_For) return node !== parent.init;
                if (node instanceof AST_Assign) {
                    return node.operator != "=" && lhs.equivalent_to(node.left);
                }
                if (node instanceof AST_Call) {
                    return lhs instanceof AST_PropAccess && lhs.equivalent_to(node.expression);
                }
                if (node instanceof AST_Debugger) return true;
                if (node instanceof AST_IterationStatement) return !(node instanceof AST_For);
                if (node instanceof AST_LoopControl) return true;
                if (node instanceof AST_Try) return true;
                if (node instanceof AST_With) return true;
                if (replace_all) return false;
                return node instanceof AST_SymbolRef
                    && !node.is_declared(compressor)
                    && !(parent instanceof AST_Assign && parent.left === node);
            }

            function in_conditional(node, parent) {
                if (parent instanceof AST_Binary) return lazy_op[parent.operator] && parent.left !== node;
                if (parent instanceof AST_Conditional) return parent.condition !== node;
                return parent instanceof AST_If && parent.condition !== node;
            }

            function is_last_node(node, parent) {
                if (node instanceof AST_Call) return true;
                if (node instanceof AST_Exit) {
                    return side_effects || lhs instanceof AST_PropAccess || may_modify(lhs);
                }
                if (node instanceof AST_Function) {
                    return compressor.option("ie8") && node.name && node.name.name in lvalues;
                }
                if (node instanceof AST_PropAccess) {
                    return side_effects || node.expression.may_throw_on_access(compressor);
                }
                if (node instanceof AST_SymbolRef) {
                    if (symbol_in_lvalues(node, parent)) {
                        return !parent || parent.operator != "=" || parent.left !== node;
                    }
                    return side_effects && may_modify(node);
                }
                if (node instanceof AST_This) return symbol_in_lvalues(node, parent);
                if (node instanceof AST_VarDef) {
                    if (!node.value) return false;
                    return node.name.name in lvalues || side_effects && may_modify(node.name);
                }
                var sym = is_lhs(node.left, node);
                if (sym && sym.name in lvalues) return true;
                if (sym instanceof AST_PropAccess) return true;
            }

            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_Function
                    && !fn.name
                    && !fn.uses_arguments
                    && !fn.pinned()
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn) {
                    var fn_strict = compressor.has_directive("use strict");
                    if (fn_strict && !member(fn_strict, fn.body)) fn_strict = false;
                    var len = fn.argnames.length;
                    args = iife.args.slice(len);
                    var names = Object.create(null);
                    for (var i = len; --i >= 0;) {
                        var sym = fn.argnames[i];
                        var arg = iife.args[i];
                        args.unshift(make_node(AST_VarDef, sym, {
                            name: sym,
                            value: arg
                        }));
                        if (sym.name in names) continue;
                        names[sym.name] = true;
                        if (!arg) {
                            arg = make_node(AST_Undefined, sym).transform(compressor);
                        } else if (arg instanceof AST_Lambda && arg.pinned()) {
                            arg = null;
                        } else {
                            arg.walk(new TreeWalker(function(node) {
                                if (!arg) return true;
                                if (node instanceof AST_SymbolRef && fn.variables.has(node.name)) {
                                    var s = node.definition().scope;
                                    if (s !== scope) while (s = s.parent_scope) {
                                        if (s === scope) return true;
                                    }
                                    arg = null;
                                }
                                if (node instanceof AST_This && (fn_strict || !this.find_parent(AST_Scope))) {
                                    arg = null;
                                    return true;
                                }
                            }));
                        }
                        if (arg) candidates.unshift([ make_node(AST_VarDef, sym, {
                            name: sym,
                            value: arg
                        }) ]);
                    }
                }
            }

            function extract_candidates(expr) {
                hit_stack.push(expr);
                if (expr instanceof AST_Assign) {
                    candidates.push(hit_stack.slice());
                    extract_candidates(expr.left);
                    extract_candidates(expr.right);
                } else if (expr instanceof AST_Binary) {
                    extract_candidates(expr.left);
                    extract_candidates(expr.right);
                } else if (expr instanceof AST_Call) {
                    extract_candidates(expr.expression);
                    expr.args.forEach(extract_candidates);
                } else if (expr instanceof AST_Case) {
                    extract_candidates(expr.expression);
                } else if (expr instanceof AST_Conditional) {
                    extract_candidates(expr.condition);
                    extract_candidates(expr.consequent);
                    extract_candidates(expr.alternative);
                } else if (expr instanceof AST_Definitions) {
                    expr.definitions.forEach(extract_candidates);
                } else if (expr instanceof AST_Dot) {
                    extract_candidates(expr.expression);
                } else if (expr instanceof AST_DWLoop) {
                    extract_candidates(expr.condition);
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                } else if (expr instanceof AST_Exit) {
                    if (expr.value) extract_candidates(expr.value);
                } else if (expr instanceof AST_For) {
                    if (expr.init) extract_candidates(expr.init);
                    if (expr.condition) extract_candidates(expr.condition);
                    if (expr.step) extract_candidates(expr.step);
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                } else if (expr instanceof AST_ForIn) {
                    extract_candidates(expr.object);
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                } else if (expr instanceof AST_If) {
                    extract_candidates(expr.condition);
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                    if (expr.alternative && !(expr.alternative instanceof AST_Block)) {
                        extract_candidates(expr.alternative);
                    }
                } else if (expr instanceof AST_Sequence) {
                    expr.expressions.forEach(extract_candidates);
                } else if (expr instanceof AST_SimpleStatement) {
                    extract_candidates(expr.body);
                } else if (expr instanceof AST_Sub) {
                    extract_candidates(expr.expression);
                    extract_candidates(expr.property);
                } else if (expr instanceof AST_Switch) {
                    extract_candidates(expr.expression);
                    expr.body.forEach(extract_candidates);
                } else if (expr instanceof AST_Unary) {
                    if (unary_arithmetic[expr.operator]) {
                        candidates.push(hit_stack.slice());
                    } else {
                        extract_candidates(expr.expression);
                    }
                } else if (expr instanceof AST_VarDef) {
                    if (expr.value) {
                        var def = expr.name.definition();
                        if (def.references.length > def.replaced) {
                            candidates.push(hit_stack.slice());
                        }
                        extract_candidates(expr.value);
                    }
                }
                hit_stack.pop();
            }

            function find_stop(node, level, write_only) {
                var parent = scanner.parent(level);
                if (parent instanceof AST_Assign) {
                    if (write_only
                        && !(parent.left instanceof AST_PropAccess
                            || parent.left.name in lvalues)) {
                        return find_stop(parent, level + 1, write_only);
                    }
                    return node;
                }
                if (parent instanceof AST_Binary) {
                    if (write_only && (!lazy_op[parent.operator] || parent.left === node)) {
                        return find_stop(parent, level + 1, write_only);
                    }
                    return node;
                }
                if (parent instanceof AST_Call) return node;
                if (parent instanceof AST_Case) return node;
                if (parent instanceof AST_Conditional) {
                    if (write_only && parent.condition === node) {
                        return find_stop(parent, level + 1, write_only);
                    }
                    return node;
                }
                if (parent instanceof AST_Definitions) {
                    return find_stop(parent, level + 1, true);
                }
                if (parent instanceof AST_Exit) {
                    return write_only ? find_stop(parent, level + 1, write_only) : node;
                }
                if (parent instanceof AST_If) {
                    if (write_only && parent.condition === node) {
                        return find_stop(parent, level + 1, write_only);
                    }
                    return node;
                }
                if (parent instanceof AST_IterationStatement) return node;
                if (parent instanceof AST_PropAccess) return node;
                if (parent instanceof AST_Sequence) {
                    return find_stop(parent, level + 1, parent.tail_node() !== node);
                }
                if (parent instanceof AST_SimpleStatement) {
                    return find_stop(parent, level + 1, true);
                }
                if (parent instanceof AST_Switch) return node;
                if (parent instanceof AST_Unary) return node;
                if (parent instanceof AST_VarDef) return node;
                return null;
            }

            function mangleable_var(var_def) {
                var value = var_def.value;
                if (!(value instanceof AST_SymbolRef)) return;
                var def = value.definition();
                if (def.undeclared) return;
                if (is_arguments(def)) return;
                return value_def = def;
            }

            function get_lhs(expr) {
                if (expr instanceof AST_VarDef) {
                    var def = expr.name.definition();
                    if (!member(expr.name, def.orig)) return;
                    var referenced = def.references.length - def.replaced;
                    var declared = def.orig.length - def.eliminated;
                    if (declared > 1 && !(expr.name instanceof AST_SymbolFunarg)
                        || (referenced > 1 ? mangleable_var(expr) : !compressor.exposed(def))) {
                        return make_node(AST_SymbolRef, expr.name, expr.name);
                    }
                } else {
                    return expr[expr instanceof AST_Assign ? "left" : "expression"];
                }
            }

            function get_rhs(expr) {
                return candidate instanceof AST_Assign && candidate.operator == "=" && candidate.right;
            }

            function get_rvalue(expr) {
                return expr[expr instanceof AST_Assign ? "right" : "value"];
            }

            function invariant(expr) {
                if (expr instanceof AST_Array) return false;
                if (expr instanceof AST_Binary && lazy_op[expr.operator]) {
                    return invariant(expr.left) && invariant(expr.right);
                }
                if (expr instanceof AST_Call) return false;
                if (expr instanceof AST_Conditional) {
                    return invariant(expr.consequent) && invariant(expr.alternative);
                }
                if (expr instanceof AST_Object) return false;
                return !expr.has_side_effects(compressor);
            }

            function foldable(expr) {
                if (!expr) return false;
                if (expr instanceof AST_SymbolRef) {
                    var value = expr.evaluate(compressor);
                    if (value === expr) return rhs_exact_match;
                    return rhs_fuzzy_match(value, rhs_exact_match);
                }
                if (expr instanceof AST_This) return rhs_exact_match;
                if (expr.is_truthy()) return rhs_fuzzy_match(true, return_false);
                if (expr.is_constant()) {
                    return rhs_fuzzy_match(expr.evaluate(compressor), rhs_exact_match);
                }
                if (!(lhs instanceof AST_SymbolRef)) return false;
                if (!invariant(expr)) return false;
                var circular;
                var def = lhs.definition();
                expr.walk(new TreeWalker(function(node) {
                    if (circular) return true;
                    if (node instanceof AST_SymbolRef && node.definition() === def) {
                        circular = true;
                    }
                }));
                return !circular && rhs_exact_match;

                function rhs_exact_match(node) {
                    return expr.equivalent_to(node);
                }
            }

            function rhs_fuzzy_match(value, fallback) {
                return function(node, tw) {
                    if (tw.in_boolean_context()) {
                        if (value && node.is_truthy() && !node.has_side_effects(compressor)) {
                            return true;
                        }
                        if (node.is_constant()) {
                            return !node.evaluate(compressor) == !value;
                        }
                    }
                    return fallback(node);
                };
            }

            function get_lvalues(expr) {
                var lvalues = Object.create(null);
                if (candidate instanceof AST_VarDef) {
                    lvalues[candidate.name.name] = lhs;
                }
                var tw = new TreeWalker(function(node) {
                    var value;
                    if (node instanceof AST_SymbolRef) {
                        value = node.fixed_value() || node;
                    } else if (node instanceof AST_This) {
                        value = node;
                    }
                    if (value && !lvalues[node.name]) {
                        lvalues[node.name] = is_modified(compressor, tw, node, value, 0);
                    }
                });
                expr.walk(tw);
                return lvalues;
            }

            function remove_candidate(expr) {
                if (expr.name instanceof AST_SymbolFunarg) {
                    var index = compressor.self().argnames.indexOf(expr.name);
                    var args = compressor.parent().args;
                    if (args[index]) args[index] = make_node(AST_Number, args[index], {
                        value: 0
                    });
                    return true;
                }
                var found = false;
                return statements[stat_index].transform(new TreeTransformer(function(node, descend, in_list) {
                    if (found) return node;
                    if (node !== expr && node.body !== expr) return;
                    if (node instanceof AST_VarDef) {
                        found = true;
                        node.value = null;
                        return node;
                    }
                    if (in_list) {
                        found = true;
                        return MAP.skip;
                    }
                    if (!this.parent()) {
                        found = true;
                        return null;
                    }
                }, function(node) {
                    if (node instanceof AST_Sequence) switch (node.expressions.length) {
                      case 0: return null;
                      case 1: return node.expressions[0];
                    }
                }));
            }

            function is_lhs_local(lhs) {
                var sym = root_expr(lhs);
                return sym instanceof AST_SymbolRef
                    && sym.definition().scope === scope
                    && !(in_loop
                        && (sym.name in lvalues && lvalues[sym.name] !== lhs
                            || candidate instanceof AST_Unary
                            || candidate instanceof AST_Assign && candidate.operator != "="));
            }

            function value_has_side_effects(expr) {
                if (expr instanceof AST_Unary) return false;
                return get_rvalue(expr).has_side_effects(compressor);
            }

            function replace_all_symbols() {
                if (side_effects) return false;
                if (value_def) return true;
                if (lhs instanceof AST_SymbolRef) {
                    var def = lhs.definition();
                    if (def.references.length - def.replaced == (candidate instanceof AST_VarDef ? 1 : 2)) {
                        return true;
                    }
                }
                return false;
            }

            function symbol_in_lvalues(sym, parent) {
                var lvalue = lvalues[sym.name];
                if (!lvalue) return;
                if (lvalue !== lhs) return !(parent instanceof AST_Call && parent.expression === sym);
                scan_rhs = false;
            }

            function may_modify(sym) {
                var def = sym.definition();
                if (def.orig.length == 1 && def.orig[0] instanceof AST_SymbolDefun) return false;
                if (def.scope !== scope) return true;
                return !all(def.references, function(ref) {
                    return ref.scope.resolve() === scope;
                });
            }

            function side_effects_external(node, lhs) {
                if (node instanceof AST_Assign) return side_effects_external(node.left, true);
                if (node instanceof AST_Unary) return side_effects_external(node.expression, true);
                if (node instanceof AST_VarDef) return node.value && side_effects_external(node.value);
                if (lhs) {
                    if (node instanceof AST_Dot) return side_effects_external(node.expression, true);
                    if (node instanceof AST_Sub) return side_effects_external(node.expression, true);
                    if (node instanceof AST_SymbolRef) return node.definition().scope !== scope;
                }
                return false;
            }
        }

        function eliminate_spurious_blocks(statements) {
            var seen_dirs = [];
            for (var i = 0; i < statements.length;) {
                var stat = statements[i];
                if (stat instanceof AST_BlockStatement) {
                    CHANGED = true;
                    eliminate_spurious_blocks(stat.body);
                    [].splice.apply(statements, [i, 1].concat(stat.body));
                    i += stat.body.length;
                } else if (stat instanceof AST_EmptyStatement) {
                    CHANGED = true;
                    statements.splice(i, 1);
                } else if (stat instanceof AST_Directive) {
                    if (!member(stat.value, seen_dirs)) {
                        i++;
                        seen_dirs.push(stat.value);
                    } else {
                        CHANGED = true;
                        statements.splice(i, 1);
                    }
                } else i++;
            }
        }

        function handle_if_return(statements, compressor) {
            var self = compressor.self();
            var multiple_if_returns = has_multiple_if_returns(statements);
            var in_lambda = self instanceof AST_Lambda;
            for (var i = statements.length; --i >= 0;) {
                var stat = statements[i];
                var j = next_index(i);
                var next = statements[j];

                if (in_lambda && !next && stat instanceof AST_Return) {
                    if (!stat.value) {
                        CHANGED = true;
                        statements.splice(i, 1);
                        continue;
                    }
                    if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                        CHANGED = true;
                        statements[i] = make_node(AST_SimpleStatement, stat, {
                            body: stat.value.expression
                        });
                        continue;
                    }
                }

                if (stat instanceof AST_If) {
                    var ab = aborts(stat.body);
                    if (can_merge_flow(ab)) {
                        if (ab.label) {
                            remove(ab.label.thedef.references, ab);
                        }
                        CHANGED = true;
                        stat = stat.clone();
                        stat.condition = stat.condition.negate(compressor);
                        var body = as_statement_array_with_return(stat.body, ab);
                        stat.body = make_node(AST_BlockStatement, stat, {
                            body: as_statement_array(stat.alternative).concat(extract_functions())
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat, {
                            body: body
                        });
                        statements[i] = stat.transform(compressor);
                        continue;
                    }

                    if (ab && !stat.alternative && stat.body instanceof AST_BlockStatement && next instanceof AST_Jump) {
                        var negated = stat.condition.negate(compressor);
                        if (negated.print_to_string().length <= stat.condition.print_to_string().length) {
                            CHANGED = true;
                            stat = stat.clone();
                            stat.condition = negated;
                            statements[j] = stat.body;
                            stat.body = next;
                            statements[i] = stat.transform(compressor);
                            continue;
                        }
                    }

                    var ab = aborts(stat.alternative);
                    if (can_merge_flow(ab)) {
                        if (ab.label) {
                            remove(ab.label.thedef.references, ab);
                        }
                        CHANGED = true;
                        stat = stat.clone();
                        stat.body = make_node(AST_BlockStatement, stat.body, {
                            body: as_statement_array(stat.body).concat(extract_functions())
                        });
                        var body = as_statement_array_with_return(stat.alternative, ab);
                        stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                            body: body
                        });
                        statements[i] = stat.transform(compressor);
                        continue;
                    }
                }

                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                    var value = stat.body.value;
                    //---
                    // pretty silly case, but:
                    // if (foo()) return; return; ==> foo(); return;
                    if (!value && !stat.alternative
                        && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                        CHANGED = true;
                        statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                            body: stat.condition
                        });
                        continue;
                    }
                    //---
                    // if (foo()) return x; return y; ==> return foo() ? x : y;
                    if (value && !stat.alternative && next instanceof AST_Return && next.value) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = next;
                        statements.splice(i, 1, stat.transform(compressor));
                        statements.splice(j, 1);
                        continue;
                    }
                    //---
                    // if (foo()) return x; [ return ; ] ==> return foo() ? x : undefined;
                    if (value && !stat.alternative
                        && (!next && in_lambda && multiple_if_returns
                            || next instanceof AST_Return)) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = next || make_node(AST_Return, stat, {
                            value: null
                        });
                        statements.splice(i, 1, stat.transform(compressor));
                        if (next) statements.splice(j, 1);
                        continue;
                    }
                    //---
                    // if (a) return b; if (c) return d; e; ==> return a ? b : c ? d : void e;
                    //
                    // if sequences is not enabled, this can lead to an endless loop (issue #866).
                    // however, with sequences on this helps producing slightly better output for
                    // the example code.
                    var prev = statements[prev_index(i)];
                    if (compressor.option("sequences") && in_lambda && !stat.alternative
                        && prev instanceof AST_If && prev.body instanceof AST_Return
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = make_node(AST_BlockStatement, next, {
                            body: [
                                next,
                                make_node(AST_Return, next, {
                                    value: null
                                })
                            ]
                        });
                        statements.splice(i, 1, stat.transform(compressor));
                        statements.splice(j, 1);
                        continue;
                    }
                }
            }

            function has_multiple_if_returns(statements) {
                var n = 0;
                for (var i = statements.length; --i >= 0;) {
                    var stat = statements[i];
                    if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                        if (++n > 1) return true;
                    }
                }
                return false;
            }

            function is_return_void(value) {
                return !value || value instanceof AST_UnaryPrefix && value.operator == "void";
            }

            function can_merge_flow(ab) {
                if (!ab) return false;
                var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab) : null;
                return ab instanceof AST_Return && in_lambda && is_return_void(ab.value)
                    || ab instanceof AST_Continue && self === loop_body(lct)
                    || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct;
            }

            function extract_functions() {
                var tail = statements.slice(i + 1);
                statements.length = i + 1;
                return tail.filter(function(stat) {
                    if (stat instanceof AST_Defun) {
                        statements.push(stat);
                        return false;
                    }
                    return true;
                });
            }

            function as_statement_array_with_return(node, ab) {
                var body = as_statement_array(node).slice(0, -1);
                if (ab.value) {
                    body.push(make_node(AST_SimpleStatement, ab.value, {
                        body: ab.value.expression
                    }));
                }
                return body;
            }

            function next_index(i) {
                for (var j = i + 1; j < statements.length; j++) {
                    var stat = statements[j];
                    if (!(stat instanceof AST_Var && declarations_only(stat))) {
                        break;
                    }
                }
                return j;
            }

            function prev_index(i) {
                for (var j = i; --j >= 0;) {
                    var stat = statements[j];
                    if (!(stat instanceof AST_Var && declarations_only(stat))) {
                        break;
                    }
                }
                return j;
            }
        }

        function eliminate_dead_code(statements, compressor) {
            var has_quit;
            var self = compressor.self();
            for (var i = 0, n = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                if (stat instanceof AST_LoopControl) {
                    var lct = compressor.loopcontrol_target(stat);
                    if (stat instanceof AST_Break
                            && !(lct instanceof AST_IterationStatement)
                            && loop_body(lct) === self
                        || stat instanceof AST_Continue
                            && loop_body(lct) === self) {
                        if (stat.label) {
                            remove(stat.label.thedef.references, stat);
                        }
                    } else {
                        statements[n++] = stat;
                    }
                } else {
                    statements[n++] = stat;
                }
                if (aborts(stat)) {
                    has_quit = statements.slice(i + 1);
                    break;
                }
            }
            statements.length = n;
            CHANGED = n != len;
            if (has_quit) has_quit.forEach(function(stat) {
                extract_declarations_from_unreachable_code(stat, statements);
            });
        }

        function declarations_only(node) {
            return all(node.definitions, function(var_def) {
                return !var_def.value;
            });
        }

        function sequencesize(statements, compressor) {
            if (statements.length < 2) return;
            var seq = [], n = 0;
            function push_seq() {
                if (!seq.length) return;
                var body = make_sequence(seq[0], seq);
                statements[n++] = make_node(AST_SimpleStatement, body, { body: body });
                seq = [];
            }
            for (var i = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                if (stat instanceof AST_SimpleStatement) {
                    if (seq.length >= compressor.sequences_limit) push_seq();
                    var body = stat.body;
                    if (seq.length > 0) body = body.drop_side_effect_free(compressor);
                    if (body) merge_sequence(seq, body);
                } else if (stat instanceof AST_Definitions && declarations_only(stat)
                    || stat instanceof AST_Defun) {
                    statements[n++] = stat;
                } else {
                    push_seq();
                    statements[n++] = stat;
                }
            }
            push_seq();
            statements.length = n;
            if (n != len) CHANGED = true;
        }

        function to_simple_statement(block, decls) {
            if (!(block instanceof AST_BlockStatement)) return block;
            var stat = null;
            for (var i = 0; i < block.body.length; i++) {
                var line = block.body[i];
                if (line instanceof AST_Var && declarations_only(line)) {
                    decls.push(line);
                } else if (stat) {
                    return false;
                } else {
                    stat = line;
                }
            }
            return stat;
        }

        function sequencesize_2(statements, compressor) {
            function cons_seq(right) {
                n--;
                CHANGED = true;
                var left = prev.body;
                return make_sequence(left, [ left, right ]).transform(compressor);
            }
            var n = 0, prev;
            for (var i = 0; i < statements.length; i++) {
                var stat = statements[i];
                if (prev) {
                    if (stat instanceof AST_Exit) {
                        stat.value = cons_seq(stat.value || make_node(AST_Undefined, stat).transform(compressor));
                    } else if (stat instanceof AST_For) {
                        if (!(stat.init instanceof AST_Definitions)) {
                            var abort = false;
                            prev.body.walk(new TreeWalker(function(node) {
                                if (abort || node instanceof AST_Scope) return true;
                                if (node instanceof AST_Binary && node.operator == "in") {
                                    abort = true;
                                    return true;
                                }
                            }));
                            if (!abort) {
                                if (stat.init) stat.init = cons_seq(stat.init);
                                else {
                                    stat.init = prev.body;
                                    n--;
                                    CHANGED = true;
                                }
                            }
                        }
                    } else if (stat instanceof AST_ForIn) {
                        stat.object = cons_seq(stat.object);
                    } else if (stat instanceof AST_If) {
                        stat.condition = cons_seq(stat.condition);
                    } else if (stat instanceof AST_Switch) {
                        stat.expression = cons_seq(stat.expression);
                    } else if (stat instanceof AST_With) {
                        stat.expression = cons_seq(stat.expression);
                    }
                }
                if (compressor.option("conditionals") && stat instanceof AST_If) {
                    var decls = [];
                    var body = to_simple_statement(stat.body, decls);
                    var alt = to_simple_statement(stat.alternative, decls);
                    if (body !== false && alt !== false && decls.length > 0) {
                        var len = decls.length;
                        decls.push(make_node(AST_If, stat, {
                            condition: stat.condition,
                            body: body || make_node(AST_EmptyStatement, stat.body),
                            alternative: alt
                        }));
                        decls.unshift(n, 1);
                        [].splice.apply(statements, decls);
                        i += len;
                        n += len + 1;
                        prev = null;
                        CHANGED = true;
                        continue;
                    }
                }
                statements[n++] = stat;
                prev = stat instanceof AST_SimpleStatement ? stat : null;
            }
            statements.length = n;
        }

        function join_assigns(defn, body) {
            var exprs;
            if (body instanceof AST_Assign) {
                exprs = [ body ];
            } else if (body instanceof AST_Sequence) {
                exprs = body.expressions.slice();
            }
            if (!exprs) return;
            if (defn instanceof AST_Definitions) {
                var def = defn.definitions[defn.definitions.length - 1];
                if (trim_assigns(def.name, def.value, exprs)) return exprs;
            }
            for (var i = exprs.length - 1; --i >= 0;) {
                var expr = exprs[i];
                if (!(expr instanceof AST_Assign)) continue;
                if (expr.operator != "=") continue;
                if (!(expr.left instanceof AST_SymbolRef)) continue;
                var tail = exprs.slice(i + 1);
                if (!trim_assigns(expr.left, expr.right, tail)) continue;
                return exprs.slice(0, i + 1).concat(tail);
            }
        }

        function trim_assigns(name, value, exprs) {
            if (!(value instanceof AST_Object)) return;
            var trimmed = false;
            do {
                var node = exprs[0];
                if (!(node instanceof AST_Assign)) break;
                if (node.operator != "=") break;
                if (!(node.left instanceof AST_PropAccess)) break;
                var sym = node.left.expression;
                if (!(sym instanceof AST_SymbolRef)) break;
                if (name.name != sym.name) break;
                if (!node.right.is_constant_expression(scope)) break;
                var prop = node.left.property;
                if (prop instanceof AST_Node) {
                    prop = prop.evaluate(compressor);
                }
                if (prop instanceof AST_Node) break;
                prop = "" + prop;
                var diff = compressor.has_directive("use strict") ? function(node) {
                    return node.key != prop && node.key.name != prop;
                } : function(node) {
                    return node.key.name != prop;
                };
                if (!all(value.properties, diff)) break;
                value.properties.push(make_node(AST_ObjectKeyVal, node, {
                    key: prop,
                    value: node.right
                }));
                exprs.shift();
                trimmed = true;
            } while (exprs.length);
            return trimmed;
        }

        function join_consecutive_vars(statements) {
            var defs;
            for (var i = 0, j = -1; i < statements.length; i++) {
                var stat = statements[i];
                var prev = statements[j];
                if (stat instanceof AST_Definitions) {
                    if (prev && prev.TYPE == stat.TYPE) {
                        prev.definitions = prev.definitions.concat(stat.definitions);
                        CHANGED = true;
                    } else if (defs && defs.TYPE == stat.TYPE && declarations_only(stat)) {
                        defs.definitions = defs.definitions.concat(stat.definitions);
                        CHANGED = true;
                    } else {
                        statements[++j] = stat;
                        defs = stat;
                    }
                } else if (stat instanceof AST_Exit) {
                    stat.value = join_assigns_expr(stat.value);
                } else if (stat instanceof AST_For) {
                    var exprs = join_assigns(prev, stat.init);
                    if (exprs) {
                        CHANGED = true;
                        stat.init = exprs.length ? make_sequence(stat.init, exprs) : null;
                        statements[++j] = stat;
                    } else if (prev instanceof AST_Var && (!stat.init || stat.init.TYPE == prev.TYPE)) {
                        if (stat.init) {
                            prev.definitions = prev.definitions.concat(stat.init.definitions);
                        }
                        stat.init = prev;
                        statements[j] = stat;
                        CHANGED = true;
                    } else if (defs && stat.init && defs.TYPE == stat.init.TYPE && declarations_only(stat.init)) {
                        defs.definitions = defs.definitions.concat(stat.init.definitions);
                        stat.init = null;
                        statements[++j] = stat;
                        CHANGED = true;
                    } else {
                        statements[++j] = stat;
                    }
                } else if (stat instanceof AST_ForIn) {
                    stat.object = join_assigns_expr(stat.object);
                } else if (stat instanceof AST_If) {
                    stat.condition = join_assigns_expr(stat.condition);
                } else if (stat instanceof AST_SimpleStatement) {
                    var exprs = join_assigns(prev, stat.body);
                    if (exprs) {
                        CHANGED = true;
                        if (!exprs.length) continue;
                        stat.body = make_sequence(stat.body, exprs);
                    }
                    statements[++j] = stat;
                } else if (stat instanceof AST_Switch) {
                    stat.expression = join_assigns_expr(stat.expression);
                } else if (stat instanceof AST_With) {
                    stat.expression = join_assigns_expr(stat.expression);
                } else {
                    statements[++j] = stat;
                }
            }
            statements.length = j + 1;

            function join_assigns_expr(value) {
                statements[++j] = stat;
                var exprs = join_assigns(prev, value);
                if (!exprs) return value;
                CHANGED = true;
                var tail = value.tail_node();
                if (exprs[exprs.length - 1] !== tail) exprs.push(tail.left);
                return make_sequence(value, exprs);
            }
        }
    }

    function extract_declarations_from_unreachable_code(stat, target) {
        if (!(stat instanceof AST_Defun)) {
            AST_Node.warn("Dropping unreachable code [{file}:{line},{col}]", stat.start);
        }
        stat.walk(new TreeWalker(function(node) {
            if (node instanceof AST_Definitions) {
                AST_Node.warn("Declarations in unreachable code! [{file}:{line},{col}]", node.start);
                node.remove_initializers();
                target.push(node);
                return true;
            }
            if (node instanceof AST_Defun) {
                target.push(node);
                return true;
            }
            if (node instanceof AST_Scope) {
                return true;
            }
        }));
    }

    function is_undefined(node, compressor) {
        return node.is_undefined
            || node instanceof AST_Undefined
            || node instanceof AST_UnaryPrefix
                && node.operator == "void"
                && !node.expression.has_side_effects(compressor);
    }

    // is_truthy()
    // return true if `!!node === true`
    (function(def) {
        def(AST_Node, return_false);
        def(AST_Array, return_true);
        def(AST_Assign, function() {
            return this.operator == "=" && this.right.is_truthy();
        });
        def(AST_Lambda, return_true);
        def(AST_Object, return_true);
        def(AST_RegExp, return_true);
        def(AST_Sequence, function() {
            return this.tail_node().is_truthy();
        });
        def(AST_SymbolRef, function() {
            var fixed = this.fixed_value();
            if (!fixed) return false;
            this.is_truthy = return_false;
            var result = fixed.is_truthy();
            delete this.is_truthy;
            return result;
        });
    })(function(node, func) {
        node.DEFMETHOD("is_truthy", func);
    });

    // may_throw_on_access()
    // returns true if this node may be null, undefined or contain `AST_Accessor`
    (function(def) {
        AST_Node.DEFMETHOD("may_throw_on_access", function(compressor) {
            return !compressor.option("pure_getters") || this._dot_throw(compressor);
        });
        function is_strict(compressor) {
            return /strict/.test(compressor.option("pure_getters"));
        }
        def(AST_Node, is_strict);
        def(AST_Array, return_false);
        def(AST_Assign, function(compressor) {
            if (this.operator != "=") return false;
            var rhs = this.right;
            if (!rhs._dot_throw(compressor)) return false;
            var sym = this.left;
            if (!(sym instanceof AST_SymbolRef)) return true;
            if (rhs instanceof AST_Binary && rhs.operator == "||" && sym.name == rhs.left.name) {
                return rhs.right._dot_throw(compressor);
            }
            return true;
        });
        def(AST_Binary, function(compressor) {
            return lazy_op[this.operator] && (this.left._dot_throw(compressor) || this.right._dot_throw(compressor));
        });
        def(AST_Conditional, function(compressor) {
            return this.consequent._dot_throw(compressor) || this.alternative._dot_throw(compressor);
        });
        def(AST_Constant, return_false);
        def(AST_Dot, function(compressor) {
            if (!is_strict(compressor)) return false;
            var exp = this.expression;
            if (exp instanceof AST_SymbolRef) exp = exp.fixed_value();
            return !(exp instanceof AST_Lambda && this.property == "prototype");
        });
        def(AST_Lambda, return_false);
        def(AST_Null, return_true);
        def(AST_Object, function(compressor) {
            if (!is_strict(compressor)) return false;
            for (var i = this.properties.length; --i >=0;)
                if (this.properties[i].value instanceof AST_Accessor) return true;
            return false;
        });
        def(AST_Sequence, function(compressor) {
            return this.tail_node()._dot_throw(compressor);
        });
        def(AST_SymbolRef, function(compressor) {
            if (this.is_undefined) return true;
            if (!is_strict(compressor)) return false;
            if (is_undeclared_ref(this) && this.is_declared(compressor)) return false;
            if (this.is_immutable()) return false;
            if (is_arguments(this.definition())) return false;
            var fixed = this.fixed_value();
            if (!fixed) return true;
            this._dot_throw = return_true;
            var result = fixed._dot_throw(compressor);
            delete this._dot_throw;
            return result;
        });
        def(AST_UnaryPrefix, function() {
            return this.operator == "void";
        });
        def(AST_UnaryPostfix, return_false);
        def(AST_Undefined, return_true);
    })(function(node, func) {
        node.DEFMETHOD("_dot_throw", func);
    });

    (function(def) {
        def(AST_Node, return_false);
        def(AST_Array, return_true);
        def(AST_Assign, function(compressor) {
            return this.operator != "=" || this.right.is_defined(compressor);
        });
        def(AST_Binary, function(compressor) {
            switch (this.operator) {
              case "&&":
                return this.left.is_defined(compressor) && this.right.is_defined(compressor);
              case "||":
                return this.left.is_truthy() || this.right.is_defined(compressor);
              default:
                return true;
            }
        });
        def(AST_Conditional, function(compressor) {
            return this.consequent.is_defined(compressor) && this.alternative.is_defined(compressor);
        });
        def(AST_Constant, return_true);
        def(AST_Lambda, return_true);
        def(AST_Object, return_true);
        def(AST_Sequence, function(compressor) {
            return this.tail_node().is_defined(compressor);
        });
        def(AST_SymbolRef, function(compressor) {
            if (this.is_undefined) return false;
            if (is_undeclared_ref(this) && this.is_declared(compressor)) return true;
            if (this.is_immutable()) return true;
            var fixed = this.fixed_value();
            if (!fixed) return false;
            this.is_defined = return_false;
            var result = fixed.is_defined(compressor);
            delete this.is_defined;
            return result;
        });
        def(AST_UnaryPrefix, function() {
            return this.operator != "void";
        });
        def(AST_UnaryPostfix, return_true);
        def(AST_Undefined, return_false);
    })(function(node, func) {
        node.DEFMETHOD("is_defined", func);
    });

    /* -----[ boolean/negation helpers ]----- */

    // methods to determine whether an expression has a boolean result type
    (function(def) {
        def(AST_Node, return_false);
        def(AST_Assign, function(compressor) {
            return this.operator == "=" && this.right.is_boolean(compressor);
        });
        var binary = makePredicate("in instanceof == != === !== < <= >= >");
        def(AST_Binary, function(compressor) {
            return binary[this.operator] || lazy_op[this.operator]
                && this.left.is_boolean(compressor)
                && this.right.is_boolean(compressor);
        });
        def(AST_Boolean, return_true);
        var fn = makePredicate("every hasOwnProperty isPrototypeOf propertyIsEnumerable some");
        def(AST_Call, function(compressor) {
            if (!compressor.option("unsafe")) return false;
            var exp = this.expression;
            return exp instanceof AST_Dot && (fn[exp.property]
                || exp.property == "test" && exp.expression instanceof AST_RegExp);
        });
        def(AST_Conditional, function(compressor) {
            return this.consequent.is_boolean(compressor) && this.alternative.is_boolean(compressor);
        });
        def(AST_New, return_false);
        def(AST_Sequence, function(compressor) {
            return this.tail_node().is_boolean(compressor);
        });
        def(AST_SymbolRef, function(compressor) {
            var fixed = this.fixed_value();
            if (!fixed) return false;
            this.is_boolean = return_false;
            var result = fixed.is_boolean(compressor);
            delete this.is_boolean;
            return result;
        });
        var unary = makePredicate("! delete");
        def(AST_UnaryPrefix, function() {
            return unary[this.operator];
        });
    })(function(node, func) {
        node.DEFMETHOD("is_boolean", func);
    });

    // methods to determine if an expression has a numeric result type
    (function(def) {
        def(AST_Node, return_false);
        var binary = makePredicate("- * / % & | ^ << >> >>>");
        def(AST_Assign, function(compressor) {
            return binary[this.operator.slice(0, -1)]
                || this.operator == "=" && this.right.is_number(compressor);
        });
        def(AST_Binary, function(compressor) {
            return binary[this.operator] || this.operator == "+"
                && this.left.is_number(compressor)
                && this.right.is_number(compressor);
        });
        var fn = makePredicate([
            "charCodeAt",
            "getDate",
            "getDay",
            "getFullYear",
            "getHours",
            "getMilliseconds",
            "getMinutes",
            "getMonth",
            "getSeconds",
            "getTime",
            "getTimezoneOffset",
            "getUTCDate",
            "getUTCDay",
            "getUTCFullYear",
            "getUTCHours",
            "getUTCMilliseconds",
            "getUTCMinutes",
            "getUTCMonth",
            "getUTCSeconds",
            "getYear",
            "indexOf",
            "lastIndexOf",
            "localeCompare",
            "push",
            "search",
            "setDate",
            "setFullYear",
            "setHours",
            "setMilliseconds",
            "setMinutes",
            "setMonth",
            "setSeconds",
            "setTime",
            "setUTCDate",
            "setUTCFullYear",
            "setUTCHours",
            "setUTCMilliseconds",
            "setUTCMinutes",
            "setUTCMonth",
            "setUTCSeconds",
            "setYear",
            "toExponential",
            "toFixed",
            "toPrecision",
        ]);
        def(AST_Call, function(compressor) {
            if (!compressor.option("unsafe")) return false;
            var exp = this.expression;
            return exp instanceof AST_Dot && (fn[exp.property]
                || is_undeclared_ref(exp.expression) && exp.expression.name == "Math");
        });
        def(AST_Conditional, function(compressor) {
            return this.consequent.is_number(compressor) && this.alternative.is_number(compressor);
        });
        def(AST_New, return_false);
        def(AST_Number, return_true);
        def(AST_Sequence, function(compressor) {
            return this.tail_node().is_number(compressor);
        });
        def(AST_SymbolRef, function(compressor) {
            var fixed = this.fixed_value();
            if (!fixed) return false;
            this.is_number = return_false;
            var result = fixed.is_number(compressor);
            delete this.is_number;
            return result;
        });
        var unary = makePredicate("+ - ~ ++ --");
        def(AST_Unary, function() {
            return unary[this.operator];
        });
    })(function(node, func) {
        node.DEFMETHOD("is_number", func);
    });

    // methods to determine if an expression has a string result type
    (function(def) {
        def(AST_Node, return_false);
        def(AST_Assign, function(compressor) {
            return (this.operator == "=" || this.operator == "+=") && this.right.is_string(compressor);
        });
        def(AST_Binary, function(compressor) {
            return this.operator == "+" &&
                (this.left.is_string(compressor) || this.right.is_string(compressor));
        });
        var fn = makePredicate([
            "charAt",
            "substr",
            "substring",
            "toLowerCase",
            "toString",
            "toUpperCase",
            "trim",
        ]);
        def(AST_Call, function(compressor) {
            if (!compressor.option("unsafe")) return false;
            var exp = this.expression;
            return exp instanceof AST_Dot && fn[exp.property];
        });
        def(AST_Conditional, function(compressor) {
            return this.consequent.is_string(compressor) && this.alternative.is_string(compressor);
        });
        def(AST_Sequence, function(compressor) {
            return this.tail_node().is_string(compressor);
        });
        def(AST_String, return_true);
        def(AST_SymbolRef, function(compressor) {
            var fixed = this.fixed_value();
            if (!fixed) return false;
            this.is_string = return_false;
            var result = fixed.is_string(compressor);
            delete this.is_string;
            return result;
        });
        def(AST_UnaryPrefix, function() {
            return this.operator == "typeof";
        });
    })(function(node, func) {
        node.DEFMETHOD("is_string", func);
    });

    var lazy_op = makePredicate("&& ||");
    var unary_arithmetic = makePredicate("++ --");
    var unary_side_effects = makePredicate("delete ++ --");

    function is_lhs(node, parent) {
        if (parent instanceof AST_Unary && unary_side_effects[parent.operator]) return parent.expression;
        if (parent instanceof AST_Assign && parent.left === node) return node;
    }

    (function(def) {
        function to_node(value, orig) {
            if (value instanceof AST_Node) return make_node(value.CTOR, orig, value);
            if (Array.isArray(value)) return make_node(AST_Array, orig, {
                elements: value.map(function(value) {
                    return to_node(value, orig);
                })
            });
            if (value && typeof value == "object") {
                var props = [];
                for (var key in value) if (HOP(value, key)) {
                    props.push(make_node(AST_ObjectKeyVal, orig, {
                        key: key,
                        value: to_node(value[key], orig)
                    }));
                }
                return make_node(AST_Object, orig, {
                    properties: props
                });
            }
            return make_node_from_constant(value, orig);
        }

        function warn(node) {
            AST_Node.warn("global_defs " + node.print_to_string() + " redefined [{file}:{line},{col}]", node.start);
        }

        AST_Toplevel.DEFMETHOD("resolve_defines", function(compressor) {
            if (!compressor.option("global_defs")) return this;
            this.figure_out_scope({ ie8: compressor.option("ie8") });
            return this.transform(new TreeTransformer(function(node) {
                var def = node._find_defs(compressor, "");
                if (!def) return;
                var level = 0, child = node, parent;
                while (parent = this.parent(level++)) {
                    if (!(parent instanceof AST_PropAccess)) break;
                    if (parent.expression !== child) break;
                    child = parent;
                }
                if (is_lhs(child, parent)) {
                    warn(node);
                    return;
                }
                return def;
            }));
        });
        def(AST_Node, noop);
        def(AST_Dot, function(compressor, suffix) {
            return this.expression._find_defs(compressor, "." + this.property + suffix);
        });
        def(AST_SymbolDeclaration, function(compressor) {
            if (!this.global()) return;
            if (HOP(compressor.option("global_defs"), this.name)) warn(this);
        });
        def(AST_SymbolRef, function(compressor, suffix) {
            if (!this.global()) return;
            var defines = compressor.option("global_defs");
            var name = this.name + suffix;
            if (HOP(defines, name)) return to_node(defines[name], this);
        });
    })(function(node, func) {
        node.DEFMETHOD("_find_defs", func);
    });

    function best_of_expression(ast1, ast2) {
        return ast1.print_to_string().length >
            ast2.print_to_string().length
            ? ast2 : ast1;
    }

    function best_of_statement(ast1, ast2) {
        return best_of_expression(make_node(AST_SimpleStatement, ast1, {
            body: ast1
        }), make_node(AST_SimpleStatement, ast2, {
            body: ast2
        })).body;
    }

    function best_of(compressor, ast1, ast2) {
        return (first_in_statement(compressor) ? best_of_statement : best_of_expression)(ast1, ast2);
    }

    function convert_to_predicate(obj) {
        Object.keys(obj).forEach(function(key) {
            obj[key] = makePredicate(obj[key]);
        });
    }

    var object_fns = [
        "constructor",
        "toString",
        "valueOf",
    ];
    var native_fns = {
        Array: [
            "indexOf",
            "join",
            "lastIndexOf",
            "slice",
        ].concat(object_fns),
        Boolean: object_fns,
        Function: object_fns,
        Number: [
            "toExponential",
            "toFixed",
            "toPrecision",
        ].concat(object_fns),
        Object: object_fns,
        RegExp: [
            "test",
        ].concat(object_fns),
        String: [
            "charAt",
            "charCodeAt",
            "concat",
            "indexOf",
            "italics",
            "lastIndexOf",
            "match",
            "replace",
            "search",
            "slice",
            "split",
            "substr",
            "substring",
            "toLowerCase",
            "toUpperCase",
            "trim",
        ].concat(object_fns),
    };
    convert_to_predicate(native_fns);
    var static_fns = {
        Array: [
            "isArray",
        ],
        Math: [
            "abs",
            "acos",
            "asin",
            "atan",
            "ceil",
            "cos",
            "exp",
            "floor",
            "log",
            "round",
            "sin",
            "sqrt",
            "tan",
            "atan2",
            "pow",
            "max",
            "min",
        ],
        Number: [
            "isFinite",
            "isNaN",
        ],
        Object: [
            "create",
            "getOwnPropertyDescriptor",
            "getOwnPropertyNames",
            "getPrototypeOf",
            "isExtensible",
            "isFrozen",
            "isSealed",
            "keys",
        ],
        String: [
            "fromCharCode",
        ],
    };
    convert_to_predicate(static_fns);

    // methods to evaluate a constant expression
    (function(def) {
        // If the node has been successfully reduced to a constant,
        // then its value is returned; otherwise the element itself
        // is returned.
        // They can be distinguished as constant value is never a
        // descendant of AST_Node.
        AST_Node.DEFMETHOD("evaluate", function(compressor) {
            if (!compressor.option("evaluate")) return this;
            var cached = [];
            var val = this._eval(compressor, cached, 1);
            cached.forEach(function(node) {
                delete node._eval;
            });
            if (!val || val instanceof RegExp) return val;
            if (typeof val == "function" || typeof val == "object") return this;
            return val;
        });
        var unaryPrefix = makePredicate("! ~ - + void");
        AST_Node.DEFMETHOD("is_constant", function() {
            // Accomodate when compress option evaluate=false
            // as well as the common constant expressions !0 and -1
            if (this instanceof AST_Constant) {
                return !(this instanceof AST_RegExp);
            } else {
                return this instanceof AST_UnaryPrefix
                    && this.expression instanceof AST_Constant
                    && unaryPrefix[this.operator];
            }
        });
        def(AST_Statement, function() {
            throw new Error(string_template("Cannot evaluate a statement [{file}:{line},{col}]", this.start));
        });
        def(AST_Lambda, return_this);
        def(AST_Node, return_this);
        def(AST_Constant, function() {
            return this.getValue();
        });
        def(AST_Function, function(compressor) {
            if (compressor.option("unsafe")) {
                var fn = function() {};
                fn.node = this;
                fn.toString = function() {
                    return "function(){}";
                };
                return fn;
            }
            return this;
        });
        def(AST_Array, function(compressor, cached, depth) {
            if (compressor.option("unsafe")) {
                var elements = [];
                for (var i = 0; i < this.elements.length; i++) {
                    var element = this.elements[i];
                    var value = element._eval(compressor, cached, depth);
                    if (element === value) return this;
                    elements.push(value);
                }
                return elements;
            }
            return this;
        });
        def(AST_Object, function(compressor, cached, depth) {
            if (compressor.option("unsafe")) {
                var val = {};
                for (var i = 0; i < this.properties.length; i++) {
                    var prop = this.properties[i];
                    var key = prop.key;
                    if (key instanceof AST_Symbol) {
                        key = key.name;
                    } else if (key instanceof AST_Node) {
                        key = key._eval(compressor, cached, depth);
                        if (key === prop.key) return this;
                    }
                    if (typeof Object.prototype[key] === 'function') {
                        return this;
                    }
                    if (prop.value instanceof AST_Function) continue;
                    val[key] = prop.value._eval(compressor, cached, depth);
                    if (val[key] === prop.value) return this;
                }
                return val;
            }
            return this;
        });
        var non_converting_unary = makePredicate("! typeof void");
        def(AST_UnaryPrefix, function(compressor, cached, depth) {
            var e = this.expression;
            // Function would be evaluated to an array and so typeof would
            // incorrectly return 'object'. Hence making is a special case.
            if (compressor.option("typeofs")
                && this.operator == "typeof"
                && (e instanceof AST_Lambda
                    || e instanceof AST_SymbolRef
                        && e.fixed_value() instanceof AST_Lambda)) {
                return typeof function(){};
            }
            if (!non_converting_unary[this.operator]) depth++;
            var v = e._eval(compressor, cached, depth);
            if (v === this.expression) return this;
            switch (this.operator) {
              case "!": return !v;
              case "typeof":
                // typeof <RegExp> returns "object" or "function" on different platforms
                // so cannot evaluate reliably
                if (v instanceof RegExp) return this;
                return typeof v;
              case "void": return void v;
              case "~": return ~v;
              case "-": return -v;
              case "+": return +v;
              case "++":
              case "--":
                if (e instanceof AST_SymbolRef) {
                    var refs = e.definition().references;
                    if (refs[refs.length - 1] === e) return v;
                }
            }
            return this;
        });
        var non_converting_binary = makePredicate("&& || === !==");
        def(AST_Binary, function(compressor, cached, depth) {
            if (!non_converting_binary[this.operator]) depth++;
            var left = this.left._eval(compressor, cached, depth);
            if (left === this.left) return this;
            var right = this.right._eval(compressor, cached, depth);
            if (right === this.right) return this;
            var result;
            switch (this.operator) {
              case "&&" : result = left &&  right; break;
              case "||" : result = left ||  right; break;
              case "|"  : result = left |   right; break;
              case "&"  : result = left &   right; break;
              case "^"  : result = left ^   right; break;
              case "+"  : result = left +   right; break;
              case "*"  : result = left *   right; break;
              case "/"  : result = left /   right; break;
              case "%"  : result = left %   right; break;
              case "-"  : result = left -   right; break;
              case "<<" : result = left <<  right; break;
              case ">>" : result = left >>  right; break;
              case ">>>": result = left >>> right; break;
              case "==" : result = left ==  right; break;
              case "===": result = left === right; break;
              case "!=" : result = left !=  right; break;
              case "!==": result = left !== right; break;
              case "<"  : result = left <   right; break;
              case "<=" : result = left <=  right; break;
              case ">"  : result = left >   right; break;
              case ">=" : result = left >=  right; break;
              default   : return this;
            }
            return isNaN(result) && compressor.find_parent(AST_With) ? this : result;
        });
        def(AST_Conditional, function(compressor, cached, depth) {
            var condition = this.condition._eval(compressor, cached, depth);
            if (condition === this.condition) return this;
            var node = condition ? this.consequent : this.alternative;
            var value = node._eval(compressor, cached, depth);
            return value === node ? this : value;
        });
        def(AST_SymbolRef, function(compressor, cached, depth) {
            var fixed = this.fixed_value();
            if (!fixed) return this;
            var value;
            if (member(fixed, cached)) {
                value = fixed._eval();
            } else {
                this._eval = return_this;
                value = fixed._eval(compressor, cached, depth);
                delete this._eval;
                if (value === fixed) return this;
                fixed._eval = function() {
                    return value;
                };
                cached.push(fixed);
            }
            if (value && typeof value == "object") {
                var escaped = this.definition().escaped;
                switch (escaped.length) {
                  case 0:
                    break;
                  case 1:
                    if (contains_ref(escaped[0], this)) break;
                  default:
                    if (depth > escaped.depth) return this;
                }
            }
            return value;

            function contains_ref(expr, ref) {
                var found = false;
                expr.walk(new TreeWalker(function(node) {
                    if (found) return true;
                    if (node === ref) return found = true;
                }));
                return found;
            }
        });
        var global_objs = {
            Array: Array,
            Math: Math,
            Number: Number,
            Object: Object,
            String: String,
        };
        var static_values = {
            Math: [
                "E",
                "LN10",
                "LN2",
                "LOG2E",
                "LOG10E",
                "PI",
                "SQRT1_2",
                "SQRT2",
            ],
            Number: [
                "MAX_VALUE",
                "MIN_VALUE",
                "NaN",
                "NEGATIVE_INFINITY",
                "POSITIVE_INFINITY",
            ],
        };
        convert_to_predicate(static_values);
        def(AST_PropAccess, function(compressor, cached, depth) {
            if (compressor.option("unsafe")) {
                var key = this.property;
                if (key instanceof AST_Node) {
                    key = key._eval(compressor, cached, depth);
                    if (key === this.property) return this;
                }
                var exp = this.expression;
                var val;
                if (is_undeclared_ref(exp)) {
                    var static_value = static_values[exp.name];
                    if (!static_value || !static_value[key]) return this;
                    val = global_objs[exp.name];
                } else {
                    val = exp._eval(compressor, cached, depth + 1);
                    if (!val || val === exp) return this;
                    if (typeof val == "object" && !HOP(val, key)) return this;
                    if (typeof val == "function") switch (key) {
                      case "name":
                        return val.node.name ? val.node.name.name : "";
                      case "length":
                        return val.node.argnames.length;
                      default:
                        return this;
                    }
                }
                return val[key];
            }
            return this;
        });
        def(AST_Call, function(compressor, cached, depth) {
            var exp = this.expression;
            if (compressor.option("unsafe") && exp instanceof AST_PropAccess) {
                var key = exp.property;
                if (key instanceof AST_Node) {
                    key = key._eval(compressor, cached, depth);
                    if (key === exp.property) return this;
                }
                var val;
                var e = exp.expression;
                if (is_undeclared_ref(e)) {
                    var static_fn = static_fns[e.name];
                    if (!static_fn || !static_fn[key]) return this;
                    val = global_objs[e.name];
                } else {
                    val = e._eval(compressor, cached, depth + 1);
                    if (val === e || !val) return this;
                    var native_fn = native_fns[val.constructor.name];
                    if (!native_fn || !native_fn[key]) return this;
                }
                var args = [];
                for (var i = 0; i < this.args.length; i++) {
                    var arg = this.args[i];
                    var value = arg._eval(compressor, cached, depth);
                    if (arg === value) return this;
                    args.push(value);
                }
                if (key == "replace" && typeof args[1] == "function") return this;
                try {
                    return val[key].apply(val, args);
                } catch (ex) {
                    AST_Node.warn("Error evaluating {code} [{file}:{line},{col}]", {
                        code: this.print_to_string(),
                        file: this.start.file,
                        line: this.start.line,
                        col: this.start.col
                    });
                }
            }
            return this;
        });
        def(AST_New, return_this);
    })(function(node, func) {
        node.DEFMETHOD("_eval", func);
    });

    // method to negate an expression
    (function(def) {
        function basic_negation(exp) {
            return make_node(AST_UnaryPrefix, exp, {
                operator: "!",
                expression: exp
            });
        }
        function best(orig, alt, first_in_statement) {
            var negated = basic_negation(orig);
            if (first_in_statement) {
                var stat = make_node(AST_SimpleStatement, alt, {
                    body: alt
                });
                return best_of_expression(negated, stat) === stat ? alt : negated;
            }
            return best_of_expression(negated, alt);
        }
        def(AST_Node, function() {
            return basic_negation(this);
        });
        def(AST_Statement, function() {
            throw new Error("Cannot negate a statement");
        });
        def(AST_Function, function() {
            return basic_negation(this);
        });
        def(AST_UnaryPrefix, function() {
            if (this.operator == "!")
                return this.expression;
            return basic_negation(this);
        });
        def(AST_Sequence, function(compressor) {
            var expressions = this.expressions.slice();
            expressions.push(expressions.pop().negate(compressor));
            return make_sequence(this, expressions);
        });
        def(AST_Conditional, function(compressor, first_in_statement) {
            var self = this.clone();
            self.consequent = self.consequent.negate(compressor);
            self.alternative = self.alternative.negate(compressor);
            return best(this, self, first_in_statement);
        });
        def(AST_Binary, function(compressor, first_in_statement) {
            var self = this.clone(), op = this.operator;
            if (compressor.option("unsafe_comps")) {
                switch (op) {
                  case "<=" : self.operator = ">"  ; return self;
                  case "<"  : self.operator = ">=" ; return self;
                  case ">=" : self.operator = "<"  ; return self;
                  case ">"  : self.operator = "<=" ; return self;
                }
            }
            switch (op) {
              case "==" : self.operator = "!="; return self;
              case "!=" : self.operator = "=="; return self;
              case "===": self.operator = "!=="; return self;
              case "!==": self.operator = "==="; return self;
              case "&&":
                self.operator = "||";
                self.left = self.left.negate(compressor, first_in_statement);
                self.right = self.right.negate(compressor);
                return best(this, self, first_in_statement);
              case "||":
                self.operator = "&&";
                self.left = self.left.negate(compressor, first_in_statement);
                self.right = self.right.negate(compressor);
                return best(this, self, first_in_statement);
            }
            return basic_negation(this);
        });
    })(function(node, func) {
        node.DEFMETHOD("negate", function(compressor, first_in_statement) {
            return func.call(this, compressor, first_in_statement);
        });
    });

    var global_pure_fns = makePredicate("Boolean decodeURI decodeURIComponent Date encodeURI encodeURIComponent Error escape EvalError isFinite isNaN Number Object parseFloat parseInt RangeError ReferenceError String SyntaxError TypeError unescape URIError");
    AST_Call.DEFMETHOD("is_expr_pure", function(compressor) {
        if (compressor.option("unsafe")) {
            var expr = this.expression;
            if (is_undeclared_ref(expr) && global_pure_fns[expr.name]) return true;
            if (expr instanceof AST_Dot && is_undeclared_ref(expr.expression)) {
                var static_fn = static_fns[expr.expression.name];
                return static_fn && static_fn[expr.property];
            }
        }
        return this.pure || !compressor.pure_funcs(this);
    });
    AST_Node.DEFMETHOD("is_call_pure", return_false);
    AST_Call.DEFMETHOD("is_call_pure", function(compressor) {
        if (!compressor.option("unsafe")) return false;
        var dot = this.expression;
        if (!(dot instanceof AST_Dot)) return false;
        var exp = dot.expression;
        var map;
        var prop = dot.property;
        if (exp instanceof AST_Array) {
            map = native_fns.Array;
        } else if (exp.is_boolean(compressor)) {
            map = native_fns.Boolean;
        } else if (exp.is_number(compressor)) {
            map = native_fns.Number;
        } else if (exp instanceof AST_RegExp) {
            map = native_fns.RegExp;
        } else if (exp.is_string(compressor)) {
            map = native_fns.String;
            if (prop == "replace") {
                var arg = this.args[1];
                if (arg && !arg.is_string(compressor)) return false;
            }
        } else if (!dot.may_throw_on_access(compressor)) {
            map = native_fns.Object;
        }
        return map && map[prop];
    });

    // determine if expression has side effects
    (function(def) {
        function any(list, compressor) {
            for (var i = list.length; --i >= 0;)
                if (list[i].has_side_effects(compressor))
                    return true;
            return false;
        }
        def(AST_Node, return_true);
        def(AST_Array, function(compressor) {
            return any(this.elements, compressor);
        });
        def(AST_Assign, return_true);
        def(AST_Binary, function(compressor) {
            return this.left.has_side_effects(compressor)
                || this.right.has_side_effects(compressor);
        });
        def(AST_Block, function(compressor) {
            return any(this.body, compressor);
        });
        def(AST_Call, function(compressor) {
            if (!this.is_expr_pure(compressor)
                && (!this.is_call_pure(compressor) || this.expression.has_side_effects(compressor))) {
                return true;
            }
            return any(this.args, compressor);
        });
        def(AST_Case, function(compressor) {
            return this.expression.has_side_effects(compressor)
                || any(this.body, compressor);
        });
        def(AST_Conditional, function(compressor) {
            return this.condition.has_side_effects(compressor)
                || this.consequent.has_side_effects(compressor)
                || this.alternative.has_side_effects(compressor);
        });
        def(AST_Constant, return_false);
        def(AST_Definitions, function(compressor) {
            return any(this.definitions, compressor);
        });
        def(AST_Dot, function(compressor) {
            return this.expression.may_throw_on_access(compressor)
                || this.expression.has_side_effects(compressor);
        });
        def(AST_EmptyStatement, return_false);
        def(AST_If, function(compressor) {
            return this.condition.has_side_effects(compressor)
                || this.body && this.body.has_side_effects(compressor)
                || this.alternative && this.alternative.has_side_effects(compressor);
        });
        def(AST_LabeledStatement, function(compressor) {
            return this.body.has_side_effects(compressor);
        });
        def(AST_Lambda, return_false);
        def(AST_Object, function(compressor) {
            return any(this.properties, compressor);
        });
        def(AST_ObjectProperty, function(compressor) {
            return this.value.has_side_effects(compressor);
        });
        def(AST_Sub, function(compressor) {
            return this.expression.may_throw_on_access(compressor)
                || this.expression.has_side_effects(compressor)
                || this.property.has_side_effects(compressor);
        });
        def(AST_Sequence, function(compressor) {
            return any(this.expressions, compressor);
        });
        def(AST_SimpleStatement, function(compressor) {
            return this.body.has_side_effects(compressor);
        });
        def(AST_Switch, function(compressor) {
            return this.expression.has_side_effects(compressor)
                || any(this.body, compressor);
        });
        def(AST_SymbolDeclaration, return_false);
        def(AST_SymbolRef, function(compressor) {
            return !this.is_declared(compressor);
        });
        def(AST_This, return_false);
        def(AST_Try, function(compressor) {
            return any(this.body, compressor)
                || this.bcatch && this.bcatch.has_side_effects(compressor)
                || this.bfinally && this.bfinally.has_side_effects(compressor);
        });
        def(AST_Unary, function(compressor) {
            return unary_side_effects[this.operator]
                || this.expression.has_side_effects(compressor);
        });
        def(AST_VarDef, function(compressor) {
            return this.value;
        });
    })(function(node, func) {
        node.DEFMETHOD("has_side_effects", func);
    });

    // determine if expression may throw
    (function(def) {
        def(AST_Node, return_true);

        def(AST_Constant, return_false);
        def(AST_EmptyStatement, return_false);
        def(AST_Lambda, return_false);
        def(AST_SymbolDeclaration, return_false);
        def(AST_This, return_false);

        function any(list, compressor) {
            for (var i = list.length; --i >= 0;)
                if (list[i].may_throw(compressor))
                    return true;
            return false;
        }

        def(AST_Array, function(compressor) {
            return any(this.elements, compressor);
        });
        def(AST_Assign, function(compressor) {
            if (this.right.may_throw(compressor)) return true;
            if (!compressor.has_directive("use strict")
                && this.operator == "="
                && this.left instanceof AST_SymbolRef) {
                return false;
            }
            return this.left.may_throw(compressor);
        });
        def(AST_Binary, function(compressor) {
            return this.left.may_throw(compressor)
                || this.right.may_throw(compressor);
        });
        def(AST_Block, function(compressor) {
            return any(this.body, compressor);
        });
        def(AST_Call, function(compressor) {
            if (any(this.args, compressor)) return true;
            if (this.is_expr_pure(compressor)) return false;
            if (this.expression.may_throw(compressor)) return true;
            return !(this.expression instanceof AST_Lambda)
                || any(this.expression.body, compressor);
        });
        def(AST_Case, function(compressor) {
            return this.expression.may_throw(compressor)
                || any(this.body, compressor);
        });
        def(AST_Conditional, function(compressor) {
            return this.condition.may_throw(compressor)
                || this.consequent.may_throw(compressor)
                || this.alternative.may_throw(compressor);
        });
        def(AST_Definitions, function(compressor) {
            return any(this.definitions, compressor);
        });
        def(AST_Dot, function(compressor) {
            return this.expression.may_throw_on_access(compressor)
                || this.expression.may_throw(compressor);
        });
        def(AST_If, function(compressor) {
            return this.condition.may_throw(compressor)
                || this.body && this.body.may_throw(compressor)
                || this.alternative && this.alternative.may_throw(compressor);
        });
        def(AST_LabeledStatement, function(compressor) {
            return this.body.may_throw(compressor);
        });
        def(AST_Object, function(compressor) {
            return any(this.properties, compressor);
        });
        def(AST_ObjectProperty, function(compressor) {
            return this.value.may_throw(compressor);
        });
        def(AST_Return, function(compressor) {
            return this.value && this.value.may_throw(compressor);
        });
        def(AST_Sequence, function(compressor) {
            return any(this.expressions, compressor);
        });
        def(AST_SimpleStatement, function(compressor) {
            return this.body.may_throw(compressor);
        });
        def(AST_Sub, function(compressor) {
            return this.expression.may_throw_on_access(compressor)
                || this.expression.may_throw(compressor)
                || this.property.may_throw(compressor);
        });
        def(AST_Switch, function(compressor) {
            return this.expression.may_throw(compressor)
                || any(this.body, compressor);
        });
        def(AST_SymbolRef, function(compressor) {
            return !this.is_declared(compressor);
        });
        def(AST_Try, function(compressor) {
            return this.bcatch ? this.bcatch.may_throw(compressor) : any(this.body, compressor)
                || this.bfinally && this.bfinally.may_throw(compressor);
        });
        def(AST_Unary, function(compressor) {
            if (this.operator == "typeof" && this.expression instanceof AST_SymbolRef)
                return false;
            return this.expression.may_throw(compressor);
        });
        def(AST_VarDef, function(compressor) {
            if (!this.value) return false;
            return this.value.may_throw(compressor);
        });
    })(function(node, func) {
        node.DEFMETHOD("may_throw", func);
    });

    // determine if expression is constant
    (function(def) {
        function all(list) {
            for (var i = list.length; --i >= 0;)
                if (!list[i].is_constant_expression())
                    return false;
            return true;
        }
        def(AST_Node, return_false);
        def(AST_Array, function() {
            return all(this.elements);
        });
        def(AST_Binary, function() {
            return this.left.is_constant_expression() && this.right.is_constant_expression();
        });
        def(AST_Constant, return_true);
        def(AST_Lambda, function(scope) {
            var self = this;
            var result = true;
            self.walk(new TreeWalker(function(node) {
                if (!result) return true;
                if (node instanceof AST_SymbolRef) {
                    if (self.inlined) {
                        result = false;
                        return true;
                    }
                    var def = node.definition();
                    if (member(def, self.enclosed)
                        && !self.variables.has(def.name)) {
                        if (scope) {
                            var scope_def = scope.find_variable(node);
                            if (def.undeclared ? !scope_def : scope_def === def) {
                                result = "f";
                                return true;
                            }
                        }
                        result = false;
                    }
                    return true;
                }
            }));
            return result;
        });
        def(AST_Object, function() {
            return all(this.properties);
        });
        def(AST_ObjectProperty, function() {
            return this.value.is_constant_expression();
        });
        def(AST_Unary, function() {
            return this.expression.is_constant_expression();
        });
    })(function(node, func) {
        node.DEFMETHOD("is_constant_expression", func);
    });

    // tell me if a statement aborts
    function aborts(thing) {
        return thing && thing.aborts();
    }
    (function(def) {
        def(AST_Statement, return_null);
        def(AST_Jump, return_this);
        function block_aborts() {
            var n = this.body.length;
            return n > 0 && aborts(this.body[n - 1]);
        }
        def(AST_BlockStatement, block_aborts);
        def(AST_SwitchBranch, block_aborts);
        def(AST_If, function() {
            return this.alternative && aborts(this.body) && aborts(this.alternative) && this;
        });
    })(function(node, func) {
        node.DEFMETHOD("aborts", func);
    });

    /* -----[ optimizers ]----- */

    var directives = makePredicate(["use asm", "use strict"]);
    OPT(AST_Directive, function(self, compressor) {
        if (compressor.option("directives")
            && (!directives[self.value] || compressor.has_directive(self.value) !== self)) {
            return make_node(AST_EmptyStatement, self);
        }
        return self;
    });

    OPT(AST_Debugger, function(self, compressor) {
        if (compressor.option("drop_debugger"))
            return make_node(AST_EmptyStatement, self);
        return self;
    });

    OPT(AST_LabeledStatement, function(self, compressor) {
        if (self.body instanceof AST_Break
            && compressor.loopcontrol_target(self.body) === self.body) {
            return make_node(AST_EmptyStatement, self);
        }
        return self.label.references.length == 0 ? self.body : self;
    });

    OPT(AST_Block, function(self, compressor) {
        tighten_body(self.body, compressor);
        return self;
    });

    OPT(AST_BlockStatement, function(self, compressor) {
        tighten_body(self.body, compressor);
        switch (self.body.length) {
          case 1: return self.body[0];
          case 0: return make_node(AST_EmptyStatement, self);
        }
        return self;
    });

    OPT(AST_Lambda, function(self, compressor) {
        tighten_body(self.body, compressor);
        if (compressor.option("side_effects")
            && self.body.length == 1
            && self.body[0] === compressor.has_directive("use strict")) {
            self.body.length = 0;
        }
        return self;
    });

    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        if (!compressor.option("unused")) return;
        if (compressor.has_directive("use asm")) return;
        var self = this;
        if (self.pinned()) return;
        var drop_funcs = !(self instanceof AST_Toplevel) || compressor.toplevel.funcs;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
            var sym;
            if (node instanceof AST_Assign && (node.write_only || node.operator == "=")) {
                sym = node.left;
            } else if (node instanceof AST_Unary && node.write_only) {
                sym = node.expression;
            }
            if (!/strict/.test(compressor.option("pure_getters"))) return sym instanceof AST_SymbolRef && sym;
            while (sym instanceof AST_PropAccess && !sym.expression.may_throw_on_access(compressor)) {
                if (sym instanceof AST_Sub) props.unshift(sym.property);
                sym = sym.expression;
            }
            return sym instanceof AST_SymbolRef && all(sym.definition().orig, function(sym) {
                return !(sym instanceof AST_SymbolLambda);
            }) && sym;
        };
        var in_use = [];
        var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
        var fixed_ids = Object.create(null);
        var value_read = Object.create(null);
        var value_modified = Object.create(null);
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                    in_use.push(def);
                }
            });
        }
        var var_defs_by_id = new Dictionary();
        var initializations = new Dictionary();
        // pass 1: find out which symbols are directly used in
        // this scope (not in nested scopes).
        var scope = this;
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
                node.argnames.forEach(function(argname) {
                    var def = argname.definition();
                    if (!(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                        in_use.push(def);
                    }
                });
            }
            if (node === self) return;
            if (node instanceof AST_Defun) {
                var node_def = node.name.definition();
                if (!drop_funcs && scope === self) {
                    if (!(node_def.id in in_use_ids)) {
                        in_use_ids[node_def.id] = true;
                        in_use.push(node_def);
                    }
                }
                initializations.add(node_def.id, node);
                return true; // don't go in nested scopes
            }
            if (node instanceof AST_SymbolFunarg && scope === self) {
                var_defs_by_id.add(node.definition().id, node);
            }
            if (node instanceof AST_Definitions && scope === self) {
                node.definitions.forEach(function(def) {
                    var node_def = def.name.definition();
                    var_defs_by_id.add(node_def.id, def);
                    if (!drop_vars) {
                        if (!(node_def.id in in_use_ids)) {
                            in_use_ids[node_def.id] = true;
                            in_use.push(node_def);
                        }
                    }
                    if (def.value) {
                        initializations.add(node_def.id, def.value);
                        if (def.value.has_side_effects(compressor)) {
                            def.value.walk(tw);
                        }
                        if (!node_def.chained && def.name.fixed_value(true) === def.value) {
                            fixed_ids[node_def.id] = def;
                        }
                    }
                });
                return true;
            }
            return scan_ref_scoped(node, descend);
        });
        self.walk(tw);
        // pass 2: for every used symbol we need to walk its
        // initialization code to figure out if it uses other
        // symbols (that may not be in_use).
        tw = new TreeWalker(scan_ref_scoped);
        for (var i = 0; i < in_use.length; i++) {
            var init = initializations.get(in_use[i].id);
            if (init) init.forEach(function(init) {
                init.walk(tw);
            });
        }
        var drop_fn_name = compressor.option("keep_fnames") ? return_false : compressor.option("ie8") ? function(def) {
            return !compressor.exposed(def) && !def.references.length;
        } : function(def) {
            // any declarations with same name will overshadow
            // name of this anonymous function and can therefore
            // never be used anywhere
            return !(def.id in in_use_ids) || def.orig.length > 1;
        };
        // pass 3: we should drop declarations not in_use
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                    var in_use = def.id in in_use_ids;
                    var value = null;
                    if (node instanceof AST_Assign) {
                        if (!in_use || node.left === sym && def.id in fixed_ids && fixed_ids[def.id] !== node) {
                            value = get_rhs(node);
                        }
                    } else if (!in_use) {
                        value = make_node(AST_Number, node, {
                            value: 0
                        });
                    }
                    if (value) {
                        props.push(value);
                        return maintain_this_binding(compressor, parent, node, make_sequence(node, props.map(function(prop) {
                            return prop.transform(tt);
                        })));
                    }
                }
            }
            if (scope !== self) return;
            if (node instanceof AST_Function && node.name && drop_fn_name(node.name.definition())) {
                node.name = null;
            }
            if (node instanceof AST_Lambda && !(node instanceof AST_Accessor)) {
                var trim = compressor.drop_fargs(node, parent);
                for (var a = node.argnames, i = a.length; --i >= 0;) {
                    var sym = a[i];
                    if (!(sym.definition().id in in_use_ids)) {
                        sym.__unused = true;
                        if (trim) {
                            a.pop();
                            AST_Node[sym.unreferenced() ? "warn" : "info"]("Dropping unused function argument {name} [{file}:{line},{col}]", template(sym));
                        }
                    } else {
                        trim = false;
                    }
                }
            }
            if (drop_funcs && node instanceof AST_Defun && node !== self) {
                var def = node.name.definition();
                if (!(def.id in in_use_ids)) {
                    AST_Node[node.name.unreferenced() ? "warn" : "info"]("Dropping unused function {name} [{file}:{line},{col}]", template(node.name));
                    def.eliminated++;
                    return make_node(AST_EmptyStatement, node);
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                // place uninitialized names at the start
                var body = [], head = [], tail = [];
                // for unused names whose initialization has
                // side effects, we can cascade the init. code
                // into the next one, or next statement.
                var side_effects = [];
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    var sym = def.name.definition();
                    if (!drop_vars || sym.id in in_use_ids) {
                        if (def.value && sym.id in fixed_ids && fixed_ids[sym.id] !== def) {
                            def.value = def.value.drop_side_effect_free(compressor);
                        }
                        var var_defs = var_defs_by_id.get(sym.id);
                        if (var_defs.length > 1 && (!def.value || sym.orig.indexOf(def.name) > sym.eliminated)) {
                            AST_Node.warn("Dropping duplicated definition of variable {name} [{file}:{line},{col}]", template(def.name));
                            if (def.value) {
                                var ref = make_node(AST_SymbolRef, def.name, def.name);
                                sym.references.push(ref);
                                var assign = make_node(AST_Assign, def, {
                                    operator: "=",
                                    left: ref,
                                    right: def.value
                                });
                                if (fixed_ids[sym.id] === def) {
                                    fixed_ids[sym.id] = assign;
                                }
                                side_effects.push(assign.transform(tt));
                            }
                            remove(var_defs, def);
                            sym.eliminated++;
                            return;
                        }
                        if (!def.value) {
                            head.push(def);
                        } else if (compressor.option("functions")
                            && def.value === def.name.fixed_value()
                            && def.value instanceof AST_Function
                            && !(def.value.name && def.value.name.definition().assignments)
                            && can_rename(def.value, def.name.name)
                            && (!compressor.has_directive("use strict") || parent instanceof AST_Scope)) {
                            AST_Node.warn("Declaring {name} as function [{file}:{line},{col}]", template(def.name));
                            var defun = make_node(AST_Defun, def, def.value);
                            defun.name = make_node(AST_SymbolDefun, def.name, def.name);
                            var name_def = def.name.scope.resolve().def_function(defun.name);
                            if (def.value.name) {
                                var old_def = def.value.name.definition();
                                def.value.walk(new TreeWalker(function(node) {
                                    if (node instanceof AST_SymbolRef && node.definition() === old_def) {
                                        node.name = name_def.name;
                                        node.thedef = name_def;
                                        node.reference({});
                                    }
                                }));
                            }
                            body.push(defun);
                        } else {
                            if (side_effects.length > 0) {
                                if (tail.length > 0) {
                                    side_effects.push(def.value);
                                    def.value = make_sequence(def.value, side_effects);
                                } else {
                                    body.push(make_node(AST_SimpleStatement, node, {
                                        body: make_sequence(node, side_effects)
                                    }));
                                }
                                side_effects = [];
                            }
                            tail.push(def);
                        }
                    } else if (sym.orig[0] instanceof AST_SymbolCatch) {
                        var value = def.value && def.value.drop_side_effect_free(compressor);
                        if (value) side_effects.push(value);
                        def.value = null;
                        head.push(def);
                    } else {
                        var value = def.value && def.value.drop_side_effect_free(compressor);
                        if (value) {
                            AST_Node.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]", template(def.name));
                            side_effects.push(value);
                        } else {
                            AST_Node[def.name.unreferenced() ? "warn" : "info"]("Dropping unused variable {name} [{file}:{line},{col}]", template(def.name));
                        }
                        sym.eliminated++;
                    }

                    function can_rename(fn, name) {
                        var def = fn.variables.get(name);
                        return !def || fn.name && def === fn.name.definition();
                    }
                });
                if (head.length > 0 || tail.length > 0) {
                    node.definitions = head.concat(tail);
                    body.push(node);
                }
                if (side_effects.length > 0) {
                    body.push(make_node(AST_SimpleStatement, node, {
                        body: make_sequence(node, side_effects)
                    }));
                }
                switch (body.length) {
                  case 0:
                    return in_list ? MAP.skip : make_node(AST_EmptyStatement, node);
                  case 1:
                    return body[0];
                  default:
                    return in_list ? MAP.splice(body) : make_node(AST_BlockStatement, node, {
                        body: body
                    });
                }
            }
            // certain combination of unused name + side effect leads to:
            //    https://github.com/mishoo/UglifyJS2/issues/44
            //    https://github.com/mishoo/UglifyJS2/issues/1830
            //    https://github.com/mishoo/UglifyJS2/issues/1838
            //    https://github.com/mishoo/UglifyJS2/issues/3371
            // that's an invalid AST.
            // We fix it at this stage by moving the `var` outside the `for`.
            if (node instanceof AST_For) {
                descend(node, this);
                var block;
                if (node.init instanceof AST_BlockStatement) {
                    block = node.init;
                    node.init = block.body.pop();
                    block.body.push(node);
                }
                if (node.init instanceof AST_Defun) {
                    if (!block) {
                        block = make_node(AST_BlockStatement, node, {
                            body: [ node ]
                        });
                    }
                    block.body.splice(-1, 0, node.init);
                    node.init = null;
                } else if (node.init instanceof AST_SimpleStatement) {
                    node.init = node.init.body;
                } else if (is_empty(node.init)) {
                    node.init = null;
                }
                return !block ? node : in_list ? MAP.splice(block.body) : block;
            }
            if (node instanceof AST_LabeledStatement && node.body instanceof AST_For) {
                descend(node, this);
                if (node.body instanceof AST_BlockStatement) {
                    var block = node.body;
                    node.body = block.body.pop();
                    block.body.push(node);
                    return in_list ? MAP.splice(block.body) : block;
                }
                return node;
            }
            if (node instanceof AST_Scope) {
                var save_scope = scope;
                scope = node;
                descend(node, this);
                scope = save_scope;
                return node;
            }

            function template(sym) {
                return {
                    name : sym.name,
                    file : sym.start.file,
                    line : sym.start.line,
                    col  : sym.start.col
                };
            }
        });
        tt.push(compressor.parent());
        self.transform(tt);

        function verify_safe_usage(def, read, modified) {
            if (def.id in in_use_ids) return;
            if (read && modified) {
                in_use_ids[def.id] = true;
                in_use.push(def);
            } else {
                value_read[def.id] = read;
                value_modified[def.id] = modified;
            }
        }

        function get_rhs(assign) {
            var rhs = assign.right;
            if (!assign.write_only) return rhs;
            if (!(rhs instanceof AST_Binary && lazy_op[rhs.operator])) return rhs;
            var sym = assign.left;
            if (!(sym instanceof AST_SymbolRef) || sym.name != rhs.left.name) return rhs;
            return rhs.right.has_side_effects(compressor) ? rhs : rhs.right;
        }

        function scan_ref_scoped(node, descend) {
            var node_def, props = [], sym = assign_as_unused(node, props);
            if (sym && self.variables.get(sym.name) === (node_def = sym.definition())) {
                props.forEach(function(prop) {
                    prop.walk(tw);
                });
                if (node instanceof AST_Assign) {
                    var right = get_rhs(node);
                    right.walk(tw);
                    if (node.left === sym) {
                        if (!node_def.chained && sym.fixed_value(true) === right) {
                            fixed_ids[node_def.id] = node;
                        }
                        if (!node.write_only) {
                            verify_safe_usage(node_def, true, value_modified[node_def.id]);
                        }
                    } else {
                        var fixed = sym.fixed_value();
                        if (!fixed || !fixed.is_constant()) {
                            verify_safe_usage(node_def, value_read[node_def.id], true);
                        }
                    }
                }
                return true;
            }
            if (node instanceof AST_SymbolRef) {
                node_def = node.definition();
                if (!(node_def.id in in_use_ids)) {
                    in_use_ids[node_def.id] = true;
                    in_use.push(node_def);
                }
                return true;
            }
            if (node instanceof AST_Scope) {
                var save_scope = scope;
                scope = node;
                descend();
                scope = save_scope;
                return true;
            }
        }
    });

    AST_Scope.DEFMETHOD("hoist_declarations", function(compressor) {
        if (compressor.has_directive("use asm")) return;
        var hoist_funs = compressor.option("hoist_funs");
        var hoist_vars = compressor.option("hoist_vars");
        var self = this;
        if (hoist_vars) {
            // let's count var_decl first, we seem to waste a lot of
            // space if we hoist `var` when there's only one.
            var var_decl = 0;
            self.walk(new TreeWalker(function(node) {
                if (var_decl > 1) return true;
                if (node instanceof AST_Scope && node !== self) return true;
                if (node instanceof AST_Var) {
                    var_decl++;
                    return true;
                }
            }));
            if (var_decl <= 1) hoist_vars = false;
        }
        if (!hoist_funs && !hoist_vars) return;
        var dirs = [];
        var hoisted = [];
        var vars = new Dictionary(), vars_found = 0;
        var tt = new TreeTransformer(function(node) {
            if (node === self) return;
            if (node instanceof AST_Directive) {
                dirs.push(node);
                return make_node(AST_EmptyStatement, node);
            }
            if (hoist_funs && node instanceof AST_Defun
                && (tt.parent() === self || !compressor.has_directive("use strict"))) {
                hoisted.push(node);
                return make_node(AST_EmptyStatement, node);
            }
            if (hoist_vars && node instanceof AST_Var) {
                node.definitions.forEach(function(def) {
                    vars.set(def.name.name, def);
                    ++vars_found;
                });
                var seq = node.to_assignments(compressor);
                var p = tt.parent();
                if (p instanceof AST_ForIn && p.init === node) {
                    if (seq) return seq;
                    var def = node.definitions[0].name;
                    return make_node(AST_SymbolRef, def, def);
                }
                if (p instanceof AST_For && p.init === node) return seq;
                if (!seq) return make_node(AST_EmptyStatement, node);
                return make_node(AST_SimpleStatement, node, {
                    body: seq
                });
            }
            if (node instanceof AST_Scope) return node;
        });
        self.transform(tt);
        if (vars_found > 0) {
            // collect only vars which don't show up in self's arguments list
            var defs = [];
            vars.each(function(def, name) {
                if (self instanceof AST_Lambda
                    && !all(self.argnames, function(argname) {
                        return argname.name != name;
                    })) {
                    vars.del(name);
                } else {
                    def = def.clone();
                    def.value = null;
                    defs.push(def);
                    vars.set(name, def);
                }
            });
            if (defs.length > 0) {
                // try to merge in assignments
                for (var i = 0; i < self.body.length;) {
                    if (self.body[i] instanceof AST_SimpleStatement) {
                        var expr = self.body[i].body, sym, assign;
                        if (expr instanceof AST_Assign
                            && expr.operator == "="
                            && (sym = expr.left) instanceof AST_Symbol
                            && vars.has(sym.name))
                        {
                            var def = vars.get(sym.name);
                            if (def.value) break;
                            def.value = expr.right;
                            remove(defs, def);
                            defs.push(def);
                            self.body.splice(i, 1);
                            continue;
                        }
                        if (expr instanceof AST_Sequence
                            && (assign = expr.expressions[0]) instanceof AST_Assign
                            && assign.operator == "="
                            && (sym = assign.left) instanceof AST_Symbol
                            && vars.has(sym.name))
                        {
                            var def = vars.get(sym.name);
                            if (def.value) break;
                            def.value = assign.right;
                            remove(defs, def);
                            defs.push(def);
                            self.body[i].body = make_sequence(expr, expr.expressions.slice(1));
                            continue;
                        }
                    }
                    if (self.body[i] instanceof AST_EmptyStatement) {
                        self.body.splice(i, 1);
                        continue;
                    }
                    if (self.body[i] instanceof AST_BlockStatement) {
                        var tmp = [ i, 1 ].concat(self.body[i].body);
                        self.body.splice.apply(self.body, tmp);
                        continue;
                    }
                    break;
                }
                defs = make_node(AST_Var, self, {
                    definitions: defs
                });
                hoisted.push(defs);
            }
        }
        self.body = dirs.concat(hoisted, self.body);
    });

    AST_Scope.DEFMETHOD("var_names", function() {
        var var_names = this._var_names;
        if (!var_names) {
            this._var_names = var_names = Object.create(null);
            this.enclosed.forEach(function(def) {
                var_names[def.name] = true;
            });
            this.variables.each(function(def, name) {
                var_names[name] = true;
            });
        }
        return var_names;
    });

    AST_Scope.DEFMETHOD("make_var_name", function(prefix) {
        var var_names = this.var_names();
        prefix = prefix.replace(/(?:^[^a-z_$]|[^a-z0-9_$])/ig, "_");
        var name = prefix;
        for (var i = 0; var_names[name]; i++) name = prefix + "$" + i;
        var_names[name] = true;
        return name;
    });

    AST_Scope.DEFMETHOD("hoist_properties", function(compressor) {
        if (!compressor.option("hoist_props") || compressor.has_directive("use asm")) return;
        var self = this;
        var top_retain = self instanceof AST_Toplevel && compressor.top_retain || return_false;
        var defs_by_id = Object.create(null);
        self.transform(new TreeTransformer(function(node, descend) {
            if (node instanceof AST_Assign
                && node.operator == "="
                && node.write_only
                && can_hoist(node.left, node.right, 1)) {
                descend(node, this);
                var defs = new Dictionary();
                var assignments = [];
                var decls = [];
                node.right.properties.forEach(function(prop) {
                    var decl = make_sym(node.left, prop.key);
                    decls.push(make_node(AST_VarDef, node, {
                        name: decl,
                        value: null
                    }));
                    var sym = make_node(AST_SymbolRef, node, {
                        name: decl.name,
                        scope: self,
                        thedef: decl.definition()
                    });
                    sym.reference({});
                    assignments.push(make_node(AST_Assign, node, {
                        operator: "=",
                        left: sym,
                        right: prop.value
                    }));
                });
                defs_by_id[node.left.definition().id] = defs;
                self.body.splice(self.body.indexOf(this.stack[1]) + 1, 0, make_node(AST_Var, node, {
                    definitions: decls
                }));
                return make_sequence(node, assignments);
            }
            if (node instanceof AST_Unary
                && !unary_side_effects[node.operator]
                && node.expression instanceof AST_SymbolRef
                && node.expression.definition().id in defs_by_id) {
                node = node.clone();
                node.expression = make_node(AST_Object, node, {
                    properties: []
                });
                return node;
            }
            if (node instanceof AST_VarDef && can_hoist(node.name, node.value, 0)) {
                descend(node, this);
                var defs = new Dictionary();
                var var_defs = [];
                node.value.properties.forEach(function(prop) {
                    var_defs.push(make_node(AST_VarDef, node, {
                        name: make_sym(node.name, prop.key),
                        value: prop.value
                    }));
                });
                defs_by_id[node.name.definition().id] = defs;
                return MAP.splice(var_defs);
            }
            if (node instanceof AST_PropAccess && node.expression instanceof AST_SymbolRef) {
                var defs = defs_by_id[node.expression.definition().id];
                if (defs) {
                    var def = defs.get(node.getProperty());
                    var sym = make_node(AST_SymbolRef, node, {
                        name: def.name,
                        scope: node.expression.scope,
                        thedef: def
                    });
                    sym.reference({});
                    return sym;
                }
            }

            function can_hoist(sym, right, count) {
                if (sym.scope !== self) return;
                var def = sym.definition();
                if (def.assignments != count) return;
                if (def.direct_access) return;
                if (def.escaped.depth == 1) return;
                if (def.references.length == count) return;
                if (def.single_use) return;
                if (top_retain(def)) return;
                if (sym.fixed_value() !== right) return;
                return right instanceof AST_Object;
            }

            function make_sym(sym, key) {
                var new_var = make_node(AST_SymbolVar, sym, {
                    name: self.make_var_name(sym.name + "_" + key),
                    scope: self
                });
                var def = self.def_variable(new_var);
                defs.set(key, def);
                self.enclosed.push(def);
                return new_var;
            }
        }));
    });

    // drop_side_effect_free()
    // remove side-effect-free parts which only affects return value
    (function(def) {
        // Drop side-effect-free elements from an array of expressions.
        // Returns an array of expressions with side-effects or null
        // if all elements were dropped. Note: original array may be
        // returned if nothing changed.
        function trim(nodes, compressor, first_in_statement) {
            var len = nodes.length;
            if (!len) return null;
            var ret = [], changed = false;
            for (var i = 0; i < len; i++) {
                var node = nodes[i].drop_side_effect_free(compressor, first_in_statement);
                changed |= node !== nodes[i];
                if (node) {
                    ret.push(node);
                    first_in_statement = false;
                }
            }
            return changed ? ret.length ? ret : null : nodes;
        }

        def(AST_Node, return_this);
        def(AST_Accessor, return_null);
        def(AST_Array, function(compressor, first_in_statement) {
            var values = trim(this.elements, compressor, first_in_statement);
            return values && make_sequence(this, values);
        });
        def(AST_Assign, function(compressor) {
            var left = this.left;
            if (left instanceof AST_PropAccess) {
                var expr = left.expression;
                if (expr instanceof AST_Assign && !expr.may_throw_on_access(compressor)) {
                    expr.write_only = true;
                }
                if (compressor.has_directive("use strict") && expr.is_constant()) return this;
            }
            if (left.has_side_effects(compressor)) return this;
            this.write_only = true;
            if (root_expr(left).is_constant_expression(compressor.find_parent(AST_Scope))) {
                return this.right.drop_side_effect_free(compressor);
            }
            return this;
        });
        def(AST_Binary, function(compressor, first_in_statement) {
            var right = this.right.drop_side_effect_free(compressor, first_in_statement);
            if (!right) return this.left.drop_side_effect_free(compressor, first_in_statement);
            if (lazy_op[this.operator]) {
                var node = this;
                if (right !== node.right) {
                    node = this.clone();
                    node.right = right.drop_side_effect_free(compressor);
                }
                return (first_in_statement ? best_of_statement : best_of_expression)(node, make_node(AST_Binary, this, {
                    operator: node.operator == "&&" ? "||" : "&&",
                    left: node.left.negate(compressor, first_in_statement),
                    right: node.right
                }));
            } else {
                var left = this.left.drop_side_effect_free(compressor, first_in_statement);
                if (!left) return right;
                return make_sequence(this, [ left, right.drop_side_effect_free(compressor) ]);
            }
        });
        def(AST_Call, function(compressor, first_in_statement) {
            if (!this.is_expr_pure(compressor)) {
                var exp = this.expression;
                if (this.is_call_pure(compressor)) {
                    var exprs = this.args.slice();
                    exprs.unshift(exp.expression);
                    exprs = trim(exprs, compressor, first_in_statement);
                    return exprs && make_sequence(this, exprs);
                }
                if (exp instanceof AST_Function && (!exp.name || !exp.name.definition().references.length)) {
                    var node = this.clone();
                    exp.process_expression(false, compressor);
                    exp.walk(new TreeWalker(function(node) {
                        if (node instanceof AST_Return && node.value) {
                            node.value = node.value.drop_side_effect_free(compressor);
                            return true;
                        }
                        if (node instanceof AST_Scope && node !== exp) return true;
                    }));
                    return node;
                }
                return this;
            }
            if (this.pure) AST_Node.warn("Dropping __PURE__ call [{file}:{line},{col}]", this.start);
            var args = trim(this.args, compressor, first_in_statement);
            return args && make_sequence(this, args);
        });
        def(AST_Conditional, function(compressor) {
            var consequent = this.consequent.drop_side_effect_free(compressor);
            var alternative = this.alternative.drop_side_effect_free(compressor);
            if (consequent === this.consequent && alternative === this.alternative) return this;
            if (!consequent) return alternative ? make_node(AST_Binary, this, {
                operator: "||",
                left: this.condition,
                right: alternative
            }) : this.condition.drop_side_effect_free(compressor);
            if (!alternative) return make_node(AST_Binary, this, {
                operator: "&&",
                left: this.condition,
                right: consequent
            });
            var node = this.clone();
            node.consequent = consequent;
            node.alternative = alternative;
            return node;
        });
        def(AST_Constant, return_null);
        def(AST_Dot, function(compressor, first_in_statement) {
            var expr = this.expression;
            if (expr.may_throw_on_access(compressor)) return this;
            return expr.drop_side_effect_free(compressor, first_in_statement);
        });
        def(AST_Function, function(compressor) {
            return this.name && compressor.option("ie8") ? this : null;
        });
        def(AST_Object, function(compressor, first_in_statement) {
            var values = trim(this.properties, compressor, first_in_statement);
            return values && make_sequence(this, values);
        });
        def(AST_ObjectProperty, function(compressor, first_in_statement) {
            return this.value.drop_side_effect_free(compressor, first_in_statement);
        });
        def(AST_Sequence, function(compressor, first_in_statement) {
            var expressions = trim(this.expressions, compressor, first_in_statement);
            if (expressions === this.expressions) return this;
            if (!expressions) return null;
            return make_sequence(this, expressions);
        });
        def(AST_Sub, function(compressor, first_in_statement) {
            if (this.expression.may_throw_on_access(compressor)) return this;
            var expression = this.expression.drop_side_effect_free(compressor, first_in_statement);
            if (!expression) return this.property.drop_side_effect_free(compressor, first_in_statement);
            var property = this.property.drop_side_effect_free(compressor);
            if (!property) return expression;
            return make_sequence(this, [ expression, property ]);
        });
        def(AST_SymbolRef, function(compressor) {
            if (!this.is_declared(compressor)) return this;
            this.definition().replaced++;
            return null;
        });
        def(AST_This, return_null);
        def(AST_Unary, function(compressor, first_in_statement) {
            if (unary_side_effects[this.operator]) {
                this.write_only = !this.expression.has_side_effects(compressor);
                return this;
            }
            if (this.operator == "typeof" && this.expression instanceof AST_SymbolRef) {
                this.expression.definition().replaced++;
                return null;
            }
            var expression = this.expression.drop_side_effect_free(compressor, first_in_statement);
            if (first_in_statement && expression && is_iife_call(expression)) {
                if (expression === this.expression && this.operator == "!") return this;
                return expression.negate(compressor, first_in_statement);
            }
            return expression;
        });
    })(function(node, func) {
        node.DEFMETHOD("drop_side_effect_free", func);
    });

    OPT(AST_SimpleStatement, function(self, compressor) {
        if (compressor.option("side_effects")) {
            var body = self.body;
            var node = body.drop_side_effect_free(compressor, true);
            if (!node) {
                AST_Node.warn("Dropping side-effect-free statement [{file}:{line},{col}]", self.start);
                return make_node(AST_EmptyStatement, self);
            }
            if (node !== body) {
                return make_node(AST_SimpleStatement, self, { body: node });
            }
        }
        return self;
    });

    OPT(AST_While, function(self, compressor) {
        return compressor.option("loops") ? make_node(AST_For, self, self).optimize(compressor) : self;
    });

    function has_break_or_continue(loop, parent) {
        var found = false;
        var tw = new TreeWalker(function(node) {
            if (found || node instanceof AST_Scope) return true;
            if (node instanceof AST_LoopControl && tw.loopcontrol_target(node) === loop) {
                return found = true;
            }
        });
        if (parent instanceof AST_LabeledStatement) tw.push(parent);
        tw.push(loop);
        loop.body.walk(tw);
        return found;
    }

    OPT(AST_Do, function(self, compressor) {
        if (!compressor.option("loops")) return self;
        var cond = self.condition.is_truthy() || self.condition.tail_node().evaluate(compressor);
        if (!(cond instanceof AST_Node)) {
            if (cond) return make_node(AST_For, self, {
                body: make_node(AST_BlockStatement, self.body, {
                    body: [
                        self.body,
                        make_node(AST_SimpleStatement, self.condition, {
                            body: self.condition
                        })
                    ]
                })
            }).optimize(compressor);
            if (!has_break_or_continue(self, compressor.parent())) {
                return make_node(AST_BlockStatement, self.body, {
                    body: [
                        self.body,
                        make_node(AST_SimpleStatement, self.condition, {
                            body: self.condition
                        })
                    ]
                }).optimize(compressor);
            }
        }
        if (self.body instanceof AST_SimpleStatement) return make_node(AST_For, self, {
            condition: make_sequence(self.condition, [
                self.body.body,
                self.condition
            ]),
            body: make_node(AST_EmptyStatement, self)
        }).optimize(compressor);
        return self;
    });

    function if_break_in_loop(self, compressor) {
        var first = self.body instanceof AST_BlockStatement ? self.body.body[0] : self.body;
        if (compressor.option("dead_code") && is_break(first)) {
            var body = [];
            if (self.init instanceof AST_Statement) {
                body.push(self.init);
            } else if (self.init) {
                body.push(make_node(AST_SimpleStatement, self.init, {
                    body: self.init
                }));
            }
            if (self.condition) {
                body.push(make_node(AST_SimpleStatement, self.condition, {
                    body: self.condition
                }));
            }
            extract_declarations_from_unreachable_code(self.body, body);
            return make_node(AST_BlockStatement, self, {
                body: body
            });
        }
        if (first instanceof AST_If) {
            if (is_break(first.body)) {
                if (self.condition) {
                    self.condition = make_node(AST_Binary, self.condition, {
                        left: self.condition,
                        operator: "&&",
                        right: first.condition.negate(compressor),
                    });
                } else {
                    self.condition = first.condition.negate(compressor);
                }
                drop_it(first.alternative);
            } else if (is_break(first.alternative)) {
                if (self.condition) {
                    self.condition = make_node(AST_Binary, self.condition, {
                        left: self.condition,
                        operator: "&&",
                        right: first.condition,
                    });
                } else {
                    self.condition = first.condition;
                }
                drop_it(first.body);
            }
        }
        return self;

        function is_break(node) {
            return node instanceof AST_Break
                && compressor.loopcontrol_target(node) === compressor.self();
        }

        function drop_it(rest) {
            rest = as_statement_array(rest);
            if (self.body instanceof AST_BlockStatement) {
                self.body = self.body.clone();
                self.body.body = rest.concat(self.body.body.slice(1));
                self.body = self.body.transform(compressor);
            } else {
                self.body = make_node(AST_BlockStatement, self.body, {
                    body: rest
                }).transform(compressor);
            }
            self = if_break_in_loop(self, compressor);
        }
    }

    OPT(AST_For, function(self, compressor) {
        if (!compressor.option("loops")) return self;
        if (compressor.option("side_effects")) {
            if (self.init) self.init = self.init.drop_side_effect_free(compressor);
            if (self.step) self.step = self.step.drop_side_effect_free(compressor);
        }
        if (self.condition) {
            var cond = self.condition.evaluate(compressor);
            if (!(cond instanceof AST_Node)) {
                if (cond) self.condition = null;
                else if (!compressor.option("dead_code")) {
                    var orig = self.condition;
                    self.condition = make_node_from_constant(cond, self.condition);
                    self.condition = best_of_expression(self.condition.transform(compressor), orig);
                }
            }
            if (cond instanceof AST_Node) {
                cond = self.condition.is_truthy() || self.condition.tail_node().evaluate(compressor);
            }
            if (!cond) {
                if (compressor.option("dead_code")) {
                    var body = [];
                    extract_declarations_from_unreachable_code(self.body, body);
                    if (self.init instanceof AST_Statement) {
                        body.push(self.init);
                    } else if (self.init) {
                        body.push(make_node(AST_SimpleStatement, self.init, {
                            body: self.init
                        }));
                    }
                    body.push(make_node(AST_SimpleStatement, self.condition, {
                        body: self.condition
                    }));
                    return make_node(AST_BlockStatement, self, { body: body }).optimize(compressor);
                }
            } else if (self.condition && !(cond instanceof AST_Node)) {
                self.body = make_node(AST_BlockStatement, self.body, {
                    body: [
                        make_node(AST_SimpleStatement, self.condition, {
                            body: self.condition
                        }),
                        self.body
                    ]
                });
                self.condition = null;
            }
        }
        return if_break_in_loop(self, compressor);
    });

    OPT(AST_If, function(self, compressor) {
        if (is_empty(self.alternative)) self.alternative = null;

        if (!compressor.option("conditionals")) return self;
        // if condition can be statically determined, warn and drop
        // one of the blocks.  note, statically determined implies
        // “has no side effects”; also it doesn't work for cases like
        // `x && true`, though it probably should.
        var cond = self.condition.evaluate(compressor);
        if (!compressor.option("dead_code") && !(cond instanceof AST_Node)) {
            var orig = self.condition;
            self.condition = make_node_from_constant(cond, orig);
            self.condition = best_of_expression(self.condition.transform(compressor), orig);
        }
        if (compressor.option("dead_code")) {
            if (cond instanceof AST_Node) {
                cond = self.condition.is_truthy() || self.condition.tail_node().evaluate(compressor);
            }
            if (!cond) {
                AST_Node.warn("Condition always false [{file}:{line},{col}]", self.condition.start);
                var body = [];
                extract_declarations_from_unreachable_code(self.body, body);
                body.push(make_node(AST_SimpleStatement, self.condition, {
                    body: self.condition
                }));
                if (self.alternative) body.push(self.alternative);
                return make_node(AST_BlockStatement, self, { body: body }).optimize(compressor);
            } else if (!(cond instanceof AST_Node)) {
                AST_Node.warn("Condition always true [{file}:{line},{col}]", self.condition.start);
                var body = [];
                if (self.alternative) extract_declarations_from_unreachable_code(self.alternative, body);
                body.push(make_node(AST_SimpleStatement, self.condition, {
                    body: self.condition
                }));
                body.push(self.body);
                return make_node(AST_BlockStatement, self, { body: body }).optimize(compressor);
            }
        }
        var negated = self.condition.negate(compressor);
        var self_condition_length = self.condition.print_to_string().length;
        var negated_length = negated.print_to_string().length;
        var negated_is_best = negated_length < self_condition_length;
        if (self.alternative && negated_is_best) {
            negated_is_best = false; // because we already do the switch here.
            // no need to swap values of self_condition_length and negated_length
            // here because they are only used in an equality comparison later on.
            self.condition = negated;
            var tmp = self.body;
            self.body = self.alternative || make_node(AST_EmptyStatement, self);
            self.alternative = tmp;
        }
        if (is_empty(self.body) && is_empty(self.alternative)) {
            return make_node(AST_SimpleStatement, self.condition, {
                body: self.condition.clone()
            }).optimize(compressor);
        }
        if (self.body instanceof AST_SimpleStatement
            && self.alternative instanceof AST_SimpleStatement) {
            return make_node(AST_SimpleStatement, self, {
                body: make_node(AST_Conditional, self, {
                    condition   : self.condition,
                    consequent  : self.body.body,
                    alternative : self.alternative.body
                })
            }).optimize(compressor);
        }
        if (is_empty(self.alternative) && self.body instanceof AST_SimpleStatement) {
            if (self_condition_length === negated_length && !negated_is_best
                && self.condition instanceof AST_Binary && self.condition.operator == "||") {
                // although the code length of self.condition and negated are the same,
                // negated does not require additional surrounding parentheses.
                // see https://github.com/mishoo/UglifyJS2/issues/979
                negated_is_best = true;
            }
            if (negated_is_best) return make_node(AST_SimpleStatement, self, {
                body: make_node(AST_Binary, self, {
                    operator : "||",
                    left     : negated,
                    right    : self.body.body
                }).transform(compressor)
            }).optimize(compressor);
            return make_node(AST_SimpleStatement, self, {
                body: make_node(AST_Binary, self, {
                    operator : "&&",
                    left     : self.condition,
                    right    : self.body.body
                }).transform(compressor)
            }).optimize(compressor);
        }
        if (self.body instanceof AST_EmptyStatement
            && self.alternative instanceof AST_SimpleStatement) {
            return make_node(AST_SimpleStatement, self, {
                body: make_node(AST_Binary, self, {
                    operator : "||",
                    left     : self.condition,
                    right    : self.alternative.body
                }).transform(compressor)
            }).optimize(compressor);
        }
        if (self.body instanceof AST_Exit
            && self.alternative instanceof AST_Exit
            && self.body.TYPE == self.alternative.TYPE) {
            return make_node(self.body.CTOR, self, {
                value: make_node(AST_Conditional, self, {
                    condition   : self.condition,
                    consequent  : self.body.value || make_node(AST_Undefined, self.body),
                    alternative : self.alternative.value || make_node(AST_Undefined, self.alternative)
                }).transform(compressor)
            }).optimize(compressor);
        }
        if (self.body instanceof AST_If
            && !self.body.alternative
            && !self.alternative) {
            self = make_node(AST_If, self, {
                condition: make_node(AST_Binary, self.condition, {
                    operator: "&&",
                    left: self.condition,
                    right: self.body.condition
                }),
                body: self.body.body,
                alternative: null
            });
        }
        if (aborts(self.body)) {
            if (self.alternative) {
                var alt = self.alternative;
                self.alternative = null;
                return make_node(AST_BlockStatement, self, {
                    body: [ self, alt ]
                }).optimize(compressor);
            }
        }
        if (aborts(self.alternative)) {
            var body = self.body;
            self.body = self.alternative;
            self.condition = negated_is_best ? negated : self.condition.negate(compressor);
            self.alternative = null;
            return make_node(AST_BlockStatement, self, {
                body: [ self, body ]
            }).optimize(compressor);
        }
        return self;
    });

    OPT(AST_Switch, function(self, compressor) {
        if (!compressor.option("switches")) return self;
        var branch;
        var value = self.expression.evaluate(compressor);
        if (!(value instanceof AST_Node)) {
            var orig = self.expression;
            self.expression = make_node_from_constant(value, orig);
            self.expression = best_of_expression(self.expression.transform(compressor), orig);
        }
        if (!compressor.option("dead_code")) return self;
        if (value instanceof AST_Node) {
            value = self.expression.tail_node().evaluate(compressor);
        }
        var decl = [];
        var body = [];
        var default_branch;
        var exact_match;
        for (var i = 0, len = self.body.length; i < len && !exact_match; i++) {
            branch = self.body[i];
            if (branch instanceof AST_Default) {
                if (!default_branch) {
                    default_branch = branch;
                } else {
                    eliminate_branch(branch, body[body.length - 1]);
                }
            } else if (!(value instanceof AST_Node)) {
                var exp = branch.expression.evaluate(compressor);
                if (!(exp instanceof AST_Node) && exp !== value) {
                    eliminate_branch(branch, body[body.length - 1]);
                    continue;
                }
                if (exp instanceof AST_Node) exp = branch.expression.tail_node().evaluate(compressor);
                if (exp === value) {
                    exact_match = branch;
                    if (default_branch) {
                        var default_index = body.indexOf(default_branch);
                        body.splice(default_index, 1);
                        eliminate_branch(default_branch, body[default_index - 1]);
                        default_branch = null;
                    }
                }
            }
            if (aborts(branch)) {
                var prev = body[body.length - 1];
                if (aborts(prev) && prev.body.length == branch.body.length
                    && make_node(AST_BlockStatement, prev, prev).equivalent_to(make_node(AST_BlockStatement, branch, branch))) {
                    prev.body = [];
                }
            }
            body.push(branch);
        }
        while (i < len) eliminate_branch(self.body[i++], body[body.length - 1]);
        if (body.length > 0) {
            body[0].body = decl.concat(body[0].body);
        }
        self.body = body;
        while (branch = body[body.length - 1]) {
            var stat = branch.body[branch.body.length - 1];
            if (stat instanceof AST_Break && compressor.loopcontrol_target(stat) === self)
                branch.body.pop();
            if (branch.body.length || branch instanceof AST_Case
                && (default_branch || branch.expression.has_side_effects(compressor))) break;
            if (body.pop() === default_branch) default_branch = null;
        }
        if (body.length == 0) {
            return make_node(AST_BlockStatement, self, {
                body: decl.concat(make_node(AST_SimpleStatement, self.expression, {
                    body: self.expression
                }))
            }).optimize(compressor);
        }
        if (body.length == 1 && (body[0] === exact_match || body[0] === default_branch)) {
            var has_break = false;
            var tw = new TreeWalker(function(node) {
                if (has_break
                    || node instanceof AST_Lambda
                    || node instanceof AST_SimpleStatement) return true;
                if (node instanceof AST_Break && tw.loopcontrol_target(node) === self)
                    has_break = true;
            });
            self.walk(tw);
            if (!has_break) {
                var statements = body[0].body.slice();
                var exp = body[0].expression;
                if (exp) statements.unshift(make_node(AST_SimpleStatement, exp, {
                    body: exp
                }));
                statements.unshift(make_node(AST_SimpleStatement, self.expression, {
                    body:self.expression
                }));
                return make_node(AST_BlockStatement, self, {
                    body: statements
                }).optimize(compressor);
            }
        }
        return self;

        function eliminate_branch(branch, prev) {
            if (prev && !aborts(prev)) {
                prev.body = prev.body.concat(branch.body);
            } else {
                extract_declarations_from_unreachable_code(branch, decl);
            }
        }
    });

    OPT(AST_Try, function(self, compressor) {
        tighten_body(self.body, compressor);
        if (self.bcatch && self.bfinally && all(self.bfinally.body, is_empty)) self.bfinally = null;
        if (compressor.option("dead_code") && all(self.body, is_empty)) {
            var body = [];
            if (self.bcatch) {
                extract_declarations_from_unreachable_code(self.bcatch, body);
                body.forEach(function(stat) {
                    if (!(stat instanceof AST_Definitions)) return;
                    stat.definitions.forEach(function(var_def) {
                        var def = var_def.name.definition().redefined();
                        if (!def) return;
                        var_def.name = var_def.name.clone();
                        var_def.name.thedef = def;
                    });
                });
            }
            if (self.bfinally) body = body.concat(self.bfinally.body);
            return make_node(AST_BlockStatement, self, {
                body: body
            }).optimize(compressor);
        }
        return self;
    });

    AST_Definitions.DEFMETHOD("remove_initializers", function() {
        this.definitions.forEach(function(def) {
            def.value = null;
        });
    });

    AST_Definitions.DEFMETHOD("to_assignments", function(compressor) {
        var reduce_vars = compressor.option("reduce_vars");
        var assignments = this.definitions.reduce(function(a, def) {
            if (def.value) {
                var name = make_node(AST_SymbolRef, def.name, def.name);
                a.push(make_node(AST_Assign, def, {
                    operator : "=",
                    left     : name,
                    right    : def.value
                }));
                if (reduce_vars) name.definition().fixed = false;
            }
            def = def.name.definition();
            def.eliminated++;
            def.replaced--;
            return a;
        }, []);
        if (assignments.length == 0) return null;
        return make_sequence(this, assignments);
    });

    OPT(AST_Definitions, function(self, compressor) {
        return self.definitions.length ? self : make_node(AST_EmptyStatement, self);
    });

    AST_Call.DEFMETHOD("lift_sequences", function(compressor) {
        if (!compressor.option("sequences")) return this;
        var exp = this.expression;
        if (!(exp instanceof AST_Sequence)) return this;
        var tail = exp.tail_node();
        if (needs_unbinding(compressor, tail) && !(this instanceof AST_New)) return this;
        var expressions = exp.expressions.slice(0, -1);
        var node = this.clone();
        node.expression = tail;
        expressions.push(node);
        return make_sequence(this, expressions).optimize(compressor);
    });

    OPT(AST_Call, function(self, compressor) {
        var seq = self.lift_sequences(compressor);
        if (seq !== self) {
            return seq;
        }
        var exp = self.expression;
        var fn = exp;
        if (compressor.option("reduce_vars") && fn instanceof AST_SymbolRef) {
            fn = fn.fixed_value();
        }
        var is_func = fn instanceof AST_Lambda;
        if (compressor.option("unused")
            && is_func
            && !fn.uses_arguments
            && !fn.pinned()) {
            var pos = 0, last = 0;
            for (var i = 0; i < self.args.length; i++) {
                var trim = i >= fn.argnames.length;
                if (trim || fn.argnames[i].__unused) {
                    var node = self.args[i].drop_side_effect_free(compressor);
                    if (node) {
                        self.args[pos++] = node;
                    } else if (!trim) {
                        self.args[pos++] = make_node(AST_Number, self.args[i], {
                            value: 0
                        });
                        continue;
                    }
                } else {
                    self.args[pos++] = self.args[i];
                }
                last = pos;
            }
            self.args.length = last;
        }
        if (compressor.option("unsafe")) {
            if (is_undeclared_ref(exp)) switch (exp.name) {
              case "Array":
                if (self.args.length == 1) {
                    var first = self.args[0];
                    if (first instanceof AST_Number) try {
                        var length = first.getValue();
                        if (length > 6) break;
                        var elements = Array(length);
                        for (var i = 0; i < length; i++) elements[i] = make_node(AST_Hole, self);
                        return make_node(AST_Array, self, {
                            elements: elements
                        });
                    } catch (ex) {
                        AST_Node.warn("Invalid array length: {length} [{file}:{line},{col}]", {
                            length: length,
                            file: self.start.file,
                            line: self.start.line,
                            col: self.start.col
                        });
                        break;
                    }
                    if (!first.is_boolean(compressor) && !first.is_string(compressor)) break;
                }
                return make_node(AST_Array, self, {
                    elements: self.args
                });
              case "Object":
                if (self.args.length == 0) {
                    return make_node(AST_Object, self, {
                        properties: []
                    });
                }
                break;
              case "String":
                if (self.args.length == 0) return make_node(AST_String, self, {
                    value: ""
                });
                if (self.args.length <= 1) return make_node(AST_Binary, self, {
                    left: self.args[0],
                    operator: "+",
                    right: make_node(AST_String, self, { value: "" })
                }).optimize(compressor);
                break;
              case "Number":
                if (self.args.length == 0) return make_node(AST_Number, self, {
                    value: 0
                });
                if (self.args.length == 1) return make_node(AST_UnaryPrefix, self, {
                    expression: self.args[0],
                    operator: "+"
                }).optimize(compressor);
              case "Boolean":
                if (self.args.length == 0) return make_node(AST_False, self);
                if (self.args.length == 1) return make_node(AST_UnaryPrefix, self, {
                    expression: make_node(AST_UnaryPrefix, self, {
                        expression: self.args[0],
                        operator: "!"
                    }),
                    operator: "!"
                }).optimize(compressor);
                break;
              case "RegExp":
                var params = [];
                if (all(self.args, function(arg) {
                    var value = arg.evaluate(compressor);
                    params.unshift(value);
                    return arg !== value;
                })) {
                    try {
                        return best_of(compressor, self, make_node(AST_RegExp, self, {
                            value: RegExp.apply(RegExp, params),
                        }));
                    } catch (ex) {
                        AST_Node.warn("Error converting {expr} [{file}:{line},{col}]", {
                            expr: self.print_to_string(),
                            file: self.start.file,
                            line: self.start.line,
                            col: self.start.col
                        });
                    }
                }
                break;
            } else if (exp instanceof AST_Dot) switch(exp.property) {
              case "toString":
                if (self.args.length == 0 && !exp.expression.may_throw_on_access(compressor)) {
                    return make_node(AST_Binary, self, {
                        left: make_node(AST_String, self, { value: "" }),
                        operator: "+",
                        right: exp.expression
                    }).optimize(compressor);
                }
                break;
              case "join":
                if (exp.expression instanceof AST_Array) EXIT: {
                    var separator;
                    if (self.args.length > 0) {
                        separator = self.args[0].evaluate(compressor);
                        if (separator === self.args[0]) break EXIT; // not a constant
                    }
                    var elements = [];
                    var consts = [];
                    exp.expression.elements.forEach(function(el) {
                        var value = el.evaluate(compressor);
                        if (value !== el) {
                            consts.push(value);
                        } else {
                            if (consts.length > 0) {
                                elements.push(make_node(AST_String, self, {
                                    value: consts.join(separator)
                                }));
                                consts.length = 0;
                            }
                            elements.push(el);
                        }
                    });
                    if (consts.length > 0) {
                        elements.push(make_node(AST_String, self, {
                            value: consts.join(separator)
                        }));
                    }
                    if (elements.length == 0) return make_node(AST_String, self, { value: "" });
                    if (elements.length == 1) {
                        if (elements[0].is_string(compressor)) {
                            return elements[0];
                        }
                        return make_node(AST_Binary, elements[0], {
                            operator : "+",
                            left     : make_node(AST_String, self, { value: "" }),
                            right    : elements[0]
                        });
                    }
                    if (separator == "") {
                        var first;
                        if (elements[0].is_string(compressor)
                            || elements[1].is_string(compressor)) {
                            first = elements.shift();
                        } else {
                            first = make_node(AST_String, self, { value: "" });
                        }
                        return elements.reduce(function(prev, el) {
                            return make_node(AST_Binary, el, {
                                operator : "+",
                                left     : prev,
                                right    : el
                            });
                        }, first).optimize(compressor);
                    }
                    // need this awkward cloning to not affect original element
                    // best_of will decide which one to get through.
                    var node = self.clone();
                    node.expression = node.expression.clone();
                    node.expression.expression = node.expression.expression.clone();
                    node.expression.expression.elements = elements;
                    return best_of(compressor, self, node);
                }
                break;
              case "charAt":
                if (self.args.length < 2) {
                    var node = make_node(AST_Sub, self, {
                        expression: exp.expression,
                        property: self.args.length ? make_node(AST_Binary, self.args[0], {
                            operator: "|",
                            left: make_node(AST_Number, self, {
                                value: 0
                            }),
                            right: self.args[0]
                        }) : make_node(AST_Number, self, {
                            value: 0
                        })
                    });
                    node.is_string = return_true;
                    return node.optimize(compressor);
                }
                break;
              case "apply":
                if (self.args.length == 2 && self.args[1] instanceof AST_Array) {
                    var args = self.args[1].elements.slice();
                    args.unshift(self.args[0]);
                    return make_node(AST_Call, self, {
                        expression: make_node(AST_Dot, exp, {
                            expression: exp.expression,
                            property: "call"
                        }),
                        args: args
                    }).optimize(compressor);
                }
                break;
              case "call":
                var func = exp.expression;
                if (func instanceof AST_SymbolRef) {
                    func = func.fixed_value();
                }
                if (func instanceof AST_Lambda && !func.contains_this()) {
                    return (self.args.length ? make_sequence(this, [
                        self.args[0],
                        make_node(AST_Call, self, {
                            expression: exp.expression,
                            args: self.args.slice(1)
                        })
                    ]) : make_node(AST_Call, self, {
                        expression: exp.expression,
                        args: []
                    })).optimize(compressor);
                }
                break;
            }
        }
        if (compressor.option("unsafe_Function")
            && is_undeclared_ref(exp)
            && exp.name == "Function") {
            // new Function() => function(){}
            if (self.args.length == 0) return make_node(AST_Function, self, {
                argnames: [],
                body: []
            });
            if (all(self.args, function(x) {
                return x instanceof AST_String;
            })) {
                // quite a corner-case, but we can handle it:
                //   https://github.com/mishoo/UglifyJS2/issues/203
                // if the code argument is a constant, then we can minify it.
                try {
                    var code = "n(function(" + self.args.slice(0, -1).map(function(arg) {
                        return arg.value;
                    }).join(",") + "){" + self.args[self.args.length - 1].value + "})";
                    var ast = parse(code);
                    var mangle = { ie8: compressor.option("ie8") };
                    ast.figure_out_scope(mangle);
                    var comp = new Compressor(compressor.options);
                    ast = ast.transform(comp);
                    ast.figure_out_scope(mangle);
                    ast.compute_char_frequency(mangle);
                    ast.mangle_names(mangle);
                    var fun;
                    ast.walk(new TreeWalker(function(node) {
                        if (fun) return true;
                        if (node instanceof AST_Lambda) {
                            fun = node;
                            return true;
                        }
                    }));
                    var code = OutputStream();
                    AST_BlockStatement.prototype._codegen.call(fun, fun, code);
                    self.args = [
                        make_node(AST_String, self, {
                            value: fun.argnames.map(function(arg) {
                                return arg.print_to_string();
                            }).join(",")
                        }),
                        make_node(AST_String, self.args[self.args.length - 1], {
                            value: code.get().replace(/^\{|\}$/g, "")
                        })
                    ];
                    return self;
                } catch (ex) {
                    if (ex instanceof JS_Parse_Error) {
                        AST_Node.warn("Error parsing code passed to new Function [{file}:{line},{col}]", self.args[self.args.length - 1].start);
                        AST_Node.warn(ex.toString());
                    } else {
                        throw ex;
                    }
                }
            }
        }
        var stat = is_func && fn.body[0];
        var can_inline = compressor.option("inline") && !self.is_expr_pure(compressor);
        if (can_inline && stat instanceof AST_Return) {
            var value = stat.value;
            if (!value || value.is_constant_expression()) {
                if (value) {
                    value = value.clone(true);
                } else {
                    value = make_node(AST_Undefined, self);
                }
                var args = self.args.concat(value);
                return make_sequence(self, args).optimize(compressor);
            }
        }
        if (is_func) {
            var def, value, scope, in_loop, level = -1;
            if (can_inline
                && !fn.uses_arguments
                && !fn.pinned()
                && !(fn.name && fn instanceof AST_Function)
                && (value = can_flatten_body(stat))
                && (exp === fn
                    || compressor.option("unused")
                        && (def = exp.definition()).references.length == 1
                        && !recursive_ref(compressor, def)
                        && fn.is_constant_expression(exp.scope))
                && !self.pure
                && !fn.contains_this()
                && can_inject_symbols()) {
                fn._squeezed = true;
                return make_sequence(self, flatten_fn()).optimize(compressor);
            }
            if (compressor.option("side_effects") && all(fn.body, is_empty)) {
                var args = self.args.concat(make_node(AST_Undefined, self));
                return make_sequence(self, args).optimize(compressor);
            }
        }
        if (compressor.option("drop_console")) {
            if (exp instanceof AST_PropAccess) {
                var name = exp.expression;
                while (name.expression) {
                    name = name.expression;
                }
                if (is_undeclared_ref(name) && name.name == "console") {
                    return make_node(AST_Undefined, self).optimize(compressor);
                }
            }
        }
        if (compressor.option("negate_iife")
            && compressor.parent() instanceof AST_SimpleStatement
            && is_iife_call(self)) {
            return self.negate(compressor, true);
        }
        var ev = self.evaluate(compressor);
        if (ev !== self) {
            ev = make_node_from_constant(ev, self).optimize(compressor);
            return best_of(compressor, ev, self);
        }
        return self;

        function return_value(stat) {
            if (!stat) return make_node(AST_Undefined, self);
            if (stat instanceof AST_Return) {
                if (!stat.value) return make_node(AST_Undefined, self);
                return stat.value.clone(true);
            }
            if (stat instanceof AST_SimpleStatement) {
                return make_node(AST_UnaryPrefix, stat, {
                    operator: "void",
                    expression: stat.body.clone(true)
                });
            }
        }

        function can_flatten_body(stat) {
            var len = fn.body.length;
            if (compressor.option("inline") < 3) {
                return len == 1 && return_value(stat);
            }
            stat = null;
            for (var i = 0; i < len; i++) {
                var line = fn.body[i];
                if (line instanceof AST_Var) {
                    if (stat && !all(line.definitions, function(var_def) {
                        return !var_def.value;
                    })) {
                        return false;
                    }
                } else if (line instanceof AST_Defun || line instanceof AST_EmptyStatement) {
                    continue;
                } else if (stat) {
                    return false;
                } else {
                    stat = line;
                }
            }
            return return_value(stat);
        }

        function var_exists(catches, name) {
            return catches[name] || identifier_atom[name] || scope.var_names()[name];
        }

        function can_inject_args(catches, safe_to_inject) {
            for (var i = 0; i < fn.argnames.length; i++) {
                var arg = fn.argnames[i];
                if (arg.__unused) continue;
                if (!safe_to_inject || var_exists(catches, arg.name)) return false;
                if (in_loop) in_loop.push(arg.definition());
            }
            return true;
        }

        function can_inject_vars(catches, safe_to_inject) {
            for (var i = 0; i < fn.body.length; i++) {
                var stat = fn.body[i];
                if (stat instanceof AST_Defun) {
                    if (!safe_to_inject || var_exists(catches, stat.name.name)) return false;
                    continue;
                }
                if (!(stat instanceof AST_Var)) continue;
                if (!safe_to_inject) return false;
                for (var j = stat.definitions.length; --j >= 0;) {
                    var name = stat.definitions[j].name;
                    if (var_exists(catches, name.name)) return false;
                    if (in_loop) in_loop.push(name.definition());
                }
            }
            return true;
        }

        function can_inject_symbols() {
            var catches = Object.create(null);
            do {
                scope = compressor.parent(++level);
                if (scope instanceof AST_Catch) {
                    catches[scope.argname.name] = true;
                } else if (scope instanceof AST_IterationStatement) {
                    in_loop = [];
                } else if (scope instanceof AST_SymbolRef) {
                    if (scope.fixed_value() instanceof AST_Scope) return false;
                }
            } while (!(scope instanceof AST_Scope));
            var safe_to_inject = (!(scope instanceof AST_Toplevel) || compressor.toplevel.vars)
                && (exp !== fn || fn.parent_scope === compressor.find_parent(AST_Scope));
            var inline = compressor.option("inline");
            if (!can_inject_vars(catches, inline >= 3 && safe_to_inject)) return false;
            if (!can_inject_args(catches, inline >= 2 && safe_to_inject)) return false;
            return !in_loop || in_loop.length == 0 || !is_reachable(fn, in_loop);
        }

        function append_var(decls, expressions, name, value) {
            var def = name.definition();
            scope.variables.set(name.name, def);
            scope.enclosed.push(def);
            if (!scope.var_names()[name.name]) {
                scope.var_names()[name.name] = true;
                decls.push(make_node(AST_VarDef, name, {
                    name: name,
                    value: null
                }));
            }
            var sym = make_node(AST_SymbolRef, name, name);
            def.references.push(sym);
            if (value) expressions.push(make_node(AST_Assign, self, {
                operator: "=",
                left: sym,
                right: value
            }));
        }

        function flatten_args(decls, expressions) {
            var len = fn.argnames.length;
            for (var i = self.args.length; --i >= len;) {
                expressions.push(self.args[i]);
            }
            for (i = len; --i >= 0;) {
                var name = fn.argnames[i];
                var value = self.args[i];
                if (name.__unused || scope.var_names()[name.name]) {
                    if (value) expressions.push(value);
                } else {
                    var symbol = make_node(AST_SymbolVar, name, name);
                    name.definition().orig.push(symbol);
                    if (!value && in_loop) value = make_node(AST_Undefined, self);
                    append_var(decls, expressions, symbol, value);
                }
            }
            decls.reverse();
            expressions.reverse();
        }

        function flatten_vars(decls, expressions) {
            var pos = expressions.length;
            for (var i = 0; i < fn.body.length; i++) {
                var stat = fn.body[i];
                if (!(stat instanceof AST_Var)) continue;
                for (var j = 0; j < stat.definitions.length; j++) {
                    var var_def = stat.definitions[j];
                    var name = var_def.name;
                    var redef = name.definition().redefined();
                    if (redef) {
                        name = name.clone();
                        name.thedef = redef;
                    }
                    append_var(decls, expressions, name, var_def.value);
                    if (in_loop && all(fn.argnames, function(argname) {
                        return argname.name != name.name;
                    })) {
                        var def = fn.variables.get(name.name);
                        var sym = make_node(AST_SymbolRef, name, name);
                        def.references.push(sym);
                        expressions.splice(pos++, 0, make_node(AST_Assign, var_def, {
                            operator: "=",
                            left: sym,
                            right: make_node(AST_Undefined, name)
                        }));
                    }
                }
            }
        }

        function flatten_fn() {
            var decls = [];
            var expressions = [];
            flatten_args(decls, expressions);
            flatten_vars(decls, expressions);
            expressions.push(value);
            var args = fn.body.filter(function(stat) {
                if (stat instanceof AST_Defun) {
                    var def = stat.name.definition();
                    scope.functions.set(def.name, def);
                    scope.variables.set(def.name, def);
                    scope.enclosed.push(def);
                    scope.var_names()[def.name] = true;
                    return true;
                }
            });
            args.unshift(scope.body.indexOf(compressor.parent(level - 1)) + 1, 0);
            if (decls.length) args.push(make_node(AST_Var, fn, {
                definitions: decls
            }));
            [].splice.apply(scope.body, args);
            return expressions;
        }
    });

    OPT(AST_New, function(self, compressor) {
        var seq = self.lift_sequences(compressor);
        if (seq !== self) {
            return seq;
        }
        if (compressor.option("unsafe")) {
            var exp = self.expression;
            if (is_undeclared_ref(exp)) {
                switch (exp.name) {
                  case "Object":
                  case "RegExp":
                  case "Function":
                  case "Error":
                  case "Array":
                    return make_node(AST_Call, self, self).transform(compressor);
                }
            }
        }
        return self;
    });

    OPT(AST_Sequence, function(self, compressor) {
        if (!compressor.option("side_effects")) return self;
        var expressions = [];
        filter_for_side_effects();
        var end = expressions.length - 1;
        trim_right_for_undefined();
        if (end == 0) {
            self = maintain_this_binding(compressor, compressor.parent(), compressor.self(), expressions[0]);
            if (!(self instanceof AST_Sequence)) self = self.optimize(compressor);
            return self;
        }
        self.expressions = expressions;
        return self;

        function filter_for_side_effects() {
            var first = first_in_statement(compressor);
            var last = self.expressions.length - 1;
            self.expressions.forEach(function(expr, index) {
                if (index < last) expr = expr.drop_side_effect_free(compressor, first);
                if (expr) {
                    merge_sequence(expressions, expr);
                    first = false;
                }
            });
        }

        function trim_right_for_undefined() {
            while (end > 0 && is_undefined(expressions[end], compressor)) end--;
            if (end < expressions.length - 1) {
                expressions[end] = make_node(AST_UnaryPrefix, self, {
                    operator   : "void",
                    expression : expressions[end]
                });
                expressions.length = end + 1;
            }
        }
    });

    AST_Unary.DEFMETHOD("lift_sequences", function(compressor) {
        if (compressor.option("sequences") && this.expression instanceof AST_Sequence) {
            var x = this.expression.expressions.slice();
            var e = this.clone();
            e.expression = x.pop();
            x.push(e);
            return make_sequence(this, x).optimize(compressor);
        }
        return this;
    });

    OPT(AST_UnaryPostfix, function(self, compressor) {
        return self.lift_sequences(compressor);
    });

    OPT(AST_UnaryPrefix, function(self, compressor) {
        var e = self.expression;
        if (compressor.option("evaluate")
            && self.operator == "delete"
            && !(e instanceof AST_SymbolRef
                || e instanceof AST_PropAccess
                || is_identifier_atom(e))) {
            if (e instanceof AST_Sequence) {
                e = e.expressions.slice();
                e.push(make_node(AST_True, self));
                return make_sequence(self, e).optimize(compressor);
            }
            return make_sequence(self, [ e, make_node(AST_True, self) ]).optimize(compressor);
        }
        var seq = self.lift_sequences(compressor);
        if (seq !== self) {
            return seq;
        }
        if (compressor.option("side_effects") && self.operator == "void") {
            e = e.drop_side_effect_free(compressor);
            if (e) {
                self.expression = e;
                return self;
            } else {
                return make_node(AST_Undefined, self).optimize(compressor);
            }
        }
        if (compressor.option("booleans")) {
            if (self.operator == "!" && e.is_truthy()) {
                return make_sequence(self, [ e, make_node(AST_False, self) ]).optimize(compressor);
            } else if (compressor.in_boolean_context()) switch (self.operator) {
              case "!":
                if (e instanceof AST_UnaryPrefix && e.operator == "!") {
                    // !!foo ==> foo, if we're in boolean context
                    return e.expression;
                }
                if (e instanceof AST_Binary) {
                    self = best_of(compressor, self, e.negate(compressor, first_in_statement(compressor)));
                }
                break;
              case "typeof":
                // typeof always returns a non-empty string, thus it's
                // always true in booleans
                AST_Node.warn("Boolean expression always true [{file}:{line},{col}]", self.start);
                return (e instanceof AST_SymbolRef ? make_node(AST_True, self) : make_sequence(self, [
                    e,
                    make_node(AST_True, self)
                ])).optimize(compressor);
            }
        }
        if (self.operator == "-" && e instanceof AST_Infinity) {
            e = e.transform(compressor);
        }
        if (e instanceof AST_Binary
            && (self.operator == "+" || self.operator == "-")
            && (e.operator == "*" || e.operator == "/" || e.operator == "%")) {
            return make_node(AST_Binary, self, {
                operator: e.operator,
                left: make_node(AST_UnaryPrefix, e.left, {
                    operator: self.operator,
                    expression: e.left
                }),
                right: e.right
            });
        }
        // avoids infinite recursion of numerals
        if (self.operator != "-"
            || !(e instanceof AST_Number || e instanceof AST_Infinity)) {
            var ev = self.evaluate(compressor);
            if (ev !== self) {
                ev = make_node_from_constant(ev, self).optimize(compressor);
                return best_of(compressor, ev, self);
            }
        }
        return self;
    });

    AST_Binary.DEFMETHOD("lift_sequences", function(compressor) {
        if (compressor.option("sequences")) {
            if (this.left instanceof AST_Sequence) {
                var x = this.left.expressions.slice();
                var e = this.clone();
                e.left = x.pop();
                x.push(e);
                return make_sequence(this, x).optimize(compressor);
            }
            if (this.right instanceof AST_Sequence && !this.left.has_side_effects(compressor)) {
                var assign = this.operator == "=" && this.left instanceof AST_SymbolRef;
                var x = this.right.expressions;
                var last = x.length - 1;
                for (var i = 0; i < last; i++) {
                    if (!assign && x[i].has_side_effects(compressor)) break;
                }
                if (i == last) {
                    x = x.slice();
                    var e = this.clone();
                    e.right = x.pop();
                    x.push(e);
                    return make_sequence(this, x).optimize(compressor);
                } else if (i > 0) {
                    var e = this.clone();
                    e.right = make_sequence(this.right, x.slice(i));
                    x = x.slice(0, i);
                    x.push(e);
                    return make_sequence(this, x).optimize(compressor);
                }
            }
        }
        return this;
    });

    var indexFns = makePredicate("indexOf lastIndexOf");
    var commutativeOperators = makePredicate("== === != !== * & | ^");
    function is_object(node) {
        return node instanceof AST_Array
            || node instanceof AST_Lambda
            || node instanceof AST_Object;
    }

    OPT(AST_Binary, function(self, compressor) {
        function reversible() {
            return self.left.is_constant()
                || self.right.is_constant()
                || !self.left.has_side_effects(compressor)
                    && !self.right.has_side_effects(compressor);
        }
        function reverse(op) {
            if (reversible()) {
                if (op) self.operator = op;
                var tmp = self.left;
                self.left = self.right;
                self.right = tmp;
            }
        }
        if (commutativeOperators[self.operator] && self.right.is_constant() && !self.left.is_constant()) {
            // if right is a constant, whatever side effects the
            // left side might have could not influence the
            // result.  hence, force switch.
            if (!(self.left instanceof AST_Binary
                    && PRECEDENCE[self.left.operator] >= PRECEDENCE[self.operator])) {
                reverse();
            }
        }
        self = self.lift_sequences(compressor);
        if (compressor.option("assignments") && lazy_op[self.operator]) {
            var assign = self.right;
            // a || (a = x) => a = a || x
            // a && (a = x) => a = a && x
            if (self.left instanceof AST_SymbolRef
                && assign instanceof AST_Assign
                && assign.operator == "="
                && self.left.equivalent_to(assign.left)) {
                self.right = assign.right;
                assign.right = self;
                return assign;
            }
        }
        if (compressor.option("comparisons")) switch (self.operator) {
          case "===":
          case "!==":
            if (is_undefined(self.left, compressor) && self.right.is_defined(compressor)) {
                AST_Node.warn("Expression always defined [{file}:{line},{col}]", self.start);
                return make_sequence(self, [
                    self.right,
                    make_node(self.operator == "===" ? AST_False : AST_True, self)
                ]).optimize(compressor);
            }
            var is_strict_comparison = true;
            if ((self.left.is_string(compressor) && self.right.is_string(compressor)) ||
                (self.left.is_number(compressor) && self.right.is_number(compressor)) ||
                (self.left.is_boolean(compressor) && self.right.is_boolean(compressor)) ||
                self.left.equivalent_to(self.right)) {
                self.operator = self.operator.substr(0, 2);
            }
            // XXX: intentionally falling down to the next case
          case "==":
          case "!=":
            // void 0 == x => null == x
            if (!is_strict_comparison && is_undefined(self.left, compressor)) {
                self.left = make_node(AST_Null, self.left);
            }
            // "undefined" == typeof x => undefined === x
            else if (compressor.option("typeofs")
                && self.left instanceof AST_String
                && self.left.value == "undefined"
                && self.right instanceof AST_UnaryPrefix
                && self.right.operator == "typeof") {
                var expr = self.right.expression;
                if (expr instanceof AST_SymbolRef ? expr.is_declared(compressor)
                    : !(expr instanceof AST_PropAccess && compressor.option("ie8"))) {
                    self.right = expr;
                    self.left = make_node(AST_Undefined, self.left).optimize(compressor);
                    if (self.operator.length == 2) self.operator += "=";
                }
            }
            // obj !== obj => false
            else if (self.left instanceof AST_SymbolRef
                && self.right instanceof AST_SymbolRef
                && self.left.definition() === self.right.definition()
                && is_object(self.left.fixed_value())) {
                return make_node(self.operator[0] == "=" ? AST_True : AST_False, self);
            }
            break;
          case "&&":
          case "||":
            // void 0 !== x && null !== x => null != x
            // void 0 === x || null === x => null == x
            var lhs = self.left;
            if (lhs.operator == self.operator) {
                lhs = lhs.right;
            }
            if (lhs instanceof AST_Binary
                && lhs.operator == (self.operator == "&&" ? "!==" : "===")
                && self.right instanceof AST_Binary
                && lhs.operator == self.right.operator
                && (is_undefined(lhs.left, compressor) && self.right.left instanceof AST_Null
                    || lhs.left instanceof AST_Null && is_undefined(self.right.left, compressor))
                && !lhs.right.has_side_effects(compressor)
                && lhs.right.equivalent_to(self.right.right)) {
                var combined = make_node(AST_Binary, self, {
                    operator: lhs.operator.slice(0, -1),
                    left: make_node(AST_Null, self),
                    right: lhs.right
                });
                if (lhs !== self.left) {
                    combined = make_node(AST_Binary, self, {
                        operator: self.operator,
                        left: self.left.left,
                        right: combined
                    });
                }
                return combined;
            }
            break;
        }
        if (compressor.option("booleans") && compressor.in_boolean_context()) switch (self.operator) {
          case "+":
            var ll = self.left.evaluate(compressor);
            var rr = self.right.evaluate(compressor);
            if (ll && typeof ll == "string") {
                AST_Node.warn("+ in boolean context always true [{file}:{line},{col}]", self.start);
                return make_sequence(self, [
                    self.right,
                    make_node(AST_True, self)
                ]).optimize(compressor);
            }
            if (rr && typeof rr == "string") {
                AST_Node.warn("+ in boolean context always true [{file}:{line},{col}]", self.start);
                return make_sequence(self, [
                    self.left,
                    make_node(AST_True, self)
                ]).optimize(compressor);
            }
            break;
          case "==":
            if (self.left instanceof AST_String && self.left.getValue() == "" && self.right.is_string(compressor)) {
                return make_node(AST_UnaryPrefix, self, {
                    operator: "!",
                    expression: self.right
                }).optimize(compressor);
            }
            break;
          case "!=":
            if (self.left instanceof AST_String && self.left.getValue() == "" && self.right.is_string(compressor)) {
                return self.right.optimize(compressor);
            }
            break;
        }
        if (compressor.option("comparisons") && self.is_boolean(compressor)) {
            if (!(compressor.parent() instanceof AST_Binary)
                || compressor.parent() instanceof AST_Assign) {
                var negated = make_node(AST_UnaryPrefix, self, {
                    operator: "!",
                    expression: self.negate(compressor, first_in_statement(compressor))
                });
                self = best_of(compressor, self, negated);
            }
            switch (self.operator) {
              case ">": reverse("<"); break;
              case ">=": reverse("<="); break;
            }
        }
        if (self.operator == "+") {
            if (self.right instanceof AST_String
                && self.right.getValue() == ""
                && self.left.is_string(compressor)) {
                return self.left.optimize(compressor);
            }
            if (self.left instanceof AST_String
                && self.left.getValue() == ""
                && self.right.is_string(compressor)) {
                return self.right.optimize(compressor);
            }
            if (self.left instanceof AST_Binary
                && self.left.operator == "+"
                && self.left.left instanceof AST_String
                && self.left.left.getValue() == ""
                && self.right.is_string(compressor)) {
                self.left = self.left.right;
                return self.optimize(compressor);
            }
        }
        if (compressor.option("evaluate")) {
            switch (self.operator) {
              case "&&":
                var ll = fuzzy_eval(self.left);
                if (!ll) {
                    AST_Node.warn("Condition left of && always false [{file}:{line},{col}]", self.start);
                    return maintain_this_binding(compressor, compressor.parent(), compressor.self(), self.left).optimize(compressor);
                } else if (!(ll instanceof AST_Node)) {
                    AST_Node.warn("Condition left of && always true [{file}:{line},{col}]", self.start);
                    return make_sequence(self, [ self.left, self.right ]).optimize(compressor);
                }
                var rr = self.right.evaluate(compressor);
                if (!rr) {
                    if (compressor.option("booleans") && compressor.in_boolean_context()) {
                        AST_Node.warn("Boolean && always false [{file}:{line},{col}]", self.start);
                        return make_sequence(self, [
                            self.left,
                            make_node(AST_False, self)
                        ]).optimize(compressor);
                    } else self.falsy = true;
                } else if (!(rr instanceof AST_Node)) {
                    var parent = compressor.parent();
                    if (parent.operator == "&&" && parent.left === compressor.self()
                        || compressor.option("booleans") && compressor.in_boolean_context()) {
                        AST_Node.warn("Dropping side-effect-free && [{file}:{line},{col}]", self.start);
                        return self.left.optimize(compressor);
                    }
                }
                // x || false && y ---> x ? y : false
                if (self.left.operator == "||") {
                    var lr = self.left.right.evaluate(compressor);
                    if (!lr) return make_node(AST_Conditional, self, {
                        condition: self.left.left,
                        consequent: self.right,
                        alternative: self.left.right
                    }).optimize(compressor);
                }
                break;
              case "||":
                var ll = fuzzy_eval(self.left);
                if (!ll) {
                    AST_Node.warn("Condition left of || always false [{file}:{line},{col}]", self.start);
                    return make_sequence(self, [ self.left, self.right ]).optimize(compressor);
                } else if (!(ll instanceof AST_Node)) {
                    AST_Node.warn("Condition left of || always true [{file}:{line},{col}]", self.start);
                    return maintain_this_binding(compressor, compressor.parent(), compressor.self(), self.left).optimize(compressor);
                }
                var rr = self.right.evaluate(compressor);
                if (!rr) {
                    var parent = compressor.parent();
                    if (parent.operator == "||" && parent.left === compressor.self()
                        || compressor.option("booleans") && compressor.in_boolean_context()) {
                        AST_Node.warn("Dropping side-effect-free || [{file}:{line},{col}]", self.start);
                        return self.left.optimize(compressor);
                    }
                } else if (!(rr instanceof AST_Node)) {
                    if (compressor.option("booleans") && compressor.in_boolean_context()) {
                        AST_Node.warn("Boolean || always true [{file}:{line},{col}]", self.start);
                        return make_sequence(self, [
                            self.left,
                            make_node(AST_True, self)
                        ]).optimize(compressor);
                    } else self.truthy = true;
                }
                if (self.left.operator == "&&") {
                    var lr = self.left.right.evaluate(compressor);
                    if (lr && !(lr instanceof AST_Node)) return make_node(AST_Conditional, self, {
                        condition: self.left.left,
                        consequent: self.left.right,
                        alternative: self.right
                    }).optimize(compressor);
                }
                break;
            }
            var associative = true;
            switch (self.operator) {
              case "+":
                // "foo" + ("bar" + x) => "foobar" + x
                if (self.left instanceof AST_Constant
                    && self.right instanceof AST_Binary
                    && self.right.operator == "+"
                    && self.right.left instanceof AST_Constant
                    && self.right.is_string(compressor)) {
                    self = make_node(AST_Binary, self, {
                        operator: "+",
                        left: make_node(AST_String, self.left, {
                            value: "" + self.left.getValue() + self.right.left.getValue(),
                            start: self.left.start,
                            end: self.right.left.end
                        }),
                        right: self.right.right
                    });
                }
                // (x + "foo") + "bar" => x + "foobar"
                if (self.right instanceof AST_Constant
                    && self.left instanceof AST_Binary
                    && self.left.operator == "+"
                    && self.left.right instanceof AST_Constant
                    && self.left.is_string(compressor)) {
                    self = make_node(AST_Binary, self, {
                        operator: "+",
                        left: self.left.left,
                        right: make_node(AST_String, self.right, {
                            value: "" + self.left.right.getValue() + self.right.getValue(),
                            start: self.left.right.start,
                            end: self.right.end
                        })
                    });
                }
                // (x + "foo") + ("bar" + y) => (x + "foobar") + y
                if (self.left instanceof AST_Binary
                    && self.left.operator == "+"
                    && self.left.is_string(compressor)
                    && self.left.right instanceof AST_Constant
                    && self.right instanceof AST_Binary
                    && self.right.operator == "+"
                    && self.right.left instanceof AST_Constant
                    && self.right.is_string(compressor)) {
                    self = make_node(AST_Binary, self, {
                        operator: "+",
                        left: make_node(AST_Binary, self.left, {
                            operator: "+",
                            left: self.left.left,
                            right: make_node(AST_String, self.left.right, {
                                value: "" + self.left.right.getValue() + self.right.left.getValue(),
                                start: self.left.right.start,
                                end: self.right.left.end
                            })
                        }),
                        right: self.right.right
                    });
                }
                // a + -b => a - b
                if (self.right instanceof AST_UnaryPrefix
                    && self.right.operator == "-"
                    && self.left.is_number(compressor)) {
                    self = make_node(AST_Binary, self, {
                        operator: "-",
                        left: self.left,
                        right: self.right.expression
                    });
                    break;
                }
                // -a + b => b - a
                if (self.left instanceof AST_UnaryPrefix
                    && self.left.operator == "-"
                    && reversible()
                    && self.right.is_number(compressor)) {
                    self = make_node(AST_Binary, self, {
                        operator: "-",
                        left: self.right,
                        right: self.left.expression
                    });
                    break;
                }
              case "*":
                associative = compressor.option("unsafe_math");
              case "&":
              case "|":
              case "^":
                // a + +b => +b + a
                if (self.left.is_number(compressor)
                    && self.right.is_number(compressor)
                    && reversible()
                    && !(self.left instanceof AST_Binary
                        && self.left.operator != self.operator
                        && PRECEDENCE[self.left.operator] >= PRECEDENCE[self.operator])) {
                    var reversed = make_node(AST_Binary, self, {
                        operator: self.operator,
                        left: self.right,
                        right: self.left
                    });
                    if (self.right instanceof AST_Constant
                        && !(self.left instanceof AST_Constant)) {
                        self = best_of(compressor, reversed, self);
                    } else {
                        self = best_of(compressor, self, reversed);
                    }
                }
                if (associative && self.is_number(compressor)) {
                    // a + (b + c) => (a + b) + c
                    if (self.right instanceof AST_Binary
                        && self.right.operator == self.operator) {
                        self = make_node(AST_Binary, self, {
                            operator: self.operator,
                            left: make_node(AST_Binary, self.left, {
                                operator: self.operator,
                                left: self.left,
                                right: self.right.left,
                                start: self.left.start,
                                end: self.right.left.end
                            }),
                            right: self.right.right
                        });
                    }
                    // (n + 2) + 3 => 5 + n
                    // (2 * n) * 3 => 6 + n
                    if (self.right instanceof AST_Constant
                        && self.left instanceof AST_Binary
                        && self.left.operator == self.operator) {
                        if (self.left.left instanceof AST_Constant) {
                            self = make_node(AST_Binary, self, {
                                operator: self.operator,
                                left: make_node(AST_Binary, self.left, {
                                    operator: self.operator,
                                    left: self.left.left,
                                    right: self.right,
                                    start: self.left.left.start,
                                    end: self.right.end
                                }),
                                right: self.left.right
                            });
                        } else if (self.left.right instanceof AST_Constant) {
                            self = make_node(AST_Binary, self, {
                                operator: self.operator,
                                left: make_node(AST_Binary, self.left, {
                                    operator: self.operator,
                                    left: self.left.right,
                                    right: self.right,
                                    start: self.left.right.start,
                                    end: self.right.end
                                }),
                                right: self.left.left
                            });
                        }
                    }
                    // (a | 1) | (2 | d) => (3 | a) | b
                    if (self.left instanceof AST_Binary
                        && self.left.operator == self.operator
                        && self.left.right instanceof AST_Constant
                        && self.right instanceof AST_Binary
                        && self.right.operator == self.operator
                        && self.right.left instanceof AST_Constant) {
                        self = make_node(AST_Binary, self, {
                            operator: self.operator,
                            left: make_node(AST_Binary, self.left, {
                                operator: self.operator,
                                left: make_node(AST_Binary, self.left.left, {
                                    operator: self.operator,
                                    left: self.left.right,
                                    right: self.right.left,
                                    start: self.left.right.start,
                                    end: self.right.left.end
                                }),
                                right: self.left.left
                            }),
                            right: self.right.right
                        });
                    }
                }
            }
        }
        if (compressor.option("unsafe")) {
            var indexRight = is_indexFn(self.right);
            if (compressor.option("booleans")
                && indexRight
                && (self.operator == "==" || self.operator == "!=")
                && self.left instanceof AST_Number
                && self.left.getValue() == 0
                && compressor.in_boolean_context()) {
                return (self.operator == "==" ? make_node(AST_UnaryPrefix, self, {
                    operator: "!",
                    expression: self.right
                }) : self.right).optimize(compressor);
            }
            var indexLeft = is_indexFn(self.left);
            if (compressor.option("comparisons") && is_indexOf_match_pattern()) {
                var node = make_node(AST_UnaryPrefix, self, {
                    operator: "!",
                    expression: make_node(AST_UnaryPrefix, self, {
                        operator: "~",
                        expression: indexLeft ? self.left : self.right
                    })
                });
                switch (self.operator) {
                  case "<":
                    if (indexLeft) break;
                  case "<=":
                  case "!=":
                    node = make_node(AST_UnaryPrefix, self, {
                        operator: "!",
                        expression: node
                    });
                    break;
                }
                return node.optimize(compressor);
            }
        }
        // x && (y && z)  ==>  x && y && z
        // x || (y || z)  ==>  x || y || z
        // x + ("y" + z)  ==>  x + "y" + z
        // "x" + (y + "z")==>  "x" + y + "z"
        if (self.right instanceof AST_Binary
            && self.right.operator == self.operator
            && (lazy_op[self.operator]
                || (self.operator == "+"
                    && (self.right.left.is_string(compressor)
                        || (self.left.is_string(compressor)
                            && self.right.right.is_string(compressor))))))
        {
            self.left = make_node(AST_Binary, self.left, {
                operator : self.operator,
                left     : self.left,
                right    : self.right.left
            });
            self.right = self.right.right;
            return self.transform(compressor);
        }
        var ev = self.evaluate(compressor);
        if (ev !== self) {
            ev = make_node_from_constant(ev, self).optimize(compressor);
            return best_of(compressor, ev, self);
        }
        return self;

        function fuzzy_eval(node) {
            if (node.truthy) return true;
            if (node.falsy) return false;
            if (node.is_truthy()) return true;
            return node.evaluate(compressor);
        }

        function is_indexFn(node) {
            return node instanceof AST_Call
                && node.expression instanceof AST_Dot
                && indexFns[node.expression.property];
        }

        function is_indexOf_match_pattern() {
            switch (self.operator) {
              case "<=":
                // 0 <= array.indexOf(string) => !!~array.indexOf(string)
                return indexRight && self.left instanceof AST_Number && self.left.getValue() == 0;
              case "<":
                // array.indexOf(string) < 0 => !~array.indexOf(string)
                if (indexLeft && self.right instanceof AST_Number && self.right.getValue() == 0) return true;
                // -1 < array.indexOf(string) => !!~array.indexOf(string)
              case "==":
              case "!=":
                // -1 == array.indexOf(string) => !~array.indexOf(string)
                // -1 != array.indexOf(string) => !!~array.indexOf(string)
                if (!indexRight) return false;
                return self.left instanceof AST_Number && self.left.getValue() == -1
                    || self.left instanceof AST_UnaryPrefix && self.left.operator == "-"
                        && self.left.expression instanceof AST_Number && self.left.expression.getValue() == 1;
            }
        }
    });

    function recursive_ref(compressor, def) {
        var node;
        for (var i = 0; node = compressor.parent(i); i++) {
            if (node instanceof AST_Lambda) {
                var name = node.name;
                if (name && name.definition() === def) break;
            }
        }
        return node;
    }

    OPT(AST_SymbolRef, function(self, compressor) {
        if (!compressor.option("ie8")
            && is_undeclared_ref(self)
            // testing against `self.scope.uses_with` is an optimization
            && !(self.scope.uses_with && compressor.find_parent(AST_With))) {
            switch (self.name) {
              case "undefined":
                return make_node(AST_Undefined, self).optimize(compressor);
              case "NaN":
                return make_node(AST_NaN, self).optimize(compressor);
              case "Infinity":
                return make_node(AST_Infinity, self).optimize(compressor);
            }
        }
        var parent = compressor.parent();
        if (compressor.option("reduce_vars") && is_lhs(compressor.self(), parent) !== compressor.self()) {
            var def = self.definition();
            var fixed = self.fixed_value();
            var single_use = def.single_use && !(parent instanceof AST_Call && parent.is_expr_pure(compressor));
            if (single_use && fixed instanceof AST_Lambda) {
                if (def.scope !== self.scope
                    && (!compressor.option("reduce_funcs") || def.escaped.depth == 1 || fixed.inlined)) {
                    single_use = false;
                } else if (recursive_ref(compressor, def)) {
                    single_use = false;
                } else if (def.scope !== self.scope || def.orig[0] instanceof AST_SymbolFunarg) {
                    single_use = fixed.is_constant_expression(self.scope);
                    if (single_use == "f") {
                        var scope = self.scope;
                        do if (scope instanceof AST_Defun || scope instanceof AST_Function) {
                            scope.inlined = true;
                        } while (scope = scope.parent_scope);
                    }
                }
            }
            if (single_use && fixed) {
                def.single_use = false;
                fixed._squeezed = true;
                if (fixed instanceof AST_Defun) {
                    fixed = make_node(AST_Function, fixed, fixed);
                    fixed.name = make_node(AST_SymbolLambda, fixed.name, fixed.name);
                }
                var value;
                if (def.recursive_refs > 0) {
                    value = fixed.clone(true);
                    var defun_def = value.name.definition();
                    var lambda_def = value.variables.get(value.name.name);
                    var name = lambda_def && lambda_def.orig[0];
                    if (!(name instanceof AST_SymbolLambda)) {
                        name = make_node(AST_SymbolLambda, value.name, value.name);
                        name.scope = value;
                        value.name = name;
                        lambda_def = value.def_function(name);
                    }
                    value.walk(new TreeWalker(function(node) {
                        if (!(node instanceof AST_SymbolRef)) return;
                        var def = node.definition();
                        if (def === defun_def) {
                            node.thedef = lambda_def;
                            lambda_def.references.push(node);
                        } else {
                            def.single_use = false;
                            var fn = node.fixed_value();
                            if (!(fn instanceof AST_Lambda)) return;
                            if (!fn.name) return;
                            if (fixed.variables.get(fn.name.name) !== fn.name.definition()) return;
                            fn.name = fn.name.clone();
                            var value_def = value.variables.get(fn.name.name) || value.def_function(fn.name);
                            node.thedef = value_def;
                            value_def.references.push(node);
                        }
                    }));
                } else {
                    value = fixed.optimize(compressor);
                }
                def.replaced++;
                return value;
            }
            if (fixed && def.should_replace === undefined) {
                var init;
                if (fixed instanceof AST_This) {
                    if (!(def.orig[0] instanceof AST_SymbolFunarg) && all(def.references, function(ref) {
                        return def.scope === ref.scope;
                    })) {
                        init = fixed;
                    }
                } else {
                    var ev = fixed.evaluate(compressor);
                    if (ev !== fixed && (compressor.option("unsafe_regexp") || !(ev instanceof RegExp))) {
                        init = make_node_from_constant(ev, fixed);
                    }
                }
                if (init) {
                    var value_length = init.optimize(compressor).print_to_string().length;
                    var fn;
                    if (has_symbol_ref(fixed)) {
                        fn = function() {
                            var result = init.optimize(compressor);
                            return result === init ? result.clone(true) : result;
                        };
                    } else {
                        value_length = Math.min(value_length, fixed.print_to_string().length);
                        fn = function() {
                            var result = best_of_expression(init.optimize(compressor), fixed);
                            return result === init || result === fixed ? result.clone(true) : result;
                        };
                    }
                    var name_length = def.name.length;
                    var overhead = 0;
                    if (compressor.option("unused") && !compressor.exposed(def)) {
                        overhead = (name_length + 2 + value_length) / (def.references.length - def.assignments);
                    }
                    def.should_replace = value_length <= name_length + overhead ? fn : false;
                } else {
                    def.should_replace = false;
                }
            }
            if (def.should_replace) {
                var value = def.should_replace();
                def.replaced++;
                return value;
            }
        }
        return self;

        function has_symbol_ref(value) {
            var found;
            value.walk(new TreeWalker(function(node) {
                if (node instanceof AST_SymbolRef) found = true;
                if (found) return true;
            }));
            return found;
        }
    });

    function is_atomic(lhs, self) {
        return lhs instanceof AST_SymbolRef || lhs.TYPE === self.TYPE;
    }

    OPT(AST_Undefined, function(self, compressor) {
        if (compressor.option("unsafe_undefined")) {
            var undef = find_variable(compressor, "undefined");
            if (undef) {
                var ref = make_node(AST_SymbolRef, self, {
                    name   : "undefined",
                    scope  : undef.scope,
                    thedef : undef
                });
                ref.is_undefined = true;
                return ref;
            }
        }
        var lhs = is_lhs(compressor.self(), compressor.parent());
        if (lhs && is_atomic(lhs, self)) return self;
        return make_node(AST_UnaryPrefix, self, {
            operator: "void",
            expression: make_node(AST_Number, self, {
                value: 0
            })
        });
    });

    OPT(AST_Infinity, function(self, compressor) {
        var lhs = is_lhs(compressor.self(), compressor.parent());
        if (lhs && is_atomic(lhs, self)) return self;
        if (compressor.option("keep_infinity")
            && !(lhs && !is_atomic(lhs, self))
            && !find_variable(compressor, "Infinity"))
            return self;
        return make_node(AST_Binary, self, {
            operator: "/",
            left: make_node(AST_Number, self, {
                value: 1
            }),
            right: make_node(AST_Number, self, {
                value: 0
            })
        });
    });

    OPT(AST_NaN, function(self, compressor) {
        var lhs = is_lhs(compressor.self(), compressor.parent());
        if (lhs && !is_atomic(lhs, self)
            || find_variable(compressor, "NaN")) {
            return make_node(AST_Binary, self, {
                operator: "/",
                left: make_node(AST_Number, self, {
                    value: 0
                }),
                right: make_node(AST_Number, self, {
                    value: 0
                })
            });
        }
        return self;
    });

    function is_reachable(self, defs) {
        var reachable = false;
        var find_ref = new TreeWalker(function(node) {
            if (reachable) return true;
            if (node instanceof AST_SymbolRef && member(node.definition(), defs)) {
                return reachable = true;
            }
        });
        var scan_scope = new TreeWalker(function(node) {
            if (reachable) return true;
            if (node instanceof AST_Scope && node !== self) {
                var parent = scan_scope.parent();
                if (parent instanceof AST_Call && parent.expression === node) return;
                node.walk(find_ref);
                return true;
            }
        });
        self.walk(scan_scope);
        return reachable;
    }

    var ASSIGN_OPS = makePredicate("+ - / * % >> << >>> | ^ &");
    var ASSIGN_OPS_COMMUTATIVE = makePredicate("* | ^ &");
    OPT(AST_Assign, function(self, compressor) {
        var def;
        if (compressor.option("dead_code")
            && self.left instanceof AST_SymbolRef
            && (def = self.left.definition()).scope === compressor.find_parent(AST_Lambda)) {
            if (self.left.is_immutable()) return strip_assignment();
            var level = 0, node, parent = self;
            do {
                node = parent;
                parent = compressor.parent(level++);
                if (parent instanceof AST_Exit) {
                    if (in_try(level, parent)) break;
                    if (is_reachable(def.scope, [ def ])) break;
                    def.fixed = false;
                    return strip_assignment();
                }
            } while (parent instanceof AST_Binary && parent.right === node
                || parent instanceof AST_Sequence && parent.tail_node() === node
                || parent instanceof AST_UnaryPrefix);
        }
        self = self.lift_sequences(compressor);
        if (!compressor.option("assignments")) return self;
        if (self.operator == "=" && self.left instanceof AST_SymbolRef && self.right instanceof AST_Binary) {
            // x = expr1 OP expr2
            if (self.right.left instanceof AST_SymbolRef
                && self.right.left.name == self.left.name
                && ASSIGN_OPS[self.right.operator]) {
                // x = x - 2  --->  x -= 2
                self.operator = self.right.operator + "=";
                self.right = self.right.right;
            }
            else if (self.right.right instanceof AST_SymbolRef
                && self.right.right.name == self.left.name
                && ASSIGN_OPS_COMMUTATIVE[self.right.operator]
                && !self.right.left.has_side_effects(compressor)) {
                // x = 2 & x  --->  x &= 2
                self.operator = self.right.operator + "=";
                self.right = self.right.left;
            }
        }
        if ((self.operator == "+=" || self.operator == "-=")
            && self.left.is_number(compressor)
            && self.right instanceof AST_Number
            && self.right.getValue() === 1) {
            var op = self.operator.slice(0, -1);
            return make_node(AST_UnaryPrefix, self, {
                operator: op + op,
                expression: self.left
            });
        }
        return self;

        function in_try(level, node) {
            var right = self.right;
            self.right = make_node(AST_Null, right);
            var may_throw = node.may_throw(compressor);
            self.right = right;
            var scope = self.left.definition().scope;
            var parent;
            while ((parent = compressor.parent(level++)) !== scope) {
                if (parent instanceof AST_Try) {
                    if (parent.bfinally) return true;
                    if (may_throw && parent.bcatch) return true;
                }
            }
        }

        function strip_assignment() {
            return (self.operator != "=" ? make_node(AST_Binary, self, {
                operator: self.operator.slice(0, -1),
                left: self.left,
                right: self.right
            }) : maintain_this_binding(compressor, compressor.parent(), self, self.right)).optimize(compressor);
        }
    });

    OPT(AST_Conditional, function(self, compressor) {
        if (!compressor.option("conditionals")) return self;
        // This looks like lift_sequences(), should probably be under "sequences"
        if (self.condition instanceof AST_Sequence) {
            var expressions = self.condition.expressions.slice();
            self.condition = expressions.pop();
            expressions.push(self);
            return make_sequence(self, expressions);
        }
        var cond = self.condition.is_truthy() || self.condition.tail_node().evaluate(compressor);
        if (!cond) {
            AST_Node.warn("Condition always false [{file}:{line},{col}]", self.start);
            return make_sequence(self, [ self.condition, self.alternative ]).optimize(compressor);
        } else if (!(cond instanceof AST_Node)) {
            AST_Node.warn("Condition always true [{file}:{line},{col}]", self.start);
            return make_sequence(self, [ self.condition, self.consequent ]).optimize(compressor);
        }
        var negated = cond.negate(compressor, first_in_statement(compressor));
        if (best_of(compressor, cond, negated) === negated) {
            self = make_node(AST_Conditional, self, {
                condition: negated,
                consequent: self.alternative,
                alternative: self.consequent
            });
        }
        var condition = self.condition;
        var consequent = self.consequent;
        var alternative = self.alternative;
        // x?x:y --> x||y
        if (condition instanceof AST_SymbolRef
            && consequent instanceof AST_SymbolRef
            && condition.definition() === consequent.definition()) {
            return make_node(AST_Binary, self, {
                operator: "||",
                left: condition,
                right: alternative
            });
        }
        // if (foo) exp = something; else exp = something_else;
        //                   |
        //                   v
        // exp = foo ? something : something_else;
        var seq_tail = consequent.tail_node();
        if (seq_tail instanceof AST_Assign) {
            var is_eq = seq_tail.operator == "=";
            var alt_tail = is_eq ? alternative.tail_node() : alternative;
            if ((is_eq || consequent === seq_tail)
                && alt_tail instanceof AST_Assign
                && seq_tail.operator == alt_tail.operator
                && seq_tail.left.equivalent_to(alt_tail.left)
                && (is_eq && !seq_tail.left.has_side_effects(compressor)
                    || !condition.has_side_effects(compressor)
                        && can_shift_lhs_of_tail(consequent)
                        && can_shift_lhs_of_tail(alternative))) {
                return make_node(AST_Assign, self, {
                    operator: seq_tail.operator,
                    left: seq_tail.left,
                    right: make_node(AST_Conditional, self, {
                        condition: condition,
                        consequent: pop_lhs(consequent),
                        alternative: pop_lhs(alternative)
                    })
                });
            }
        }
        // x ? y(a) : y(b) --> y(x ? a : b)
        var arg_index;
        if (consequent instanceof AST_Call
            && alternative.TYPE === consequent.TYPE
            && consequent.args.length > 0
            && consequent.args.length == alternative.args.length
            && consequent.expression.equivalent_to(alternative.expression)
            && !condition.has_side_effects(compressor)
            && !consequent.expression.has_side_effects(compressor)
            && typeof (arg_index = single_arg_diff()) == "number") {
            var node = consequent.clone();
            node.args[arg_index] = make_node(AST_Conditional, self, {
                condition: condition,
                consequent: consequent.args[arg_index],
                alternative: alternative.args[arg_index]
            });
            return node;
        }
        // x?y?z:a:a --> x&&y?z:a
        if (consequent instanceof AST_Conditional
            && consequent.alternative.equivalent_to(alternative)) {
            return make_node(AST_Conditional, self, {
                condition: make_node(AST_Binary, self, {
                    left: condition,
                    operator: "&&",
                    right: consequent.condition
                }),
                consequent: consequent.consequent,
                alternative: alternative
            });
        }
        // x ? y : y --> x, y
        if (consequent.equivalent_to(alternative)) {
            return make_sequence(self, [
                condition,
                consequent
            ]).optimize(compressor);
        }
        // x ? (y, w) : (z, w) --> x ? y : z, w
        if ((consequent instanceof AST_Sequence || alternative instanceof AST_Sequence)
            && consequent.tail_node().equivalent_to(alternative.tail_node())) {
            return make_sequence(self, [
                make_node(AST_Conditional, self, {
                    condition: condition,
                    consequent: pop_seq(consequent),
                    alternative: pop_seq(alternative)
                }),
                consequent.tail_node()
            ]).optimize(compressor);
        }
        // x ? y || z : z --> x && y || z
        if (consequent instanceof AST_Binary
            && consequent.operator == "||"
            && consequent.right.equivalent_to(alternative)) {
            return make_node(AST_Binary, self, {
                operator: "||",
                left: make_node(AST_Binary, self, {
                    operator: "&&",
                    left: condition,
                    right: consequent.left
                }),
                right: alternative
            }).optimize(compressor);
        }
        var in_bool = compressor.option("booleans") && compressor.in_boolean_context();
        if (is_true(self.consequent)) {
            if (is_false(self.alternative)) {
                // c ? true : false ---> !!c
                return booleanize(condition);
            }
            // c ? true : x ---> !!c || x
            return make_node(AST_Binary, self, {
                operator: "||",
                left: booleanize(condition),
                right: self.alternative
            });
        }
        if (is_false(self.consequent)) {
            if (is_true(self.alternative)) {
                // c ? false : true ---> !c
                return booleanize(condition.negate(compressor));
            }
            // c ? false : x ---> !c && x
            return make_node(AST_Binary, self, {
                operator: "&&",
                left: booleanize(condition.negate(compressor)),
                right: self.alternative
            });
        }
        if (is_true(self.alternative)) {
            // c ? x : true ---> !c || x
            return make_node(AST_Binary, self, {
                operator: "||",
                left: booleanize(condition.negate(compressor)),
                right: self.consequent
            });
        }
        if (is_false(self.alternative)) {
            // c ? x : false ---> !!c && x
            return make_node(AST_Binary, self, {
                operator: "&&",
                left: booleanize(condition),
                right: self.consequent
            });
        }

        return self;

        function booleanize(node) {
            if (node.is_boolean(compressor)) return node;
            // !!expression
            return make_node(AST_UnaryPrefix, node, {
                operator: "!",
                expression: node.negate(compressor)
            });
        }

        // AST_True or !0
        function is_true(node) {
            return node instanceof AST_True
                || in_bool
                    && node instanceof AST_Constant
                    && node.getValue()
                || (node instanceof AST_UnaryPrefix
                    && node.operator == "!"
                    && node.expression instanceof AST_Constant
                    && !node.expression.getValue());
        }
        // AST_False or !1
        function is_false(node) {
            return node instanceof AST_False
                || in_bool
                    && node instanceof AST_Constant
                    && !node.getValue()
                || (node instanceof AST_UnaryPrefix
                    && node.operator == "!"
                    && node.expression instanceof AST_Constant
                    && node.expression.getValue());
        }

        function single_arg_diff() {
            var a = consequent.args;
            var b = alternative.args;
            for (var i = 0, len = a.length; i < len; i++) {
                if (!a[i].equivalent_to(b[i])) {
                    for (var j = i + 1; j < len; j++) {
                        if (!a[j].equivalent_to(b[j])) return;
                    }
                    return i;
                }
            }
        }

        function can_shift_lhs_of_tail(node) {
            if (node === node.tail_node()) return true;
            var exprs = node.expressions;
            for (var i = exprs.length - 1; --i >= 0;) {
                var expr = exprs[i];
                if (!(expr instanceof AST_Assign) && expr.has_side_effects(compressor)
                    || expr.operator != "="
                    || expr.left.has_side_effects(compressor)
                    || expr.right.has_side_effects(compressor)) return false;
            }
            return true;
        }

        function pop_lhs(node) {
            if (!(node instanceof AST_Sequence)) return node.right;
            var exprs = node.expressions.slice();
            exprs.push(exprs.pop().right);
            return make_sequence(node, exprs);
        }

        function pop_seq(node) {
            if (!(node instanceof AST_Sequence)) return make_node(AST_Number, node, {
                value: 0
            });
            return make_sequence(node, node.expressions.slice(0, -1));
        }
    });

    OPT(AST_Boolean, function(self, compressor) {
        if (!compressor.option("booleans")) return self;
        if (compressor.in_boolean_context()) return make_node(AST_Number, self, {
            value: +self.value
        });
        var p = compressor.parent();
        if (p instanceof AST_Binary && (p.operator == "==" || p.operator == "!=")) {
            AST_Node.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]", {
                operator : p.operator,
                value    : self.value,
                file     : p.start.file,
                line     : p.start.line,
                col      : p.start.col,
            });
            return make_node(AST_Number, self, {
                value: +self.value
            });
        }
        return make_node(AST_UnaryPrefix, self, {
            operator: "!",
            expression: make_node(AST_Number, self, {
                value: 1 - self.value
            })
        });
    });

    function safe_to_flatten(value, compressor) {
        if (value instanceof AST_SymbolRef) {
            value = value.fixed_value();
        }
        if (!value) return false;
        return !(value instanceof AST_Lambda)
            || compressor.parent() instanceof AST_New
            || !value.contains_this();
    }

    OPT(AST_Sub, function(self, compressor) {
        var expr = self.expression;
        var prop = self.property;
        if (compressor.option("properties")) {
            var key = prop.evaluate(compressor);
            if (key !== prop) {
                if (typeof key == "string") {
                    if (key == "undefined") {
                        key = undefined;
                    } else {
                        var value = parseFloat(key);
                        if (value.toString() == key) {
                            key = value;
                        }
                    }
                }
                prop = self.property = best_of_expression(prop, make_node_from_constant(key, prop).transform(compressor));
                var property = "" + key;
                if (is_identifier_string(property)
                    && property.length <= prop.print_to_string().length + 1) {
                    return make_node(AST_Dot, self, {
                        expression: expr,
                        property: property
                    }).optimize(compressor);
                }
            }
        }
        var parent = compressor.parent();
        var def, fn, fn_parent;
        if (compressor.option("arguments")
            && expr instanceof AST_SymbolRef
            && is_arguments(def = expr.definition())
            && prop instanceof AST_Number
            && (fn = expr.scope) === find_lambda()) {
            var index = prop.getValue();
            if (parent instanceof AST_UnaryPrefix && parent.operator == "delete") {
                if (!def.deleted) def.deleted = [];
                def.deleted[index] = true;
            }
            var argname = fn.argnames[index];
            if (def.deleted && def.deleted[index]) {
                argname = null;
            } else if (argname && compressor.has_directive("use strict")) {
                var arg_def = argname.definition();
                if (!compressor.option("reduce_vars")
                    || def.reassigned
                    || arg_def.assignments
                    || arg_def.orig.length > 1) {
                    argname = null;
                }
            } else if (!argname && index < fn.argnames.length + 5 && compressor.drop_fargs(fn, fn_parent)) {
                while (index >= fn.argnames.length) {
                    argname = make_node(AST_SymbolFunarg, fn, {
                        name: fn.make_var_name("argument_" + fn.argnames.length),
                        scope: fn
                    });
                    fn.argnames.push(argname);
                    fn.enclosed.push(fn.def_variable(argname));
                }
            }
            if (argname && find_if(function(node) {
                return node.name === argname.name;
            }, fn.argnames) === argname) {
                def.reassigned = false;
                var sym = make_node(AST_SymbolRef, self, argname);
                sym.reference({});
                delete argname.__unused;
                return sym;
            }
        }
        if (is_lhs(compressor.self(), parent)) return self;
        if (key !== prop) {
            var sub = self.flatten_object(property, compressor);
            if (sub) {
                expr = self.expression = sub.expression;
                prop = self.property = sub.property;
            }
        }
        if (compressor.option("properties") && compressor.option("side_effects")
            && prop instanceof AST_Number && expr instanceof AST_Array) {
            var index = prop.getValue();
            var elements = expr.elements;
            var retValue = elements[index];
            if (safe_to_flatten(retValue, compressor)) {
                var flatten = true;
                var values = [];
                for (var i = elements.length; --i > index;) {
                    var value = elements[i].drop_side_effect_free(compressor);
                    if (value) {
                        values.unshift(value);
                        if (flatten && value.has_side_effects(compressor)) flatten = false;
                    }
                }
                retValue = retValue instanceof AST_Hole ? make_node(AST_Undefined, retValue) : retValue;
                if (!flatten) values.unshift(retValue);
                while (--i >= 0) {
                    var value = elements[i].drop_side_effect_free(compressor);
                    if (value) values.unshift(value);
                    else index--;
                }
                if (flatten) {
                    values.push(retValue);
                    return make_sequence(self, values).optimize(compressor);
                } else return make_node(AST_Sub, self, {
                    expression: make_node(AST_Array, expr, {
                        elements: values
                    }),
                    property: make_node(AST_Number, prop, {
                        value: index
                    })
                });
            }
        }
        var ev = self.evaluate(compressor);
        if (ev !== self) {
            ev = make_node_from_constant(ev, self).optimize(compressor);
            return best_of(compressor, ev, self);
        }
        return self;

        function find_lambda() {
            var i = 0, p;
            while (p = compressor.parent(i++)) {
                if (p instanceof AST_Lambda) {
                    fn_parent = compressor.parent(i);
                    return p;
                }
            }
        }
    });

    AST_Scope.DEFMETHOD("contains_this", function() {
        var result;
        var self = this;
        self.walk(new TreeWalker(function(node) {
            if (result) return true;
            if (node instanceof AST_This) return result = true;
            if (node !== self && node instanceof AST_Scope) return true;
        }));
        return result;
    });

    AST_PropAccess.DEFMETHOD("flatten_object", function(key, compressor) {
        if (!compressor.option("properties")) return;
        var expr = this.expression;
        if (expr instanceof AST_Object) {
            var props = expr.properties;
            for (var i = props.length; --i >= 0;) {
                var prop = props[i];
                if ("" + prop.key == key) {
                    if (!all(props, function(prop) {
                        return prop instanceof AST_ObjectKeyVal;
                    })) break;
                    if (!safe_to_flatten(prop.value, compressor)) break;
                    return make_node(AST_Sub, this, {
                        expression: make_node(AST_Array, expr, {
                            elements: props.map(function(prop) {
                                return prop.value;
                            })
                        }),
                        property: make_node(AST_Number, this, {
                            value: i
                        })
                    });
                }
            }
        }
    });

    OPT(AST_Dot, function(self, compressor) {
        if (self.property == "arguments" || self.property == "caller") {
            AST_Node.warn("Function.prototype.{prop} not supported [{file}:{line},{col}]", {
                prop: self.property,
                file: self.start.file,
                line: self.start.line,
                col: self.start.col
            });
        }
        if (is_lhs(compressor.self(), compressor.parent())) return self;
        if (compressor.option("unsafe_proto")
            && self.expression instanceof AST_Dot
            && self.expression.property == "prototype") {
            var exp = self.expression.expression;
            if (is_undeclared_ref(exp)) switch (exp.name) {
              case "Array":
                self.expression = make_node(AST_Array, self.expression, {
                    elements: []
                });
                break;
              case "Function":
                self.expression = make_node(AST_Function, self.expression, {
                    argnames: [],
                    body: []
                });
                break;
              case "Number":
                self.expression = make_node(AST_Number, self.expression, {
                    value: 0
                });
                break;
              case "Object":
                self.expression = make_node(AST_Object, self.expression, {
                    properties: []
                });
                break;
              case "RegExp":
                self.expression = make_node(AST_RegExp, self.expression, {
                    value: /t/
                });
                break;
              case "String":
                self.expression = make_node(AST_String, self.expression, {
                    value: ""
                });
                break;
            }
        }
        var sub = self.flatten_object(self.property, compressor);
        if (sub) return sub.optimize(compressor);
        var ev = self.evaluate(compressor);
        if (ev !== self) {
            ev = make_node_from_constant(ev, self).optimize(compressor);
            return best_of(compressor, ev, self);
        }
        return self;
    });

    OPT(AST_Return, function(self, compressor) {
        if (self.value && is_undefined(self.value, compressor)) {
            self.value = null;
        }
        return self;
    });
})(function(node, optimizer) {
    node.DEFMETHOD("optimize", function(compressor) {
        var self = this;
        if (self._optimized) return self;
        if (compressor.has_directive("use asm")) return self;
        var opt = optimizer(self, compressor);
        opt._optimized = true;
        return opt;
    });
});
