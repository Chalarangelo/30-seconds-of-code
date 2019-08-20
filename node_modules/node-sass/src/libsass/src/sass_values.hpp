#ifndef SASS_SASS_VALUES_H
#define SASS_SASS_VALUES_H

#include "sass.h"

struct Sass_Unknown {
  enum Sass_Tag tag;
};

struct Sass_Boolean {
  enum Sass_Tag tag;
  bool          value;
};

struct Sass_Number {
  enum Sass_Tag tag;
  double        value;
  char*         unit;
};

struct Sass_Color {
  enum Sass_Tag tag;
  double        r;
  double        g;
  double        b;
  double        a;
};

struct Sass_String {
  enum Sass_Tag tag;
  bool          quoted;
  char*         value;
};

struct Sass_List {
  enum Sass_Tag       tag;
  enum Sass_Separator separator;
  bool                is_bracketed;
  size_t              length;
  // null terminated "array"
  union Sass_Value**  values;
};

struct Sass_Map {
  enum Sass_Tag        tag;
  size_t               length;
  struct Sass_MapPair* pairs;
};

struct Sass_Null {
  enum Sass_Tag tag;
};

struct Sass_Error {
  enum Sass_Tag tag;
  char*         message;
};

struct Sass_Warning {
  enum Sass_Tag tag;
  char*         message;
};

union Sass_Value {
  struct Sass_Unknown unknown;
  struct Sass_Boolean boolean;
  struct Sass_Number  number;
  struct Sass_Color   color;
  struct Sass_String  string;
  struct Sass_List    list;
  struct Sass_Map     map;
  struct Sass_Null    null;
  struct Sass_Error   error;
  struct Sass_Warning warning;
};

struct Sass_MapPair {
  union Sass_Value* key;
  union Sass_Value* value;
};

#endif
