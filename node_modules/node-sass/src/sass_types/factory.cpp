#include <nan.h>
#include "factory.h"
#include "value.h"
#include "number.h"
#include "string.h"
#include "color.h"
#include "boolean.h"
#include "list.h"
#include "map.h"
#include "null.h"
#include "error.h"

namespace SassTypes
{
  SassTypes::Value* Factory::create(Sass_Value* v) {
    switch (sass_value_get_tag(v)) {
    case SASS_NUMBER:
      return new Number(v);

    case SASS_STRING:
      return new String(v);

    case SASS_COLOR:
      return new Color(v);

    case SASS_BOOLEAN:
      return &Boolean::get_singleton(sass_boolean_get_value(v));

    case SASS_LIST:
      return new List(v);

    case SASS_MAP:
      return new Map(v);

    case SASS_NULL:
      return &Null::get_singleton();

    case SASS_ERROR:
      return new Error(v);

    default:
      const char *msg = "Unknown type encountered.";
      Nan::ThrowTypeError(msg);
      return new Error(sass_make_error(msg));
    }
  }

  NAN_MODULE_INIT(Factory::initExports) {
    Nan::HandleScope scope;
    v8::Local<v8::Object> types = Nan::New<v8::Object>();

    Nan::Set(types, Nan::New("Number").ToLocalChecked(), Number::get_constructor());
    Nan::Set(types, Nan::New("String").ToLocalChecked(), String::get_constructor());
    Nan::Set(types, Nan::New("Color").ToLocalChecked(), Color::get_constructor());
    Nan::Set(types, Nan::New("Boolean").ToLocalChecked(), Boolean::get_constructor());
    Nan::Set(types, Nan::New("List").ToLocalChecked(), List::get_constructor());
    Nan::Set(types, Nan::New("Map").ToLocalChecked(), Map::get_constructor());
    Nan::Set(types, Nan::New("Null").ToLocalChecked(), Null::get_constructor());
    Nan::Set(types, Nan::New("Error").ToLocalChecked(), Error::get_constructor());
    Nan::Set(target, Nan::New<v8::String>("types").ToLocalChecked(), types);
  }

  Value* Factory::unwrap(v8::Local<v8::Value> obj) {
      if (obj->IsObject()) {
          v8::Local<v8::Object> v8_obj = obj.As<v8::Object>();
          if (v8_obj->InternalFieldCount() == 1) {
              return SassTypes::Value::Unwrap<Value>(v8_obj);
          }
      }
      return NULL;
  }
}
