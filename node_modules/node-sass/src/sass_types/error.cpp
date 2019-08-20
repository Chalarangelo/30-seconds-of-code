#include <nan.h>
#include "error.h"
#include "../create_string.h"

namespace SassTypes
{
  Error::Error(Sass_Value* v) : SassValueWrapper(v) {}

  Sass_Value* Error::construct(const std::vector<v8::Local<v8::Value>> raw_val, Sass_Value **out) {
    char const* value = "";

    if (raw_val.size() >= 1) {
      if (!raw_val[0]->IsString()) {
        return fail("Argument should be a string.", out);
      }

      value = create_string(raw_val[0]);
    }

    return *out = sass_make_error(value);
  }

  void Error::initPrototype(v8::Local<v8::FunctionTemplate>) {}
}
