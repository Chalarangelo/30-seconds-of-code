#include <nan.h>
#include "null.h"

namespace SassTypes
{
  Nan::Persistent<v8::Function> Null::constructor;
  bool Null::constructor_locked = false;

  Null::Null() {
      value = sass_make_null();
  }

  Null& Null::get_singleton() {
    static Null singleton_instance;
    return singleton_instance;
  }

  v8::Local<v8::Function> Null::get_constructor() {
    Nan::EscapableHandleScope scope;
    v8::Local<v8::Function> conslocal;
    if (constructor.IsEmpty()) {
      v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);

      tpl->SetClassName(Nan::New("SassNull").ToLocalChecked());
      tpl->InstanceTemplate()->SetInternalFieldCount(1);

      conslocal = Nan::GetFunction(tpl).ToLocalChecked();
      constructor.Reset(conslocal);

      get_singleton().js_object.Reset(Nan::NewInstance(conslocal).ToLocalChecked());
      Nan::SetInternalFieldPointer(Nan::New(get_singleton().js_object), 0, &get_singleton());
      Nan::Set(conslocal, Nan::New("NULL").ToLocalChecked(), Nan::New(get_singleton().js_object));

      constructor_locked = true;
    } else {
      conslocal = Nan::New(constructor);
    }

    return scope.Escape(conslocal);
  }

  v8::Local<v8::Object> Null::get_js_object() {
    return Nan::New(this->js_object);
  }

  NAN_METHOD(Null::New) {

    if (info.IsConstructCall()) {
      if (constructor_locked) {
        return Nan::ThrowTypeError("Cannot instantiate SassNull");
      }
    }
    else {
      info.GetReturnValue().Set(get_singleton().get_js_object());
    }
  }
}
