#ifndef SASS_TYPES_COLOR_H
#define SASS_TYPES_COLOR_H

#include <nan.h>
#include "sass_value_wrapper.h"

#if defined(__GNUC__) && __GNUC__ >= 7
#define NODE_SASS_FALLTHROUGH __attribute__ ((fallthrough))
#else
#define NODE_SASS_FALLTHROUGH
#endif

namespace SassTypes
{
  class Color : public SassValueWrapper<Color> {
    public:
      Color(Sass_Value*);
      static char const* get_constructor_name() { return "SassColor"; }
      static Sass_Value* construct(const std::vector<v8::Local<v8::Value>>, Sass_Value **);

      static void initPrototype(v8::Local<v8::FunctionTemplate>);

      static NAN_METHOD(GetR);
      static NAN_METHOD(GetG);
      static NAN_METHOD(GetB);
      static NAN_METHOD(GetA);
      static NAN_METHOD(SetR);
      static NAN_METHOD(SetG);
      static NAN_METHOD(SetB);
      static NAN_METHOD(SetA);
  };
}

#endif
