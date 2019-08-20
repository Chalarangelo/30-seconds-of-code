#ifndef SASS_TYPES_ERROR_H
#define SASS_TYPES_ERROR_H

#include <nan.h>
#include "sass_value_wrapper.h"

namespace SassTypes
{
  class Error : public SassValueWrapper<Error> {
    public:
      Error(Sass_Value*);
      static char const* get_constructor_name() { return "SassError"; }
      static Sass_Value* construct(const std::vector<v8::Local<v8::Value>>, Sass_Value **);

      static void initPrototype(v8::Local<v8::FunctionTemplate>);
  };
}

#endif
