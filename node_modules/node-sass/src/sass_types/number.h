#ifndef SASS_TYPES_NUMBER_H
#define SASS_TYPES_NUMBER_H

#include <nan.h>
#include "sass_value_wrapper.h"

namespace SassTypes
{

  class Number : public SassValueWrapper<Number> {
    public:
      Number(Sass_Value*);
      static char const* get_constructor_name() { return "SassNumber"; }
      static Sass_Value* construct(const std::vector<v8::Local<v8::Value>>, Sass_Value **out);

      static void initPrototype(v8::Local<v8::FunctionTemplate>);

      static NAN_METHOD(GetValue);
      static NAN_METHOD(GetUnit);
      static NAN_METHOD(SetValue);
      static NAN_METHOD(SetUnit);
  };
}

#endif
