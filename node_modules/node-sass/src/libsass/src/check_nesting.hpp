#ifndef SASS_CHECK_NESTING_H
#define SASS_CHECK_NESTING_H

#include "ast.hpp"
#include "operation.hpp"

namespace Sass {

  class CheckNesting : public Operation_CRTP<Statement_Ptr, CheckNesting> {

    std::vector<Statement_Ptr>  parents;
    Backtraces                  traces;
    Statement_Ptr               parent;
    Definition_Ptr              current_mixin_definition;

    Statement_Ptr fallback_impl(Statement_Ptr);
    Statement_Ptr before(Statement_Ptr);
    Statement_Ptr visit_children(Statement_Ptr);

  public:
    CheckNesting();
    ~CheckNesting() { }

    Statement_Ptr operator()(Block_Ptr);
    Statement_Ptr operator()(Definition_Ptr);
    Statement_Ptr operator()(If_Ptr);

    template <typename U>
    Statement_Ptr fallback(U x) {
      Statement_Ptr n = Cast<Statement>(x);
      if (this->should_visit(n)) {
        return fallback_impl(n);
      }
      return NULL;
    }

  private:
    void invalid_content_parent(Statement_Ptr, AST_Node_Ptr);
    void invalid_charset_parent(Statement_Ptr, AST_Node_Ptr);
    void invalid_extend_parent(Statement_Ptr, AST_Node_Ptr);
    // void invalid_import_parent(Statement_Ptr);
    void invalid_mixin_definition_parent(Statement_Ptr, AST_Node_Ptr);
    void invalid_function_parent(Statement_Ptr, AST_Node_Ptr);

    void invalid_function_child(Statement_Ptr);
    void invalid_prop_child(Statement_Ptr);
    void invalid_prop_parent(Statement_Ptr, AST_Node_Ptr);
    void invalid_return_parent(Statement_Ptr, AST_Node_Ptr);
    void invalid_value_child(AST_Node_Ptr);

    bool is_transparent_parent(Statement_Ptr, Statement_Ptr);

    bool should_visit(Statement_Ptr);

    bool is_charset(Statement_Ptr);
    bool is_mixin(Statement_Ptr);
    bool is_function(Statement_Ptr);
    bool is_root_node(Statement_Ptr);
    bool is_at_root_node(Statement_Ptr);
    bool is_directive_node(Statement_Ptr);
  };

}

#endif
