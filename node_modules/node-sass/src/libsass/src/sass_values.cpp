#include "sass.hpp"
#include <cstdlib>
#include <cstring>
#include "util.hpp"
#include "eval.hpp"
#include "values.hpp"
#include "operators.hpp"
#include "sass/values.h"
#include "sass_values.hpp"

extern "C" {
  using namespace Sass;

  // Return the sass tag for a generic sass value
  enum Sass_Tag ADDCALL sass_value_get_tag(const union Sass_Value* v) { return v->unknown.tag; }

  // Check value for specified type
  bool ADDCALL sass_value_is_null(const union Sass_Value* v) { return v->unknown.tag == SASS_NULL; }
  bool ADDCALL sass_value_is_number(const union Sass_Value* v) { return v->unknown.tag == SASS_NUMBER; }
  bool ADDCALL sass_value_is_string(const union Sass_Value* v) { return v->unknown.tag == SASS_STRING; }
  bool ADDCALL sass_value_is_boolean(const union Sass_Value* v) { return v->unknown.tag == SASS_BOOLEAN; }
  bool ADDCALL sass_value_is_color(const union Sass_Value* v) { return v->unknown.tag == SASS_COLOR; }
  bool ADDCALL sass_value_is_list(const union Sass_Value* v) { return v->unknown.tag == SASS_LIST; }
  bool ADDCALL sass_value_is_map(const union Sass_Value* v) { return v->unknown.tag == SASS_MAP; }
  bool ADDCALL sass_value_is_error(const union Sass_Value* v) { return v->unknown.tag == SASS_ERROR; }
  bool ADDCALL sass_value_is_warning(const union Sass_Value* v) { return v->unknown.tag == SASS_WARNING; }

  // Getters and setters for Sass_Number
  double ADDCALL sass_number_get_value(const union Sass_Value* v) { return v->number.value; }
  void ADDCALL sass_number_set_value(union Sass_Value* v, double value) { v->number.value = value; }
  const char* ADDCALL sass_number_get_unit(const union Sass_Value* v) { return v->number.unit; }
  void ADDCALL sass_number_set_unit(union Sass_Value* v, char* unit) { v->number.unit = unit; }

  // Getters and setters for Sass_String
  const char* ADDCALL sass_string_get_value(const union Sass_Value* v) { return v->string.value; }
  void ADDCALL sass_string_set_value(union Sass_Value* v, char* value) { v->string.value = value; }
  bool ADDCALL sass_string_is_quoted(const union Sass_Value* v) { return v->string.quoted; }
  void ADDCALL sass_string_set_quoted(union Sass_Value* v, bool quoted) { v->string.quoted = quoted; }

  // Getters and setters for Sass_Boolean
  bool ADDCALL sass_boolean_get_value(const union Sass_Value* v) { return v->boolean.value; }
  void ADDCALL sass_boolean_set_value(union Sass_Value* v, bool value) { v->boolean.value = value; }

  // Getters and setters for Sass_Color
  double ADDCALL sass_color_get_r(const union Sass_Value* v) { return v->color.r; }
  void ADDCALL sass_color_set_r(union Sass_Value* v, double r) { v->color.r = r; }
  double ADDCALL sass_color_get_g(const union Sass_Value* v) { return v->color.g; }
  void ADDCALL sass_color_set_g(union Sass_Value* v, double g) { v->color.g = g; }
  double ADDCALL sass_color_get_b(const union Sass_Value* v) { return v->color.b; }
  void ADDCALL sass_color_set_b(union Sass_Value* v, double b) { v->color.b = b; }
  double ADDCALL sass_color_get_a(const union Sass_Value* v) { return v->color.a; }
  void ADDCALL sass_color_set_a(union Sass_Value* v, double a) { v->color.a = a; }

  // Getters and setters for Sass_List
  size_t ADDCALL sass_list_get_length(const union Sass_Value* v) { return v->list.length; }
  enum Sass_Separator ADDCALL sass_list_get_separator(const union Sass_Value* v) { return v->list.separator; }
  void ADDCALL sass_list_set_separator(union Sass_Value* v, enum Sass_Separator separator) { v->list.separator = separator; }
  bool ADDCALL sass_list_get_is_bracketed(const union Sass_Value* v) { return v->list.is_bracketed; }
  void ADDCALL sass_list_set_is_bracketed(union Sass_Value* v, bool is_bracketed) { v->list.is_bracketed = is_bracketed; }
  // Getters and setters for Sass_List values
  union Sass_Value* ADDCALL sass_list_get_value(const union Sass_Value* v, size_t i) { return v->list.values[i]; }
  void ADDCALL sass_list_set_value(union Sass_Value* v, size_t i, union Sass_Value* value) { v->list.values[i] = value; }

  // Getters and setters for Sass_Map
  size_t ADDCALL sass_map_get_length(const union Sass_Value* v) { return v->map.length; }
  // Getters and setters for Sass_List keys and values
  union Sass_Value* ADDCALL sass_map_get_key(const union Sass_Value* v, size_t i) { return v->map.pairs[i].key; }
  union Sass_Value* ADDCALL sass_map_get_value(const union Sass_Value* v, size_t i) { return v->map.pairs[i].value; }
  void ADDCALL sass_map_set_key(union Sass_Value* v, size_t i, union Sass_Value* key) { v->map.pairs[i].key = key; }
  void ADDCALL sass_map_set_value(union Sass_Value* v, size_t i, union Sass_Value* val) { v->map.pairs[i].value = val; }

  // Getters and setters for Sass_Error
  char* ADDCALL sass_error_get_message(const union Sass_Value* v) { return v->error.message; };
  void ADDCALL sass_error_set_message(union Sass_Value* v, char* msg) { v->error.message = msg; };

  // Getters and setters for Sass_Warning
  char* ADDCALL sass_warning_get_message(const union Sass_Value* v) { return v->warning.message; };
  void ADDCALL sass_warning_set_message(union Sass_Value* v, char* msg) { v->warning.message = msg; };

  // Creator functions for all value types

  union Sass_Value* ADDCALL sass_make_boolean(bool val)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->boolean.tag = SASS_BOOLEAN;
    v->boolean.value = val;
    return v;
  }

  union Sass_Value* ADDCALL sass_make_number(double val, const char* unit)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->number.tag = SASS_NUMBER;
    v->number.value = val;
    v->number.unit = unit ? sass_copy_c_string(unit) : 0;
    if (v->number.unit == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_color(double r, double g, double b, double a)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->color.tag = SASS_COLOR;
    v->color.r = r;
    v->color.g = g;
    v->color.b = b;
    v->color.a = a;
    return v;
  }

  union Sass_Value* ADDCALL sass_make_string(const char* val)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->string.quoted = false;
    v->string.tag = SASS_STRING;
    v->string.value = val ? sass_copy_c_string(val) : 0;
    if (v->string.value == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_qstring(const char* val)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->string.quoted = true;
    v->string.tag = SASS_STRING;
    v->string.value = val ? sass_copy_c_string(val) : 0;
    if (v->string.value == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_list(size_t len, enum Sass_Separator sep, bool is_bracketed)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->list.tag = SASS_LIST;
    v->list.length = len;
    v->list.separator = sep;
    v->list.is_bracketed = is_bracketed;
    v->list.values = (union Sass_Value**) calloc(len, sizeof(union Sass_Value*));
    if (v->list.values == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_map(size_t len)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->map.tag = SASS_MAP;
    v->map.length = len;
    v->map.pairs = (struct Sass_MapPair*) calloc(len, sizeof(struct Sass_MapPair));
    if (v->map.pairs == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_null(void)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->null.tag = SASS_NULL;
    return v;
  }

  union Sass_Value* ADDCALL sass_make_error(const char* msg)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->error.tag = SASS_ERROR;
    v->error.message = msg ? sass_copy_c_string(msg) : 0;
    if (v->error.message == 0) { free(v); return 0; }
    return v;
  }

  union Sass_Value* ADDCALL sass_make_warning(const char* msg)
  {
    union Sass_Value* v = (Sass_Value*) calloc(1, sizeof(Sass_Value));
    if (v == 0) return 0;
    v->warning.tag = SASS_WARNING;
    v->warning.message = msg ? sass_copy_c_string(msg) : 0;
    if (v->warning.message == 0) { free(v); return 0; }
    return v;
  }

  // will free all associated sass values
  void ADDCALL sass_delete_value(union Sass_Value* val) {

    size_t i;
    if (val == 0) return;
    switch(val->unknown.tag) {
        case SASS_NULL: {
        }   break;
        case SASS_BOOLEAN: {
        }   break;
        case SASS_NUMBER: {
                free(val->number.unit);
        }   break;
        case SASS_COLOR: {
        }   break;
        case SASS_STRING: {
                free(val->string.value);
        }   break;
        case SASS_LIST: {
                for (i=0; i<val->list.length; i++) {
                    sass_delete_value(val->list.values[i]);
                }
                free(val->list.values);
        }   break;
        case SASS_MAP: {
                for (i=0; i<val->map.length; i++) {
                    sass_delete_value(val->map.pairs[i].key);
                    sass_delete_value(val->map.pairs[i].value);
                }
                free(val->map.pairs);
        }   break;
        case SASS_ERROR: {
                free(val->error.message);
        }   break;
        case SASS_WARNING: {
                free(val->error.message);
        }   break;
        default: break;
    }

    free(val);

    }

  // Make a deep cloned copy of the given sass value
  union Sass_Value* ADDCALL sass_clone_value (const union Sass_Value* val)
  {

    size_t i;
    if (val == 0) return 0;
    switch(val->unknown.tag) {
        case SASS_NULL: {
                return sass_make_null();
        }
        case SASS_BOOLEAN: {
                return sass_make_boolean(val->boolean.value);
        }
        case SASS_NUMBER: {
                return sass_make_number(val->number.value, val->number.unit);
        }
        case SASS_COLOR: {
                return sass_make_color(val->color.r, val->color.g, val->color.b, val->color.a);
        }
        case SASS_STRING: {
                return sass_string_is_quoted(val) ? sass_make_qstring(val->string.value) : sass_make_string(val->string.value);
        }
        case SASS_LIST: {
                union Sass_Value* list = sass_make_list(val->list.length, val->list.separator, val->list.is_bracketed);
                for (i = 0; i < list->list.length; i++) {
                    list->list.values[i] = sass_clone_value(val->list.values[i]);
                }
                return list;
        }
        case SASS_MAP: {
                union Sass_Value* map = sass_make_map(val->map.length);
                for (i = 0; i < val->map.length; i++) {
                    map->map.pairs[i].key = sass_clone_value(val->map.pairs[i].key);
                    map->map.pairs[i].value = sass_clone_value(val->map.pairs[i].value);
                }
                return map;
        }
        case SASS_ERROR: {
                return sass_make_error(val->error.message);
        }
        case SASS_WARNING: {
                return sass_make_warning(val->warning.message);
        }
        default: break;
    }

    return 0;

  }

  union Sass_Value* ADDCALL sass_value_stringify (const union Sass_Value* v, bool compressed, int precision)
  {
    Value_Obj val = sass_value_to_ast_node(v);
    Sass_Inspect_Options options(compressed ? COMPRESSED : NESTED, precision);
    std::string str(val->to_string(options));
    return sass_make_qstring(str.c_str());
  }

  union Sass_Value* ADDCALL sass_value_op (enum Sass_OP op, const union Sass_Value* a, const union Sass_Value* b)
  {

    Sass::Value_Ptr rv;

    try {

      Value_Obj lhs = sass_value_to_ast_node(a);
      Value_Obj rhs = sass_value_to_ast_node(b);
      struct Sass_Inspect_Options options(NESTED, 5);

      // see if it's a relational expression
      switch(op) {
        case Sass_OP::EQ:  return sass_make_boolean(Operators::eq(lhs, rhs));
        case Sass_OP::NEQ: return sass_make_boolean(Operators::neq(lhs, rhs));
        case Sass_OP::GT:  return sass_make_boolean(Operators::gt(lhs, rhs));
        case Sass_OP::GTE: return sass_make_boolean(Operators::gte(lhs, rhs));
        case Sass_OP::LT:  return sass_make_boolean(Operators::lt(lhs, rhs));
        case Sass_OP::LTE: return sass_make_boolean(Operators::lte(lhs, rhs));
        case Sass_OP::AND: return ast_node_to_sass_value(lhs->is_false() ? lhs : rhs);
        case Sass_OP::OR:  return ast_node_to_sass_value(lhs->is_false() ? rhs : lhs);
        default: break;
      }

      if (sass_value_is_number(a) && sass_value_is_number(b)) {
        Number_Ptr_Const l_n = Cast<Number>(lhs);
        Number_Ptr_Const r_n = Cast<Number>(rhs);
        rv = Operators::op_numbers(op, *l_n, *r_n, options, l_n->pstate());
      }
      else if (sass_value_is_number(a) && sass_value_is_color(a)) {
        Number_Ptr_Const l_n = Cast<Number>(lhs);
        Color_Ptr_Const r_c = Cast<Color>(rhs);
        rv = Operators::op_number_color(op, *l_n, *r_c, options, l_n->pstate());
      }
      else if (sass_value_is_color(a) && sass_value_is_number(b)) {
        Color_Ptr_Const l_c = Cast<Color>(lhs);
        Number_Ptr_Const r_n = Cast<Number>(rhs);
        rv = Operators::op_color_number(op, *l_c, *r_n, options, l_c->pstate());
      }
      else if (sass_value_is_color(a) && sass_value_is_color(b)) {
        Color_Ptr_Const l_c = Cast<Color>(lhs);
        Color_Ptr_Const r_c = Cast<Color>(rhs);
        rv = Operators::op_colors(op, *l_c, *r_c, options, l_c->pstate());
      }
      else /* convert other stuff to string and apply operation */ {
        Value_Ptr l_v = Cast<Value>(lhs);
        Value_Ptr r_v = Cast<Value>(rhs);
        rv = Operators::op_strings(op, *l_v, *r_v, options, l_v->pstate());
      }

      // ToDo: maybe we should should return null value?
      if (!rv) return sass_make_error("invalid return value");

      // convert result back to ast node
      return ast_node_to_sass_value(rv);

    }

    // simply pass the error message back to the caller for now
    catch (Exception::InvalidSass& e) { return sass_make_error(e.what()); }
    catch (std::bad_alloc&) { return sass_make_error("memory exhausted"); }
    catch (std::exception& e) { return sass_make_error(e.what()); }
    catch (std::string& e) { return sass_make_error(e.c_str()); }
    catch (const char* e) { return sass_make_error(e); }
    catch (...) { return sass_make_error("unknown"); }
  }

}
