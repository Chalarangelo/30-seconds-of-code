#include <nan.h>
#include <vector>
#include "sass_context_wrapper.h"
#include "custom_function_bridge.h"
#include "create_string.h"
#include "sass_types/factory.h"

Sass_Import_List sass_importer(const char* cur_path, Sass_Importer_Entry cb, struct Sass_Compiler* comp)
{
  void* cookie = sass_importer_get_cookie(cb);
  struct Sass_Import* previous = sass_compiler_get_last_import(comp);
  const char* prev_path = sass_import_get_abs_path(previous);
  CustomImporterBridge& bridge = *(static_cast<CustomImporterBridge*>(cookie));

  std::vector<void*> argv;
  argv.push_back((void*)cur_path);
  argv.push_back((void*)prev_path);

  return bridge(argv);
}

union Sass_Value* sass_custom_function(const union Sass_Value* s_args, Sass_Function_Entry cb, struct Sass_Compiler* comp)
{
  void* cookie = sass_function_get_cookie(cb);
  CustomFunctionBridge& bridge = *(static_cast<CustomFunctionBridge*>(cookie));

  std::vector<void*> argv;
  for (unsigned l = sass_list_get_length(s_args), i = 0; i < l; i++) {
    argv.push_back((void*)sass_list_get_value(s_args, i));
  }

  return bridge(argv);
}

