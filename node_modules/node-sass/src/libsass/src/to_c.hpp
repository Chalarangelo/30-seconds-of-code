#ifndef SASS_TO_C_H
#define SASS_TO_C_H

#include "ast_fwd_decl.hpp"
#include "operation.hpp"
#include "sass/values.h"

namespace Sass {

  class To_C : public Operation_CRTP<union Sass_Value*, To_C> {
    // override this to define a catch-all
    union Sass_Value* fallback_impl(AST_Node_Ptr n);

  public:

    To_C() { }
    ~To_C() { }

    union Sass_Value* operator()(Boolean_Ptr);
    union Sass_Value* operator()(Number_Ptr);
    union Sass_Value* operator()(Color_Ptr);
    union Sass_Value* operator()(String_Constant_Ptr);
    union Sass_Value* operator()(String_Quoted_Ptr);
    union Sass_Value* operator()(Custom_Warning_Ptr);
    union Sass_Value* operator()(Custom_Error_Ptr);
    union Sass_Value* operator()(List_Ptr);
    union Sass_Value* operator()(Map_Ptr);
    union Sass_Value* operator()(Null_Ptr);
    union Sass_Value* operator()(Arguments_Ptr);
    union Sass_Value* operator()(Argument_Ptr);

    // dispatch to fallback implementation
    union Sass_Value* fallback(AST_Node_Ptr x)
    { return fallback_impl(x); }
  };

}

#endif
