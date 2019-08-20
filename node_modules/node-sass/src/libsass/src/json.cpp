/*
  Copyright (C) 2011 Joseph A. Adams (joeyadams3.14159@gmail.com)
  All rights reserved.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

#ifdef _MSC_VER
#define _CRT_SECURE_NO_WARNINGS
#define _CRT_NONSTDC_NO_DEPRECATE
#endif

#include "json.hpp"

// include utf8 library used by libsass
// ToDo: replace internal json utf8 code
#include "utf8.h"

#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
#include <stdarg.h>
#ifdef snprintf
#undef snprintf
#endif
extern "C" int snprintf(char *, size_t, const char *, ...);
#endif

#define out_of_memory() do {                    \
    fprintf(stderr, "Out of memory.\n");    \
    exit(EXIT_FAILURE);                     \
  } while (0)

/* Sadly, strdup is not portable. */
static char *json_strdup(const char *str)
{
  char *ret = (char*) malloc(strlen(str) + 1);
  if (ret == NULL)
    out_of_memory();
  strcpy(ret, str);
  return ret;
}

/* String buffer */

typedef struct
{
  char *cur;
  char *end;
  char *start;
} SB;

static void sb_init(SB *sb)
{
  sb->start = (char*) malloc(17);
  if (sb->start == NULL)
    out_of_memory();
  sb->cur = sb->start;
  sb->end = sb->start + 16;
}

/* sb and need may be evaluated multiple times. */
#define sb_need(sb, need) do {                  \
    if ((sb)->end - (sb)->cur < (need))     \
      sb_grow(sb, need);                  \
  } while (0)

static void sb_grow(SB *sb, int need)
{
  size_t length = sb->cur - sb->start;
  size_t alloc = sb->end - sb->start;

  do {
    alloc *= 2;
  } while (alloc < length + need);

  sb->start = (char*) realloc(sb->start, alloc + 1);
  if (sb->start == NULL)
    out_of_memory();
  sb->cur = sb->start + length;
  sb->end = sb->start + alloc;
}

static void sb_put(SB *sb, const char *bytes, int count)
{
  sb_need(sb, count);
  memcpy(sb->cur, bytes, count);
  sb->cur += count;
}

#define sb_putc(sb, c) do {         \
    if ((sb)->cur >= (sb)->end) \
      sb_grow(sb, 1);         \
    *(sb)->cur++ = (c);         \
  } while (0)

static void sb_puts(SB *sb, const char *str)
{
  sb_put(sb, str, (int)strlen(str));
}

static char *sb_finish(SB *sb)
{
  *sb->cur = 0;
  assert(sb->start <= sb->cur && strlen(sb->start) == (size_t)(sb->cur - sb->start));
  return sb->start;
}

static void sb_free(SB *sb)
{
  free(sb->start);
}

/*
 * Unicode helper functions
 *
 * These are taken from the ccan/charset module and customized a bit.
 * Putting them here means the compiler can (choose to) inline them,
 * and it keeps ccan/json from having a dependency.
 *
 * We use uint32_t Type for Unicode codepoints.
 * We need our own because wchar_t might be 16 bits.
 */

/*
 * Validate a single UTF-8 character starting at @s.
 * The string must be null-terminated.
 *
 * If it's valid, return its length (1 thru 4).
 * If it's invalid or clipped, return 0.
 *
 * This function implements the syntax given in RFC3629, which is
 * the same as that given in The Unicode Standard, Version 6.0.
 *
 * It has the following properties:
 *
 *  * All codepoints U+0000..U+10FFFF may be encoded,
 *    except for U+D800..U+DFFF, which are reserved
 *    for UTF-16 surrogate pair encoding.
 *  * UTF-8 byte sequences longer than 4 bytes are not permitted,
 *    as they exceed the range of Unicode.
 *  * The sixty-six Unicode "non-characters" are permitted
 *    (namely, U+FDD0..U+FDEF, U+xxFFFE, and U+xxFFFF).
 */
