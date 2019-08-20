#ifndef SASS_BIND_H
#define SASS_BIND_H

#include <string>
#include "environment.hpp"
#include "ast_fwd_decl.hpp"

namespace Sass {

  void bind(std::string type, std::string name, Parameters_Obj, Arguments_Obj, Context*, Env*, Eval*);
}

#endif
