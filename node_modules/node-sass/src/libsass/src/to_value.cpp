#include "sass.hpp"
#include "ast.hpp"
#include "to_value.hpp"

namespace Sass {

  Value_Ptr To_Value::fallback_impl(AST_Node_Ptr n)
  {
    // throw a runtime error if this happens
    // we want a well defined set of possible nodes
    throw std::runtime_error("invalid node for to_value");
  }

  // Custom_Error is a valid value
  Value_Ptr To_Value::operator()(Custom_Error_Ptr e)
  {
    return e;
  }

  // Custom_Warning is a valid value
  Value_Ptr To_Value::operator()(Custom_Warning_Ptr w)
  {
    return w;
  }

  // Boolean is a valid value
  Value_Ptr To_Value::operator()(Boolean_Ptr b)
  {
    return b;
  }

  // Number is a valid value
  Value_Ptr To_Value::operator()(Number_Ptr n)
  {
    return n;
  }

  // Color is a valid value
  Value_Ptr To_Value::operator()(Color_Ptr c)
  {
    return c;
  }

  // String_Constant is a valid value
  Value_Ptr To_Value::operator()(String_Constant_Ptr s)
  {
    return s;
  }

  // String_Quoted is a valid value
  Value_Ptr To_Value::operator()(String_Quoted_Ptr s)
  {
    return s;
  }

  // List is a valid value
  Value_Ptr To_Value::operator()(List_Ptr l)
  {
    List_Obj ll = SASS_MEMORY_NEW(List,
                               l->pstate(),
                               l->length(),
                               l->separator(),
                               l->is_arglist(),
                               l->is_bracketed());
    for (size_t i = 0, L = l->length(); i < L; ++i) {
      ll->append((*l)[i]->perform(this));
    }
    return ll.detach();
  }

  // Map is a valid value
  Value_Ptr To_Value::operator()(Map_Ptr m)
  {
    return m;
  }

  // Null is a valid value
  Value_Ptr To_Value::operator()(Null_Ptr n)
  {
    return n;
  }

  // Function is a valid value
  Value_Ptr To_Value::operator()(Function_Ptr n)
  {
    return n;
  }

  // Argument returns its value
  Value_Ptr To_Value::operator()(Argument_Ptr arg)
  {
    if (!arg->name().empty()) return 0;
    return arg->value()->perform(this);
  }

  // Selector_List is converted to a string
  Value_Ptr To_Value::operator()(Selector_List_Ptr s)
  {
    return SASS_MEMORY_NEW(String_Quoted,
                           s->pstate(),
                           s->to_string(ctx.c_options));
  }

  // Binary_Expression is converted to a string
  Value_Ptr To_Value::operator()(Binary_Expression_Ptr s)
  {
    return SASS_MEMORY_NEW(String_Quoted,
                           s->pstate(),
                           s->to_string(ctx.c_options));
  }

};
