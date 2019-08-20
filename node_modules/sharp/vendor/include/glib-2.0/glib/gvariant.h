/*
 * Copyright © 2007, 2008 Ryan Lortie
 * Copyright © 2009, 2010 Codethink Limited
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * Author: Ryan Lortie <desrt@desrt.ca>
 */

#ifndef __G_VARIANT_H__
#define __G_VARIANT_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gvarianttype.h>
#include <glib/gstring.h>
#include <glib/gbytes.h>

G_BEGIN_DECLS

typedef struct _GVariant        GVariant;

typedef enum
{
  G_VARIANT_CLASS_BOOLEAN       = 'b',
  G_VARIANT_CLASS_BYTE          = 'y',
  G_VARIANT_CLASS_INT16         = 'n',
  G_VARIANT_CLASS_UINT16        = 'q',
  G_VARIANT_CLASS_INT32         = 'i',
  G_VARIANT_CLASS_UINT32        = 'u',
  G_VARIANT_CLASS_INT64         = 'x',
  G_VARIANT_CLASS_UINT64        = 't',
  G_VARIANT_CLASS_HANDLE        = 'h',
  G_VARIANT_CLASS_DOUBLE        = 'd',
  G_VARIANT_CLASS_STRING        = 's',
  G_VARIANT_CLASS_OBJECT_PATH   = 'o',
  G_VARIANT_CLASS_SIGNATURE     = 'g',
  G_VARIANT_CLASS_VARIANT       = 'v',
  G_VARIANT_CLASS_MAYBE         = 'm',
  G_VARIANT_CLASS_ARRAY         = 'a',
  G_VARIANT_CLASS_TUPLE         = '(',
  G_VARIANT_CLASS_DICT_ENTRY    = '{'
} GVariantClass;

