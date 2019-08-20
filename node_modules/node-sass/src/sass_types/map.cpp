#include <nan.h>
#include "map.h"

namespace SassTypes
{
  Map::Map(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* Map::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    size_t length = 0;

    if (raw_val.size() >= 1) {
      if (!raw_val[0]->IsNumber()) {
        return fail("First argument should be an integer.", out);
      }

      length = Nan::To<uint32_t>(raw_val[0]).FromJust();
    }

    return *out = sass_make_map(length);
  }

  void Map::initPrototype(v8::Local<v8::FunctionTemplate> proto) {
    Nan::SetPrototypeMethod(proto, "getLength", GetLength);
    Nan::SetPrototypeMethod(proto, "getKey", GetKey);
    Nan::SetPrototypeMethod(proto, "setKey", SetKey);
    Nan::SetPrototypeMethod(proto, "getValue", GetValue);
    Nan::SetPrototypeMethod(proto, "setValue", SetValue);
  }

  NAN_METHOD(Map::GetValue) {

    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied index should be an integer");
    }

    Sass_Value* map = Map::Unwrap<Map>(info.This())->value;
    size_t index = Nan::To<uint32_t>(info[0]).FromJust();


    if (index >= sass_map_get_length(map)) {
      return Nan::ThrowRangeError(Nan::New("Out of bound index").ToLocalChecked());
    }

    info.GetReturnValue().Set(Factory::create(sass_map_get_value(map, Nan::To<uint32_t>(info[0]).FromJust()))->get_js_object());
  }

  NAN_METHOD(Map::SetValue) {
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
      sass_map_set_value(Map::Unwrap<Map>(info.This())->value, Nan::To<uint32_t>(info[0]).FromJust(), sass_value->get_sass_value());
    } else {
      Nan::ThrowTypeError("A SassValue is expected as a map value");
    }
  }

  NAN_METHOD(Map::GetKey) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied index should be an integer");
    }

    Sass_Value* map = Map::Unwrap<Map>(info.This())->value;
    size_t index = Nan::To<uint32_t>(info[0]).FromJust();


    if (index >= sass_map_get_length(map)) {
      return Nan::ThrowRangeError(Nan::New("Out of bound index").ToLocalChecked());
    }

    SassTypes::Value* obj = Factory::create(sass_map_get_key(map, Nan::To<uint32_t>(info[0]).FromJust()));
    v8::Local<v8::Object> js_obj = obj->get_js_object();
    info.GetReturnValue().Set(js_obj);
  }

  NAN_METHOD(Map::SetKey) {
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
      sass_map_set_key(Map::Unwrap<Map>(info.This())->value, Nan::To<uint32_t>(info[0]).FromJust(), sass_value->get_sass_value());
    } else {
      Nan::ThrowTypeError("A SassValue is expected as a map key");
    }
  }

  NAN_METHOD(Map::GetLength) {
    info.GetReturnValue().Set(Nan::New<v8::Number>(sass_map_get_length(Map::Unwrap<Map>(info.This())->value)));
  }
}