static int utf8_validate_cz(const char *s)
{
  unsigned char c = *s++;

  if (c <= 0x7F) {        /* 00..7F */
    return 1;
  } else if (c <= 0xC1) { /* 80..C1 */
    /* Disallow overlong 2-byte sequence. */
    return 0;
  } else if (c <= 0xDF) { /* C2..DF */
    /* Make sure subsequent byte is in the range 0x80..0xBF. */
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;

    return 2;
  } else if (c <= 0xEF) { /* E0..EF */
    /* Disallow overlong 3-byte sequence. */
    if (c == 0xE0 && (unsigned char)*s < 0xA0)
      return 0;

    /* Disallow U+D800..U+DFFF. */
    if (c == 0xED && (unsigned char)*s > 0x9F)
      return 0;

    /* Make sure subsequent bytes are in the range 0x80..0xBF. */
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;

    return 3;
  } else if (c <= 0xF4) { /* F0..F4 */
    /* Disallow overlong 4-byte sequence. */
    if (c == 0xF0 && (unsigned char)*s < 0x90)
      return 0;

    /* Disallow codepoints beyond U+10FFFF. */
    if (c == 0xF4 && (unsigned char)*s > 0x8F)
      return 0;

    /* Make sure subsequent bytes are in the range 0x80..0xBF. */
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;
    if (((unsigned char)*s++ & 0xC0) != 0x80)
      return 0;

    return 4;
  } else {                /* F5..FF */
    return 0;
  }
}

/* Validate a null-terminated UTF-8 string. */
static bool utf8_validate(const char *s)
{
  int len;

  for (; *s != 0; s += len) {
    len = utf8_validate_cz(s);
    if (len == 0)
      return false;
  }

  return true;
}

/*
 * Read a single UTF-8 character starting at @s,
 * returning the length, in bytes, of the character read.
 *
 * This function assumes input is valid UTF-8,
 * and that there are enough characters in front of @s.
 */
static int utf8_read_char(const char *s, uint32_t *out)
{
  const unsigned char *c = (const unsigned char*) s;

  assert(utf8_validate_cz(s));

  if (c[0] <= 0x7F) {
    /* 00..7F */
    *out = c[0];
    return 1;
  } else if (c[0] <= 0xDF) {
    /* C2..DF (unless input is invalid) */
    *out = ((uint32_t)c[0] & 0x1F) << 6 |
           ((uint32_t)c[1] & 0x3F);
    return 2;
  } else if (c[0] <= 0xEF) {
    /* E0..EF */
    *out = ((uint32_t)c[0] &  0xF) << 12 |
           ((uint32_t)c[1] & 0x3F) << 6  |
           ((uint32_t)c[2] & 0x3F);
    return 3;
  } else {
    /* F0..F4 (unless input is invalid) */
    *out = ((uint32_t)c[0] &  0x7) << 18 |
           ((uint32_t)c[1] & 0x3F) << 12 |
           ((uint32_t)c[2] & 0x3F) << 6  |
           ((uint32_t)c[3] & 0x3F);
    return 4;
  }
}

/*
 * Write a single UTF-8 character to @s,
 * returning the length, in bytes, of the character written.
 *
 * @unicode must be U+0000..U+10FFFF, but not U+D800..U+DFFF.
 *
 * This function will write up to 4 bytes to @out.
 */
static int utf8_write_char(uint32_t unicode, char *out)
{
  unsigned char *o = (unsigned char*) out;

  assert(unicode <= 0x10FFFF && !(unicode >= 0xD800 && unicode <= 0xDFFF));

  if (unicode <= 0x7F) {
    /* U+0000..U+007F */
    *o++ = unicode;
    return 1;
  } else if (unicode <= 0x7FF) {
    /* U+0080..U+07FF */
    *o++ = 0xC0 | unicode >> 6;
    *o++ = 0x80 | (unicode & 0x3F);
    return 2;
  } else if (unicode <= 0xFFFF) {
    /* U+0800..U+FFFF */
    *o++ = 0xE0 | unicode >> 12;
    *o++ = 0x80 | (unicode >> 6 & 0x3F);
    *o++ = 0x80 | (unicode & 0x3F);
    return 3;
  } else {
    /* U+10000..U+10FFFF */
    *o++ = 0xF0 | unicode >> 18;
    *o++ = 0x80 | (unicode >> 12 & 0x3F);
    *o++ = 0x80 | (unicode >> 6 & 0x3F);
    *o++ = 0x80 | (unicode & 0x3F);
    return 4;
  }
}

/*
 * Compute the Unicode codepoint of a UTF-16 surrogate pair.
 *
 * @uc should be 0xD800..0xDBFF, and @lc should be 0xDC00..0xDFFF.
 * If they aren't, this function returns false.
 */
