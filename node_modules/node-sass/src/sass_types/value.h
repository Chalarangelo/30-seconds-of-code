#ifndef SASS_TYPES_VALUE_H
#define SASS_TYPES_VALUE_H

#include <nan.h>
#include <sass/values.h>

namespace SassTypes
{
  // This is the interface that all sass values must comply with
  class Value : public Nan::ObjectWrap {

    public:
      virtual v8::Local<v8::Object> get_js_object() =0;

      Value() {

      }

      Sass_Value* get_sass_value() {
        return sass_clone_value(this->value);
      }

    protected:

      Sass_Value* value;

      Value(Sass_Value* v) {
        this->value = sass_clone_value(v);
      }

      ~Value() {
        sass_delete_value(this->value);
      }

      static Sass_Value* fail(const char *reason, Sass_Value **out) {
        *out = sass_make_error(reason);
        return NULL;
      }
  };
}

#endif
