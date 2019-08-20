#ifndef SASS_LISTIZE_H
#define SASS_LISTIZE_H

#include <vector>
#include <iostream>

#include "ast.hpp"
#include "context.hpp"
#include "operation.hpp"
#include "environment.hpp"

namespace Sass {

  struct Backtrace;

  class Listize : public Operation_CRTP<Expression_Ptr, Listize> {

    Expression_Ptr fallback_impl(AST_Node_Ptr n);

  public:
    Listize();
    ~Listize() { }

    Expression_Ptr operator()(Selector_List_Ptr);
    Expression_Ptr operator()(Complex_Selector_Ptr);
    Expression_Ptr operator()(Compound_Selector_Ptr);

    template <typename U>
    Expression_Ptr fallback(U x) { return fallback_impl(x); }
  };

}

#endif