static bool from_surrogate_pair(uint16_t uc, uint16_t lc, uint32_t *unicode)
{
  if (uc >= 0xD800 && uc <= 0xDBFF && lc >= 0xDC00 && lc <= 0xDFFF) {
    *unicode = 0x10000 + ((((uint32_t)uc & 0x3FF) << 10) | (lc & 0x3FF));
    return true;
  } else {
    return false;
  }
}

/*
 * Construct a UTF-16 surrogate pair given a Unicode codepoint.
 *
 * @unicode must be U+10000..U+10FFFF.
 */
static void to_surrogate_pair(uint32_t unicode, uint16_t *uc, uint16_t *lc)
{
  uint32_t n;

  assert(unicode >= 0x10000 && unicode <= 0x10FFFF);

  n = unicode - 0x10000;
  *uc = ((n >> 10) & 0x3FF) | 0xD800;
  *lc = (n & 0x3FF) | 0xDC00;
}

static bool is_space        (const char *c);
static bool is_digit        (const char *c);
static bool parse_value     (const char **sp, JsonNode        **out);
static bool parse_string    (const char **sp, char            **out);
static bool parse_number    (const char **sp, double           *out);
static bool parse_array     (const char **sp, JsonNode        **out);
static bool parse_object    (const char **sp, JsonNode        **out);
static bool parse_hex16     (const char **sp, uint16_t         *out);

static bool expect_literal  (const char **sp, const char *str);
static void skip_space      (const char **sp);

static void emit_value              (SB *out, const JsonNode *node);
static void emit_value_indented     (SB *out, const JsonNode *node, const char *space, int indent_level);
static void emit_string             (SB *out, const char *str);
static void emit_number             (SB *out, double num);
static void emit_array              (SB *out, const JsonNode *array);
static void emit_array_indented     (SB *out, const JsonNode *array, const char *space, int indent_level);
static void emit_object             (SB *out, const JsonNode *object);
static void emit_object_indented    (SB *out, const JsonNode *object, const char *space, int indent_level);

static int write_hex16(char *out, uint16_t val);

static JsonNode *mknode(JsonTag tag);
static void append_node(JsonNode *parent, JsonNode *child);
static void prepend_node(JsonNode *parent, JsonNode *child);
static void append_member(JsonNode *object, char *key, JsonNode *value);

/* Assertion-friendly validity checks */
static bool tag_is_valid(unsigned int tag);
static bool number_is_valid(const char *num);

JsonNode *json_decode(const char *json)
{
  const char *s = json;
  JsonNode *ret;

  skip_space(&s);
  if (!parse_value(&s, &ret))
    return NULL;

  skip_space(&s);
  if (*s != 0) {
    json_delete(ret);
    return NULL;
  }

  return ret;
}

char *json_encode(const JsonNode *node)
{
  return json_stringify(node, NULL);
}

char *json_encode_string(const char *str)
{
  SB sb;
  sb_init(&sb);

  try {
    emit_string(&sb, str);
  }
  catch (std::exception) {
    sb_free(&sb);
    throw;
  }

  return sb_finish(&sb);
}

char *json_stringify(const JsonNode *node, const char *space)
{
  SB sb;
  sb_init(&sb);

  try {
    if (space != NULL)
      emit_value_indented(&sb, node, space, 0);
    else
      emit_value(&sb, node);
  }
  catch (std::exception) {
    sb_free(&sb);
    throw;
  }

  return sb_finish(&sb);
}

void json_delete(JsonNode *node)
{
  if (node != NULL) {
    json_remove_from_parent(node);

    switch (node->tag) {
      case JSON_STRING:
        free(node->string_);
        break;
      case JSON_ARRAY:
      case JSON_OBJECT:
      {
        JsonNode *child, *next;
        for (child = node->children.head; child != NULL; child = next) {
          next = child->next;
          json_delete(child);
        }
        break;
      }
      default:;
    }

    free(node);
  }
}

bool json_validate(const char *json)
{
  const char *s = json;

  skip_space(&s);
  if (!parse_value(&s, NULL))
    return false;

  skip_space(&s);
  if (*s != 0)
    return false;

  return true;
}

JsonNode *json_find_element(JsonNode *array, int index)
{
  JsonNode *element;
  int i = 0;

  if (array == NULL || array->tag != JSON_ARRAY)
    return NULL;

  json_foreach(element, array) {
    if (i == index)
      return element;
    i++;
  }

  return NULL;
}

