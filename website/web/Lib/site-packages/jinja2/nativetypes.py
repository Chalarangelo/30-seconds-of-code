import sys
from ast import literal_eval
from itertools import islice, chain
from jinja2 import nodes
from jinja2._compat import text_type
from jinja2.compiler import CodeGenerator, has_safe_repr
from jinja2.environment import Environment, Template
from jinja2.utils import concat, escape


def native_concat(nodes):
    """Return a native Python type from the list of compiled nodes. If the
    result is a single node, its value is returned. Otherwise, the nodes are
    concatenated as strings. If the result can be parsed with
    :func:`ast.literal_eval`, the parsed value is returned. Otherwise, the
    string is returned.
    """
    head = list(islice(nodes, 2))

    if not head:
        return None

    if len(head) == 1:
        out = head[0]
    else:
        out = u''.join([text_type(v) for v in chain(head, nodes)])

    try:
        return literal_eval(out)
    except (ValueError, SyntaxError, MemoryError):
        return out


class NativeCodeGenerator(CodeGenerator):
    """A code generator which avoids injecting ``to_string()`` calls around the
    internal code Jinja uses to render templates.
    """

    def visit_Output(self, node, frame):
        """Same as :meth:`CodeGenerator.visit_Output`, but do not call
        ``to_string`` on output nodes in generated code.
        """
        if self.has_known_extends and frame.require_output_check:
            return

        finalize = self.environment.finalize
        finalize_context = getattr(finalize, 'contextfunction', False)
        finalize_eval = getattr(finalize, 'evalcontextfunction', False)
        finalize_env = getattr(finalize, 'environmentfunction', False)

        if finalize is not None:
            if finalize_context or finalize_eval:
                const_finalize = None
            elif finalize_env:
                def const_finalize(x):
                    return finalize(self.environment, x)
            else:
                const_finalize = finalize
        else:
            def const_finalize(x):
                return x

        # If we are inside a frame that requires output checking, we do so.
        outdent_later = False

        if frame.require_output_check:
            self.writeline('if parent_template is None:')
            self.indent()
            outdent_later = True

        # Try to evaluate as many chunks as possible into a static string at
        # compile time.
        body = []

        for child in node.nodes:
            try:
                if const_finalize is None:
                    raise nodes.Impossible()

                const = child.as_const(frame.eval_ctx)
                if not has_safe_repr(const):
                    raise nodes.Impossible()
            except nodes.Impossible:
                body.append(child)
                continue

            # the frame can't be volatile here, because otherwise the as_const
            # function would raise an Impossible exception at that point
            try:
                if frame.eval_ctx.autoescape:
                    if hasattr(const, '__html__'):
                        const = const.__html__()
                    else:
                        const = escape(const)

                const = const_finalize(const)
            except Exception:
                # if something goes wrong here we evaluate the node at runtime
                # for easier debugging
                body.append(child)
                continue

            if body and isinstance(body[-1], list):
                body[-1].append(const)
            else:
                body.append([const])

        # if we have less than 3 nodes or a buffer we yield or extend/append
        if len(body) < 3 or frame.buffer is not None:
            if frame.buffer is not None:
                # for one item we append, for more we extend
                if len(body) == 1:
                    self.writeline('%s.append(' % frame.buffer)
                else:
                    self.writeline('%s.extend((' % frame.buffer)

                self.indent()

            for item in body:
                if isinstance(item, list):
                    val = repr(native_concat(item))

                    if frame.buffer is None:
                        self.writeline('yield ' + val)
                    else:
                        self.writeline(val + ',')
                else:
                    if frame.buffer is None:
                        self.writeline('yield ', item)
                    else:
                        self.newline(item)

                    close = 0

                    if finalize is not None:
                        self.write('environment.finalize(')

                        if finalize_context:
                            self.write('context, ')

                        close += 1

                    self.visit(item, frame)

                    if close > 0:
                        self.write(')' * close)

                    if frame.buffer is not None:
                        self.write(',')

            if frame.buffer is not None:
                # close the open parentheses
                self.outdent()
                self.writeline(len(body) == 1 and ')' or '))')

        # otherwise we create a format string as this is faster in that case
        else:
            format = []
            arguments = []

            for item in body:
                if isinstance(item, list):
                    format.append(native_concat(item).replace('%', '%%'))
                else:
                    format.append('%s')
                    arguments.append(item)

            self.writeline('yield ')
            self.write(repr(concat(format)) + ' % (')
            self.indent()

            for argument in arguments:
                self.newline(argument)
                close = 0

                if finalize is not None:
                    self.write('environment.finalize(')

                    if finalize_context:
                        self.write('context, ')
                    elif finalize_eval:
                        self.write('context.eval_ctx, ')
                    elif finalize_env:
                        self.write('environment, ')

                    close += 1

                self.visit(argument, frame)
                self.write(')' * close + ', ')

            self.outdent()
            self.writeline(')')

        if outdent_later:
            self.outdent()


class NativeTemplate(Template):
    def render(self, *args, **kwargs):
        """Render the template to produce a native Python type. If the result
        is a single node, its value is returned. Otherwise, the nodes are
        concatenated as strings. If the result can be parsed with
        :func:`ast.literal_eval`, the parsed value is returned. Otherwise, the
        string is returned.
        """
        vars = dict(*args, **kwargs)

        try:
            return native_concat(self.root_render_func(self.new_context(vars)))
        except Exception:
            exc_info = sys.exc_info()

        return self.environment.handle_exception(exc_info, True)


class NativeEnvironment(Environment):
    """An environment that renders templates to native Python types."""

    code_generator_class = NativeCodeGenerator
    template_class = NativeTemplate
