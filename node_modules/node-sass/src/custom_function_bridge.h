#ifndef CUSTOM_FUNCTION_BRIDGE_H
#define CUSTOM_FUNCTION_BRIDGE_H

#include <nan.h>
#include <sass/values.h>
#include <sass/functions.h>
#include "callback_bridge.h"

class CustomFunctionBridge : public CallbackBridge<Sass_Value*> {
  public:
    CustomFunctionBridge(v8::Local<v8::Function> cb, bool is_sync) : CallbackBridge<Sass_Value*>(cb, is_sync) {}

  private:
    Sass_Value* post_process_return_value(v8::Local<v8::Value>) const;
    std::vector<v8::Local<v8::Value>> pre_process_args(std::vector<void*>) const;
};

#endif
