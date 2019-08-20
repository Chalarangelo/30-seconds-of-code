#ifndef SASS_TYPES_LIST_H
#define SASS_TYPES_LIST_H

#include <nan.h>
#include "sass_value_wrapper.h"

namespace SassTypes
{
  class List : public SassValueWrapper<List> {
    public:
      List(Sass_Value*);
      static char const* get_constructor_name() { return "SassList"; }
      static Sass_Value* construct(const std::vector<v8::Local<v8::Value>>, Sass_Value **);

      static void initPrototype(v8::Local<v8::FunctionTemplate>);

      static NAN_METHOD(GetValue);
      static NAN_METHOD(SetValue);
      static NAN_METHOD(GetSeparator);
      static NAN_METHOD(SetSeparator);
      static NAN_METHOD(GetLength);
  };
}

#endif
