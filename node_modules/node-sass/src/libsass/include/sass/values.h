#ifndef SASS_C_VALUES_H
#define SASS_C_VALUES_H

#include <stddef.h>
#include <stdbool.h>
#include <sass/base.h>

#ifdef __cplusplus
extern "C" {
#endif


// Forward declaration
union Sass_Value;

// Type for Sass values
enum Sass_Tag {
  SASS_BOOLEAN,
  SASS_NUMBER,
  SASS_COLOR,
  SASS_STRING,
  SASS_LIST,
  SASS_MAP,
  SASS_NULL,
  SASS_ERROR,
  SASS_WARNING
};

// Tags for denoting Sass list separators
enum Sass_Separator {
  SASS_COMMA,
  SASS_SPACE,
  // only used internally to represent a hash map before evaluation
  // otherwise we would be too early to check for duplicate keys
  SASS_HASH
};

// Value Operators
enum Sass_OP {
  AND, OR,                   // logical connectives
  EQ, NEQ, GT, GTE, LT, LTE, // arithmetic relations
  ADD, SUB, MUL, DIV, MOD,   // arithmetic functions
  NUM_OPS                    // so we know how big to make the op table
};

// Creator functions for all value types
ADDAPI union Sass_Value* ADDCALL sass_make_null    (void);
ADDAPI union Sass_Value* ADDCALL sass_make_boolean (bool val);
ADDAPI union Sass_Value* ADDCALL sass_make_string  (const char* val);
ADDAPI union Sass_Value* ADDCALL sass_make_qstring (const char* val);
ADDAPI union Sass_Value* ADDCALL sass_make_number  (double val, const char* unit);
ADDAPI union Sass_Value* ADDCALL sass_make_color   (double r, double g, double b, double a);
ADDAPI union Sass_Value* ADDCALL sass_make_list    (size_t len, enum Sass_Separator sep, bool is_bracketed);
ADDAPI union Sass_Value* ADDCALL sass_make_map     (size_t len);
ADDAPI union Sass_Value* ADDCALL sass_make_error   (const char* msg);
ADDAPI union Sass_Value* ADDCALL sass_make_warning (const char* msg);

// Generic destructor function for all types
// Will release memory of all associated Sass_Values
// Means we will delete recursively for lists and maps
ADDAPI void ADDCALL sass_delete_value (union Sass_Value* val);

// Make a deep cloned copy of the given sass value
ADDAPI union Sass_Value* ADDCALL sass_clone_value (const union Sass_Value* val);

// Execute an operation for two Sass_Values and return the result as a Sass_Value too
ADDAPI union Sass_Value* ADDCALL sass_value_op (enum Sass_OP op, const union Sass_Value* a, const union Sass_Value* b);

// Stringify a Sass_Values and also return the result as a Sass_Value (of type STRING)
ADDAPI union Sass_Value* ADDCALL sass_value_stringify (const union Sass_Value* a, bool compressed, int precision);

// Return the sass tag for a generic sass value
// Check is needed before accessing specific values!
ADDAPI enum Sass_Tag ADDCALL sass_value_get_tag (const union Sass_Value* v);

// Check value to be of a specific type
// Can also be used before accessing properties!
ADDAPI bool ADDCALL sass_value_is_null (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_number (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_string (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_boolean (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_color (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_list (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_map (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_error (const union Sass_Value* v);
ADDAPI bool ADDCALL sass_value_is_warning (const union Sass_Value* v);

// Getters and setters for Sass_Number
ADDAPI double ADDCALL sass_number_get_value (const union Sass_Value* v);
ADDAPI void ADDCALL sass_number_set_value (union Sass_Value* v, double value);
ADDAPI const char* ADDCALL sass_number_get_unit (const union Sass_Value* v);
ADDAPI void ADDCALL sass_number_set_unit (union Sass_Value* v, char* unit);

// Getters and setters for Sass_String
ADDAPI const char* ADDCALL sass_string_get_value (const union Sass_Value* v);
ADDAPI void ADDCALL sass_string_set_value (union Sass_Value* v, char* value);
ADDAPI bool ADDCALL sass_string_is_quoted(const union Sass_Value* v);
ADDAPI void ADDCALL sass_string_set_quoted(union Sass_Value* v, bool quoted);

// Getters and setters for Sass_Boolean
ADDAPI bool ADDCALL sass_boolean_get_value (const union Sass_Value* v);
ADDAPI void ADDCALL sass_boolean_set_value (union Sass_Value* v, bool value);

// Getters and setters for Sass_Color
ADDAPI double ADDCALL sass_color_get_r (const union Sass_Value* v);
ADDAPI void ADDCALL sass_color_set_r (union Sass_Value* v, double r);
ADDAPI double ADDCALL sass_color_get_g (const union Sass_Value* v);
ADDAPI void ADDCALL sass_color_set_g (union Sass_Value* v, double g);
ADDAPI double ADDCALL sass_color_get_b (const union Sass_Value* v);
ADDAPI void ADDCALL sass_color_set_b (union Sass_Value* v, double b);
ADDAPI double ADDCALL sass_color_get_a (const union Sass_Value* v);
ADDAPI void ADDCALL sass_color_set_a (union Sass_Value* v, double a);

// Getter for the number of items in list
ADDAPI size_t ADDCALL sass_list_get_length (const union Sass_Value* v);
// Getters and setters for Sass_List
ADDAPI enum Sass_Separator ADDCALL sass_list_get_separator (const union Sass_Value* v);
ADDAPI void ADDCALL sass_list_set_separator (union Sass_Value* v, enum Sass_Separator value);
ADDAPI bool ADDCALL sass_list_get_is_bracketed (const union Sass_Value* v);
ADDAPI void ADDCALL sass_list_set_is_bracketed (union Sass_Value* v, bool value);
// Getters and setters for Sass_List values
ADDAPI union Sass_Value* ADDCALL sass_list_get_value (const union Sass_Value* v, size_t i);
ADDAPI void ADDCALL sass_list_set_value (union Sass_Value* v, size_t i, union Sass_Value* value);

// Getter for the number of items in map
ADDAPI size_t ADDCALL sass_map_get_length (const union Sass_Value* v);
// Getters and setters for Sass_Map keys and values
ADDAPI union Sass_Value* ADDCALL sass_map_get_key (const union Sass_Value* v, size_t i);
ADDAPI void ADDCALL sass_map_set_key (union Sass_Value* v, size_t i, union Sass_Value*);
ADDAPI union Sass_Value* ADDCALL sass_map_get_value (const union Sass_Value* v, size_t i);
ADDAPI void ADDCALL sass_map_set_value (union Sass_Value* v, size_t i, union Sass_Value*);

// Getters and setters for Sass_Error
ADDAPI char* ADDCALL sass_error_get_message (const union Sass_Value* v);
ADDAPI void ADDCALL sass_error_set_message (union Sass_Value* v, char* msg);

// Getters and setters for Sass_Warning
ADDAPI char* ADDCALL sass_warning_get_message (const union Sass_Value* v);
ADDAPI void ADDCALL sass_warning_set_message (union Sass_Value* v, char* msg);

#ifdef __cplusplus
} // __cplusplus defined.
#endif

#endif
