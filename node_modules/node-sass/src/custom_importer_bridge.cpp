#include <nan.h>
#include <stdexcept>
#include "custom_importer_bridge.h"
#include "create_string.h"

SassImportList CustomImporterBridge::post_process_return_value(v8::Local<v8::Value> returned_value) const {
  SassImportList imports = 0;
  Nan::HandleScope scope;

  if (returned_value->IsArray()) {
    v8::Local<v8::Array> array = returned_value.As<v8::Array>();

    imports = sass_make_import_list(array->Length());

    for (size_t i = 0; i < array->Length(); ++i) {
      v8::Local<v8::Value> value = Nan::Get(array, static_cast<uint32_t>(i)).ToLocalChecked();

      if (!value->IsObject()) {
        auto entry = sass_make_import_entry(0, 0, 0);
        sass_import_set_error(entry, "returned array must only contain object literals", -1, -1);
        continue;
      }

      v8::Local<v8::Object> object = value.As<v8::Object>();

      if (value->IsNativeError()) {
        char* message = create_string(Nan::Get(object, Nan::New<v8::String>("message").ToLocalChecked()));

        imports[i] = sass_make_import_entry(0, 0, 0);

        sass_import_set_error(imports[i], message, -1, -1);
        free(message);
      }
      else {
        imports[i] = get_importer_entry(object);
      }
    }
  }
  else if (returned_value->IsNativeError()) {
    imports = sass_make_import_list(1);
    v8::Local<v8::Object> object = returned_value.As<v8::Object>();
    char* message = create_string(Nan::Get(object, Nan::New<v8::String>("message").ToLocalChecked()));

    imports[0] = sass_make_import_entry(0, 0, 0);

    sass_import_set_error(imports[0], message, -1, -1);
    free(message);
  }
  else if (returned_value->IsObject()) {
    imports = sass_make_import_list(1);
    imports[0] = get_importer_entry(returned_value.As<v8::Object>());
  }

  return imports;
}

Sass_Import* CustomImporterBridge::check_returned_string(Nan::MaybeLocal<v8::Value> value, const char *msg) const
{
    v8::Local<v8::Value> checked;
    if (value.ToLocal(&checked)) {
      if (!checked->IsUndefined() && !checked->IsString()) {
        goto err;
      } else {
        return nullptr;
      }
    }
err:
    auto entry = sass_make_import_entry(0, 0, 0);
    sass_import_set_error(entry, msg, -1, -1);
    return entry;
}

Sass_Import* CustomImporterBridge::get_importer_entry(const v8::Local<v8::Object>& object) const {
  auto returned_file = Nan::Get(object, Nan::New<v8::String>("file").ToLocalChecked());
  auto returned_contents = Nan::Get(object, Nan::New<v8::String>("contents").ToLocalChecked()).ToLocalChecked();
  auto returned_map = Nan::Get(object, Nan::New<v8::String>("map").ToLocalChecked());
  Sass_Import *err;

  if ((err = check_returned_string(returned_file, "returned value of `file` must be a string")))
    return err;

  if ((err = check_returned_string(returned_contents, "returned value of `contents` must be a string")))
    return err;

  if ((err = check_returned_string(returned_map, "returned value of `returned_map` must be a string")))
    return err;

  char* path = create_string(returned_file);
  char* contents = create_string(returned_contents);
  char* srcmap = create_string(returned_map);

  return sass_make_import_entry(path, contents, srcmap);
}

std::vector<v8::Local<v8::Value>> CustomImporterBridge::pre_process_args(std::vector<void*> in) const {
  std::vector<v8::Local<v8::Value>> out;

  for (void* ptr : in) {
    out.push_back(Nan::New<v8::String>((char const*)ptr).ToLocalChecked());
  }

  return out;
}
