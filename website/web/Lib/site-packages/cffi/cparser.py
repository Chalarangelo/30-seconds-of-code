from . import model
from .commontypes import COMMON_TYPES, resolve_common_type
from .error import FFIError, CDefError
try:
    from . import _pycparser as pycparser
except ImportError:
    import pycparser
import weakref, re, sys

try:
    if sys.version_info < (3,):
        import thread as _thread
    else:
        import _thread
    lock = _thread.allocate_lock()
except ImportError:
    lock = None

CDEF_SOURCE_STRING = "<cdef source string>"
_r_comment = re.compile(r"/\*.*?\*/|//([^\n\\]|\\.)*?$",
                        re.DOTALL | re.MULTILINE)
_r_define  = re.compile(r"^\s*#\s*define\s+([A-Za-z_][A-Za-z_0-9]*)"
                        r"\b((?:[^\n\\]|\\.)*?)$",
                        re.DOTALL | re.MULTILINE)
_r_partial_enum = re.compile(r"=\s*\.\.\.\s*[,}]|\.\.\.\s*\}")
_r_enum_dotdotdot = re.compile(r"__dotdotdot\d+__$")
_r_partial_array = re.compile(r"\[\s*\.\.\.\s*\]")
_r_words = re.compile(r"\w+|\S")
_parser_cache = None
_r_int_literal = re.compile(r"-?0?x?[0-9a-f]+[lu]*$", re.IGNORECASE)
_r_stdcall1 = re.compile(r"\b(__stdcall|WINAPI)\b")
_r_stdcall2 = re.compile(r"[(]\s*(__stdcall|WINAPI)\b")
_r_cdecl = re.compile(r"\b__cdecl\b")
_r_extern_python = re.compile(r'\bextern\s*"'
                              r'(Python|Python\s*\+\s*C|C\s*\+\s*Python)"\s*.')
_r_star_const_space = re.compile(       # matches "* const "
    r"[*]\s*((const|volatile|restrict)\b\s*)+")
_r_int_dotdotdot = re.compile(r"(\b(int|long|short|signed|unsigned|char)\s*)+"
                              r"\.\.\.")
_r_float_dotdotdot = re.compile(r"\b(double|float)\s*\.\.\.")

def _get_parser():
    global _parser_cache
    if _parser_cache is None:
        _parser_cache = pycparser.CParser()
    return _parser_cache

def _workaround_for_old_pycparser(csource):
    # Workaround for a pycparser issue (fixed between pycparser 2.10 and
    # 2.14): "char*const***" gives us a wrong syntax tree, the same as
    # for "char***(*const)".  This means we can't tell the difference
    # afterwards.  But "char(*const(***))" gives us the right syntax
    # tree.  The issue only occurs if there are several stars in
    # sequence with no parenthesis inbetween, just possibly qualifiers.
    # Attempt to fix it by adding some parentheses in the source: each
    # time we see "* const" or "* const *", we add an opening
    # parenthesis before each star---the hard part is figuring out where
    # to close them.
    parts = []
    while True:
        match = _r_star_const_space.search(csource)
        if not match:
            break
        #print repr(''.join(parts)+csource), '=>',
        parts.append(csource[:match.start()])
        parts.append('('); closing = ')'
        parts.append(match.group())   # e.g. "* const "
        endpos = match.end()
        if csource.startswith('*', endpos):
            parts.append('('); closing += ')'
        level = 0
        i = endpos
        while i < len(csource):
            c = csource[i]
            if c == '(':
                level += 1
            elif c == ')':
                if level == 0:
                    break
                level -= 1
            elif c in ',;=':
                if level == 0:
                    break
            i += 1
        csource = csource[endpos:i] + closing + csource[i:]
        #print repr(''.join(parts)+csource)
    parts.append(csource)
    return ''.join(parts)