JsonNode *json_find_member(JsonNode *object, const char *name)
{
  JsonNode *member;

  if (object == NULL || object->tag != JSON_OBJECT)
    return NULL;

  json_foreach(member, object)
    if (strcmp(member->key, name) == 0)
      return member;

  return NULL;
}

JsonNode *json_first_child(const JsonNode *node)
{
  if (node != NULL && (node->tag == JSON_ARRAY || node->tag == JSON_OBJECT))
    return node->children.head;
  return NULL;
}

static JsonNode *mknode(JsonTag tag)
{
  JsonNode *ret = (JsonNode*) calloc(1, sizeof(JsonNode));
  if (ret == NULL)
    out_of_memory();
  ret->tag = tag;
  return ret;
}

JsonNode *json_mknull(void)
{
  return mknode(JSON_NULL);
}

JsonNode *json_mkbool(bool b)
{
  JsonNode *ret = mknode(JSON_BOOL);
  ret->bool_ = b;
  return ret;
}

static JsonNode *mkstring(char *s)
{
  JsonNode *ret = mknode(JSON_STRING);
  ret->string_ = s;
  return ret;
}

JsonNode *json_mkstring(const char *s)
{
  return mkstring(json_strdup(s));
}

JsonNode *json_mknumber(double n)
{
  JsonNode *node = mknode(JSON_NUMBER);
  node->number_ = n;
  return node;
}

JsonNode *json_mkarray(void)
{
  return mknode(JSON_ARRAY);
}

JsonNode *json_mkobject(void)
{
  return mknode(JSON_OBJECT);
}

static void append_node(JsonNode *parent, JsonNode *child)
{
  if (child != NULL && parent != NULL) {
      child->parent = parent;
      child->prev = parent->children.tail;
      child->next = NULL;

      if (parent->children.tail != NULL)
          parent->children.tail->next = child;
      else
          parent->children.head = child;
      parent->children.tail = child;
  }
}

static void prepend_node(JsonNode *parent, JsonNode *child)
{
  if (child != NULL && parent != NULL) {
      child->parent = parent;
      child->prev = NULL;
      child->next = parent->children.head;

      if (parent->children.head != NULL)
          parent->children.head->prev = child;
      else
          parent->children.tail = child;
      parent->children.head = child;
  }
}

static void append_member(JsonNode *object, char *key, JsonNode *value)
{
  if (value != NULL && object != NULL) {
      value->key = key;
      append_node(object, value);
  }
}

void json_append_element(JsonNode *array, JsonNode *element)
{
  if (array != NULL && element !=NULL) {
      assert(array->tag == JSON_ARRAY);
      assert(element->parent == NULL);

      append_node(array, element);
  }
}

void json_prepend_element(JsonNode *array, JsonNode *element)
{
  assert(array->tag == JSON_ARRAY);
  assert(element->parent == NULL);

  prepend_node(array, element);
}

void json_append_member(JsonNode *object, const char *key, JsonNode *value)
{
  if (object != NULL && key != NULL && value != NULL) {
      assert(object->tag == JSON_OBJECT);
      assert(value->parent == NULL);

      append_member(object, json_strdup(key), value);
  }
}

void json_prepend_member(JsonNode *object, const char *key, JsonNode *value)
{
  if (object != NULL && key != NULL && value != NULL) {
      assert(object->tag == JSON_OBJECT);
      assert(value->parent == NULL);

      value->key = json_strdup(key);
      prepend_node(object, value);
  }
}

void json_remove_from_parent(JsonNode *node)
{
  if (node != NULL) {
      JsonNode *parent = node->parent;

      if (parent != NULL) {
          if (node->prev != NULL)
              node->prev->next = node->next;
          else
              parent->children.head = node->next;

          if (node->next != NULL)
              node->next->prev = node->prev;
          else
              parent->children.tail = node->prev;

          free(node->key);

          node->parent = NULL;
          node->prev = node->next = NULL;
          node->key = NULL;
      }
  }
}