int ExtractOptions(v8::Local<v8::Object> options, void* cptr, sass_context_wrapper* ctx_w, bool is_file, bool is_sync) {
  Nan::HandleScope scope;

  struct Sass_Context* ctx;

  v8::Local<v8::Value> result_ = Nan::Get(
    options,
    Nan::New("result").ToLocalChecked()
  ).ToLocalChecked();
  if (!result_->IsObject()) {
    Nan::ThrowTypeError("\"result\" element is not an object");
    return -1;
  }

  ctx_w->result.Reset(result_.As<v8::Object>());

  if (is_file) {
    ctx_w->fctx = (struct Sass_File_Context*) cptr;
    ctx = sass_file_context_get_context(ctx_w->fctx);
  }
  else {
    ctx_w->dctx = (struct Sass_Data_Context*) cptr;
    ctx = sass_data_context_get_context(ctx_w->dctx);
  }

  struct Sass_Options* sass_options = sass_context_get_options(ctx);

  ctx_w->is_sync = is_sync;

  if (!is_sync) {
    ctx_w->request.data = ctx_w;

    // async (callback) style
    v8::Local<v8::Function> success_callback = v8::Local<v8::Function>::Cast(Nan::Get(options, Nan::New("success").ToLocalChecked()).ToLocalChecked());
    v8::Local<v8::Function> error_callback = v8::Local<v8::Function>::Cast(Nan::Get(options, Nan::New("error").ToLocalChecked()).ToLocalChecked());

    ctx_w->success_callback = new Nan::Callback(success_callback);
    ctx_w->error_callback = new Nan::Callback(error_callback);
  }

  if (!is_file) {
    ctx_w->file = create_string(Nan::Get(options, Nan::New("file").ToLocalChecked()));
    sass_option_set_input_path(sass_options, ctx_w->file);
  }

  int indent_len = Nan::To<int32_t>(
    Nan::Get(
        options,
        Nan::New("indentWidth").ToLocalChecked()
    ).ToLocalChecked()).FromJust();

  ctx_w->indent = (char*)malloc(indent_len + 1);

  strcpy(ctx_w->indent, std::string(
    indent_len,
    Nan::To<int32_t>(
        Nan::Get(
            options,
            Nan::New("indentType").ToLocalChecked()
        ).ToLocalChecked()).FromJust() == 1 ? '\t' : ' '
    ).c_str());

  ctx_w->linefeed = create_string(Nan::Get(options, Nan::New("linefeed").ToLocalChecked()));
  ctx_w->include_path = create_string(Nan::Get(options, Nan::New("includePaths").ToLocalChecked()));
  ctx_w->out_file = create_string(Nan::Get(options, Nan::New("outFile").ToLocalChecked()));
  ctx_w->source_map = create_string(Nan::Get(options, Nan::New("sourceMap").ToLocalChecked()));
  ctx_w->source_map_root = create_string(Nan::Get(options, Nan::New("sourceMapRoot").ToLocalChecked()));

  sass_option_set_output_path(sass_options, ctx_w->out_file);
  sass_option_set_output_style(sass_options, (Sass_Output_Style)Nan::To<int32_t>(Nan::Get(options, Nan::New("style").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_is_indented_syntax_src(sass_options, Nan::To<bool>(Nan::Get(options, Nan::New("indentedSyntax").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_source_comments(sass_options, Nan::To<bool>(Nan::Get(options, Nan::New("sourceComments").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_omit_source_map_url(sass_options, Nan::To<bool>(Nan::Get(options, Nan::New("omitSourceMapUrl").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_source_map_embed(sass_options, Nan::To<bool>(Nan::Get(options, Nan::New("sourceMapEmbed").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_source_map_contents(sass_options, Nan::To<bool>(Nan::Get(options, Nan::New("sourceMapContents").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_source_map_file(sass_options, ctx_w->source_map);
  sass_option_set_source_map_root(sass_options, ctx_w->source_map_root);
  sass_option_set_include_path(sass_options, ctx_w->include_path);
  sass_option_set_precision(sass_options, Nan::To<int32_t>(Nan::Get(options, Nan::New("precision").ToLocalChecked()).ToLocalChecked()).FromJust());
  sass_option_set_indent(sass_options, ctx_w->indent);
  sass_option_set_linefeed(sass_options, ctx_w->linefeed);

  v8::Local<v8::Value> importer_callback = Nan::Get(options, Nan::New("importer").ToLocalChecked()).ToLocalChecked();

  if (importer_callback->IsFunction()) {
    v8::Local<v8::Function> importer = importer_callback.As<v8::Function>();

    CustomImporterBridge *bridge = new CustomImporterBridge(importer, ctx_w->is_sync);
    ctx_w->importer_bridges.push_back(bridge);

    Sass_Importer_List c_importers = sass_make_importer_list(1);
    c_importers[0] = sass_make_importer(sass_importer, 0, bridge);

    sass_option_set_c_importers(sass_options, c_importers);
  }
  else if (importer_callback->IsArray()) {
    v8::Local<v8::Array> importers = importer_callback.As<v8::Array>();
    Sass_Importer_List c_importers = sass_make_importer_list(importers->Length());

    for (size_t i = 0; i < importers->Length(); ++i) {
      v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(Nan::Get(importers, static_cast<uint32_t>(i)).ToLocalChecked());

      CustomImporterBridge *bridge = new CustomImporterBridge(callback, ctx_w->is_sync);
      ctx_w->importer_bridges.push_back(bridge);

      c_importers[i] = sass_make_importer(sass_importer, importers->Length() - i - 1, bridge);
    }

    sass_option_set_c_importers(sass_options, c_importers);
  }

  v8::Local<v8::Value> custom_functions = Nan::Get(options, Nan::New("functions").ToLocalChecked()).ToLocalChecked();

  if (custom_functions->IsObject()) {
    v8::Local<v8::Object> functions = custom_functions.As<v8::Object>();
    v8::Local<v8::Array> signatures = Nan::GetOwnPropertyNames(functions).ToLocalChecked();
    unsigned num_signatures = signatures->Length();
    Sass_Function_List fn_list = sass_make_function_list(num_signatures);

    for (unsigned i = 0; i < num_signatures; i++) {
      v8::Local<v8::String> signature = v8::Local<v8::String>::Cast(Nan::Get(signatures, Nan::New(i)).ToLocalChecked());
      v8::Local<v8::Function> callback = v8::Local<v8::Function>::Cast(Nan::Get(functions, signature).ToLocalChecked());

      CustomFunctionBridge *bridge = new CustomFunctionBridge(callback, ctx_w->is_sync);
      ctx_w->function_bridges.push_back(bridge);

      char* sig = create_string(signature);
      Sass_Function_Entry fn = sass_make_function(sig, sass_custom_function, bridge);
      free(sig);
      sass_function_set_list_entry(fn_list, i, fn);
    }

    sass_option_set_c_functions(sass_options, fn_list);
  }
  return 0;
}

void GetStats(sass_context_wrapper* ctx_w, Sass_Context* ctx) {
  Nan::HandleScope scope;

  char** included_files = sass_context_get_included_files(ctx);
  v8::Local<v8::Array> arr = Nan::New<v8::Array>();

  if (included_files) {
    for (int i = 0; included_files[i] != nullptr; ++i) {
      Nan::Set(arr, i, Nan::New<v8::String>(included_files[i]).ToLocalChecked());
    }
  }

  v8::Local<v8::Object> result = Nan::New(ctx_w->result);
  assert(result->IsObject());

  v8::Local<v8::Value> stats = Nan::Get(
    result,
    Nan::New("stats").ToLocalChecked()
  ).ToLocalChecked();
  if (stats->IsObject()) {
    Nan::Set(
      stats.As<v8::Object>(),
      Nan::New("includedFiles").ToLocalChecked(),
      arr
    );
  } else {
    Nan::ThrowTypeError("\"result.stats\" element is not an object");
  }
}

int GetResult(sass_context_wrapper* ctx_w, Sass_Context* ctx, bool is_sync = false) {
  Nan::HandleScope scope;
  v8::Local<v8::Object> result;

  int status = sass_context_get_error_status(ctx);

  result = Nan::New(ctx_w->result);
  assert(result->IsObject());

  if (status == 0) {
    const char* css = sass_context_get_output_string(ctx);
    const char* map = sass_context_get_source_map_string(ctx);

    Nan::Set(result, Nan::New("css").ToLocalChecked(), Nan::CopyBuffer(css, static_cast<uint32_t>(strlen(css))).ToLocalChecked());

    GetStats(ctx_w, ctx);

    if (map) {
      Nan::Set(result, Nan::New("map").ToLocalChecked(), Nan::CopyBuffer(map, static_cast<uint32_t>(strlen(map))).ToLocalChecked());
    }
  }
  else if (is_sync) {
    Nan::Set(result, Nan::New("error").ToLocalChecked(), Nan::New<v8::String>(sass_context_get_error_json(ctx)).ToLocalChecked());
  }

  return status;
}

void PerformCall(sass_context_wrapper* ctx_w, Nan::Callback* callback, int argc, v8::Local<v8::Value> argv[]) {
  if (ctx_w->is_sync) {
    Nan::Call(*callback, argc, argv);
  } else {
    callback->Call(argc, argv, ctx_w->async_resource);
  }
}

void MakeCallback(uv_work_t* req) {
  Nan::HandleScope scope;

  Nan::TryCatch try_catch;
  sass_context_wrapper* ctx_w = static_cast<sass_context_wrapper*>(req->data);
  struct Sass_Context* ctx;

  if (ctx_w->dctx) {
    ctx = sass_data_context_get_context(ctx_w->dctx);
  }
  else {
    ctx = sass_file_context_get_context(ctx_w->fctx);
  }

  int status = GetResult(ctx_w, ctx);

  if (status == 0 && ctx_w->success_callback) {
    // if no error, do callback(null, result)
    PerformCall(ctx_w, ctx_w->success_callback, 0, 0);
  }
  else if (ctx_w->error_callback) {
    // if error, do callback(error)
    const char* err = sass_context_get_error_json(ctx);
    v8::Local<v8::Value> argv[] = {
      Nan::New<v8::String>(err).ToLocalChecked()
    };
    PerformCall(ctx_w, ctx_w->error_callback, 1, argv);
  }
  if (try_catch.HasCaught()) {
    Nan::FatalException(try_catch);
  }

  sass_free_context_wrapper(ctx_w);
}

NAN_METHOD(render) {

  v8::Local<v8::Object> options = Nan::To<v8::Object>(info[0]).ToLocalChecked();
  char* source_string = create_string(Nan::Get(options, Nan::New("data").ToLocalChecked()));
  struct Sass_Data_Context* dctx = sass_make_data_context(source_string);
  sass_context_wrapper* ctx_w = sass_make_context_wrapper();

  ctx_w->async_resource = new Nan::AsyncResource("node-sass:sass_context_wrapper:render");

  if (ExtractOptions(options, dctx, ctx_w, false, false) >= 0) {

    int status = uv_queue_work(uv_default_loop(), &ctx_w->request, compile_it, (uv_after_work_cb)MakeCallback);

    assert(status == 0);
  }
}

NAN_METHOD(render_sync) {

  v8::Local<v8::Object> options = Nan::To<v8::Object>(info[0]).ToLocalChecked();
  char* source_string = create_string(Nan::Get(options, Nan::New("data").ToLocalChecked()));
  struct Sass_Data_Context* dctx = sass_make_data_context(source_string);
  struct Sass_Context* ctx = sass_data_context_get_context(dctx);
  sass_context_wrapper* ctx_w = sass_make_context_wrapper();
  int result = -1;

  if ((result = ExtractOptions(options, dctx, ctx_w, false, true)) >= 0) {
    compile_data(dctx);
    result = GetResult(ctx_w, ctx, true);
  }

  sass_free_context_wrapper(ctx_w);

  info.GetReturnValue().Set(result == 0);
}

NAN_METHOD(render_file) {

  v8::Local<v8::Object> options = Nan::To<v8::Object>(info[0]).ToLocalChecked();
  char* input_path = create_string(Nan::Get(options, Nan::New("file").ToLocalChecked()));
  struct Sass_File_Context* fctx = sass_make_file_context(input_path);
  sass_context_wrapper* ctx_w = sass_make_context_wrapper();

  ctx_w->async_resource = new Nan::AsyncResource("node-sass:sass_context_wrapper:render_file");

  if (ExtractOptions(options, fctx, ctx_w, true, false) >= 0) {

    int status = uv_queue_work(uv_default_loop(), &ctx_w->request, compile_it, (uv_after_work_cb)MakeCallback);
    assert(status == 0);
  }
}

NAN_METHOD(render_file_sync) {

  v8::Local<v8::Object> options = Nan::To<v8::Object>(info[0]).ToLocalChecked();
  char* input_path = create_string(Nan::Get(options, Nan::New("file").ToLocalChecked()));
  struct Sass_File_Context* fctx = sass_make_file_context(input_path);
  struct Sass_Context* ctx = sass_file_context_get_context(fctx);
  sass_context_wrapper* ctx_w = sass_make_context_wrapper();
  int result = -1;

  if ((result = ExtractOptions(options, fctx, ctx_w, true, true)) >= 0) {
    compile_file(fctx);
    result = GetResult(ctx_w, ctx, true);
  };

  free(input_path);
  sass_free_context_wrapper(ctx_w);

  info.GetReturnValue().Set(result == 0);
}

NAN_METHOD(libsass_version) {
  info.GetReturnValue().Set(Nan::New<v8::String>(libsass_version()).ToLocalChecked());
}

NAN_MODULE_INIT(RegisterModule) {
  Nan::SetMethod(target, "render", render);
  Nan::SetMethod(target, "renderSync", render_sync);
  Nan::SetMethod(target, "renderFile", render_file);
  Nan::SetMethod(target, "renderFileSync", render_file_sync);
  Nan::SetMethod(target, "libsassVersion", libsass_version);
  SassTypes::Factory::initExports(target);
}

NODE_MODULE(binding, RegisterModule);
