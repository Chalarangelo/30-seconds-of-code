#include <nan.h>
#include "number.h"
#include "../create_string.h"

namespace SassTypes
{
  Number::Number(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* Number::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    double value = 0;
    char const* unit = "";

    if (raw_val.size() >= 1) {
      if (!raw_val[0]->IsNumber()) {
        return fail("First argument should be a number.", out);
      }

      value = Nan::To<double>(raw_val[0]).FromJust();

      if (raw_val.size() >= 2) {
        if (!raw_val[1]->IsString()) {
          return fail("Second argument should be a string.", out);
        }

        unit = create_string(raw_val[1]);
        *out = sass_make_number(value, unit);
        delete unit;
        return *out;

      }
    }

    return *out = sass_make_number(value, unit);
  }

  void Number::initPrototype(v8::Local<v8::FunctionTemplate> proto) {
    Nan::SetPrototypeMethod(proto, "getValue", GetValue);
    Nan::SetPrototypeMethod(proto, "getUnit", GetUnit);
    Nan::SetPrototypeMethod(proto, "setValue", SetValue);
    Nan::SetPrototypeMethod(proto, "setUnit", SetUnit);
  }

  NAN_METHOD(Number::GetValue) {
    info.GetReturnValue().Set(Nan::New<v8::Number>(sass_number_get_value(Number::Unwrap<Number>(info.This())->value)));
  }

  NAN_METHOD(Number::GetUnit) {
    info.GetReturnValue().Set(Nan::New<v8::String>(sass_number_get_unit(Number::Unwrap<Number>(info.This())->value)).ToLocalChecked());
  }

  NAN_METHOD(Number::SetValue) {

    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied value should be a number");
    }

    sass_number_set_value(Number::Unwrap<Number>(info.This())->value, Nan::To<double>(info[0]).FromJust());
  }

  NAN_METHOD(Number::SetUnit) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsString()) {
      return Nan::ThrowTypeError("Supplied value should be a string");
    }

    sass_number_set_unit(Number::Unwrap<Number>(info.This())->value, create_string(info[0]));
  }
}