static bool parse_value(const char **sp, JsonNode **out)
{
  const char *s = *sp;

  switch (*s) {
    case 'n':
      if (expect_literal(&s, "null")) {
        if (out)
          *out = json_mknull();
        *sp = s;
        return true;
      }
      return false;

    case 'f':
      if (expect_literal(&s, "false")) {
        if (out)
          *out = json_mkbool(false);
        *sp = s;
        return true;
      }
      return false;

    case 't':
      if (expect_literal(&s, "true")) {
        if (out)
          *out = json_mkbool(true);
        *sp = s;
        return true;
      }
      return false;

    case '"': {
      char *str = NULL;
      if (parse_string(&s, out ? &str : NULL)) {
        if (out)
          *out = mkstring(str);
        *sp = s;
        return true;
      }
      return false;
    }

    case '[':
      if (parse_array(&s, out)) {
        *sp = s;
        return true;
      }
      return false;

    case '{':
      if (parse_object(&s, out)) {
        *sp = s;
        return true;
      }
      return false;

    default: {
      double num;
      if (parse_number(&s, out ? &num : NULL)) {
        if (out)
          *out = json_mknumber(num);
        *sp = s;
        return true;
      }
      return false;
    }
  }
}

static bool parse_array(const char **sp, JsonNode **out)
{
  const char *s = *sp;
  JsonNode *ret = out ? json_mkarray() : NULL;
  JsonNode *element = NULL;

  if (*s++ != '[')
    goto failure;
  skip_space(&s);

  if (*s == ']') {
    s++;
    goto success;
  }

  for (;;) {
    if (!parse_value(&s, out ? &element : NULL))
      goto failure;
    skip_space(&s);

    if (out)
      json_append_element(ret, element);

    if (*s == ']') {
      s++;
      goto success;
    }

    if (*s++ != ',')
      goto failure;
    skip_space(&s);
  }

success:
  *sp = s;
  if (out)
    *out = ret;
  return true;

failure:
  json_delete(ret);
  return false;
}

static bool parse_object(const char **sp, JsonNode **out)
{
  const char *s = *sp;
  JsonNode *ret = out ? json_mkobject() : NULL;
  char *key = NULL;
  JsonNode *value = NULL;

  if (*s++ != '{')
    goto failure;
  skip_space(&s);

  if (*s == '}') {
    s++;
    goto success;
  }

  for (;;) {
    if (!parse_string(&s, out ? &key : NULL))
      goto failure;
    skip_space(&s);

    if (*s++ != ':')
      goto failure_free_key;
    skip_space(&s);

    if (!parse_value(&s, out ? &value : NULL))
      goto failure_free_key;
    skip_space(&s);

    if (out)
      append_member(ret, key, value);

    if (*s == '}') {
      s++;
      goto success;
    }

    if (*s++ != ',')
      goto failure;
    skip_space(&s);
  }

success:
  *sp = s;
  if (out)
    *out = ret;
  return true;

failure_free_key:
  if (out)
    free(key);
failure:
  json_delete(ret);
  return false;
}

bool parse_string(const char **sp, char **out)
{
  const char *s = *sp;
  SB sb = { 0, 0, 0 };
  char throwaway_buffer[4];
    /* enough space for a UTF-8 character */
  char *b;

  if (*s++ != '"')
    return false;

  if (out) {
    sb_init(&sb);
    sb_need(&sb, 4);
    b = sb.cur;
  } else {
    b = throwaway_buffer;
  }

  while (*s != '"') {
    unsigned char c = *s++;

    /* Parse next character, and write it to b. */
    if (c == '\\') {
      c = *s++;
      switch (c) {
        case '"':
        case '\\':
        case '/':
          *b++ = c;
          break;
        case 'b':
          *b++ = '\b';
          break;
        case 'f':
          *b++ = '\f';
          break;
        case 'n':
          *b++ = '\n';
          break;
        case 'r':
          *b++ = '\r';
          break;
        case 't':
          *b++ = '\t';
          break;
        case 'u':
        {
          uint16_t uc, lc;
          uint32_t unicode;

          if (!parse_hex16(&s, &uc))
            goto failed;

          if (uc >= 0xD800 && uc <= 0xDFFF) {
            /* Handle UTF-16 surrogate pair. */
            if (*s++ != '\\' || *s++ != 'u' || !parse_hex16(&s, &lc))
              goto failed; /* Incomplete surrogate pair. */
            if (!from_surrogate_pair(uc, lc, &unicode))
              goto failed; /* Invalid surrogate pair. */
          } else if (uc == 0) {
            /* Disallow "\u0000". */
            goto failed;
          } else {
            unicode = uc;
          }

          b += utf8_write_char(unicode, b);
          break;
        }
        default:
          /* Invalid escape */
          goto failed;
      }
    } else if (c <= 0x1F) {
      /* Control characters are not allowed in string literals. */
      goto failed;
    } else {
      /* Validate and echo a UTF-8 character. */
      int len;

      s--;
      len = utf8_validate_cz(s);
      if (len == 0)
        goto failed; /* Invalid UTF-8 character. */

      while (len--)
        *b++ = *s++;
    }

    /*
     * Update sb to know about the new bytes,
     * and set up b to write another character.
     */
    if (out) {
      sb.cur = b;
      sb_need(&sb, 4);
      b = sb.cur;
    } else {
      b = throwaway_buffer;
    }
  }
  s++;

  if (out)
    *out = sb_finish(&sb);
  *sp = s;
  return true;

failed:
  if (out)
    sb_free(&sb);
  return false;
}

