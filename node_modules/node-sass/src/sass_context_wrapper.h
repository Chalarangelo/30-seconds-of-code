#ifndef SASS_CONTEXT_WRAPPER
#define SASS_CONTEXT_WRAPPER

#include <vector>
#include <memory>
#include <nan.h>
#include <stdlib.h>
#include <sass/context.h>
#include "custom_function_bridge.h"
#include "custom_importer_bridge.h"

#ifdef __cplusplus
extern "C" {
#endif

  void compile_data(struct Sass_Data_Context* dctx);
  void compile_file(struct Sass_File_Context* fctx);
  void compile_it(uv_work_t* req);

  struct sass_context_wrapper {
    // binding related
    bool is_sync;
    void* cookie;
    char* file;
    char* include_path;
    char* out_file;
    char* source_map;
    char* source_map_root;
    char* linefeed;
    char* indent;

    // libsass related
    Sass_Data_Context* dctx;
    Sass_File_Context* fctx;

    // libuv related
    uv_async_t async;
    uv_work_t request;

    // v8 and nan related
    Nan::Persistent<v8::Object> result;
    Nan::AsyncResource* async_resource;
    Nan::Callback* error_callback;
    Nan::Callback* success_callback;

    std::vector<CustomFunctionBridge *> function_bridges;
    std::vector<CustomImporterBridge *> importer_bridges;
  };

  struct sass_context_wrapper*      sass_make_context_wrapper(void);
  void sass_free_context_wrapper(struct sass_context_wrapper*);

#ifdef __cplusplus
}
#endif

#endif
