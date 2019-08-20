#ifndef CUSTOM_IMPORTER_BRIDGE_H
#define CUSTOM_IMPORTER_BRIDGE_H

#include <nan.h>
#include <sass/functions.h>
#include <sass/values.h>
#include "callback_bridge.h"

typedef Sass_Import_List SassImportList;

class CustomImporterBridge : public CallbackBridge<SassImportList> {
  public:
    CustomImporterBridge(v8::Local<v8::Function> cb, bool is_sync) : CallbackBridge<SassImportList>(cb, is_sync) {}

  private:
    SassImportList post_process_return_value(v8::Local<v8::Value>) const;
    Sass_Import* check_returned_string(Nan::MaybeLocal<v8::Value> value, const char *msg) const;
    Sass_Import* get_importer_entry(const v8::Local<v8::Object>&) const;
    std::vector<v8::Local<v8::Value>> pre_process_args(std::vector<void*>) const;
};

#endif
