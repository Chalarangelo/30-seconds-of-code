#ifndef SASS_VALUES_H
#define SASS_VALUES_H

#include "ast.hpp"

namespace Sass {

  union Sass_Value* ast_node_to_sass_value (const Expression_Ptr val);
  Value_Ptr sass_value_to_ast_node (const union Sass_Value* val);

}
#endif
