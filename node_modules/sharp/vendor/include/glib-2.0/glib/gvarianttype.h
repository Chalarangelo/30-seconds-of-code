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

#ifndef __G_VARIANT_TYPE_H__
#define __G_VARIANT_TYPE_H__

#if !defined (__GLIB_H_INSIDE__) && !defined (GLIB_COMPILATION)
#error "Only <glib.h> can be included directly."
#endif

#include <glib/gtypes.h>

G_BEGIN_DECLS

/**
 * GVariantType:
 *
 * A type in the GVariant type system.
 *
 * Two types may not be compared by value; use g_variant_type_equal() or
 * g_variant_type_is_subtype_of().  May be copied using
 * g_variant_type_copy() and freed using g_variant_type_free().
 **/
typedef struct _GVariantType GVariantType;

/**
 * G_VARIANT_TYPE_BOOLEAN:
 *
 * The type of a value that can be either %TRUE or %FALSE.
 **/
#define G_VARIANT_TYPE_BOOLEAN              ((const GVariantType *) "b")

/**
 * G_VARIANT_TYPE_BYTE:
 *
 * The type of an integer value that can range from 0 to 255.
 **/
#define G_VARIANT_TYPE_BYTE                 ((const GVariantType *) "y")

/**
 * G_VARIANT_TYPE_INT16:
 *
 * The type of an integer value that can range from -32768 to 32767.
 **/
#define G_VARIANT_TYPE_INT16                ((const GVariantType *) "n")

/**
 * G_VARIANT_TYPE_UINT16:
 *
 * The type of an integer value that can range from 0 to 65535.
 * There were about this many people living in Toronto in the 1870s.
 **/
#define G_VARIANT_TYPE_UINT16               ((const GVariantType *) "q")

/**
 * G_VARIANT_TYPE_INT32:
 *
 * The type of an integer value that can range from -2147483648 to
 * 2147483647.
 **/
#define G_VARIANT_TYPE_INT32                ((const GVariantType *) "i")

/**
 * G_VARIANT_TYPE_UINT32:
 *
 * The type of an integer value that can range from 0 to 4294967295.
 * That's one number for everyone who was around in the late 1970s.
 **/
#define G_VARIANT_TYPE_UINT32               ((const GVariantType *) "u")

/**
 * G_VARIANT_TYPE_INT64:
 *
 * The type of an integer value that can range from
 * -9223372036854775808 to 9223372036854775807.
 **/
#define G_VARIANT_TYPE_INT64                ((const GVariantType *) "x")

/**
 * G_VARIANT_TYPE_UINT64:
 *
 * The type of an integer value that can range from 0
 * to 18446744073709551615 (inclusive).  That's a really big number,
 * but a Rubik's cube can have a bit more than twice as many possible
 * positions.
 **/
#define G_VARIANT_TYPE_UINT64               ((const GVariantType *) "t")

/**
 * G_VARIANT_TYPE_DOUBLE:
 *
 * The type of a double precision IEEE754 floating point number.
 * These guys go up to about 1.80e308 (plus and minus) but miss out on
 * some numbers in between.  In any case, that's far greater than the
 * estimated number of fundamental particles in the observable
 * universe.
 **/
#define G_VARIANT_TYPE_DOUBLE               ((const GVariantType *) "d")

/**
 * G_VARIANT_TYPE_STRING:
 *
 * The type of a string.  "" is a string.  %NULL is not a string.
 **/
#define G_VARIANT_TYPE_STRING               ((const GVariantType *) "s")

/**
 * G_VARIANT_TYPE_OBJECT_PATH:
 *
 * The type of a D-Bus object reference.  These are strings of a
 * specific format used to identify objects at a given destination on
 * the bus.
 *
 * If you are not interacting with D-Bus, then there is no reason to make
 * use of this type.  If you are, then the D-Bus specification contains a
 * precise description of valid object paths.
 **/
#define G_VARIANT_TYPE_OBJECT_PATH          ((const GVariantType *) "o")

/**
 * G_VARIANT_TYPE_SIGNATURE:
 *
 * The type of a D-Bus type signature.  These are strings of a specific
 * format used as type signatures for D-Bus methods and messages.
 *
 * If you are not interacting with D-Bus, then there is no reason to make
 * use of this type.  If you are, then the D-Bus specification contains a
 * precise description of valid signature strings.
 **/
#define G_VARIANT_TYPE_SIGNATURE            ((const GVariantType *) "g")

/**
 * G_VARIANT_TYPE_VARIANT:
 *
 * The type of a box that contains any other value (including another
 * variant).
 **/
#define G_VARIANT_TYPE_VARIANT              ((const GVariantType *) "v")

/**
 * G_VARIANT_TYPE_HANDLE:
 *
 * The type of a 32bit signed integer value, that by convention, is used
 * as an index into an array of file descriptors that are sent alongside
 * a D-Bus message.
 *
 * If you are not interacting with D-Bus, then there is no reason to make
 * use of this type.
 **/
#define G_VARIANT_TYPE_HANDLE               ((const GVariantType *) "h")

/**
 * G_VARIANT_TYPE_UNIT:
 *
 * The empty tuple type.  Has only one instance.  Known also as "triv"
 * or "void".
 **/
#define G_VARIANT_TYPE_UNIT                 ((const GVariantType *) "()")

/**
 * G_VARIANT_TYPE_ANY:
 *
 * An indefinite type that is a supertype of every type (including
 * itself).
 **/
#define G_VARIANT_TYPE_ANY                  ((const GVariantType *) "*")

/**
 * G_VARIANT_TYPE_BASIC:
 *
 * An indefinite type that is a supertype of every basic (ie:
 * non-container) type.
 **/