bool is_space(const char *c) {
  return ((*c) == '\t' || (*c) == '\n' || (*c) == '\r' || (*c) == ' ');
}

bool is_digit(const char *c){
  return ((*c) >= '0' && (*c) <= '9');
}

/*
 * The JSON spec says that a number shall follow this precise pattern
 * (spaces and quotes added for readability):
 *   '-'? (0 | [1-9][0-9]*) ('.' [0-9]+)? ([Ee] [+-]? [0-9]+)?
 *
 * However, some JSON parsers are more liberal.  For instance, PHP accepts
 * '.5' and '1.'.  JSON.parse accepts '+3'.
 *
 * This function takes the strict approach.
 */
bool parse_number(const char **sp, double *out)
{
  const char *s = *sp;

  /* '-'? */
  if (*s == '-')
    s++;

  /* (0 | [1-9][0-9]*) */
  if (*s == '0') {
    s++;
  } else {
    if (!is_digit(s))
      return false;
    do {
      s++;
    } while (is_digit(s));
  }

  /* ('.' [0-9]+)? */
  if (*s == '.') {
    s++;
    if (!is_digit(s))
      return false;
    do {
      s++;
    } while (is_digit(s));
  }

  /* ([Ee] [+-]? [0-9]+)? */
  if (*s == 'E' || *s == 'e') {
    s++;
    if (*s == '+' || *s == '-')
      s++;
    if (!is_digit(s))
      return false;
    do {
      s++;
    } while (is_digit(s));
  }

  if (out)
    *out = strtod(*sp, NULL);

  *sp = s;
  return true;
}

static void skip_space(const char **sp)
{
  const char *s = *sp;
  while (is_space(s))
    s++;
  *sp = s;
}

static void emit_value(SB *out, const JsonNode *node)
{
  assert(tag_is_valid(node->tag));
  switch (node->tag) {
    case JSON_NULL:
      sb_puts(out, "null");
      break;
    case JSON_BOOL:
      sb_puts(out, node->bool_ ? "true" : "false");
      break;
    case JSON_STRING:
      emit_string(out, node->string_);
      break;
    case JSON_NUMBER:
      emit_number(out, node->number_);
      break;
    case JSON_ARRAY:
      emit_array(out, node);
      break;
    case JSON_OBJECT:
      emit_object(out, node);
      break;
    default:
      assert(false);
  }
}

void emit_value_indented(SB *out, const JsonNode *node, const char *space, int indent_level)
{
  assert(tag_is_valid(node->tag));
  switch (node->tag) {
    case JSON_NULL:
      sb_puts(out, "null");
      break;
    case JSON_BOOL:
      sb_puts(out, node->bool_ ? "true" : "false");
      break;
    case JSON_STRING:
      emit_string(out, node->string_);
      break;
    case JSON_NUMBER:
      emit_number(out, node->number_);
      break;
    case JSON_ARRAY:
      emit_array_indented(out, node, space, indent_level);
      break;
    case JSON_OBJECT:
      emit_object_indented(out, node, space, indent_level);
      break;
    default:
      assert(false);
  }
}

static void emit_array(SB *out, const JsonNode *array)
{
  const JsonNode *element;

  sb_putc(out, '[');
  json_foreach(element, array) {
    emit_value(out, element);
    if (element->next != NULL)
      sb_putc(out, ',');
  }
  sb_putc(out, ']');
}