GLIB_AVAILABLE_IN_ALL
void                            g_variant_unref                         (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_ref                           (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_ref_sink                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_floating                   (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_take_ref                      (GVariant             *value);

GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_get_type                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
const gchar *                   g_variant_get_type_string               (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_of_type                    (GVariant             *value,
                                                                         const GVariantType   *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_container                  (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariantClass                   g_variant_classify                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_boolean                   (gboolean              value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_byte                      (guint8                value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_int16                     (gint16                value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_uint16                    (guint16               value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_int32                     (gint32                value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_uint32                    (guint32               value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_int64                     (gint64                value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_uint64                    (guint64               value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_handle                    (gint32                value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_double                    (gdouble               value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_string                    (const gchar          *string);
GLIB_AVAILABLE_IN_2_38
GVariant *                      g_variant_new_take_string               (gchar                *string);
GLIB_AVAILABLE_IN_2_38
GVariant *                      g_variant_new_printf                    (const gchar          *format_string,
                                                                         ...) G_GNUC_PRINTF (1, 2);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_object_path               (const gchar          *object_path);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_object_path                (const gchar          *string);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_signature                 (const gchar          *signature);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_signature                  (const gchar          *string);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_variant                   (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_strv                      (const gchar * const  *strv,
                                                                         gssize                length);
GLIB_AVAILABLE_IN_2_30
GVariant *                      g_variant_new_objv                      (const gchar * const  *strv,
                                                                         gssize                length);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_bytestring                (const gchar          *string);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_bytestring_array          (const gchar * const  *strv,
                                                                         gssize                length);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_fixed_array               (const GVariantType   *element_type,
                                                                         gconstpointer         elements,
                                                                         gsize                 n_elements,
                                                                         gsize                 element_size);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_get_boolean                   (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
guint8                          g_variant_get_byte                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gint16                          g_variant_get_int16                     (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
guint16                         g_variant_get_uint16                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gint32                          g_variant_get_int32                     (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
guint32                         g_variant_get_uint32                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gint64                          g_variant_get_int64                     (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
guint64                         g_variant_get_uint64                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gint32                          g_variant_get_handle                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gdouble                         g_variant_get_double                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_get_variant                   (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
const gchar *                   g_variant_get_string                    (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
gchar *                         g_variant_dup_string                    (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
const gchar **                  g_variant_get_strv                      (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
gchar **                        g_variant_dup_strv                      (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_2_30
const gchar **                  g_variant_get_objv                      (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
gchar **                        g_variant_dup_objv                      (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
const gchar *                   g_variant_get_bytestring                (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gchar *                         g_variant_dup_bytestring                (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
const gchar **                  g_variant_get_bytestring_array          (GVariant             *value,
                                                                         gsize                *length);
GLIB_AVAILABLE_IN_ALL
gchar **                        g_variant_dup_bytestring_array          (GVariant             *value,
                                                                         gsize                *length);

GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_maybe                     (const GVariantType   *child_type,
                                                                         GVariant             *child);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_array                     (const GVariantType   *child_type,
                                                                         GVariant * const     *children,
                                                                         gsize                 n_children);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_tuple                     (GVariant * const     *children,
                                                                         gsize                 n_children);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_dict_entry                (GVariant             *key,
                                                                         GVariant             *value);

GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_get_maybe                     (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_n_children                    (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_get_child                     (GVariant             *value,
                                                                         gsize                 index_,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_get_child_value               (GVariant             *value,
                                                                         gsize                 index_);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_lookup                        (GVariant             *dictionary,
                                                                         const gchar          *key,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_lookup_value                  (GVariant             *dictionary,
                                                                         const gchar          *key,
                                                                         const GVariantType   *expected_type);
GLIB_AVAILABLE_IN_ALL
gconstpointer                   g_variant_get_fixed_array               (GVariant             *value,
                                                                         gsize                *n_elements,
                                                                         gsize                 element_size);

GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_get_size                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gconstpointer                   g_variant_get_data                      (GVariant             *value);
GLIB_AVAILABLE_IN_2_36
GBytes *                        g_variant_get_data_as_bytes             (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_store                         (GVariant             *value,
                                                                         gpointer              data);

GLIB_AVAILABLE_IN_ALL
gchar *                         g_variant_print                         (GVariant             *value,
                                                                         gboolean              type_annotate);
GLIB_AVAILABLE_IN_ALL
GString *                       g_variant_print_string                  (GVariant             *value,
                                                                         GString              *string,
                                                                         gboolean              type_annotate);

GLIB_AVAILABLE_IN_ALL
guint                           g_variant_hash                          (gconstpointer         value);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_equal                         (gconstpointer         one,
                                                                         gconstpointer         two);

GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_get_normal_form               (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_is_normal_form                (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_byteswap                      (GVariant             *value);

GLIB_AVAILABLE_IN_2_36
GVariant *                      g_variant_new_from_bytes                (const GVariantType   *type,
                                                                         GBytes               *bytes,
                                                                         gboolean              trusted);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_from_data                 (const GVariantType   *type,
                                                                         gconstpointer         data,
                                                                         gsize                 size,
                                                                         gboolean              trusted,
                                                                         GDestroyNotify        notify,
                                                                         gpointer              user_data);

typedef struct _GVariantIter GVariantIter;
struct _GVariantIter {
  /*< private >*/
  gsize x[16];
};

GLIB_AVAILABLE_IN_ALL
GVariantIter *                  g_variant_iter_new                      (GVariant             *value);
GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_iter_init                     (GVariantIter         *iter,
                                                                         GVariant             *value);
GLIB_AVAILABLE_IN_ALL
GVariantIter *                  g_variant_iter_copy                     (GVariantIter         *iter);
GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_iter_n_children               (GVariantIter         *iter);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_iter_free                     (GVariantIter         *iter);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_iter_next_value               (GVariantIter         *iter);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_iter_next                     (GVariantIter         *iter,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_iter_loop                     (GVariantIter         *iter,
                                                                         const gchar          *format_string,
                                                                         ...);


typedef struct _GVariantBuilder GVariantBuilder;
struct _GVariantBuilder {
  /*< private >*/
  union
  {
    struct {
      gsize partial_magic;
      const GVariantType *type;
      gsize y[14];
    } s;
    gsize x[16];
  } u;
};

typedef enum
{
  G_VARIANT_PARSE_ERROR_FAILED,
  G_VARIANT_PARSE_ERROR_BASIC_TYPE_EXPECTED,
  G_VARIANT_PARSE_ERROR_CANNOT_INFER_TYPE,
  G_VARIANT_PARSE_ERROR_DEFINITE_TYPE_EXPECTED,
  G_VARIANT_PARSE_ERROR_INPUT_NOT_AT_END,
  G_VARIANT_PARSE_ERROR_INVALID_CHARACTER,
  G_VARIANT_PARSE_ERROR_INVALID_FORMAT_STRING,
  G_VARIANT_PARSE_ERROR_INVALID_OBJECT_PATH,
  G_VARIANT_PARSE_ERROR_INVALID_SIGNATURE,
  G_VARIANT_PARSE_ERROR_INVALID_TYPE_STRING,
  G_VARIANT_PARSE_ERROR_NO_COMMON_TYPE,
  G_VARIANT_PARSE_ERROR_NUMBER_OUT_OF_RANGE,
  G_VARIANT_PARSE_ERROR_NUMBER_TOO_BIG,
  G_VARIANT_PARSE_ERROR_TYPE_ERROR,
  G_VARIANT_PARSE_ERROR_UNEXPECTED_TOKEN,
  G_VARIANT_PARSE_ERROR_UNKNOWN_KEYWORD,
  G_VARIANT_PARSE_ERROR_UNTERMINATED_STRING_CONSTANT,
  G_VARIANT_PARSE_ERROR_VALUE_EXPECTED
} GVariantParseError;
#define G_VARIANT_PARSE_ERROR (g_variant_parse_error_quark ())

GLIB_DEPRECATED_IN_2_38_FOR(g_variant_parse_error_quark)
GQuark                          g_variant_parser_get_error_quark        (void);

GLIB_AVAILABLE_IN_ALL
GQuark                          g_variant_parse_error_quark             (void);

/**
 * G_VARIANT_BUILDER_INIT:
 * @variant_type: a const GVariantType*
 *
 * A stack-allocated #GVariantBuilder must be initialized if it is
 * used together with g_auto() to avoid warnings or crashes if
 * function returns before g_variant_builder_init() is called on the
 * builder.  This macro can be used as initializer instead of an
 * explicit zeroing a variable when declaring it and a following
 * g_variant_builder_init(), but it cannot be assigned to a variable.
 *
 * The passed @variant_type should be a static GVariantType to avoid
 * lifetime issues, as copying the @variant_type does not happen in
 * the G_VARIANT_BUILDER_INIT() call, but rather in functions that
 * make sure that #GVariantBuilder is valid.
 *
 * |[
 *   g_auto(GVariantBuilder) builder = G_VARIANT_BUILDER_INIT (G_VARIANT_TYPE_BYTESTRING);
 * ]|
 *
 * Since: 2.50
 */
#define G_VARIANT_BUILDER_INIT(variant_type) { { { 2942751021u, variant_type, { 0, } } } }

GLIB_AVAILABLE_IN_ALL
GVariantBuilder *               g_variant_builder_new                   (const GVariantType   *type);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_unref                 (GVariantBuilder      *builder);
GLIB_AVAILABLE_IN_ALL
GVariantBuilder *               g_variant_builder_ref                   (GVariantBuilder      *builder);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_init                  (GVariantBuilder      *builder,
                                                                         const GVariantType   *type);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_builder_end                   (GVariantBuilder      *builder);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_clear                 (GVariantBuilder      *builder);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_open                  (GVariantBuilder      *builder,
                                                                         const GVariantType   *type);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_close                 (GVariantBuilder      *builder);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_add_value             (GVariantBuilder      *builder,
                                                                         GVariant             *value);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_add                   (GVariantBuilder      *builder,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_builder_add_parsed            (GVariantBuilder      *builder,
                                                                         const gchar          *format,
                                                                         ...);

GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new                           (const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_get                           (GVariant             *value,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_va                        (const gchar          *format_string,
                                                                         const gchar         **endptr,
                                                                         va_list              *app);
GLIB_AVAILABLE_IN_ALL
void                            g_variant_get_va                        (GVariant             *value,
                                                                         const gchar          *format_string,
                                                                         const gchar         **endptr,
                                                                         va_list              *app);
GLIB_AVAILABLE_IN_2_34
gboolean                        g_variant_check_format_string           (GVariant             *value,
                                                                         const gchar          *format_string,
                                                                         gboolean              copy_only);

GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_parse                         (const GVariantType   *type,
                                                                         const gchar          *text,
                                                                         const gchar          *limit,
                                                                         const gchar         **endptr,
                                                                         GError              **error);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_parsed                    (const gchar          *format,
                                                                         ...);
GLIB_AVAILABLE_IN_ALL
GVariant *                      g_variant_new_parsed_va                 (const gchar          *format,
                                                                         va_list              *app);

GLIB_AVAILABLE_IN_2_40
gchar *                         g_variant_parse_error_print_context     (GError               *error,
                                                                         const gchar          *source_str);

GLIB_AVAILABLE_IN_ALL
gint                            g_variant_compare                       (gconstpointer one,
                                                                         gconstpointer two);

typedef struct _GVariantDict GVariantDict;
struct _GVariantDict {
  /*< private >*/
  union
  {
    struct {
      GVariant *asv;
      gsize partial_magic;
      gsize y[14];
    } s;
    gsize x[16];
  } u;
};

/**
 * G_VARIANT_DICT_INIT:
 * @asv: (nullable): a GVariant*
 *
 * A stack-allocated #GVariantDict must be initialized if it is used
 * together with g_auto() to avoid warnings or crashes if function
 * returns before g_variant_dict_init() is called on the builder.
 * This macro can be used as initializer instead of an explicit
 * zeroing a variable when declaring it and a following
 * g_variant_dict_init(), but it cannot be assigned to a variable.
 *
 * The passed @asv has to live long enough for #GVariantDict to gather
 * the entries from, as the gathering does not happen in the
 * G_VARIANT_DICT_INIT() call, but rather in functions that make sure
 * that #GVariantDict is valid.  In context where the initialization
 * value has to be a constant expression, the only possible value of
 * @asv is %NULL.  It is still possible to call g_variant_dict_init()
 * safely with a different @asv right after the variable was
 * initialized with G_VARIANT_DICT_INIT().
 *
 * |[
 *   g_autoptr(GVariant) variant = get_asv_variant ();
 *   g_auto(GVariantDict) dict = G_VARIANT_DICT_INIT (variant);
 * ]|
 *
 * Since: 2.50
 */
#define G_VARIANT_DICT_INIT(asv) { { { asv, 3488698669u, { 0, } } } }

GLIB_AVAILABLE_IN_2_40
GVariantDict *                  g_variant_dict_new                      (GVariant             *from_asv);

GLIB_AVAILABLE_IN_2_40
void                            g_variant_dict_init                     (GVariantDict         *dict,
                                                                         GVariant             *from_asv);

GLIB_AVAILABLE_IN_2_40
gboolean                        g_variant_dict_lookup                   (GVariantDict         *dict,
                                                                         const gchar          *key,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_2_40
GVariant *                      g_variant_dict_lookup_value             (GVariantDict         *dict,
                                                                         const gchar          *key,
                                                                         const GVariantType   *expected_type);
GLIB_AVAILABLE_IN_2_40
gboolean                        g_variant_dict_contains                 (GVariantDict         *dict,
                                                                         const gchar          *key);
GLIB_AVAILABLE_IN_2_40
void                            g_variant_dict_insert                   (GVariantDict         *dict,
                                                                         const gchar          *key,
                                                                         const gchar          *format_string,
                                                                         ...);
GLIB_AVAILABLE_IN_2_40
void                            g_variant_dict_insert_value             (GVariantDict         *dict,
                                                                         const gchar          *key,
                                                                         GVariant             *value);
GLIB_AVAILABLE_IN_2_40
gboolean                        g_variant_dict_remove                   (GVariantDict         *dict,
                                                                         const gchar          *key);
GLIB_AVAILABLE_IN_2_40
void                            g_variant_dict_clear                    (GVariantDict         *dict);
GLIB_AVAILABLE_IN_2_40
GVariant *                      g_variant_dict_end                      (GVariantDict         *dict);
GLIB_AVAILABLE_IN_2_40
GVariantDict *                  g_variant_dict_ref                      (GVariantDict         *dict);
GLIB_AVAILABLE_IN_2_40
void                            g_variant_dict_unref                    (GVariantDict         *dict);

G_END_DECLS

#endif /* __G_VARIANT_H__ */
