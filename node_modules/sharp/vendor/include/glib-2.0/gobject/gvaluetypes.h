/* GObject - GLib Type, Object, Parameter and Signal Library
 * Copyright (C) 1997-1999, 2000-2001 Tim Janik and Red Hat, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	 See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General
 * Public License along with this library; if not, see <http://www.gnu.org/licenses/>.
 *
 * gvaluetypes.h: GLib default values
 */
#ifndef __G_VALUETYPES_H__
#define __G_VALUETYPES_H__

#if !defined (__GLIB_GOBJECT_H_INSIDE__) && !defined (GOBJECT_COMPILATION)
#error "Only <glib-object.h> can be included directly."
#endif

#include	<gobject/gvalue.h>

G_BEGIN_DECLS

/* --- type macros --- */
/**
 * G_VALUE_HOLDS_CHAR:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_CHAR.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_CHAR(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_CHAR))
/**
 * G_VALUE_HOLDS_UCHAR:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_UCHAR.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_UCHAR(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_UCHAR))
/**
 * G_VALUE_HOLDS_BOOLEAN:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_BOOLEAN.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_BOOLEAN(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_BOOLEAN))
/**
 * G_VALUE_HOLDS_INT:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_INT.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_INT(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_INT))
/**
 * G_VALUE_HOLDS_UINT:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_UINT.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_UINT(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_UINT))
/**
 * G_VALUE_HOLDS_LONG:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_LONG.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_LONG(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_LONG))
/**
 * G_VALUE_HOLDS_ULONG:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_ULONG.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_ULONG(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_ULONG))
/**
 * G_VALUE_HOLDS_INT64:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_INT64.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_INT64(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_INT64))
/**
 * G_VALUE_HOLDS_UINT64:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_UINT64.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_UINT64(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_UINT64))
/**
 * G_VALUE_HOLDS_FLOAT:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_FLOAT.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_FLOAT(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_FLOAT))
/**
 * G_VALUE_HOLDS_DOUBLE:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_DOUBLE.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_DOUBLE(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_DOUBLE))
/**
 * G_VALUE_HOLDS_STRING:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_STRING.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_STRING(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_STRING))
/**
 * G_VALUE_HOLDS_POINTER:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_POINTER.
 * 
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_POINTER(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_POINTER))
/**
 * G_TYPE_GTYPE:
 * 
 * The type for #GType.
 */
#define	G_TYPE_GTYPE			 (g_gtype_get_type())
/**
 * G_VALUE_HOLDS_GTYPE:
 * @value: a valid #GValue structure
 * 
 * Checks whether the given #GValue can hold values of type %G_TYPE_GTYPE.
 * 
 * Since: 2.12
 * Returns: %TRUE on success.
 */
#define G_VALUE_HOLDS_GTYPE(value)	 (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_GTYPE))
/**
 * G_VALUE_HOLDS_VARIANT:
 * @value: a valid #GValue structure
 *
 * Checks whether the given #GValue can hold values of type %G_TYPE_VARIANT.
 *
 * Returns: %TRUE on success.
 *
 * Since: 2.26
 */
#define G_VALUE_HOLDS_VARIANT(value)     (G_TYPE_CHECK_VALUE_TYPE ((value), G_TYPE_VARIANT))


/* --- prototypes --- */
GLIB_DEPRECATED_IN_2_32_FOR(g_value_set_schar)
void                  g_value_set_char          (GValue       *value,
                                                 gchar         v_char);
GLIB_DEPRECATED_IN_2_32_FOR(g_value_get_schar)
gchar                 g_value_get_char          (const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_schar		(GValue	      *value,
						 gint8	       v_char);
GLIB_AVAILABLE_IN_ALL
gint8		      g_value_get_schar		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_uchar		(GValue	      *value,
						 guchar	       v_uchar);
GLIB_AVAILABLE_IN_ALL
guchar		      g_value_get_uchar		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_boolean	(GValue	      *value,
						 gboolean      v_boolean);
GLIB_AVAILABLE_IN_ALL
gboolean	      g_value_get_boolean	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_int		(GValue	      *value,
						 gint	       v_int);
GLIB_AVAILABLE_IN_ALL
gint		      g_value_get_int		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_uint		(GValue	      *value,
						 guint	       v_uint);
GLIB_AVAILABLE_IN_ALL
guint		      g_value_get_uint		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_long		(GValue	      *value,
						 glong	       v_long);
GLIB_AVAILABLE_IN_ALL
glong		      g_value_get_long		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_ulong		(GValue	      *value,
						 gulong	       v_ulong);
GLIB_AVAILABLE_IN_ALL
gulong		      g_value_get_ulong		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_int64		(GValue	      *value,
						 gint64	       v_int64);
GLIB_AVAILABLE_IN_ALL
gint64		      g_value_get_int64		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_uint64	(GValue	      *value,
						 guint64      v_uint64);
GLIB_AVAILABLE_IN_ALL
guint64		      g_value_get_uint64	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_float		(GValue	      *value,
						 gfloat	       v_float);
GLIB_AVAILABLE_IN_ALL
gfloat		      g_value_get_float		(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_double	(GValue	      *value,
						 gdouble       v_double);
GLIB_AVAILABLE_IN_ALL
gdouble		      g_value_get_double	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_string	(GValue	      *value,
						 const gchar  *v_string);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_static_string (GValue	      *value,
						 const gchar  *v_string);
GLIB_AVAILABLE_IN_ALL
const gchar *         g_value_get_string	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
gchar*		      g_value_dup_string	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_pointer	(GValue	      *value,
						 gpointer      v_pointer);
GLIB_AVAILABLE_IN_ALL
gpointer	      g_value_get_pointer	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
GType		      g_gtype_get_type		(void);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_gtype	        (GValue	      *value,
						 GType         v_gtype);
GLIB_AVAILABLE_IN_ALL
GType	              g_value_get_gtype	        (const GValue *value);
GLIB_AVAILABLE_IN_ALL
void		      g_value_set_variant	(GValue	      *value,
						 GVariant     *variant);
GLIB_AVAILABLE_IN_ALL
void		      g_value_take_variant	(GValue	      *value,
						 GVariant     *variant);
GLIB_AVAILABLE_IN_ALL
GVariant*	      g_value_get_variant	(const GValue *value);
GLIB_AVAILABLE_IN_ALL
GVariant*	      g_value_dup_variant	(const GValue *value);


/* Convenience for registering new pointer types */
GLIB_AVAILABLE_IN_ALL
GType                 g_pointer_type_register_static (const gchar *name);

/* debugging aid, describe value contents as string */
GLIB_AVAILABLE_IN_ALL
gchar*                g_strdup_value_contents   (const GValue *value);


GLIB_AVAILABLE_IN_ALL
void g_value_take_string		        (GValue		   *value,
						 gchar		   *v_string);
GLIB_DEPRECATED_FOR(g_value_take_string)
void g_value_set_string_take_ownership          (GValue            *value,
                                                 gchar             *v_string);


/* humpf, need a C representable type name for G_TYPE_STRING */
/**
 * gchararray:
 * 
 * A C representable type name for #G_TYPE_STRING.
 */
typedef gchar* gchararray;


G_END_DECLS

#endif /* __G_VALUETYPES_H__ */
