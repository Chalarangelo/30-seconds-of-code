#ifndef SASS_TO_VALUE_H
#define SASS_TO_VALUE_H

#include "operation.hpp"
#include "sass/values.h"
#include "ast_fwd_decl.hpp"

namespace Sass {

  class To_Value : public Operation_CRTP<Value_Ptr, To_Value> {

    Value_Ptr fallback_impl(AST_Node_Ptr n);

  private:

    Context& ctx;

  public:

    To_Value(Context& ctx)
    : ctx(ctx)
    { }
    ~To_Value() { }
    using Operation<Value_Ptr>::operator();

    Value_Ptr operator()(Argument_Ptr);
    Value_Ptr operator()(Boolean_Ptr);
    Value_Ptr operator()(Number_Ptr);
    Value_Ptr operator()(Color_Ptr);
    Value_Ptr operator()(String_Constant_Ptr);
    Value_Ptr operator()(String_Quoted_Ptr);
    Value_Ptr operator()(Custom_Warning_Ptr);
    Value_Ptr operator()(Custom_Error_Ptr);
    Value_Ptr operator()(List_Ptr);
    Value_Ptr operator()(Map_Ptr);
    Value_Ptr operator()(Null_Ptr);
    Value_Ptr operator()(Function_Ptr);

    // convert to string via `To_String`
    Value_Ptr operator()(Selector_List_Ptr);
    Value_Ptr operator()(Binary_Expression_Ptr);

    // fallback throws error
    template <typename U>
    Value_Ptr fallback(U x) { return fallback_impl(x); }
  };

}

#endif
