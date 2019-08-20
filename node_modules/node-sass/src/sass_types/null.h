#ifndef SASS_TYPES_NULL_H
#define SASS_TYPES_NULL_H

#include <nan.h>
#include "value.h"

namespace SassTypes
{
  class Null : public SassTypes::Value {
    public:
      static Null& get_singleton();
      static v8::Local<v8::Function> get_constructor();

      Sass_Value* get_sass_value();
      v8::Local<v8::Object> get_js_object();

      static NAN_METHOD(New);

    private:
      Null();

      Nan::Persistent<v8::Object> js_object;

      static Nan::Persistent<v8::Function> constructor;
      static bool constructor_locked;
  };
}

#endif
