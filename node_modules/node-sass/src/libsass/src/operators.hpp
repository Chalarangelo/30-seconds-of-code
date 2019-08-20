#ifndef SASS_OPERATORS_H
#define SASS_OPERATORS_H

#include "values.hpp"
#include "sass/values.h"

namespace Sass {

  namespace Operators {

    // equality operator using AST Node operator==
    bool eq(Expression_Obj, Expression_Obj);
    bool neq(Expression_Obj, Expression_Obj);
    // specific operators based on cmp and eq
    bool lt(Expression_Obj, Expression_Obj);
    bool gt(Expression_Obj, Expression_Obj);
    bool lte(Expression_Obj, Expression_Obj);
    bool gte(Expression_Obj, Expression_Obj);
    // arithmetic for all the combinations that matter
    Value_Ptr op_strings(Sass::Operand, Value&, Value&, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed = false);
    Value_Ptr op_colors(enum Sass_OP, const Color&, const Color&, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed = false);
    Value_Ptr op_numbers(enum Sass_OP, const Number&, const Number&, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed = false);
    Value_Ptr op_number_color(enum Sass_OP, const Number&, const Color&, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed = false);
    Value_Ptr op_color_number(enum Sass_OP, const Color&, const Number&, struct Sass_Inspect_Options opt, const ParserState& pstate, bool delayed = false);

  };

}

#endif
