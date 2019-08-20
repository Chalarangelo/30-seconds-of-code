#include <nan.h>
#include "color.h"

namespace SassTypes
{
  Color::Color(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* Color::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    double a = 1.0, r = 0, g = 0, b = 0;
    unsigned argb;

    switch (raw_val.size()) {
    case 1:
      if (!raw_val[0]->IsNumber()) {
        return fail("Only argument should be an integer.", out);
      }

      argb = Nan::To<int32_t>(raw_val[0]).FromJust();
      a = (double)((argb >> 030) & 0xff) / 0xff;
      r = (double)((argb >> 020) & 0xff);
      g = (double)((argb >> 010) & 0xff);
      b = (double)(argb & 0xff);
      break;

    case 4:
      if (!raw_val[3]->IsNumber()) {
        return fail("Constructor arguments should be numbers exclusively.", out);
      }

      a = Nan::To<double>(raw_val[3]).FromJust();
      NODE_SASS_FALLTHROUGH;

    case 3:
      if (!raw_val[0]->IsNumber() || !raw_val[1]->IsNumber() || !raw_val[2]->IsNumber()) {
        return fail("Constructor arguments should be numbers exclusively.", out);
      }

      r = Nan::To<double>(raw_val[0]).FromJust();
      g = Nan::To<double>(raw_val[1]).FromJust();
      b = Nan::To<double>(raw_val[2]).FromJust();
      break;

    case 0:
      break;

    default:
      return fail("Constructor should be invoked with either 0, 1, 3 or 4 arguments.", out);
    }

    return *out = sass_make_color(r, g, b, a);
  }

  void Color::initPrototype(v8::Local<v8::FunctionTemplate> proto) {
    Nan::SetPrototypeMethod(proto, "getR", GetR);
    Nan::SetPrototypeMethod(proto, "getG", GetG);
    Nan::SetPrototypeMethod(proto, "getB", GetB);
    Nan::SetPrototypeMethod(proto, "getA", GetA);
    Nan::SetPrototypeMethod(proto, "setR", SetR);
    Nan::SetPrototypeMethod(proto, "setG", SetG);
    Nan::SetPrototypeMethod(proto, "setB", SetB);
    Nan::SetPrototypeMethod(proto, "setA", SetA);
  }

  NAN_METHOD(Color::GetR) {
    info.GetReturnValue().Set(sass_color_get_r(Color::Unwrap<Color>(info.This())->value));
  }

  NAN_METHOD(Color::GetG) {
    info.GetReturnValue().Set(sass_color_get_g(Color::Unwrap<Color>(info.This())->value));
  }

  NAN_METHOD(Color::GetB) {
    info.GetReturnValue().Set(sass_color_get_b(Color::Unwrap<Color>(info.This())->value));
  }

  NAN_METHOD(Color::GetA) {
    info.GetReturnValue().Set(sass_color_get_a(Color::Unwrap<Color>(info.This())->value));
  }

  NAN_METHOD(Color::SetR) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied value should be a number");
    }

    sass_color_set_r(Color::Unwrap<Color>(info.This())->value, Nan::To<double>(info[0]).FromJust());
  }

  NAN_METHOD(Color::SetG) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied value should be a number");
    }

    sass_color_set_g(Color::Unwrap<Color>(info.This())->value, Nan::To<double>(info[0]).FromJust());
  }

  NAN_METHOD(Color::SetB) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied value should be a number");
    }

    sass_color_set_b(Color::Unwrap<Color>(info.This())->value, Nan::To<double>(info[0]).FromJust());
  }

  NAN_METHOD(Color::SetA) {
    if (info.Length() != 1) {
      return Nan::ThrowTypeError("Expected just one argument");
    }

    if (!info[0]->IsNumber()) {
      return Nan::ThrowTypeError("Supplied value should be a number");
    }

    sass_color_set_a(Color::Unwrap<Color>(info.This())->value, Nan::To<double>(info[0]).FromJust());
  }
}