def _preprocess_extern_python(csource):
    # input: `extern "Python" int foo(int);` or
    #        `extern "Python" { int foo(int); }`
    # output:
    #     void __cffi_extern_python_start;
    #     int foo(int);
    #     void __cffi_extern_python_stop;
    #
    # input: `extern "Python+C" int foo(int);`
    # output:
    #     void __cffi_extern_python_plus_c_start;
    #     int foo(int);
    #     void __cffi_extern_python_stop;
    parts = []
    while True:
        match = _r_extern_python.search(csource)
        if not match:
            break
        endpos = match.end() - 1
        #print
        #print ''.join(parts)+csource
        #print '=>'
        parts.append(csource[:match.start()])
        if 'C' in match.group(1):
            parts.append('void __cffi_extern_python_plus_c_start; ')
        else:
            parts.append('void __cffi_extern_python_start; ')
        if csource[endpos] == '{':
            # grouping variant
            closing = csource.find('}', endpos)
            if closing < 0:
                raise CDefError("'extern \"Python\" {': no '}' found")
            if csource.find('{', endpos + 1, closing) >= 0:
                raise NotImplementedError("cannot use { } inside a block "
                                          "'extern \"Python\" { ... }'")
            parts.append(csource[endpos+1:closing])
            csource = csource[closing+1:]
        else:
            # non-grouping variant
            semicolon = csource.find(';', endpos)
            if semicolon < 0:
                raise CDefError("'extern \"Python\": no ';' found")
            parts.append(csource[endpos:semicolon+1])
            csource = csource[semicolon+1:]
        parts.append(' void __cffi_extern_python_stop;')
        #print ''.join(parts)+csource
        #print
    parts.append(csource)
    return ''.join(parts)

def _preprocess(csource):
    # Remove comments.  NOTE: this only work because the cdef() section
    # should not contain any string literal!
    csource = _r_comment.sub(' ', csource)
    # Remove the "#define FOO x" lines
    macros = {}
    for match in _r_define.finditer(csource):
        macroname, macrovalue = match.groups()
        macrovalue = macrovalue.replace('\\\n', '').strip()
        macros[macroname] = macrovalue
    csource = _r_define.sub('', csource)
    #
    if pycparser.__version__ < '2.14':
        csource = _workaround_for_old_pycparser(csource)
    #
    # BIG HACK: replace WINAPI or __stdcall with "volatile const".
    # It doesn't make sense for the return type of a function to be
    # "volatile volatile const", so we abuse it to detect __stdcall...
    # Hack number 2 is that "int(volatile *fptr)();" is not valid C
    # syntax, so we place the "volatile" before the opening parenthesis.
    csource = _r_stdcall2.sub(' volatile volatile const(', csource)
    csource = _r_stdcall1.sub(' volatile volatile const ', csource)
    csource = _r_cdecl.sub(' ', csource)
    #
    # Replace `extern "Python"` with start/end markers
    csource = _preprocess_extern_python(csource)
    #
    # Replace "[...]" with "[__dotdotdotarray__]"
    csource = _r_partial_array.sub('[__dotdotdotarray__]', csource)
    #
    # Replace "...}" with "__dotdotdotNUM__}".  This construction should
    # occur only at the end of enums; at the end of structs we have "...;}"
    # and at the end of vararg functions "...);".  Also replace "=...[,}]"
    # with ",__dotdotdotNUM__[,}]": this occurs in the enums too, when
    # giving an unknown value.
    matches = list(_r_partial_enum.finditer(csource))
    for number, match in enumerate(reversed(matches)):
        p = match.start()
        if csource[p] == '=':
            p2 = csource.find('...', p, match.end())
            assert p2 > p
            csource = '%s,__dotdotdot%d__ %s' % (csource[:p], number,
                                                 csource[p2+3:])
        else:
            assert csource[p:p+3] == '...'
            csource = '%s __dotdotdot%d__ %s' % (csource[:p], number,
                                                 csource[p+3:])
    # Replace "int ..." or "unsigned long int..." with "__dotdotdotint__"
    csource = _r_int_dotdotdot.sub(' __dotdotdotint__ ', csource)
    # Replace "float ..." or "double..." with "__dotdotdotfloat__"
    csource = _r_float_dotdotdot.sub(' __dotdotdotfloat__ ', csource)
    # Replace all remaining "..." with the same name, "__dotdotdot__",
    # which is declared with a typedef for the purpose of C parsing.
    return csource.replace('...', ' __dotdotdot__ '), macros

