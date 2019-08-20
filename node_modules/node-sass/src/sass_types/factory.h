#ifndef SASS_TYPES_FACTORY_H
#define SASS_TYPES_FACTORY_H

#include <nan.h>
#include <sass/values.h>
#include "value.h"

namespace SassTypes
{
  // This is the guru that knows everything about instantiating the right subclass of SassTypes::Value
  // to wrap a given Sass_Value object.
  class Factory {
    public:
      static NAN_MODULE_INIT(initExports);
      static Value* create(Sass_Value*);
      static Value* unwrap(v8::Local<v8::Value>);
  };
}

#endif
