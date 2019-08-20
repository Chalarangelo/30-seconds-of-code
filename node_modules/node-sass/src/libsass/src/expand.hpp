#ifndef SASS_EXPAND_H
#define SASS_EXPAND_H

#include <vector>

#include "ast.hpp"
#include "eval.hpp"
#include "operation.hpp"
#include "environment.hpp"

namespace Sass {

  class Listize;
  class Context;
  class Eval;
  struct Backtrace;

  class Expand : public Operation_CRTP<Statement_Ptr, Expand> {
  public:

    Env* environment();
    Selector_List_Obj selector();

    Context&          ctx;
    Backtraces&       traces;
    Eval              eval;
    size_t            recursions;
    bool              in_keyframes;
    bool              at_root_without_rule;
    bool              old_at_root_without_rule;

    // it's easier to work with vectors
    std::vector<Env*>              env_stack;
    std::vector<Block_Ptr>         block_stack;
    std::vector<AST_Node_Obj>      call_stack;
    std::vector<Selector_List_Obj> selector_stack;
    std::vector<Media_Block_Ptr>   media_block_stack;

    Boolean_Obj bool_true;

    Statement_Ptr fallback_impl(AST_Node_Ptr n);

  private:
    void expand_selector_list(Selector_Obj, Selector_List_Obj extender);

  public:
    Expand(Context&, Env*, std::vector<Selector_List_Obj>* stack = NULL);
    ~Expand() { }

    Block_Ptr operator()(Block_Ptr);
    Statement_Ptr operator()(Ruleset_Ptr);
    Statement_Ptr operator()(Media_Block_Ptr);
    Statement_Ptr operator()(Supports_Block_Ptr);
    Statement_Ptr operator()(At_Root_Block_Ptr);
    Statement_Ptr operator()(Directive_Ptr);
    Statement_Ptr operator()(Declaration_Ptr);
    Statement_Ptr operator()(Assignment_Ptr);
    Statement_Ptr operator()(Import_Ptr);
    Statement_Ptr operator()(Import_Stub_Ptr);
    Statement_Ptr operator()(Warning_Ptr);
    Statement_Ptr operator()(Error_Ptr);
    Statement_Ptr operator()(Debug_Ptr);
    Statement_Ptr operator()(Comment_Ptr);
    Statement_Ptr operator()(If_Ptr);
    Statement_Ptr operator()(For_Ptr);
    Statement_Ptr operator()(Each_Ptr);
    Statement_Ptr operator()(While_Ptr);
    Statement_Ptr operator()(Return_Ptr);
    Statement_Ptr operator()(Extension_Ptr);
    Statement_Ptr operator()(Definition_Ptr);
    Statement_Ptr operator()(Mixin_Call_Ptr);
    Statement_Ptr operator()(Content_Ptr);

    template <typename U>
    Statement_Ptr fallback(U x) { return fallback_impl(x); }

    void append_block(Block_Ptr);
  };

}

#endif
