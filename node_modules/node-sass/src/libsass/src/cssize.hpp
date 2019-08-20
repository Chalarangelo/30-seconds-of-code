#ifndef SASS_CSSIZE_H
#define SASS_CSSIZE_H

#include "ast.hpp"
#include "context.hpp"
#include "operation.hpp"
#include "environment.hpp"

namespace Sass {

  struct Backtrace;

  class Cssize : public Operation_CRTP<Statement_Ptr, Cssize> {

    Context&                    ctx;
    Backtraces&                 traces;
    std::vector<Block_Ptr>      block_stack;
    std::vector<Statement_Ptr>  p_stack;

    Statement_Ptr fallback_impl(AST_Node_Ptr n);

  public:
    Cssize(Context&);
    ~Cssize() { }

    Selector_List_Ptr selector();

    Block_Ptr operator()(Block_Ptr);
    Statement_Ptr operator()(Ruleset_Ptr);
    // Statement_Ptr operator()(Bubble_Ptr);
    Statement_Ptr operator()(Media_Block_Ptr);
    Statement_Ptr operator()(Supports_Block_Ptr);
    Statement_Ptr operator()(At_Root_Block_Ptr);
    Statement_Ptr operator()(Directive_Ptr);
    Statement_Ptr operator()(Keyframe_Rule_Ptr);
    Statement_Ptr operator()(Trace_Ptr);
    Statement_Ptr operator()(Declaration_Ptr);
    // Statement_Ptr operator()(Assignment_Ptr);
    // Statement_Ptr operator()(Import_Ptr);
    // Statement_Ptr operator()(Import_Stub_Ptr);
    // Statement_Ptr operator()(Warning_Ptr);
    // Statement_Ptr operator()(Error_Ptr);
    // Statement_Ptr operator()(Comment_Ptr);
    // Statement_Ptr operator()(If_Ptr);
    // Statement_Ptr operator()(For_Ptr);
    // Statement_Ptr operator()(Each_Ptr);
    // Statement_Ptr operator()(While_Ptr);
    // Statement_Ptr operator()(Return_Ptr);
    // Statement_Ptr operator()(Extension_Ptr);
    // Statement_Ptr operator()(Definition_Ptr);
    // Statement_Ptr operator()(Mixin_Call_Ptr);
    // Statement_Ptr operator()(Content_Ptr);
    Statement_Ptr operator()(Null_Ptr);

    Statement_Ptr parent();
    std::vector<std::pair<bool, Block_Obj>> slice_by_bubble(Block_Ptr);
    Statement_Ptr bubble(Directive_Ptr);
    Statement_Ptr bubble(At_Root_Block_Ptr);
    Statement_Ptr bubble(Media_Block_Ptr);
    Statement_Ptr bubble(Supports_Block_Ptr);

    Block_Ptr debubble(Block_Ptr children, Statement_Ptr parent = 0);
    Block_Ptr flatten(Block_Ptr);
    bool bubblable(Statement_Ptr);

    List_Ptr merge_media_queries(Media_Block_Ptr, Media_Block_Ptr);
    Media_Query_Ptr merge_media_query(Media_Query_Ptr, Media_Query_Ptr);

    template <typename U>
    Statement_Ptr fallback(U x) { return fallback_impl(x); }

    void append_block(Block_Ptr, Block_Ptr);
  };

}

#endif
