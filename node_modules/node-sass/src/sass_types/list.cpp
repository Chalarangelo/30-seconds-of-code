#include <nan.h>
#include "list.h"

namespace SassTypes
{
  List::List(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* List::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    size_t length = 0;
    bool comma = true;
    bool is_bracketed = false;

    if (raw_val.size() >= 1) {
      if (!raw_val[0]->IsNumber()) {
        return fail("First argument should be an integer.", out);
      }

      length = Nan::To<uint32_t>(raw_val[0]).FromJust();

      if (raw_val.size() >= 2) {
        if (!raw_val[1]->IsBoolean()) {
          return fail("Second argument should be a boolean.", out);
        }

        comma = Nan::To<bool>(raw_val[1]).FromJust();
      }
    }

    return *out = sass_make_list(length, comma ? SASS_COMMA : SASS_SPACE, is_bracketed);
  }

  void List::initPrototype(v8::Local<v8::FunctionTemplate> proto) {
    Nan::SetPrototypeMethod(proto, "getLength", GetLength);
    Nan::SetPrototypeMethod(proto, "getSeparator", GetSeparator);
    Nan::SetPrototypeMethod(proto, "setSeparator", SetSeparator);
    Nan::SetPrototypeMethod(proto, "getValue", GetValue);
    Nan::SetPrototypeMethod(proto, "setValue", SetValue);
  }

  NAN_METHOD(List::GetValue) {

    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied index should be an integer");
    }

    Sass_Value* list = List::Unwrap<List>(info.This())->value;
    size_t index = Nan::To<uint32_t>(info[0]).FromJust();


    if (index >= sass_list_get_length(list)) {
      return Nan::ThrowRangeError(Nan::New("Out of bound index").ToLocalChecked());
    }

    info.GetReturnValue().Set(Factory::create(sass_list_get_value(list, Nan::To<uint32_t>(info[0]).FromJust()))->get_js_object());
  }

  NAN_METHOD(List::SetValue) {
    if (info.Length() != 2) {
      return Nan::ThrowTypeError("Expected two arguments");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied index should be an integer");
    }

    if (!info[1]->IsObject()) {
      return Nan::ThrowTypeError("Supplied value should be a SassValue object");
    }

    Value* sass_value = Factory::unwrap(info[1]);
    if (sass_value) {
      sass_list_set_value(List::Unwrap<List>(info.This())->value, Nan::To<uint32_t>(info[0]).FromJust(), sass_value->get_sass_value());
    } else {
      Nan::ThrowTypeError("A SassValue is expected as the list item");
    }
  }

  NAN_METHOD(List::GetSeparator) {
    info.GetReturnValue().Set(sass_list_get_separator(List::Unwrap<List>(info.This())->value) == SASS_COMMA);
  }

  NAN_METHOD(List::SetSeparator) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsBoolean()) {
      return Nan::ThrowTypeError("Supplied value should be a boolean");
    }

    sass_list_set_separator(List::Unwrap<List>(info.This())->value, Nan::To<bool>(info[0]).FromJust() ? SASS_COMMA : SASS_SPACE);
  }

  NAN_METHOD(List::GetLength) {
    info.GetReturnValue().Set(Nan::New<v8::Number>(sass_list_get_length(List::Unwrap<List>(info.This())->value)));
  }
}
