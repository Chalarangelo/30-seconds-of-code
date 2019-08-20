#ifndef SASS_TYPES_MAP_H
#define SASS_TYPES_MAP_H

#include <nan.h>
#include "sass_value_wrapper.h"

namespace SassTypes
{
  class Map : public SassValueWrapper<Map> {
    public:
      Map(Sass_Value*);
      static char const* get_constructor_name() { return "SassMap"; }
      static Sass_Value* construct(const std::vector<v8::Local<v8::Value>>, Sass_Value **);

      static void initPrototype(v8::Local<v8::FunctionTemplate>);

      static NAN_METHOD(GetValue);
      static NAN_METHOD(SetValue);
      static NAN_METHOD(GetKey);
      static NAN_METHOD(SetKey);
      static NAN_METHOD(GetLength);
  };
}

#endif