static void emit_array_indented(SB *out, const JsonNode *array, const char *space, int indent_level)
{
  const JsonNode *element = array->children.head;
  int i;

  if (element == NULL) {
    sb_puts(out, "[]");
    return;
  }

  sb_puts(out, "[\n");
  while (element != NULL) {
    for (i = 0; i < indent_level + 1; i++)
      sb_puts(out, space);
    emit_value_indented(out, element, space, indent_level + 1);

    element = element->next;
    sb_puts(out, element != NULL ? ",\n" : "\n");
  }
  for (i = 0; i < indent_level; i++)
    sb_puts(out, space);
  sb_putc(out, ']');
}

static void emit_object(SB *out, const JsonNode *object)
{
  const JsonNode *member;

  sb_putc(out, '{');
  json_foreach(member, object) {
    emit_string(out, member->key);
    sb_putc(out, ':');
    emit_value(out, member);
    if (member->next != NULL)
      sb_putc(out, ',');
  }
  sb_putc(out, '}');
}

static void emit_object_indented(SB *out, const JsonNode *object, const char *space, int indent_level)
{
  const JsonNode *member = object->children.head;
  int i;

  if (member == NULL) {
    sb_puts(out, "{}");
    return;
  }

  sb_puts(out, "{\n");
  while (member != NULL) {
    for (i = 0; i < indent_level + 1; i++)
      sb_puts(out, space);
    emit_string(out, member->key);
    sb_puts(out, ": ");
    emit_value_indented(out, member, space, indent_level + 1);

    member = member->next;
    sb_puts(out, member != NULL ? ",\n" : "\n");
  }
  for (i = 0; i < indent_level; i++)
    sb_puts(out, space);
  sb_putc(out, '}');
}

void emit_string(SB *out, const char *str)
{
  bool escape_unicode = false;
  const char *s = str;
  char *b;

// make assertion catchable
#ifndef NDEBUG
  if (!utf8_validate(str)) {
    throw utf8::invalid_utf8(0);
  }
#endif

  assert(utf8_validate(str));

  /*
   * 14 bytes is enough space to write up to two
   * \uXXXX escapes and two quotation marks.
   */
  sb_need(out, 14);
  b = out->cur;

  *b++ = '"';
  while (*s != 0) {
    unsigned char c = *s++;

    /* Encode the next character, and write it to b. */
    switch (c) {
      case '"':
        *b++ = '\\';
        *b++ = '"';
        break;
      case '\\':
        *b++ = '\\';
        *b++ = '\\';
        break;
      case '\b':
        *b++ = '\\';
        *b++ = 'b';
        break;
      case '\f':
        *b++ = '\\';
        *b++ = 'f';
        break;
      case '\n':
        *b++ = '\\';
        *b++ = 'n';
        break;
      case '\r':
        *b++ = '\\';
        *b++ = 'r';
        break;
      case '\t':
        *b++ = '\\';
        *b++ = 't';
        break;
      default: {
        int len;

        s--;
        len = utf8_validate_cz(s);

        if (len == 0) {
          /*
           * Handle invalid UTF-8 character gracefully in production
           * by writing a replacement character (U+FFFD)
           * and skipping a single byte.
           *
           * This should never happen when assertions are enabled
           * due to the assertion at the beginning of this function.
           */
          assert(false);
          if (escape_unicode) {
            strcpy(b, "\\uFFFD");
            b += 6;
          } else {
            *b++ = 0xEFu;
            *b++ = 0xBFu;
            *b++ = 0xBDu;
          }
          s++;
        } else if (c < 0x1F || (c >= 0x80 && escape_unicode)) {
          /* Encode using \u.... */
          uint32_t unicode;

          s += utf8_read_char(s, &unicode);

          if (unicode <= 0xFFFF) {
            *b++ = '\\';
            *b++ = 'u';
            b += write_hex16(b, unicode);
          } else {
            /* Produce a surrogate pair. */
            uint16_t uc, lc;
            assert(unicode <= 0x10FFFF);
            to_surrogate_pair(unicode, &uc, &lc);
            *b++ = '\\';
            *b++ = 'u';
            b += write_hex16(b, uc);
            *b++ = '\\';
            *b++ = 'u';
            b += write_hex16(b, lc);
          }
        } else {
          /* Write the character directly. */
          while (len--)
            *b++ = *s++;
        }

        break;
      }
    }

    /*
     * Update *out to know about the new bytes,
     * and set up b to write another encoded character.
     */
    out->cur = b;
    sb_need(out, 14);
    b = out->cur;
  }
  *b++ = '"';

  out->cur = b;
}

