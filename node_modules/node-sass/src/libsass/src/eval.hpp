#ifndef SASS_EVAL_H
#define SASS_EVAL_H

#include "ast.hpp"
#include "context.hpp"
#include "listize.hpp"
#include "operation.hpp"
#include "environment.hpp"

namespace Sass {

  class Expand;
  class Context;

  class Eval : public Operation_CRTP<Expression_Ptr, Eval> {

   private:
    Expression_Ptr fallback_impl(AST_Node_Ptr n);

   public:
    Expand& exp;
    Context& ctx;
    Backtraces& traces;
    Eval(Expand& exp);
    ~Eval();

    bool force;
    bool is_in_comment;
    bool is_in_selector_schema;

    Boolean_Obj bool_true;
    Boolean_Obj bool_false;

    Env* environment();
    Selector_List_Obj selector();

    // for evaluating function bodies
    Expression_Ptr operator()(Block_Ptr);
    Expression_Ptr operator()(Assignment_Ptr);
    Expression_Ptr operator()(If_Ptr);
    Expression_Ptr operator()(For_Ptr);
    Expression_Ptr operator()(Each_Ptr);
    Expression_Ptr operator()(While_Ptr);
    Expression_Ptr operator()(Return_Ptr);
    Expression_Ptr operator()(Warning_Ptr);
    Expression_Ptr operator()(Error_Ptr);
    Expression_Ptr operator()(Debug_Ptr);

    Expression_Ptr operator()(List_Ptr);
    Expression_Ptr operator()(Map_Ptr);
    Expression_Ptr operator()(Binary_Expression_Ptr);
    Expression_Ptr operator()(Unary_Expression_Ptr);
    Expression_Ptr operator()(Function_Call_Ptr);
    Expression_Ptr operator()(Function_Call_Schema_Ptr);
    Expression_Ptr operator()(Variable_Ptr);
    Expression_Ptr operator()(Number_Ptr);
    Expression_Ptr operator()(Color_Ptr);
    Expression_Ptr operator()(Boolean_Ptr);
    Expression_Ptr operator()(String_Schema_Ptr);
    Expression_Ptr operator()(String_Quoted_Ptr);
    Expression_Ptr operator()(String_Constant_Ptr);
    // Expression_Ptr operator()(Selector_List_Ptr);
    Media_Query_Ptr operator()(Media_Query_Ptr);
    Expression_Ptr operator()(Media_Query_Expression_Ptr);
    Expression_Ptr operator()(At_Root_Query_Ptr);
    Expression_Ptr operator()(Supports_Operator_Ptr);
    Expression_Ptr operator()(Supports_Negation_Ptr);
    Expression_Ptr operator()(Supports_Declaration_Ptr);
    Expression_Ptr operator()(Supports_Interpolation_Ptr);
    Expression_Ptr operator()(Null_Ptr);
    Expression_Ptr operator()(Argument_Ptr);
    Expression_Ptr operator()(Arguments_Ptr);
    Expression_Ptr operator()(Comment_Ptr);

    // these will return selectors
    Selector_List_Ptr operator()(Selector_List_Ptr);
    Selector_List_Ptr operator()(Complex_Selector_Ptr);
    Compound_Selector_Ptr operator()(Compound_Selector_Ptr);
    Simple_Selector_Ptr operator()(Simple_Selector_Ptr s);
    Wrapped_Selector_Ptr operator()(Wrapped_Selector_Ptr s);
    // they don't have any specific implementation (yet)
    // Element_Selector_Ptr operator()(Element_Selector_Ptr s) { return s; };
    // Pseudo_Selector_Ptr operator()(Pseudo_Selector_Ptr s) { return s; };
    // Class_Selector_Ptr operator()(Class_Selector_Ptr s) { return s; };
    // Id_Selector_Ptr operator()(Id_Selector_Ptr s) { return s; };
    // Placeholder_Selector_Ptr operator()(Placeholder_Selector_Ptr s) { return s; };
    // actual evaluated selectors
    Selector_List_Ptr operator()(Selector_Schema_Ptr);
    Expression_Ptr operator()(Parent_Selector_Ptr);

    template <typename U>
    Expression_Ptr fallback(U x) { return fallback_impl(x); }

  private:
    void interpolation(Context& ctx, std::string& res, Expression_Obj ex, bool into_quotes, bool was_itpl = false);

  };

  Expression_Ptr cval_to_astnode(union Sass_Value* v, Backtraces traces, ParserState pstate = ParserState("[AST]"));

}

#endif
