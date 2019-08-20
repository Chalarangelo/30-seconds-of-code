#include <nan.h>
#include "boolean.h"

namespace SassTypes
{
  Nan::Persistent<v8::Function> Boolean::constructor;
  bool Boolean::constructor_locked = false;

  Boolean::Boolean(bool _value) {
    value = sass_make_boolean(_value);
  }

  Boolean& Boolean::get_singleton(bool v) {
    static Boolean instance_false(false), instance_true(true);
    return v ? instance_true : instance_false;
  }

  v8::Local<v8::Function> Boolean::get_constructor() {
    Nan::EscapableHandleScope scope;
    v8::Local<v8::Function> conslocal;
    if (constructor.IsEmpty()) {
      v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);

      tpl->SetClassName(Nan::New("SassBoolean").ToLocalChecked());
      tpl->InstanceTemplate()->SetInternalFieldCount(1);
      Nan::SetPrototypeTemplate(tpl, "getValue", Nan::New<v8::FunctionTemplate>(GetValue));

      conslocal = Nan::GetFunction(tpl).ToLocalChecked();
      constructor.Reset(conslocal);

      get_singleton(false).js_object.Reset(Nan::NewInstance(conslocal).ToLocalChecked());
      Nan::SetInternalFieldPointer(Nan::New(get_singleton(false).js_object), 0, &get_singleton(false));
      Nan::Set(conslocal, Nan::New("FALSE").ToLocalChecked(), Nan::New(get_singleton(false).js_object));

      get_singleton(true).js_object.Reset(Nan::NewInstance(conslocal).ToLocalChecked());
      Nan::SetInternalFieldPointer(Nan::New(get_singleton(true).js_object), 0, &get_singleton(true));
      Nan::Set(conslocal, Nan::New("TRUE").ToLocalChecked(), Nan::New(get_singleton(true).js_object));

      constructor_locked = true;
    } else {
      conslocal = Nan::New(constructor);
    }

    return scope.Escape(conslocal);
  }

  v8::Local<v8::Object> Boolean::get_js_object() {
    return Nan::New(this->js_object);
  }

  v8::Local<v8::Boolean> Boolean::get_js_boolean() {
    return sass_boolean_get_value(this->value) ? Nan::True() : Nan::False();
  }

  NAN_METHOD(Boolean::New) {
    if (info.IsConstructCall()) {
      if (constructor_locked) {
        return Nan::ThrowTypeError("Cannot instantiate SassBoolean");
      }
    }
    else {
      if (info.Length() != 1 || !info[0]->IsBoolean()) {
        return Nan::ThrowTypeError("Expected one boolean argument");
      }

      info.GetReturnValue().Set(get_singleton(Nan::To<bool>(info[0]).FromJust()).get_js_object());
    }
  }

  NAN_METHOD(Boolean::GetValue) {
    info.GetReturnValue().Set(Boolean::Unwrap<Boolean>(info.This())->get_js_boolean());
  }
}