def _common_type_names(csource):
    # Look in the source for what looks like usages of types from the
    # list of common types.  A "usage" is approximated here as the
    # appearance of the word, minus a "definition" of the type, which
    # is the last word in a "typedef" statement.  Approximative only
    # but should be fine for all the common types.
    look_for_words = set(COMMON_TYPES)
    look_for_words.add(';')
    look_for_words.add(',')
    look_for_words.add('(')
    look_for_words.add(')')
    look_for_words.add('typedef')
    words_used = set()
    is_typedef = False
    paren = 0
    previous_word = ''
    for word in _r_words.findall(csource):
        if word in look_for_words:
            if word == ';':
                if is_typedef:
                    words_used.discard(previous_word)
                    look_for_words.discard(previous_word)
                    is_typedef = False
            elif word == 'typedef':
                is_typedef = True
                paren = 0
            elif word == '(':
                paren += 1
            elif word == ')':
                paren -= 1
            elif word == ',':
                if is_typedef and paren == 0:
                    words_used.discard(previous_word)
                    look_for_words.discard(previous_word)
            else:   # word in COMMON_TYPES
                words_used.add(word)
        previous_word = word
    return words_used


class Parser(object):

    def __init__(self):
        self._declarations = {}
        self._included_declarations = set()
        self._anonymous_counter = 0
        self._structnode2type = weakref.WeakKeyDictionary()
        self._options = {}
        self._int_constants = {}
        self._recomplete = []
        self._uses_new_feature = None

    def _parse(self, csource):
        csource, macros = _preprocess(csource)
        # XXX: for more efficiency we would need to poke into the
        # internals of CParser...  the following registers the
        # typedefs, because their presence or absence influences the
        # parsing itself (but what they are typedef'ed to plays no role)
        ctn = _common_type_names(csource)
        typenames = []
        for name in sorted(self._declarations):
            if name.startswith('typedef '):
                name = name[8:]
                typenames.append(name)
                ctn.discard(name)
        typenames += sorted(ctn)
        #
        csourcelines = []
        csourcelines.append('# 1 "<cdef automatic initialization code>"')
        for typename in typenames:
            csourcelines.append('typedef int %s;' % typename)
        csourcelines.append('typedef int __dotdotdotint__, __dotdotdotfloat__,'
                            ' __dotdotdot__;')
        # this forces pycparser to consider the following in the file
        # called <cdef source string> from line 1
        csourcelines.append('# 1 "%s"' % (CDEF_SOURCE_STRING,))
        csourcelines.append(csource)
        fullcsource = '\n'.join(csourcelines)
        if lock is not None:
            lock.acquire()     # pycparser is not thread-safe...
        try:
            ast = _get_parser().parse(fullcsource)
        except pycparser.c_parser.ParseError as e:
            self.convert_pycparser_error(e, csource)
        finally:
            if lock is not None:
                lock.release()
        # csource will be used to find buggy source text
        return ast, macros, csource

    def _convert_pycparser_error(self, e, csource):
        # xxx look for "<cdef source string>:NUM:" at the start of str(e)
        # and interpret that as a line number.  This will not work if
        # the user gives explicit ``# NUM "FILE"`` directives.
        line = None
        msg = str(e)
        match = re.match(r"%s:(\d+):" % (CDEF_SOURCE_STRING,), msg)
        if match:
            linenum = int(match.group(1), 10)
            csourcelines = csource.splitlines()
            if 1 <= linenum <= len(csourcelines):
                line = csourcelines[linenum-1]
        return line

    def convert_pycparser_error(self, e, csource):
        line = self._convert_pycparser_error(e, csource)

        msg = str(e)
        if line:
            msg = 'cannot parse "%s"\n%s' % (line.strip(), msg)
        else:
            msg = 'parse error\n%s' % (msg,)
        raise CDefError(msg)

    def parse(self, csource, override=False, packed=False, dllexport=False):
        prev_options = self._options
        try:
            self._options = {'override': override,
                             'packed': packed,
                             'dllexport': dllexport}
            self._internal_parse(csource)
        finally:
            self._options = prev_options

    def _internal_parse(self, csource):
        ast, macros, csource = self._parse(csource)
        # add the macros
        self._process_macros(macros)
        # find the first "__dotdotdot__" and use that as a separator
        # between the repeated typedefs and the real csource
        iterator = iter(ast.ext)
        for decl in iterator:
            if decl.name == '__dotdotdot__':
                break
        else:
            assert 0
        current_decl = None
        #
        try:
            self._inside_extern_python = '__cffi_extern_python_stop'
            for decl in iterator:
                current_decl = decl
                if isinstance(decl, pycparser.c_ast.Decl):
                    self._parse_decl(decl)
                elif isinstance(decl, pycparser.c_ast.Typedef):
                    if not decl.name:
                        raise CDefError("typedef does not declare any name",
                                        decl)
                    quals = 0
                    if (isinstance(decl.type.type, pycparser.c_ast.IdentifierType) and
                            decl.type.type.names[-1].startswith('__dotdotdot')):
                        realtype = self._get_unknown_type(decl)
                    elif (isinstance(decl.type, pycparser.c_ast.PtrDecl) and
                          isinstance(decl.type.type, pycparser.c_ast.TypeDecl) and
                          isinstance(decl.type.type.type,
                                     pycparser.c_ast.IdentifierType) and
                          decl.type.type.type.names[-1].startswith('__dotdotdot')):
                        realtype = self._get_unknown_ptr_type(decl)
                    else:
                        realtype, quals = self._get_type_and_quals(
                            decl.type, name=decl.name, partial_length_ok=True)
                    self._declare('typedef ' + decl.name, realtype, quals=quals)
                elif decl.__class__.__name__ == 'Pragma':
                    pass    # skip pragma, only in pycparser 2.15
                else:
                    raise CDefError("unexpected <%s>: this construct is valid "
                                    "C but not valid in cdef()" %
                                    decl.__class__.__name__, decl)
        except CDefError as e:
            if len(e.args) == 1:
                e.args = e.args + (current_decl,)
            raise
        except FFIError as e:
            msg = self._convert_pycparser_error(e, csource)
            if msg:
                e.args = (e.args[0] + "\n    *** Err: %s" % msg,)
            raise

    def _add_constants(self, key, val):
        if key in self._int_constants:
            if self._int_constants[key] == val:
                return     # ignore identical double declarations
            raise FFIError(
                "multiple declarations of constant: %s" % (key,))
        self._int_constants[key] = val

    def _add_integer_constant(self, name, int_str):
        int_str = int_str.lower().rstrip("ul")
        neg = int_str.startswith('-')
        if neg:
            int_str = int_str[1:]
        # "010" is not valid oct in py3
        if (int_str.startswith("0") and int_str != '0'
                and not int_str.startswith("0x")):
            int_str = "0o" + int_str[1:]
        pyvalue = int(int_str, 0)
        if neg:
            pyvalue = -pyvalue
        self._add_constants(name, pyvalue)
        self._declare('macro ' + name, pyvalue)

    def _process_macros(self, macros):
        for key, value in macros.items():
            value = value.strip()
            if _r_int_literal.match(value):
                self._add_integer_constant(key, value)
            elif value == '...':
                self._declare('macro ' + key, value)
            else:
                raise CDefError(
                    'only supports one of the following syntax:\n'
                    '  #define %s ...     (literally dot-dot-dot)\n'
                    '  #define %s NUMBER  (with NUMBER an integer'
                                    ' constant, decimal/hex/octal)\n'
                    'got:\n'
                    '  #define %s %s'
                    % (key, key, key, value))

    def _declare_function(self, tp, quals, decl):
        tp = self._get_type_pointer(tp, quals)
        if self._options.get('dllexport'):
            tag = 'dllexport_python '
        elif self._inside_extern_python == '__cffi_extern_python_start':
            tag = 'extern_python '
        elif self._inside_extern_python == '__cffi_extern_python_plus_c_start':
            tag = 'extern_python_plus_c '
        else:
            tag = 'function '
        self._declare(tag + decl.name, tp)

    def _parse_decl(self, decl):
        node = decl.type
        if isinstance(node, pycparser.c_ast.FuncDecl):
            tp, quals = self._get_type_and_quals(node, name=decl.name)
            assert isinstance(tp, model.RawFunctionType)
            self._declare_function(tp, quals, decl)
        else:
            if isinstance(node, pycparser.c_ast.Struct):
                self._get_struct_union_enum_type('struct', node)
            elif isinstance(node, pycparser.c_ast.Union):
                self._get_struct_union_enum_type('union', node)
            elif isinstance(node, pycparser.c_ast.Enum):
                self._get_struct_union_enum_type('enum', node)
            elif not decl.name:
                raise CDefError("construct does not declare any variable",
                                decl)
            #
            if decl.name:
                tp, quals = self._get_type_and_quals(node,
                                                     partial_length_ok=True)
                if tp.is_raw_function:
                    self._declare_function(tp, quals, decl)
                elif (tp.is_integer_type() and
                        hasattr(decl, 'init') and
                        hasattr(decl.init, 'value') and
                        _r_int_literal.match(decl.init.value)):
                    self._add_integer_constant(decl.name, decl.init.value)
                elif (tp.is_integer_type() and
                        isinstance(decl.init, pycparser.c_ast.UnaryOp) and
                        decl.init.op == '-' and
                        hasattr(decl.init.expr, 'value') and
                        _r_int_literal.match(decl.init.expr.value)):
                    self._add_integer_constant(decl.name,
                                               '-' + decl.init.expr.value)
                elif (tp is model.void_type and
                      decl.name.startswith('__cffi_extern_python_')):
                    # hack: `extern "Python"` in the C source is replaced
                    # with "void __cffi_extern_python_start;" and
                    # "void __cffi_extern_python_stop;"
                    self._inside_extern_python = decl.name
                else:
                    if self._inside_extern_python !='__cffi_extern_python_stop':
                        raise CDefError(
                            "cannot declare constants or "
                            "variables with 'extern \"Python\"'")
                    if (quals & model.Q_CONST) and not tp.is_array_type:
                        self._declare('constant ' + decl.name, tp, quals=quals)
                    else:
                        self._declare('variable ' + decl.name, tp, quals=quals)

    def parse_type(self, cdecl):
        return self.parse_type_and_quals(cdecl)[0]

    def parse_type_and_quals(self, cdecl):
        ast, macros = self._parse('void __dummy(\n%s\n);' % cdecl)[:2]
        assert not macros
        exprnode = ast.ext[-1].type.args.params[0]
        if isinstance(exprnode, pycparser.c_ast.ID):
            raise CDefError("unknown identifier '%s'" % (exprnode.name,))
        return self._get_type_and_quals(exprnode.type)

    def _declare(self, name, obj, included=False, quals=0):
        if name in self._declarations:
            prevobj, prevquals = self._declarations[name]
            if prevobj is obj and prevquals == quals:
                return
            if not self._options.get('override'):
                raise FFIError(
                    "multiple declarations of %s (for interactive usage, "
                    "try cdef(xx, override=True))" % (name,))
        assert '__dotdotdot__' not in name.split()
        self._declarations[name] = (obj, quals)
        if included:
            self._included_declarations.add(obj)

    def _extract_quals(self, type):
        quals = 0
        if isinstance(type, (pycparser.c_ast.TypeDecl,
                             pycparser.c_ast.PtrDecl)):
            if 'const' in type.quals:
                quals |= model.Q_CONST
            if 'volatile' in type.quals:
                quals |= model.Q_VOLATILE
            if 'restrict' in type.quals:
                quals |= model.Q_RESTRICT
        return quals

    def _get_type_pointer(self, type, quals, declname=None):
        if isinstance(type, model.RawFunctionType):
            return type.as_function_pointer()
        if (isinstance(type, model.StructOrUnionOrEnum) and
                type.name.startswith('$') and type.name[1:].isdigit() and
                type.forcename is None and declname is not None):
            return model.NamedPointerType(type, declname, quals)
        return model.PointerType(type, quals)

    def _get_type_and_quals(self, typenode, name=None, partial_length_ok=False):
        # first, dereference typedefs, if we have it already parsed, we're good
        if (isinstance(typenode, pycparser.c_ast.TypeDecl) and
            isinstance(typenode.type, pycparser.c_ast.IdentifierType) and
            len(typenode.type.names) == 1 and
            ('typedef ' + typenode.type.names[0]) in self._declarations):
            tp, quals = self._declarations['typedef ' + typenode.type.names[0]]
            quals |= self._extract_quals(typenode)
            return tp, quals
        #
        if isinstance(typenode, pycparser.c_ast.ArrayDecl):
            # array type
            if typenode.dim is None:
                length = None
            else:
                length = self._parse_constant(
                    typenode.dim, partial_length_ok=partial_length_ok)
            tp, quals = self._get_type_and_quals(typenode.type,
                                partial_length_ok=partial_length_ok)
            return model.ArrayType(tp, length), quals
        #
        if isinstance(typenode, pycparser.c_ast.PtrDecl):
            # pointer type
            itemtype, itemquals = self._get_type_and_quals(typenode.type)
            tp = self._get_type_pointer(itemtype, itemquals, declname=name)
            quals = self._extract_quals(typenode)
            return tp, quals
        #
        if isinstance(typenode, pycparser.c_ast.TypeDecl):
            quals = self._extract_quals(typenode)
            type = typenode.type
            if isinstance(type, pycparser.c_ast.IdentifierType):
                # assume a primitive type.  get it from .names, but reduce
                # synonyms to a single chosen combination
                names = list(type.names)
                if names != ['signed', 'char']:    # keep this unmodified
                    prefixes = {}
                    while names:
                        name = names[0]
                        if name in ('short', 'long', 'signed', 'unsigned'):
                            prefixes[name] = prefixes.get(name, 0) + 1
                            del names[0]
                        else:
                            break
                    # ignore the 'signed' prefix below, and reorder the others
                    newnames = []
                    for prefix in ('unsigned', 'short', 'long'):
                        for i in range(prefixes.get(prefix, 0)):
                            newnames.append(prefix)
                    if not names:
                        names = ['int']    # implicitly
                    if names == ['int']:   # but kill it if 'short' or 'long'
                        if 'short' in prefixes or 'long' in prefixes:
                            names = []
                    names = newnames + names
                ident = ' '.join(names)
                if ident == 'void':
                    return model.void_type, quals
                if ident == '__dotdotdot__':
                    raise FFIError(':%d: bad usage of "..."' %
                            typenode.coord.line)
                tp0, quals0 = resolve_common_type(self, ident)
                return tp0, (quals | quals0)
            #
            if isinstance(type, pycparser.c_ast.Struct):
                # 'struct foobar'
                tp = self._get_struct_union_enum_type('struct', type, name)
                return tp, quals
            #
            if isinstance(type, pycparser.c_ast.Union):
                # 'union foobar'
                tp = self._get_struct_union_enum_type('union', type, name)
                return tp, quals
            #
            if isinstance(type, pycparser.c_ast.Enum):
                # 'enum foobar'
                tp = self._get_struct_union_enum_type('enum', type, name)
                return tp, quals
        #
        if isinstance(typenode, pycparser.c_ast.FuncDecl):
            # a function type
            return self._parse_function_type(typenode, name), 0
        #
        # nested anonymous structs or unions end up here
        if isinstance(typenode, pycparser.c_ast.Struct):
            return self._get_struct_union_enum_type('struct', typenode, name,
                                                    nested=True), 0
        if isinstance(typenode, pycparser.c_ast.Union):
            return self._get_struct_union_enum_type('union', typenode, name,
                                                    nested=True), 0
        #
        raise FFIError(":%d: bad or unsupported type declaration" %
                typenode.coord.line)

    def _parse_function_type(self, typenode, funcname=None):
        params = list(getattr(typenode.args, 'params', []))
        for i, arg in enumerate(params):
            if not hasattr(arg, 'type'):
                raise CDefError("%s arg %d: unknown type '%s'"
                    " (if you meant to use the old C syntax of giving"
                    " untyped arguments, it is not supported)"
                    % (funcname or 'in expression', i + 1,
                       getattr(arg, 'name', '?')))
        ellipsis = (
            len(params) > 0 and
            isinstance(params[-1].type, pycparser.c_ast.TypeDecl) and
            isinstance(params[-1].type.type,
                       pycparser.c_ast.IdentifierType) and
            params[-1].type.type.names == ['__dotdotdot__'])
        if ellipsis:
            params.pop()
            if not params:
                raise CDefError(
                    "%s: a function with only '(...)' as argument"
                    " is not correct C" % (funcname or 'in expression'))
        args = [self._as_func_arg(*self._get_type_and_quals(argdeclnode.type))
                for argdeclnode in params]
        if not ellipsis and args == [model.void_type]:
            args = []
        result, quals = self._get_type_and_quals(typenode.type)
        # the 'quals' on the result type are ignored.  HACK: we absure them
        # to detect __stdcall functions: we textually replace "__stdcall"
        # with "volatile volatile const" above.
        abi = None
        if hasattr(typenode.type, 'quals'): # else, probable syntax error anyway
            if typenode.type.quals[-3:] == ['volatile', 'volatile', 'const']:
                abi = '__stdcall'
        return model.RawFunctionType(tuple(args), result, ellipsis, abi)

    def _as_func_arg(self, type, quals):
        if isinstance(type, model.ArrayType):
            return model.PointerType(type.item, quals)
        elif isinstance(type, model.RawFunctionType):
            return type.as_function_pointer()
        else:
            return type

    def _get_struct_union_enum_type(self, kind, type, name=None, nested=False):
        # First, a level of caching on the exact 'type' node of the AST.
        # This is obscure, but needed because pycparser "unrolls" declarations
        # such as "typedef struct { } foo_t, *foo_p" and we end up with
        # an AST that is not a tree, but a DAG, with the "type" node of the
        # two branches foo_t and foo_p of the trees being the same node.
        # It's a bit silly but detecting "DAG-ness" in the AST tree seems
        # to be the only way to distinguish this case from two independent
        # structs.  See test_struct_with_two_usages.
        try:
            return self._structnode2type[type]
        except KeyError:
            pass
        #
        # Note that this must handle parsing "struct foo" any number of
        # times and always return the same StructType object.  Additionally,
        # one of these times (not necessarily the first), the fields of
        # the struct can be specified with "struct foo { ...fields... }".
        # If no name is given, then we have to create a new anonymous struct
        # with no caching; in this case, the fields are either specified
        # right now or never.
        #
        force_name = name
        name = type.name
        #
        # get the type or create it if needed
        if name is None:
            # 'force_name' is used to guess a more readable name for
            # anonymous structs, for the common case "typedef struct { } foo".
            if force_name is not None:
                explicit_name = '$%s' % force_name
            else:
                self._anonymous_counter += 1
                explicit_name = '$%d' % self._anonymous_counter
            tp = None
        else:
            explicit_name = name
            key = '%s %s' % (kind, name)
            tp, _ = self._declarations.get(key, (None, None))
        #
        if tp is None:
            if kind == 'struct':
                tp = model.StructType(explicit_name, None, None, None)
            elif kind == 'union':
                tp = model.UnionType(explicit_name, None, None, None)
            elif kind == 'enum':
                if explicit_name == '__dotdotdot__':
                    raise CDefError("Enums cannot be declared with ...")
                tp = self._build_enum_type(explicit_name, type.values)
            else:
                raise AssertionError("kind = %r" % (kind,))
            if name is not None:
                self._declare(key, tp)
        else:
            if kind == 'enum' and type.values is not None:
                raise NotImplementedError(
                    "enum %s: the '{}' declaration should appear on the first "
                    "time the enum is mentioned, not later" % explicit_name)
        if not tp.forcename:
            tp.force_the_name(force_name)
        if tp.forcename and '$' in tp.name:
            self._declare('anonymous %s' % tp.forcename, tp)
        #
        self._structnode2type[type] = tp
        #
        # enums: done here
        if kind == 'enum':
            return tp
        #
        # is there a 'type.decls'?  If yes, then this is the place in the
        # C sources that declare the fields.  If no, then just return the
        # existing type, possibly still incomplete.
        if type.decls is None:
            return tp
        #
        if tp.fldnames is not None:
            raise CDefError("duplicate declaration of struct %s" % name)
        fldnames = []
        fldtypes = []
        fldbitsize = []
        fldquals = []
        for decl in type.decls:
            if (isinstance(decl.type, pycparser.c_ast.IdentifierType) and
                    ''.join(decl.type.names) == '__dotdotdot__'):
                # XXX pycparser is inconsistent: 'names' should be a list
                # of strings, but is sometimes just one string.  Use
                # str.join() as a way to cope with both.
                self._make_partial(tp, nested)
                continue
            if decl.bitsize is None:
                bitsize = -1
            else:
                bitsize = self._parse_constant(decl.bitsize)
            self._partial_length = False
            type, fqual = self._get_type_and_quals(decl.type,
                                                   partial_length_ok=True)
            if self._partial_length:
                self._make_partial(tp, nested)
            if isinstance(type, model.StructType) and type.partial:
                self._make_partial(tp, nested)
            fldnames.append(decl.name or '')
            fldtypes.append(type)
            fldbitsize.append(bitsize)
            fldquals.append(fqual)
        tp.fldnames = tuple(fldnames)
        tp.fldtypes = tuple(fldtypes)
        tp.fldbitsize = tuple(fldbitsize)
        tp.fldquals = tuple(fldquals)
        if fldbitsize != [-1] * len(fldbitsize):
            if isinstance(tp, model.StructType) and tp.partial:
                raise NotImplementedError("%s: using both bitfields and '...;'"
                                          % (tp,))
        tp.packed = self._options.get('packed')
        if tp.completed:    # must be re-completed: it is not opaque any more
            tp.completed = 0
            self._recomplete.append(tp)
        return tp

    def _make_partial(self, tp, nested):
        if not isinstance(tp, model.StructOrUnion):
            raise CDefError("%s cannot be partial" % (tp,))
        if not tp.has_c_name() and not nested:
            raise NotImplementedError("%s is partial but has no C name" %(tp,))
        tp.partial = True

    def _parse_constant(self, exprnode, partial_length_ok=False):
        # for now, limited to expressions that are an immediate number
        # or positive/negative number
        if isinstance(exprnode, pycparser.c_ast.Constant):
            s = exprnode.value
            if s.startswith('0'):
                if s.startswith('0x') or s.startswith('0X'):
                    return int(s, 16)
                return int(s, 8)
            elif '1' <= s[0] <= '9':
                return int(s, 10)
            elif s[0] == "'" and s[-1] == "'" and (
                    len(s) == 3 or (len(s) == 4 and s[1] == "\\")):
                return ord(s[-2])
            else:
                raise CDefError("invalid constant %r" % (s,))
        #
        if (isinstance(exprnode, pycparser.c_ast.UnaryOp) and
                exprnode.op == '+'):
            return self._parse_constant(exprnode.expr)
        #
        if (isinstance(exprnode, pycparser.c_ast.UnaryOp) and
                exprnode.op == '-'):
            return -self._parse_constant(exprnode.expr)
        # load previously defined int constant
        if (isinstance(exprnode, pycparser.c_ast.ID) and
                exprnode.name in self._int_constants):
            return self._int_constants[exprnode.name]
        #
        if (isinstance(exprnode, pycparser.c_ast.ID) and
                    exprnode.name == '__dotdotdotarray__'):
            if partial_length_ok:
                self._partial_length = True
                return '...'
            raise FFIError(":%d: unsupported '[...]' here, cannot derive "
                           "the actual array length in this context"
                           % exprnode.coord.line)
        #
        if (isinstance(exprnode, pycparser.c_ast.BinaryOp) and
                exprnode.op == '+'):
            return (self._parse_constant(exprnode.left) +
                    self._parse_constant(exprnode.right))
        #
        if (isinstance(exprnode, pycparser.c_ast.BinaryOp) and
                exprnode.op == '-'):
            return (self._parse_constant(exprnode.left) -
                    self._parse_constant(exprnode.right))
        #
        raise FFIError(":%d: unsupported expression: expected a "
                       "simple numeric constant" % exprnode.coord.line)

    def _build_enum_type(self, explicit_name, decls):
        if decls is not None:
            partial = False
            enumerators = []
            enumvalues = []
            nextenumvalue = 0
            for enum in decls.enumerators:
                if _r_enum_dotdotdot.match(enum.name):
                    partial = True
                    continue
                if enum.value is not None:
                    nextenumvalue = self._parse_constant(enum.value)
                enumerators.append(enum.name)
                enumvalues.append(nextenumvalue)
                self._add_constants(enum.name, nextenumvalue)
                nextenumvalue += 1
            enumerators = tuple(enumerators)
            enumvalues = tuple(enumvalues)
            tp = model.EnumType(explicit_name, enumerators, enumvalues)
            tp.partial = partial
        else:   # opaque enum
            tp = model.EnumType(explicit_name, (), ())
        return tp

    def include(self, other):
        for name, (tp, quals) in other._declarations.items():
            if name.startswith('anonymous $enum_$'):
                continue   # fix for test_anonymous_enum_include
            kind = name.split(' ', 1)[0]
            if kind in ('struct', 'union', 'enum', 'anonymous', 'typedef'):
                self._declare(name, tp, included=True, quals=quals)
        for k, v in other._int_constants.items():
            self._add_constants(k, v)

    def _get_unknown_type(self, decl):
        typenames = decl.type.type.names
        if typenames == ['__dotdotdot__']:
            return model.unknown_type(decl.name)

        if typenames == ['__dotdotdotint__']:
            if self._uses_new_feature is None:
                self._uses_new_feature = "'typedef int... %s'" % decl.name
            return model.UnknownIntegerType(decl.name)

        if typenames == ['__dotdotdotfloat__']:
            # note: not for 'long double' so far
            if self._uses_new_feature is None:
                self._uses_new_feature = "'typedef float... %s'" % decl.name
            return model.UnknownFloatType(decl.name)

        raise FFIError(':%d: unsupported usage of "..." in typedef'
                       % decl.coord.line)

    def _get_unknown_ptr_type(self, decl):
        if decl.type.type.type.names == ['__dotdotdot__']:
            return model.unknown_ptr_type(decl.name)
        raise FFIError(':%d: unsupported usage of "..." in typedef'
                       % decl.coord.line)
