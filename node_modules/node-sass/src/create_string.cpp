#include <nan.h>
#include <stdlib.h>
#include <string.h>
#include "create_string.h"

char* create_string(Nan::MaybeLocal<v8::Value> maybevalue) {
  v8::Local<v8::Value> value;

  if (maybevalue.ToLocal(&value)) {
    if (value->IsNull() || !value->IsString()) {
      return 0;
    }
  } else {
    return 0;
  }

  Nan::Utf8String string(value);
  char *str = (char *)malloc(string.length() + 1);
  strcpy(str, *string);
  return str;
}