static void emit_number(SB *out, double num)
{
  /*
   * This isn't exactly how JavaScript renders numbers,
   * but it should produce valid JSON for reasonable numbers
   * preserve precision well enough, and avoid some oddities
   * like 0.3 -> 0.299999999999999988898 .
   */
  char buf[64];
  sprintf(buf, "%.16g", num);

  if (number_is_valid(buf))
    sb_puts(out, buf);
  else
    sb_puts(out, "null");
}

static bool tag_is_valid(unsigned int tag)
{
  return (/* tag >= JSON_NULL && */ tag <= JSON_OBJECT);
}

static bool number_is_valid(const char *num)
{
  return (parse_number(&num, NULL) && *num == '\0');
}

static bool expect_literal(const char **sp, const char *str)
{
  const char *s = *sp;

  while (*str != '\0')
    if (*s++ != *str++)
      return false;

  *sp = s;
  return true;
}

/*
 * Parses exactly 4 hex characters (capital or lowercase).
 * Fails if any input chars are not [0-9A-Fa-f].
 */
static bool parse_hex16(const char **sp, uint16_t *out)
{
  const char *s = *sp;
  uint16_t ret = 0;
  uint16_t i;
  uint16_t tmp;
  char c;

  for (i = 0; i < 4; i++) {
    c = *s++;
    if (c >= '0' && c <= '9')
      tmp = c - '0';
    else if (c >= 'A' && c <= 'F')
      tmp = c - 'A' + 10;
    else if (c >= 'a' && c <= 'f')
      tmp = c - 'a' + 10;
    else
      return false;

    ret <<= 4;
    ret += tmp;
  }

  if (out)
    *out = ret;
  *sp = s;
  return true;
}

/*
 * Encodes a 16-bit number into hexadecimal,
 * writing exactly 4 hex chars.
 */
static int write_hex16(char *out, uint16_t val)
{
  const char *hex = "0123456789ABCDEF";

  *out++ = hex[(val >> 12) & 0xF];
  *out++ = hex[(val >> 8)  & 0xF];
  *out++ = hex[(val >> 4)  & 0xF];
  *out++ = hex[ val        & 0xF];

  return 4;
}

bool json_check(const JsonNode *node, char errmsg[256])
{
  #define problem(...) do { \
      if (errmsg != NULL) \
        snprintf(errmsg, 256, __VA_ARGS__); \
      return false; \
    } while (0)

  if (node->key != NULL && !utf8_validate(node->key))
    problem("key contains invalid UTF-8");

  if (!tag_is_valid(node->tag))
    problem("tag is invalid (%u)", node->tag);

  if (node->tag == JSON_BOOL) {
    if (node->bool_ != false && node->bool_ != true)
      problem("bool_ is neither false (%d) nor true (%d)", (int)false, (int)true);
  } else if (node->tag == JSON_STRING) {
    if (node->string_ == NULL)
      problem("string_ is NULL");
    if (!utf8_validate(node->string_))
      problem("string_ contains invalid UTF-8");
  } else if (node->tag == JSON_ARRAY || node->tag == JSON_OBJECT) {
    JsonNode *head = node->children.head;
    JsonNode *tail = node->children.tail;

    if (head == NULL || tail == NULL) {
      if (head != NULL)
        problem("tail is NULL, but head is not");
      if (tail != NULL)
        problem("head is NULL, but tail is not");
    } else {
      JsonNode *child;
      JsonNode *last = NULL;

      if (head->prev != NULL)
        problem("First child's prev pointer is not NULL");

      for (child = head; child != NULL; last = child, child = child->next) {
        if (child == node)
          problem("node is its own child");
        if (child->next == child)
          problem("child->next == child (cycle)");
        if (child->next == head)
          problem("child->next == head (cycle)");

        if (child->parent != node)
          problem("child does not point back to parent");
        if (child->next != NULL && child->next->prev != child)
          problem("child->next does not point back to child");

        if (node->tag == JSON_ARRAY && child->key != NULL)
          problem("Array element's key is not NULL");
        if (node->tag == JSON_OBJECT && child->key == NULL)
          problem("Object member's key is NULL");

        if (!json_check(child, errmsg))
          return false;
      }

      if (last != tail)
        problem("tail does not match pointer found by starting at head and following next links");
    }
  }

  return true;

  #undef problem
}
