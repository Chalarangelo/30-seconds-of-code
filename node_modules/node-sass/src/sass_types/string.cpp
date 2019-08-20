#include <nan.h>
#include "string.h"
#include "../create_string.h"

namespace SassTypes
{
  String::String(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* String::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    char const* value = "";

    if (raw_val.size() >= 1) {
      if (!raw_val[0]->IsString()) {
        return fail("Argument should be a string.", out);
      }

      value = create_string(raw_val[0]);
         *out = sass_make_string(value);
        delete value;
        return *out;

    } else {
        return *out = sass_make_string(value);
    }

  }

  void String::initPrototype(v8::Local<v8::FunctionTemplate> proto) {
    Nan::SetPrototypeMethod(proto, "getValue", GetValue);
    Nan::SetPrototypeMethod(proto, "setValue", SetValue);
  }

  NAN_METHOD(String::GetValue) {
    info.GetReturnValue().Set(Nan::New<v8::String>(sass_string_get_value(String::Unwrap<String>(info.This())->value)).ToLocalChecked());
  }

  NAN_METHOD(String::SetValue) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsString()) {
      return Nan::ThrowTypeError("Supplied value should be a string");
    }

    sass_string_set_value(String::Unwrap<String>(info.This())->value, create_string(info[0]));
  }
}