#define G_VARIANT_TYPE_BASIC                ((const GVariantType *) "?")

/**
 * G_VARIANT_TYPE_MAYBE:
 *
 * An indefinite type that is a supertype of every maybe type.
 **/
#define G_VARIANT_TYPE_MAYBE                ((const GVariantType *) "m*")

/**
 * G_VARIANT_TYPE_ARRAY:
 *
 * An indefinite type that is a supertype of every array type.
 **/
#define G_VARIANT_TYPE_ARRAY                ((const GVariantType *) "a*")

/**
 * G_VARIANT_TYPE_TUPLE:
 *
 * An indefinite type that is a supertype of every tuple type,
 * regardless of the number of items in the tuple.
 **/
#define G_VARIANT_TYPE_TUPLE                ((const GVariantType *) "r")

/**
 * G_VARIANT_TYPE_DICT_ENTRY:
 *
 * An indefinite type that is a supertype of every dictionary entry
 * type.
 **/
#define G_VARIANT_TYPE_DICT_ENTRY           ((const GVariantType *) "{?*}")

/**
 * G_VARIANT_TYPE_DICTIONARY:
 *
 * An indefinite type that is a supertype of every dictionary type --
 * that is, any array type that has an element type equal to any
 * dictionary entry type.
 **/
#define G_VARIANT_TYPE_DICTIONARY           ((const GVariantType *) "a{?*}")

/**
 * G_VARIANT_TYPE_STRING_ARRAY:
 *
 * The type of an array of strings.
 **/
#define G_VARIANT_TYPE_STRING_ARRAY         ((const GVariantType *) "as")

/**
 * G_VARIANT_TYPE_OBJECT_PATH_ARRAY:
 *
 * The type of an array of object paths.
 **/
#define G_VARIANT_TYPE_OBJECT_PATH_ARRAY    ((const GVariantType *) "ao")

/**
 * G_VARIANT_TYPE_BYTESTRING:
 *
 * The type of an array of bytes.  This type is commonly used to pass
 * around strings that may not be valid utf8.  In that case, the
 * convention is that the nul terminator character should be included as
 * the last character in the array.
 **/
#define G_VARIANT_TYPE_BYTESTRING           ((const GVariantType *) "ay")

/**
 * G_VARIANT_TYPE_BYTESTRING_ARRAY:
 *
 * The type of an array of byte strings (an array of arrays of bytes).
 **/
#define G_VARIANT_TYPE_BYTESTRING_ARRAY     ((const GVariantType *) "aay")

/**
 * G_VARIANT_TYPE_VARDICT:
 *
 * The type of a dictionary mapping strings to variants (the ubiquitous
 * "a{sv}" type).
 *
 * Since: 2.30
 **/
#define G_VARIANT_TYPE_VARDICT              ((const GVariantType *) "a{sv}")


/**
 * G_VARIANT_TYPE:
 * @type_string: a well-formed #GVariantType type string
 *
 * Converts a string to a const #GVariantType.  Depending on the
 * current debugging level, this function may perform a runtime check
 * to ensure that @string is a valid GVariant type string.
 *
 * It is always a programmer error to use this macro with an invalid
 * type string. If in doubt, use g_variant_type_string_is_valid() to
 * check if the string is valid.
 *
 * Since 2.24
 **/
#ifndef G_DISABLE_CHECKS
# define G_VARIANT_TYPE(type_string)            (g_variant_type_checked_ ((type_string)))
#else
# define G_VARIANT_TYPE(type_string)            ((const GVariantType *) (type_string))
#endif

/* type string checking */
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_string_is_valid          (const gchar         *type_string);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_string_scan              (const gchar         *string,
                                                                         const gchar         *limit,
                                                                         const gchar        **endptr);

/* create/destroy */
GLIB_AVAILABLE_IN_ALL
void                            g_variant_type_free                     (GVariantType        *type);
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_copy                     (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_new                      (const gchar         *type_string);

/* getters */
GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_type_get_string_length        (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
const gchar *                   g_variant_type_peek_string              (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gchar *                         g_variant_type_dup_string               (const GVariantType  *type);

/* classification */
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_definite              (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_container             (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_basic                 (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_maybe                 (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_array                 (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_tuple                 (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_dict_entry            (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_variant               (const GVariantType  *type);

/* for hash tables */
GLIB_AVAILABLE_IN_ALL
guint                           g_variant_type_hash                     (gconstpointer        type);
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_equal                    (gconstpointer        type1,
                                                                         gconstpointer        type2);

/* subtypes */
GLIB_AVAILABLE_IN_ALL
gboolean                        g_variant_type_is_subtype_of            (const GVariantType  *type,
                                                                         const GVariantType  *supertype);

/* type iterator interface */
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_element                  (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_first                    (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_next                     (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
gsize                           g_variant_type_n_items                  (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_key                      (const GVariantType  *type);
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_value                    (const GVariantType  *type);

/* constructors */
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_new_array                (const GVariantType  *element);
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_new_maybe                (const GVariantType  *element);
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_new_tuple                (const GVariantType * const *items,
                                                                         gint                 length);
GLIB_AVAILABLE_IN_ALL
GVariantType *                  g_variant_type_new_dict_entry           (const GVariantType  *key,
                                                                         const GVariantType  *value);

/*< private >*/
GLIB_AVAILABLE_IN_ALL
const GVariantType *            g_variant_type_checked_                 (const gchar *);
GLIB_AVAILABLE_IN_2_60
gsize                           g_variant_type_string_get_depth_        (const gchar *type_string);

G_END_DECLS

#endif /* __G_VARIANT_TYPE_H__ */
