#include <nan.h>
#include <stdexcept>
#include "custom_function_bridge.h"
#include "sass_types/factory.h"
#include "sass_types/value.h"

Sass_Value* CustomFunctionBridge::post_process_return_value(v8::Local<v8::Value> _val) const {
  SassTypes::Value *value = SassTypes::Factory::unwrap(_val);
  if (value) {
    return value->get_sass_value();
  } else {
    return sass_make_error("A SassValue object was expected.");
  }
}

std::vector<v8::Local<v8::Value>> CustomFunctionBridge::pre_process_args(std::vector<void*> in) const {
  std::vector<v8::Local<v8::Value>> argv = std::vector<v8::Local<v8::Value>>();

  for (void* value : in) {
    Sass_Value* x = static_cast<Sass_Value*>(value);
    SassTypes::Value* y = SassTypes::Factory::create(x);

    argv.push_back(y->get_js_object());
  }

  return argv;
}
